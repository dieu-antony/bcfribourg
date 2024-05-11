"use client";

import { useEffect, useState } from "react";
import { Team } from "../api/teams/create";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/lib/components/ui/tabs";
import { PositionScatterPlot } from "~/lib/components/statsGraphs/PositionScatterPlot";
import { RatioScatterPlot } from "~/lib/components/statsGraphs/RatioScatterPlot";
import Select from "react-select";
import { useRef } from "react";
import { useDimensions } from "~/lib/hooks/useDimensions";
import { getLeagueFromId } from "~/lib/utils/utils";
import { LeagueHeatmap } from "~/lib/components/statsGraphs/LeagueHeatmap";
import { RatioStackedBarplot } from "~/lib/components/statsGraphs/RatioStackedBarplot";

const previous_seasons = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSize = useDimensions(chartRef);

  const [data, setData] = useState<Team[]>([]);
  const [filteredData, setFilteredData] = useState<Team[]>([]);
  const [selectedData, setSelectedData] = useState<string>(
    "Union Tafers-Fribourg 1",
  );
  const [graphType, setGraphType] = useState<"points" | "wins">("wins");
  const [barplotType, setBarplotType] = useState<"set" | "games" | "match">(
    "set",
  );

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
  useEffect(() => {
    if (selectedData.length > 0) {
      const filtered = data.filter((data) => selectedData.includes(data.name));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedData, data]);
  const filterOptions = [
    {
      value: "Union Tafers-Fribourg 1",
      label: "Union Tafers-Fribourg 1",
      color: "purple",
    },
    {
      value: "Union Tafers-Fribourg 2",
      label: "Union Tafers-Fribourg 2",
      color: "purple",
    },
    {
      value: "Union Tafers-Fribourg 3",
      label: "Union Tafers-Fribourg 3",
      color: "purple",
    },
    {
      value: "Union Tafers-Fribourg 4",
      label: "Union Tafers-Fribourg 4",
      color: "purple",
    },
    {
      value: "Union Tafers-Fribourg 5",
      label: "Union Tafers-Fribourg 5",
      color: "purple",
    },
    {
      value: "Union Tafers-Fribourg 6",
      label: "Union Tafers-Fribourg 6",
      color: "purple",
    },
    {
      value: "Union Tafers-Fribourg 7",
      label: "Union Tafers-Fribourg 7",
      color: "purple",
    },
    {
      value: "Union Tafers-Fribourg 8",
      label: "Union Tafers-Fribourg 8",
      color: "purple",
    },
    {
      value: "Union Tafers-Fribourg 9",
      label: "Union Tafers-Fribourg 9",
      color: "purple",
    },
  ];
  const filteredOptions = filterOptions.filter((option) =>
    selectedData.includes(option.value),
  );

  const heatmapData = data.filter((d) => {
    const teamName = d.name.toLowerCase();
    return (
      teamName === "union tafers-fribourg 1" ||
      teamName === "union tafers-fribourg 2" ||
      teamName === "union tafers-fribourg 3" ||
      teamName === "union tafers-fribourg 4" ||
      teamName === "union tafers-fribourg 5" ||
      teamName === "union tafers-fribourg 6"
    );
  });

  return (
    <div className="flex max-h-max min-h-max flex-col items-center justify-center pt-16">
      <div className="w-full  max-w-[1000px]">
        <div className="max-h-max max-w-[1000px]  bg-gray-100 p-5">
          <h1 className="mb-2 bg-gradient-to-r from-picton-blue-600 to-picton-blue-500 bg-clip-text text-2xl font-bold text-transparent">
            Statistiques des saisons précédentes
          </h1>
          <div className="flex flex-col bg-gray-100">
            <p className="mb-4">
              Vous trouverez ici les statistiques des saisons précédentes du BC
              Fribourg dépuis 2015. Utilisez les filtres pour voir les equipes
              et leurs performance de chaque saison!
            </p>
            <div className="flex flex-col">
              <Tabs defaultValue="positionScatterPlot">
                <div className="flex h-auto justify-center">
                  <TabsList className="grid grid-cols-2 justify-center gap-1 md:flex md:gap-0">
                    <TabsTrigger
                      value="positionScatterPlot"
                      className="text-gray border-2 bg-slate-200 data-[state=active]:border-picton-blue-700 data-[state=inactive]:border-gray-400 data-[state=active]:bg-picton-blue-500 data-[state=active]:text-white md:rounded-l  md:rounded-r-none "
                    >
                      Position Scatter Plot
                    </TabsTrigger>
                    <TabsTrigger
                      value="leagueHeatmap"
                      className="text-gray border-2 bg-slate-200 data-[state=active]:border-picton-blue-700 data-[state=inactive]:border-gray-400 data-[state=active]:bg-picton-blue-500 data-[state=active]:text-white  md:rounded-none "
                    >
                      League Heatmap
                    </TabsTrigger>
                    <TabsTrigger
                      value="ratioScatterPlot"
                      className="text-gray border-2 bg-slate-200 data-[state=active]:border-picton-blue-700 data-[state=inactive]:border-gray-400 data-[state=active]:bg-picton-blue-500 data-[state=active]:text-white  md:rounded-none "
                    >
                      Ratio Scatter Plot
                    </TabsTrigger>
                    <TabsTrigger
                      value="ratioStackedBarplot"
                      className="text-gray border-2 bg-slate-200 data-[state=active]:border-picton-blue-700 data-[state=inactive]:border-gray-400 data-[state=active]:bg-picton-blue-500 data-[state=active]:text-white md:rounded-l-none  md:rounded-r "
                    >
                      Ratio Stacked Barplot
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent
                  value="positionScatterPlot"
                  className="mt-12 md:mt-0"
                >
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-lg font-bold">Position Scatter Plot</h3>
                    <p>
                      This is the position scatter plot. It shows the position
                      of each team in the league for each season.
                    </p>

                    <Select
                      instanceId={"filter1"}
                      options={filterOptions}
                      closeMenuOnSelect={true}
                      onChange={(selectedOptions) => {
                        setSelectedData(selectedOptions?.value as string);
                      }}
                      value={filteredOptions}
                      placeholder="Filtrer par équipe"
                      className="mt-2 w-[300px]"
                    />
                  </div>
                  <div
                    ref={chartRef}
                    className="h-[300px] w-full max-w-[1000px]"
                  >
                    <PositionScatterPlot
                      width={chartSize.width}
                      height={chartSize.height}
                      data={filteredData}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="leagueHeatmap" className="mt-12 md:mt-0">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-lg font-bold">League Heatmap</h3>
                    <p>
                      This is the league heatmap. It shows the distribution of
                      teams in the league for each season.
                    </p>
                  </div>
                  <div
                    ref={chartRef}
                    className="h-[300px] w-full max-w-[1000px]"
                  >
                    <LeagueHeatmap
                      width={chartSize.width}
                      height={chartSize.height}
                      data={heatmapData}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="ratioScatterPlot" className="mt-12 md:mt-0">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-lg font-bold">Ratio Scatter Plot</h3>
                    <p>
                      This is the ratio scatter plot. It shows the ratio of each
                      team in the league for each season.
                    </p>
                    <div>
                      <Select
                        instanceId={"filter2"}
                        options={filterOptions}
                        closeMenuOnSelect={true}
                        onChange={(selectedOptions) => {
                          setSelectedData(selectedOptions?.value as string);
                        }}
                        value={filteredOptions}
                        placeholder="Filtrer par équipe"
                        className="mt-2 w-[200px]"
                      />
                      <Select
                        instanceId={"filter3"}
                        options={[
                          { value: "wins", label: "Wins", color: "black" },
                          { value: "points", label: "Points", color: "black" },
                        ]}
                        closeMenuOnSelect={true}
                        onChange={(selectedOptions) => {
                          if (selectedOptions?.value === "wins") {
                            setGraphType("wins");
                          } else {
                            setGraphType("points");
                          }
                        }}
                        value={
                          graphType === "wins"
                            ? { value: "wins", label: "Wins", color: "black" }
                            : {
                                value: "points",
                                label: "Points",
                                color: "black",
                              }
                        }
                        placeholder="Filtrer par équipe"
                        className="mt-2 w-[150px]"
                      />
                    </div>
                  </div>
                  <div
                    ref={chartRef}
                    className="h-[300px] w-full max-w-[1000px]"
                  >
                    <RatioScatterPlot
                      width={chartSize.width}
                      height={chartSize.height}
                      data={filteredData}
                      type={graphType}
                    />
                  </div>
                </TabsContent>
                <TabsContent
                  value="ratioStackedBarplot"
                  className="mt-12 md:mt-0"
                >
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="text-lg font-bold">Ratio Stacked Barplot</h3>
                    <p>
                      This is the ratio stacked barplot. It shows the ratio of
                      each team in the league for each season.
                    </p>
                    <Select
                      instanceId={"filter4"}
                      options={filterOptions}
                      closeMenuOnSelect={true}
                      onChange={(selectedOptions) => {
                        setSelectedData(selectedOptions?.value as string);
                      }}
                      value={filteredOptions}
                      placeholder="Filtrer par équipe"
                      className="mt-2 w-[300px]"
                    />
                    <Select
                      instanceId={"filter5"}
                      options={[
                        { value: "set", label: "Set", color: "black" },
                        { value: "games", label: "Games", color: "black" },
                        { value: "match", label: "Match", color: "black" },
                      ]}
                      closeMenuOnSelect={true}
                      onChange={(selectedOptions) => {
                        if (selectedOptions?.value === "set") {
                          setBarplotType("set");
                        } else if (selectedOptions?.value === "games") {
                          setBarplotType("games");
                        } else {
                          setBarplotType("match");
                        }
                      }}
                      value={
                        barplotType === "set"
                          ? { value: "set", label: "Set", color: "black" }
                          : barplotType === "games"
                            ? { value: "games", label: "Games", color: "black" }
                            : {
                                value: "match",
                                label: "Match",
                                color: "black",
                              }
                      }
                      placeholder="Filtrer par type"
                      className="mt-2 w-[150px]"
                    />
                  </div>
                  <div
                    ref={chartRef}
                    className="h-[300px] w-full max-w-[1000px]"
                  >
                    <RatioStackedBarplot
                      width={chartSize.width}
                      height={chartSize.height}
                      data={filteredData}
                      type={barplotType}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default previous_seasons;
