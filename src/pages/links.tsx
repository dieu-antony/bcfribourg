import { useEffect, useRef, useState } from "react";
import { useDimensions } from "~/lib/hooks/useDimensions";
import { Team } from "./api/teams/create";
import { getLeagueFromId } from "~/lib/utils/utils";
import { RatioScatterPlot } from "~/lib/components/statsGraphs/RatioScatterPlot";

const links = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSize = useDimensions(chartRef);
  const [data, setData] = useState<Team[]>([]);
  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          const statsData = data.data.map((data: Team) => ({
            ...data,
            name: data.name,
            position: data.position,
            wins: data.wins,
            losses: data.losses,
            ties: data.ties,
            points: data.points,
            matchRecord: data.matchRecord,
            setRecord: data.setRecord,
            gamesRecord: data.gamesRecord,
            seasonStart: data.seasonStart,
            league: getLeagueFromId(data.leagueId),
            url: data.url,
          }));
          setData(statsData);
        }
      });
  }, []);
  return (
    <div ref={chartRef} style={{ width: "100%", height: 400 }}>
      <RatioScatterPlot
        width={chartSize.width}
        height={chartSize.height}
        type="points"
        data={data}
      />
    </div>
  );
};

export default links;
