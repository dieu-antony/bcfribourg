import { Team } from "~/pages/api/teams/create";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import {
  InteractionData,
  ScatterPlotTooltip,
} from "../statsGraphs/ScatterPlotTooltip";


const margin = { top: 30, right: 30, bottom: 50, left: 50 };

type RatioScatterPlotProps = {
  width: number;
  height: number;
  type: "wins" | "points";
  data: Team[];
};

export type TeamWithRatio = Team & { ratio: number };

export const RatioScatterPlot = ({
  width,
  height,
  type,
  data,
}: RatioScatterPlotProps) => {
  const [interactionData, setInteractionData] =
    useState<InteractionData | null>(null);
  const axesRef = useRef<SVGSVGElement>(null);

  const boundsWidth = width - margin.right - margin.left;
  const boundsHeight = height - margin.top - margin.bottom;

  let updatedData: TeamWithRatio[] = [];
  let max = 1;

  if (type === "wins") {
    updatedData = data.map((d) => {
      return { ...d, ratio: d.wins / (d.wins + d.losses + d.ties) };
    });
  } else if (type === "points") {
    updatedData = data.map((d) => {
      return { ...d, ratio: d.points / (d.wins + d.losses + d.ties) };
    });
    max = d3.extent(updatedData, (d) => d.ratio)?.[1] ?? 0;
  }

  const yScale = d3.scaleLinear().domain([0, max]).range([boundsHeight, 0]);

  //x-axis
  const customTimeParser = d3.timeParse("%Y");

  const times = updatedData
    .map((d) => customTimeParser(d.seasonStart.toString() || ""))
    .filter((item) => item instanceof Date) as Date[];
  const dateDomain = d3.extent(times) as [Date, Date];
  const xScale = d3.scaleTime().domain(dateDomain).range([0, boundsWidth]);

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
  }, [xScale, yScale, boundsHeight]);

  const lineBuilder = d3
    .line<TeamWithRatio>()
    .x((d) => xScale(customTimeParser(d.seasonStart.toString()) as Date))
    .y((d) => yScale(d.ratio));

  const linePath = lineBuilder(updatedData);

  if (!linePath) {
    return null;
  }

  const allCircles = updatedData.map((d, index) => (
    <circle
      key={`${d.id}-${d.ratio}-${type}-${d.seasonStart}-${index}`}
      cx={xScale(customTimeParser(d.seasonStart.toString()) as Date)}
      cy={yScale(d.ratio)}
      r={5}
      onMouseEnter={() => {
        setInteractionData({
          xPos: xScale(customTimeParser(d.seasonStart.toString()) as Date),
          yPos: yScale(d.ratio),
          data: d,
        });
      }}
      onMouseLeave={() => {
        setInteractionData(null);
      }}
      fill="#00afef"
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
          <path
            d={linePath}
            opacity={1}
            stroke="#00afef"
            fill="none"
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
