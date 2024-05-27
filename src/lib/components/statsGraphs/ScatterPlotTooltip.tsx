import { getLeagueFromId } from "~/lib/utils/utils";
import {
  CardContent,
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
} from "../ui/card";
import type { PastTeam } from "~/lib/types";

export type InteractionData = {
  xPos: number;
  yPos: number;
  data: PastTeam;
  orientation: "left" | "right";
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

  if (interactionData.orientation === "right") {
    return (
      <div
        className="absolute z-50 w-40 -translate-y-1/2 translate-x-4 md:w-60"
        style={{
          left: interactionData.xPos + "px",
          top: interactionData.yPos + "px",
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-2xl">
              {interactionData.data.seasonStart} -{" "}
              {interactionData.data.seasonStart + 1}
            </CardTitle>
            <CardDescription className="text-sm">
              Joué en ligue: {getLeagueFromId(interactionData.data.leagueId)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="flex flex-col text-sm md:text-base">
              <span className="font-semibold">{interactionData.data.name}</span>
              <span>Victoires: {interactionData.data.wins}</span>
              <span>Défaites: {interactionData.data.losses}</span>
              <span>Égalités: {interactionData.data.ties}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <div
        className="absolute z-50 w-40 -translate-x-44 -translate-y-1/2 md:w-60 md:-translate-x-64"
        style={{
          left: interactionData.xPos + "px",
          top: interactionData.yPos + "px",
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-2xl">
              {interactionData.data.seasonStart} -{" "}
              {interactionData.data.seasonStart + 1}
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Joué en ligue: {getLeagueFromId(interactionData.data.leagueId)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="flex flex-col text-sm md:text-base">
              <span className="font-semibold">{interactionData.data.name}</span>
              <span>Victoires: {interactionData.data.wins}</span>
              <span>Défaites: {interactionData.data.losses}</span>
              <span>Égalités: {interactionData.data.ties}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
};
