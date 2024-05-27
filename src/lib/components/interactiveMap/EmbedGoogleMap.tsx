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
        apiKey: env.NEXT_PUBLIC_GOOGLE_API_KEY,
        version: "weekly",
      });
      const { Map } = await loader.importLibrary("maps");
      await loader.importLibrary("marker");
      const position = { lat: latitude, lng: longitude };
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: "f1b7b3b3b1b7b3b3",
      };
      const map = new Map(mapRef.current!, mapOptions);

      new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: position,
      });
    };
    void initMap().catch((error) => {
      console.error(error);
    });
  }, [latitude, longitude]);
  return <div className={className} ref={mapRef} />;
};
