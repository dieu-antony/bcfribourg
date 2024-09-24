import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import type { PastTeamProps } from "~/lib/types";
import { animated, to, useSpring, useSprings } from "@react-spring/web";
import { interpolatePath } from "d3-interpolate-path";
import { CircleItem } from "./CircleItem";
import { ScatterPlotTooltip } from "./ScatterPlotTooltip";
import type { InteractionData } from "./ScatterPlotTooltip";

// Predefined margins
const margin = { top: 30, right: 30, bottom: 50, left: 50 };

type PositionScatterPlotProps = {
  width: number;
  height: number;
  data: PastTeamProps[];
};

export const PositionScatterPlot = ({
  width,
  height,
  data,
}: PositionScatterPlotProps) => {
  // Ref for the axes, interaction data for the tooltips and define the bounds
  const [interactionData, setInteractionData] =
    useState<InteractionData | null>(null);
  const axesRef = useRef<SVGSVGElement>(null);

  const boundsWidth = width - margin.right - margin.left;
  const boundsHeight = height - margin.top - margin.bottom;

  //y-axis
  const max = d3.extent(data, (d) => d.position)?.[1] ?? 0;
  const yScale = d3.scaleLinear().domain([max, 1]).range([boundsHeight, 0]);

  //x-axis
  const customTimeParser = d3.timeParse("%Y");

  const times = data
    .map((d) => customTimeParser(d.seasonStart.toString() || ""))
    .filter((item): item is Date => item instanceof Date);
  const dateDomain = d3.extent(times) as [Date, Date];
  const xScale = d3.scaleTime().domain(dateDomain).range([0, boundsWidth]);

  // Draw the axes
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove(); 
    // Create the X-axis
    const xAxisGenerator = d3.axisBottom(xScale).ticks(times.length);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    // Create the Y-axis
    const yAxisGenerator = d3
      .axisLeft(yScale)
      .tickFormat(d3.format("0.0f"))
      .ticks(max);
    svgElement.append("g").call(yAxisGenerator);

    // Cleanup function
    return () => {
        svgElement.selectAll("*").remove();
    };
}, [xScale, yScale, boundsHeight, max, times.length]);


  // Define the line generator
  const lineBuilder = d3
    .line<PastTeamProps>()
    .x((d) => xScale(customTimeParser(d.seasonStart.toString())!))
    .y((d) => yScale(d.position));

  const line = lineBuilder(data);

  const linePath = useRef(line);

  const pathInterpolator = useMemo(
    () => interpolatePath(linePath.current ?? "", lineBuilder(data) ?? ""),
    [data, lineBuilder],
  );

  // Define the spring properties for the react-spring library
  const lineSpringProps = useSpring({
    from: {
      t: 0,
    },
    to: {
      t: 1,
    },
    config: {
      friction: 20,
      mass: 1,
    },
    reset: linePath.current !== line,
    onChange: ({ value }): void => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      linePath.current = pathInterpolator(value.t);
    },
  });

  const springs = useSprings(
    data.length,
    data.map((d) => ({
      to: {
        cx: xScale(customTimeParser(d.seasonStart.toString())!),
        cy: yScale(d.position),
        color: "#00afef",
      },
      config: {
        friction: 20,
        mass: 1,
      },
    })),
  );
  if (!linePath) {
    return null;
  }

  // Draw the circles
  const allCircles = data.map((d, index) => (
    <CircleItem
      key={`${d.id}-${d.position}-${d.seasonStart}-${index}`}
      springProps={{
        cx: springs[index]?.cx,
        cy: springs[index]?.cy,
      }}
      onMouseEnter={() => {
        setInteractionData({
          xPos: xScale(customTimeParser(d.seasonStart.toString())!),
          yPos: yScale(d.position),
          orientation:
            xScale(customTimeParser(d.seasonStart.toString())!) >
            boundsWidth / 2
              ? "left"
              : "right",
          data: d,
        });
      }}
      onMouseLeave={() => {
        setInteractionData(null);
      }}
      color="#00afef"
    />
  ));
  return (
    <>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[margin.left, margin.top].join(",")})`}
        >
          <animated.path
            d={to(lineSpringProps.t, pathInterpolator)}
            fill={"none"}
            stroke={"#00afef"}
            strokeWidth={2}
          />
          {allCircles}
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[margin.left, margin.top].join(",")})`}
        />
      </svg>
      <div
        className="pointer-events-none relative left-0 top-0 z-40 translate-y-[-125%]"
        style={{
          width: boundsWidth,
          height: boundsHeight,
          marginLeft: margin.left,
          marginTop: margin.top,
        }}
      >
        <ScatterPlotTooltip interactionData={interactionData} />
      </div>
    </>
  );
};
