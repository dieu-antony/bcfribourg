import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { env } from "~/env.js";

type EmbedGoogleMapProps = {
  longitude: number;
  latitude: number;
  className?: string;
};
export const EmbedGoogleMap = ({
  longitude,
  latitude,
  className,
}: EmbedGoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey:
          /*env.NEXT_PUBLIC_GOOGLE_API_KEY as string*/ "Insert your Google API key here",
        version: "weekly",
      });
      const { Map } = await loader.importLibrary("maps");
      const { Marker } = (await loader.importLibrary(
        "marker",
      )) as google.maps.MarkerLibrary;
      const position = { lat: latitude, lng: longitude };
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: "f1b7b3b3b1b7b3b3",
      };
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: position,
      });
    };
    initMap();
  }, [latitude, longitude]);
  return <div className={className} ref={mapRef} />;
};
