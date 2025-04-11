"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import React from "react";

interface GoogleMapProviderProps {
  children: React.ReactNode;
}

export function GoogleMapProvider({ children }: GoogleMapProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error("Google Maps API key is not defined. Please check your .env.local file.");
  }

  return (
    <APIProvider
      apiKey={apiKey} libraries={["places", "maps", "marker"]}>
      {children}
    </APIProvider>
  );
}
