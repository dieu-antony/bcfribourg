import { useMemo } from "react";
import * as d3 from "d3";
import {
  getLeagueFromId,
  abbreviateTeamName,
  turnLeagueToNumber,
} from "~/lib/utils/utils";
import type { PastTeam } from "~/lib/types";

// Predefined margins
const margin = { top: 20, right: 20, bottom: 30, left: 50 };

type HeatmapProps = { data: PastTeam[]; width: number; height: number };

export const LeagueHeatmap = ({ data, width, height }: HeatmapProps) => {
  // Define the bounds
  const boundsWidth = width - margin.right - margin.left;
  const boundsHeight = height - margin.top - margin.bottom;

  // Define the groups for the x and y axis
  const allXGroups = useMemo(
    () => [...new Set(data.map((d) => d.name))],
    [data],
  );
  const allYGroups = useMemo(
    () => [...new Set(data.map((d) => d.seasonStart.toString()))],
    [data],
  );

  // Define the scales for the axes
  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(0.01);
  }, [allXGroups, boundsWidth]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.01);
  }, [allYGroups, boundsHeight]);

  // Define the maximum and minimum values for the color scale
  const [min, max] = d3.extent(
    data.map((d) => parseInt(turnLeagueToNumber(getLeagueFromId(d.leagueId)))),
  );
  if (!min || !max) {
    return null;
  }

  const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateYlOrRd)
    .domain([90 - min, 90 - max]);

  // Define the rectangles
  const allRects = data.map((d, i) => {
    return (
      <g key={i}>
        <rect
          r={4}
          x={xScale(d.name)}
          y={yScale(d.seasonStart.toString())}
          width={xScale.bandwidth()}
          height={yScale.bandwidth()}
          opacity={1}
          fill={colorScale(
            parseInt(turnLeagueToNumber(getLeagueFromId(d.leagueId))),
          )}
          rx={5}
          stroke={"white"}
        />
        <text
          className="z-50"
          x={(xScale(d.name) ?? 0) + xScale.bandwidth() / 2}
          y={(yScale(d.seasonStart.toString()) ?? 0) + yScale.bandwidth() / 2}
          width={xScale.bandwidth()}
          height={yScale.bandwidth()}
          textAnchor="middle"
          alignmentBaseline="middle"
          fill={colorScale(
            90 - parseInt(turnLeagueToNumber(getLeagueFromId(d.leagueId))),
          )}
        >
          {getLeagueFromId(d.leagueId)}
        </text>
      </g>
    );
  });

  // Define the labels for the axes
  const xLabels = allXGroups.map((name, i) => {
    const xPos = xScale(name) ?? 0;
    return (
      <text
        key={i + "text2"}
        x={xPos + xScale.bandwidth() / 2}
        y={boundsHeight + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={15}
      >
        {abbreviateTeamName(name)}
      </text>
    );
  });

  const yLabels = allYGroups.map((name, i) => {
    const yPos = yScale(name) ?? 0;
    return (
      <text
        key={i + "text3"}
        x={-5}
        y={yPos + yScale.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={15}
      >
        {name}
      </text>
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
          {allRects}
          {xLabels}
          {yLabels}
        </g>
      </svg>
    </div>
  );
};
