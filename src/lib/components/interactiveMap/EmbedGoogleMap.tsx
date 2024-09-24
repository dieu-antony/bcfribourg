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
    let map: google.maps.Map | null = null;

    const initMap = async () => {
      const loader = new Loader({
        apiKey: env.NEXT_PUBLIC_GOOGLE_API_KEY,
        version: "weekly",
      });
      const { Map } = await loader.importLibrary("maps");
      await loader.importLibrary("marker");
      const position: google.maps.LatLngLiteral = { lat: latitude, lng: longitude };
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: "f1b7b3b3b1b7b3b3",
      };
      map = new Map(mapRef.current as HTMLElement, mapOptions);

      new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: position,
      });
    };

    initMap().catch((error) => {
      console.error(error);
    });

    return () => {
      if (map) {
        google.maps.event.clearInstanceListeners(map); 
        map = null;
      }
    };
  }, [latitude, longitude, mapRef]);
  
  return <div className={className} ref={mapRef} />;
};
