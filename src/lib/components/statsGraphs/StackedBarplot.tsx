import { PastTeam } from "~/pages/api/pastTeams/create";
import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

import { getWinLossRecord } from "~/lib/utils/utils";

const margin = { top: 30, right: 30, bottom: 50, left: 50 };

type StackedBarplotProps = {
  width: number;
  height: number;
  type: "set" | "games" | "match";
  data: PastTeam[];
};

export type TeamWithRatioKey = { seasonStart: number } & { won: number } & {
  lost: number;
} & {
  [key: string]: number;
};

export const StackedBarplot = ({
  data,
  width,
  height,
  type,
}: StackedBarplotProps) => {
  const axesRef = useRef(null);
  const boundsWidth = width - margin.right - margin.left;
  const boundsHeight = height - margin.top - margin.bottom;

  let updatedData: TeamWithRatioKey[] = [];
  let max = 1;

  if (type === "set") {
    updatedData = data.map((d) => {
      const record = getWinLossRecord(d.setRecord);
      return {
        seasonStart: d.seasonStart,
        won: record.won,
        lost: record.lost,
      } as TeamWithRatioKey;
    });
    max = d3.extent(updatedData, (d) => d.won + d.lost)?.[1] ?? 0;
  } else if (type === "games") {
    updatedData = data.map((d) => {
      const record = getWinLossRecord(d.gamesRecord);
      return {
        seasonStart: d.seasonStart,
        won: record.won,
        lost: record.lost,
      } as TeamWithRatioKey;
    });
    max = d3.extent(updatedData, (d) => d.won + d.lost)?.[1] ?? 0;
  } else if (type === "match") {
    updatedData = data.map((d) => {
      const record = getWinLossRecord(d.matchRecord);
      return {
        seasonStart: d.seasonStart,
        won: record.won,
        lost: record.lost,
      } as TeamWithRatioKey;
    });
    max = d3.extent(updatedData, (d) => d.won + d.lost)?.[1] ?? 0;
  }

  const allGroups = data.map((d) => String(d.seasonStart));
  const allSubgroups = ["lost","won"];

  // Data Wrangling: stack the data
  const stackSeries = d3.stack().keys(allSubgroups).order(d3.stackOrderNone);
  //.offset(d3.stackOffsetNone);
  const series = stackSeries(updatedData);

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, max || 0])
      .range([boundsHeight, 0]);
  }, [data, type, height]);

  // X axis
  const xScale = useMemo(() => {
    return d3
      .scaleBand<string>()
      .domain(allGroups)
      .range([0, boundsWidth])
      .padding(0.05);
  }, [data, type, width]);

  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(allGroups)
    .range(["#dc2626", "#22c55e"]);

  useEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  const rectangles = series.map((subgroup, i) => {
    return (
      <g key={i}>
        {subgroup.map((group, j) => {
          return (
            <g key={j}>
            <rect
              key={j}
              x={xScale(group.data.seasonStart?.toString() ?? "")}
              y={yScale(group[1])}
              height={yScale(group[0]) - yScale(group[1])}
              width={xScale.bandwidth()}
              fill={colorScale(subgroup.key)}
              opacity={0.9}
            ></rect>
            <text
              x={xScale(group.data.seasonStart?.toString() ?? "")}
              y={yScale(group[1])}
              dy={20}
              dx={xScale.bandwidth() / 2}
              textAnchor="middle"
              fill="black">
              {group.data[subgroup.key] === 0 ? "" : group.data[subgroup.key]}
              </text>
            </g>
          );
        })}
      </g>
    );
  });
  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[margin.left, margin.top].join(",")})`}
        >
          {rectangles}
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[margin.left, margin.top].join(",")})`}
        />
      </svg>
    </div>
  );
};
