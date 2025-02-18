"use client";
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = React.memo(
  ({ className, highPerformanceOverride }: { className?: string, highPerformanceOverride?: boolean }) => {
    const isLowPowerDevice = useCallback(() => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      const hasLimitedCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;

      const hasLimitedMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;

      const isDataSaver = (navigator as any).connection &&
        (navigator as any).connection.saveData === true;

      return isMobile || hasLimitedCores || hasLimitedMemory || isDataSaver;
    }, []);

    const [isLowPower, setIsLowPower] = useState(false);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        setIsLowPower(isLowPowerDevice());
      }
    }, [isLowPowerDevice]);

    const shouldOptimize = highPerformanceOverride === undefined ? isLowPower : !highPerformanceOverride;

    const pathsCount = shouldOptimize ? 5 : 15;
    const animationDuration = shouldOptimize ? 10 : 5;
    const opacityValue = shouldOptimize ? 0.3 : 0.4;

    const [paths, setPaths] = useState<string[]>([]);

    useEffect(() => {
      const generatedPaths = [];
      for (let i = 0; i < pathsCount; i++) {
        const index = Math.floor(i * (50 / pathsCount));
        if (index < 50) {
          generatedPaths.push(`M-${380 - (7 * index)} -${189 + (8 * index)}C-${380 - (7 * index)} -${189 + (8 * index)} -${312 - (7 * index)} ${216 - (8 * index)} ${152 + (7 * index)} ${343 - (8 * index)}C${616 + (7 * index)} ${470 - (8 * index)} ${684 + (7 * index)} ${875 - (8 * index)} ${684 + (7 * index)} ${875 - (8 * index)}`);
        }
      }
      setPaths(generatedPaths);
    }, [pathsCount]);

    const getAnimationProps = (index: number) => {
      if (shouldOptimize) {
        return {
          animate: { pathLength: 1 },
          transition: {
            duration: animationDuration + (index % 3),
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "linear",
            delay: index,
          }
        };
      }

      return {
        initial: { pathLength: 0 },
        animate: { pathLength: 1 },
        transition: {
          duration: animationDuration + (index % 5),
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut",
          delay: index * 0.5,
        }
      };
    };

    return (
      <div
        className={cn(
          "absolute h-full w-full inset-0 [mask-size:40px] [mask-repeat:no-repeat] flex items-center justify-center",
          className
        )}
      >
        <svg
          className="z-0 h-full w-full pointer-events-none absolute"
          width="100%"
          height="100%"
          viewBox="0 0 696 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875"
            stroke="url(#paint0_radial_242_278)"
            strokeOpacity="0.05"
            strokeWidth="0.5"
          ></path>

          {paths.map((path, index) => (
            <motion.path
              key={`path-${index}`}
              d={path}
              stroke={`url(#linearGradient-${index})`}
              strokeOpacity={opacityValue}
              strokeWidth="0.5"
              {...getAnimationProps(index)}
            ></motion.path>
          ))}

          <defs>
            {paths.map((_, index) => (
              <motion.linearGradient
                id={`linearGradient-${index}`}
                key={`gradient-${index}`}
                gradientUnits="userSpaceOnUse"
                animate={{
                  gradientTransform: shouldOptimize
                    ? ["rotate(0)", "rotate(180)"]
                    : ["rotate(0)", "rotate(360)"]
                }}
                transition={{
                  duration: shouldOptimize ? 30 : (20 + (index % 10)),
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <stop stopColor="#18CCFC" stopOpacity="0"></stop>
                <stop offset="0.3" stopColor="#18CCFC"></stop>
                <stop offset="0.6" stopColor="#6344F5"></stop>
                <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
              </motion.linearGradient>
            ))}

            <radialGradient
              id="paint0_radial_242_278"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
            >
              <stop offset="0.0666667" stopColor="var(--neutral-300)"></stop>
              <stop offset="0.243243" stopColor="var(--neutral-300)"></stop>
              <stop offset="0.43594" stopColor="white" stopOpacity="0"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>
    );
  }
);

BackgroundBeams.displayName = "BackgroundBeams";
