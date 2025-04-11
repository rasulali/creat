"use client";

import { Map, Marker } from "@vis.gl/react-google-maps";
import React from "react";

interface GoogleMapProps {
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ className }) => {
  const darkMinimalistStyle = [
    {
      featureType: "all",
      elementType: "geometry",
      stylers: [{ color: "#081731" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#000000" }, { lightness: 13 }],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ visibility: "off" }], // administrative boundaries
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [{ visibility: "off" }], // points of interest
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#2c2c2c" }, { lightness: 50 }],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [{ visibility: "on" }], // road labels
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#0e1a30" }],
    },
    {
      featureType: "water",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

  const position = { lat: 40.38420035, lng: 49.83872574056028 };

  return (
    <div className={className}>
      <Map
        defaultZoom={15}
        defaultCenter={position}
        gestureHandling="cooperative"
        disableDefaultUI={true}
        styles={darkMinimalistStyle} // Fallback styles
        mapTypeControl={false}
        fullscreenControl={false}
        streetViewControl={false}
        rotateControl={false}
        scaleControl={false}
        zoomControl={true}
        keyboardShortcuts={false}
        scrollwheel={true}
        noClear={false}
        disableDoubleClickZoom={false}
        backgroundColor="#1a1a1a"
      >
        <Marker position={position} />
      </Map>
    </div>
  );
};

export default GoogleMap;
