import { Team } from "~/pages/api/teams/create";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

const margin = { top: 30, right: 30, bottom: 50, left: 50 };

type PositionScatterPlotProps = {
  width: number;
  height: number;
  data: Team[];
};

export const PositionScatterPlot = ({
  width,
  height,
  data,
}: PositionScatterPlotProps) => {
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

    const yAxisGenerator = d3.axisLeft(yScale).tickFormat(d3.format("0.0f")).ticks(max);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  const lineBuilder = d3
    .line<Team>()
    .x((d) => xScale(customTimeParser(d.seasonStart.toString()) as Date))
    .y((d) => yScale(d.position));

  const linePath = lineBuilder(data);

  if (!linePath) {
    return null;
  }

  const allCircles = data.map((d) => (
    <circle
      key={d.id}
      cx={xScale(customTimeParser(d.seasonStart.toString()) as Date)}
      cy={yScale(d.position)}
      r={5}
      fill="#00afef"
    />
  ));
  return (
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
  );
};
