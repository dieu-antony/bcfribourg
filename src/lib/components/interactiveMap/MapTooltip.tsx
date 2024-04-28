import {
  CardContent,
  CardFooter,
  CardHeader,
  Card,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { EmbedGoogleMap } from "./EmbedGoogleMap";
export type InteractionData = {
  xPos: number;
  yPos: number;
  location: string;
};

type MapTooltipProps = {
  interactionData: InteractionData | null;
};

export const MapTooltip = ({ interactionData }: MapTooltipProps) => {
  if (!interactionData) {
    return null;
  }

  return (
    <div
      className=" border border-black bg-white"
      style={{
        left: interactionData.xPos,
        top: interactionData.yPos,
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>

          {interactionData.location}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
      
    </div>
  );
};
