import { Team } from "~/pages/api/teams/create";
import { useMemo } from "react";
import * as d3 from "d3";
import { getLeagueFromId } from "~/lib/utils/utils";
import { abbreviateTeamName } from "~/lib/utils/utils";

const margin = { top: 20, right: 20, bottom: 30, left: 50 };

type HeatmapProps = { data: Team[]; width: number; height: number };

export const LeagueHeatmap = ({ data, width, height }: HeatmapProps) => {
  const boundsWidth = width - margin.right - margin.left;
  const boundsHeight = height - margin.top - margin.bottom;

  const allXGroups = useMemo(
    () => [...new Set(data.map((d) => d.name))],
    [data],
  );
  const allYGroups = useMemo(
    () => [...new Set(data.map((d) => d.seasonStart.toString()))],
    [data],
  );

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(0.01);
  }, [data, width]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.01);
  }, [data, height]);

  function turnLeagueToNumber(league: string) {
    switch (league) {
      case "A":
        return "10";
      case "B":
        return "20";
      case "C":
        return "30";
      case "1":
        return "40";
      case "2":
        return "50";
      case "3":
        return "60";
      case "4":
        return "70";
      case "5":
        return "80";
      default:
        return "0";
    }
  }
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
