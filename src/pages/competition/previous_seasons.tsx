import { useEffect, useState } from "react";
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
import { StackedBarplot } from "~/lib/components/statsGraphs/StackedBarplot";
import type { PastTeam } from "~/lib/types";

const PreviousSeasons = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartSize = useDimensions(chartRef);
  const [data, setData] = useState<PastTeam[]>([]);
  const [selectedData, setSelectedData] = useState<string>(
    "Union Tafers-Fribourg 1",
  );
  const [graphType, setGraphType] = useState<"points" | "wins">("wins");
  const [barplotType, setBarplotType] = useState<"set" | "games" | "match">(
    "set",
  );

  // fetch for the graph data
  useEffect(() => {
    fetch("/api/pastTeams")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          const statsData = data.data.map((data: PastTeam) => ({
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

  // filter settings
  const filteredData = data.filter((data) => {
    return selectedData.includes(data.name);
  });
  const filterOptions = [
    {
      value: "Union Tafers-Fribourg 1",
      label: "Union Tafers-Fribourg 1",
    },
    {
      value: "Union Tafers-Fribourg 2",
      label: "Union Tafers-Fribourg 2",
    },
    {
      value: "Union Tafers-Fribourg 3",
      label: "Union Tafers-Fribourg 3",
    },
    {
      value: "Union Tafers-Fribourg 4",
      label: "Union Tafers-Fribourg 4",
    },
    {
      value: "Union Tafers-Fribourg 5",
      label: "Union Tafers-Fribourg 5",
    },
    {
      value: "Union Tafers-Fribourg 6",
      label: "Union Tafers-Fribourg 6",
    },
    {
      value: "Union Tafers-Fribourg 7",
      label: "Union Tafers-Fribourg 7",
    },
    {
      value: "Union Tafers-Fribourg 8",
      label: "Union Tafers-Fribourg 8",
    },
    {
      value: "Union Tafers-Fribourg 9",
      label: "Union Tafers-Fribourg 9",
    },
  ];
  const filteredOptions = filterOptions.filter((option) =>
    selectedData.includes(option.value),
  );

  // filter heatmap data to only include the first 6 teams (to avoid cluttering the graph)
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
      <div className="w-full max-w-[1000px] shadow">
        <div className="max-h-max max-w-[1000px]  bg-white p-5">
          <h1 className="mb-2 bg-gradient-to-r from-picton-blue-600 to-picton-blue-500 bg-clip-text text-2xl font-bold text-transparent">
            Statistiques des saisons précédentes
          </h1>
          <div className="flex flex-col bg-white">
            <p className="mb-4">
              Vous trouverez ici les statistiques des saisons précédentes du BC
              Fribourg dépuis 2015. Utilisez les filtres pour voir les equipes
              et leurs performance de chaque saison!
            </p>
            <div className="flex flex-col">
              <Tabs defaultValue="positionScatterPlot">
                <div className="flex h-auto justify-center">
                  <TabsList className="mb-4 grid h-24 grid-cols-2 justify-center gap-1 md:flex md:h-12 md:gap-0 md:py-4">
                    <TabsTrigger
                      value="positionScatterPlot"
                      className="text-gray border-2 bg-gray-50 data-[state=active]:border-picton-blue-700 data-[state=inactive]:border-gray-200 data-[state=active]:bg-picton-blue-500 data-[state=active]:text-white md:rounded-l  md:rounded-r-none "
                    >
                      Position Scatter Plot
                    </TabsTrigger>
                    <TabsTrigger
                      value="leagueHeatmap"
                      className="text-gray border-2 bg-gray-50 data-[state=active]:border-picton-blue-700 data-[state=inactive]:border-gray-200 data-[state=active]:bg-picton-blue-500 data-[state=active]:text-white  md:rounded-none "
                    >
                      League Heatmap
                    </TabsTrigger>
                    <TabsTrigger
                      value="ratioScatterPlot"
                      className="text-gray border-2 bg-gray-50 data-[state=active]:border-picton-blue-700 data-[state=inactive]:border-gray-200 data-[state=active]:bg-picton-blue-500 data-[state=active]:text-white  md:rounded-none "
                    >
                      Ratio Scatter Plot
                    </TabsTrigger>
                    <TabsTrigger
                      value="ratioStackedBarplot"
                      className="text-gray border-2 bg-gray-50 data-[state=active]:border-picton-blue-700 data-[state=inactive]:border-gray-200 data-[state=active]:bg-picton-blue-500 data-[state=active]:text-white md:rounded-l-none  md:rounded-r "
                    >
                      Stacked Barplot
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent
                  value="positionScatterPlot"
                  className="mt-12 md:mt-0"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h3 className="text-lg font-bold">Position Scatter Plot</h3>
                    <p>
                      Ce graphique montre la position de chaque équipe dans leur
                      ligue respectif pour chaque saison. Une équipe en dernière
                      position pendant une saison va typiquement descendre dans
                      une ligue inférieure pour la saison suivante, tandis
                      qu&apos;une équipe en première place va typiquement étre
                      promu dans une ligue supérieure. Utilisez les filtres pour
                      choisir entre les équipes du BC Fribourg!
                    </p>

                    <Select
                      instanceId={"filter1"}
                      options={filterOptions}
                      closeMenuOnSelect={true}
                      onChange={(selectedOptions) => {
                        setSelectedData(selectedOptions!.value);
                      }}
                      value={filteredOptions}
                      placeholder="Filtrer par équipe"
                      className="mt-2 w-[300px]"
                      isSearchable={false}
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
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h3 className="text-lg font-bold">League Heatmap</h3>
                    <p>
                      Ce graphique montre dans quel ligue chaque équipe du BC
                      Fribourg a joué pour chaque saison. Une couleur plus
                      foncée indique une ligue plus élevée. Pour le moment il
                      existent les ligues nationales (NLA, NLB), les ligues
                      supérieurs (1, 2) et les ligues inférieures (3, 4).
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
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h3 className="text-lg font-bold">Ratio Scatter Plot</h3>
                    <p>
                      Ce graphique montre un ratio entre les matches gagné par
                      match joué et les points gagné par match joué pour chaque
                      équipe du BC Fribourg pour chaque saison. Clickez sur les
                      points pour en découvrir plus et utilisez les filtres pour
                      choisir entre les équipes du BC Fribourg!
                    </p>
                    <div className="flex flex-row gap-2">
                      <Select
                        instanceId={"filter2"}
                        options={filterOptions}
                        closeMenuOnSelect={true}
                        onChange={(selectedOptions) => {
                          setSelectedData(selectedOptions!.value);
                        }}
                        value={filteredOptions}
                        placeholder="Filtrer par équipe"
                        className="mt-2 w-[245px]"
                        isSearchable={false}
                      />
                      <Select
                        instanceId={"filter3"}
                        options={[
                          { value: "wins", label: "Victoires", color: "black" },
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
                            ? {
                                value: "wins",
                                label: "Victoires",
                                color: "black",
                              }
                            : {
                                value: "points",
                                label: "Points",
                                color: "black",
                              }
                        }
                        placeholder="Filtrer par équipe"
                        className="mt-2 w-[125px]"
                        isSearchable={false}
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
                  <div className="flex flex-col items-center justify-center gap-2">
                    <h3 className="text-lg font-bold">Stacked Barplot</h3>
                    <p>
                      Ce graphique montre les performances de chaque équipe du
                      BC Fribourg pour chaque saison. Vous pouvez choisir entre
                      les sets, les matches et les rencontres gagnés pour chaque
                      saison. Utilisez les filtres pour choisir entre les
                      équipes du BC Fribourg!
                    </p>
                    <div className="flex flex-row gap-2">
                      <Select
                        instanceId={"filter4"}
                        options={filterOptions}
                        closeMenuOnSelect={true}
                        onChange={(selectedOptions) => {
                          setSelectedData(selectedOptions!.value);
                        }}
                        value={filteredOptions}
                        placeholder="Filtrer par équipe"
                        className="mt-2 w-[250px]"
                        isSearchable={false}
                      />
                      <Select
                        instanceId={"filter5"}
                        options={[
                          { value: "set", label: "Set", color: "black" },
                          { value: "games", label: "Match", color: "black" },
                          {
                            value: "match",
                            label: "Rencontre",
                            color: "black",
                          },
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
                              ? {
                                  value: "games",
                                  label: "Match",
                                  color: "black",
                                }
                              : {
                                  value: "match",
                                  label: "Rencontre",
                                  color: "black",
                                }
                        }
                        placeholder="Filtrer par type"
                        className="mt-2 w-[120px]"
                        isSearchable={false}
                      />
                    </div>
                  </div>
                  <div
                    ref={chartRef}
                    className="h-[300px] w-full max-w-[1000px]"
                  >
                    <StackedBarplot
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

export default PreviousSeasons;
