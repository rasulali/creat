"use client";

import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import React from "react";

interface GoogleMapProps {
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ className }) => {
  const position = { lat: 40.38420035, lng: 49.83872574056028 };

  return (
    <div className={className}>
      <Map
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
        defaultZoom={15}
        defaultCenter={position}
      >
        <AdvancedMarker
          position={position}
          onClick={() => {
            window.open("https://maps.app.goo.gl/eRN5D4TGCibRiumn6", "_blank");
          }}
        >
          <img src="/logos/flower.svg" alt="Location marker" className="w-10 cursor-pointer" />
        </AdvancedMarker>
      </Map>

    </div>
  );
};

export default GoogleMap;
