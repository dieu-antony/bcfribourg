import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

import { getWinLossRecord } from "~/lib/utils/utils";
import type { PastTeamProps, TeamWithRatioKey } from "~/lib/types";
import { animated, useSprings } from "@react-spring/web";

// Predefined margins
const margin = { top: 30, right: 30, bottom: 50, left: 50 };

type StackedBarplotProps = {
  width: number;
  height: number;
  type: "set" | "games" | "match";
  data: PastTeamProps[];
};

export const StackedBarplot = ({
  data,
  width,
  height,
  type,
}: StackedBarplotProps) => {
  // Ref for the axes and define the bounds
  const axesRef = useRef(null);
  const boundsWidth = width - margin.right - margin.left;
  const boundsHeight = height - margin.top - margin.bottom;

  // Use the type to determine the data to display
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

  // Get all the groups and subgroups for the stacks
  const allGroups = data.map((d) => String(d.seasonStart));
  const allSubgroups = ["lost", "won"];

  // Data Wrangling: stack the data
  const stackSeries = d3.stack().keys(allSubgroups).order(d3.stackOrderNone);
  const series = stackSeries(updatedData);

  // define scales using useMemo to avoid recalculating on every render
  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, max || 0])
      .range([boundsHeight, 0]);
  }, [max, boundsHeight]);

  const xScale = useMemo(() => {
    return d3
      .scaleBand<string>()
      .domain(allGroups)
      .range([0, boundsWidth])
      .padding(0.05);
  }, [allGroups, boundsWidth]);

  // Define the color scale for the stacks
  const colorScale = d3
    .scaleOrdinal<string>()
    .domain(allGroups)
    .range(["#22c55e", "#dc2626"]);

  // Draw the axes
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

  // Compute the springs for the rectangles outside the mapping function
  const springs = useSprings(
    series.flat().length,
    series.flat().map((group) => ({
      to: {
        x: xScale(group.data.seasonStart?.toString() ?? ""),
        y: yScale(group[1]),
        height: yScale(group[0]) - yScale(group[1]),
        width: xScale.bandwidth(),
        dx: xScale.bandwidth() / 2,
      },
      config: {
        friction: 20,
        mass: 1,
      },
    })),
  );

  // Draw the bars using react-spring library for animations
  let springIndex = 0; // Track the index manually
  const rectangles = series.map((subgroup, i) => (
    <g key={i}>
      {subgroup.map((group, j) => {
        const spring = springs[springIndex++];
        return (
          <g key={j}>
            <animated.rect
              x={spring?.x}
              y={spring?.y}
              height={spring?.height}
              width={spring?.width}
              fill={colorScale(subgroup.key)}
              opacity={0.9}
            ></animated.rect>
            <animated.text
              x={spring?.x}
              y={spring?.y}
              dy={20}
              dx={spring?.dx}
              textAnchor="middle"
              fill="black"
            >
              {group.data[subgroup.key] === 0 ? "" : group.data[subgroup.key]}
            </animated.text>
          </g>
        );
      })}
    </g>
  ));

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
