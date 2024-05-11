import { getLeagueFromId } from "~/lib/utils/utils";
import {
  CardContent,
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Team } from "~/pages/api/teams/create";

export type InteractionData = {
  xPos: number;
  yPos: number;
  data: Team;
};

type ScatterPlotTooltipProps = {
  interactionData: InteractionData | null;
};

export const ScatterPlotTooltip = ({
  interactionData,
}: ScatterPlotTooltipProps) => {
  if (!interactionData) {
    return null;
  }

  return (
    <div
      className="absolute w-60 translate-x-4 -translate-y-1/2 z-50"
      style={{
        left: interactionData.xPos+"px",
        top: interactionData.yPos+"px",
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>
            {interactionData.data.seasonStart} -{" "}
            {interactionData.data.seasonStart + 1}
          </CardTitle>
          <CardDescription>Joué en ligue: {getLeagueFromId(interactionData.data.leagueId)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="flex flex-col">
            <span>{interactionData.data.name}</span>
            <span>Victoires: {interactionData.data.wins}</span>
            <span>Défaites: {interactionData.data.losses}</span>
            <span>Égalités: {interactionData.data.ties}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
