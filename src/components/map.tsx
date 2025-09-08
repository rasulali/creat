"use client";

import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import React from "react";
import { GoogleMapProvider } from "./googleMapProvider";

interface GoogleMapProps {
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ className }) => {
  const position = { lat: 40.38420035, lng: 49.83872574056028 };

  return (
    <div className={className}>
      <GoogleMapProvider>
        <Map
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          defaultZoom={16}
          defaultCenter={position}
          fullscreenControl={false}
          streetViewControl={false}
          cameraControl={false}
          keyboardShortcuts={false}
          zoomControl={false}
          clickableIcons={false}
          mapTypeControl={false}
        >
          <AdvancedMarker
            position={position}
            onClick={() => {
              window.open(
                "https://maps.app.goo.gl/eRN5D4TGCibRiumn6",
                "_blank",
              );
            }}
          >
            <img
              src="/logos/flower.svg"
              alt="Location marker"
              className="w-6 cursor-pointer"
            />
          </AdvancedMarker>
        </Map>
      </GoogleMapProvider>
    </div>
  );
};

export default GoogleMap;
