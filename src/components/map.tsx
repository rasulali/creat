"use client";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GoogleMapProvider } from "./googleMapProvider";
import Link from "next/link";

interface GoogleMapProps {
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false);
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
            onClick={() => setIsHovered(!isHovered)}
            position={position}
          >
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const cardArea = {
                  left: rect.left - 50,
                  right: rect.right + 50,
                  top: rect.top - 100,
                  bottom: rect.bottom,
                };

                if (
                  e.clientX < cardArea.left ||
                  e.clientX > cardArea.right ||
                  e.clientY < cardArea.top ||
                  e.clientY > cardArea.bottom
                ) {
                  setIsHovered(false);
                }
              }}
            >
              <img
                src="/logos/flower.svg"
                alt="Location marker"
                className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110"
              />

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 pointer-events-auto z-10"
                    onMouseLeave={(e) => {
                      const flowerContainer =
                        e.currentTarget.parentElement?.parentElement;
                      if (flowerContainer) {
                        const rect = flowerContainer.getBoundingClientRect();
                        const extendedArea = {
                          left: rect.left - 10,
                          right: rect.right + 10,
                          top: rect.top - 10,
                          bottom: rect.bottom + 30,
                        };

                        if (
                          e.clientX < extendedArea.left ||
                          e.clientX > extendedArea.right ||
                          e.clientY < extendedArea.top ||
                          e.clientY > extendedArea.bottom
                        ) {
                          setIsHovered(false);
                        }
                      } else {
                        setIsHovered(false);
                      }
                    }}
                  >
                    <Link
                      href="https://maps.app.goo.gl/eRN5D4TGCibRiumn6"
                      aria-label="View on Google Maps"
                      target="_blank"
                      className="bg-white block rounded-lg shadow-lg border border-gray-200 p-3 min-w-max max-w-xs cursor-pointer hover:shadow-xl transition-shadow duration-200"
                    >
                      <div className="relative">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            <Image
                              src="/vurgun.webp"
                              alt="Vurgun Residence Building"
                              width={64}
                              height={64}
                              className="rounded-md object-cover"
                              priority
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="md:text-lg font-medium hover:text-creatBright transition-colors text-gray-800 leading-none text-sm">
                              Vurgun Residence Building <br />
                              Samad Vurgun st. 110
                              <br />
                            </p>
                          </div>
                        </div>

                        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                          <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200 absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-px"></div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </AdvancedMarker>
        </Map>
      </GoogleMapProvider>
    </div>
  );
};

export default GoogleMap;
