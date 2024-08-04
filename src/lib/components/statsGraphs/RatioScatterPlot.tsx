import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import type { InteractionData } from "../statsGraphs/ScatterPlotTooltip";
import { ScatterPlotTooltip } from "../statsGraphs/ScatterPlotTooltip";
import type { PastTeamProps, TeamWithRatio } from "~/lib/types";
import { CircleItem } from "./CircleItem";
import { interpolatePath } from "d3-interpolate-path";
import {
  animated,
  to,
  useSpring,
  useSprings,
} from "@react-spring/web";

// Predefined margins
const margin = { top: 30, right: 30, bottom: 50, left: 50 };

type RatioScatterPlotProps = {
  width: number;
  height: number;
  type: "wins" | "points";
  data: PastTeamProps[];
};

export const RatioScatterPlot = ({
  width,
  height,
  type,
  data,
}: RatioScatterPlotProps) => {
  // Ref for the axes, interaction data for the tooltips and define the bounds
  const [interactionData, setInteractionData] =
    useState<InteractionData | null>(null);
  const axesRef = useRef<SVGSVGElement>(null);

  const boundsWidth = width - margin.right - margin.left;
  const boundsHeight = height - margin.top - margin.bottom;

  // Use the type to determine the data to display
  const { updatedData, max } = useMemo(() => {
    let computedData: TeamWithRatio[] = [];
    let maxRatio = 1;

    if (type === "wins") {
      computedData = data.map((d) => {
        return { ...d, ratio: d.wins / (d.wins + d.losses + d.ties) };
      });
    } else if (type === "points") {
      computedData = data.map((d) => {
        return { ...d, ratio: d.points / (d.wins + d.losses + d.ties) };
      });
      maxRatio = d3.extent(computedData, (d) => d.ratio)?.[1] ?? 0;
    }

    return { updatedData: computedData, max: maxRatio };
  }, [data, type]);

  // Define the scales for the axes
  const yScale = d3.scaleLinear().domain([0, max]).range([boundsHeight, 0]);

  const customTimeParser = d3.timeParse("%Y");

  const times = updatedData
    .map((d) => customTimeParser(d.seasonStart.toString() || ""))
    .filter((item): item is Date => item instanceof Date);
  const dateDomain = d3.extent(times) as [Date, Date];
  const xScale = d3.scaleTime().domain(dateDomain).range([0, boundsWidth]);

  // draw the axes
  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale).ticks(times.length);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [times.length, xScale, yScale, boundsHeight]);

  // Define the line generator
  const lineBuilder = d3
    .line<TeamWithRatio>()
    .x((d) => xScale(customTimeParser(d.seasonStart.toString())!))
    .y((d) => yScale(d.ratio));

  // Generate the line path
  const line = lineBuilder(updatedData);

  const linePath = useRef(line);

  const pathInterpolator = useMemo(
    () =>
      interpolatePath(linePath.current ?? "", lineBuilder(updatedData) ?? ""),
    [lineBuilder, updatedData],
  );

  // Define the spring properties for the line for react-spring animations
  const lineSpringProps = useSpring({
    from: { t: 0 },
    to: { t: 1 },
    config: {
      friction: 20,
      mass: 1,
    },
    reset: linePath.current !== line,
    onChange: ({ value }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      linePath.current = pathInterpolator(value.t);
    },
  });

  // Define the springs for the circles
  const springs = useSprings(
    updatedData.length,
    updatedData.map((d) => ({
      to: {
        cx: xScale(customTimeParser(d.seasonStart.toString())!),
        cy: yScale(d.ratio),
        color: "#00afef",
      },
      config: {
        friction: 20,
        mass: 1,
      },
    })),
  );

  // Check if linePath is not null
  if (!linePath.current) {
    return null;
  }

  // Draw the circles for the data points
  const allCircles = updatedData.map((d, index) => {
    return (
      <CircleItem
        key={`${d.id}-${d.ratio}-${type}-${d.seasonStart}-${index}`}
        springProps={{
          cx: springs[index]?.cx,
          cy: springs[index]?.cy,
        }}
        onMouseEnter={() => {
          setInteractionData({
            xPos: xScale(customTimeParser(d.seasonStart.toString())!),
            yPos: yScale(d.ratio),
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
    );
  });

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
