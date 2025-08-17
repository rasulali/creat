import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { createProjectSlug } from "@/lib/helperFunctions";

interface ProjectAnimatedWawesProps {
  project: any;
  categories: any;
  projectHover: number;
  setProjectHover: (id: number) => void;
  imageurl: string;
}

const WAVE_PATHS = {
  layer1: [
    "M0 35L21.5 37C43 39 86 43 128.8 41C171.7 39 214.3 31 257.2 33C300 35 343 47 385.8 49C428.7 51 471.3 43 514.2 41C557 39 600 43 642.8 47C685.7 51 728.3 55 771.2 53C814 51 857 43 878.5 39L900 35L900 120L0 120Z",
    "M0 42L21.5 35C43 28 86 14 128.8 18C171.7 22 214.3 44 257.2 48C300 52 343 38 385.8 32C428.7 26 471.3 28 514.2 32C557 36 600 42 642.8 38C685.7 34 728.3 20 771.2 24C814 28 857 52 878.5 54L900 56L900 120L0 120Z",
    "M0 48L21.5 46C43 44 86 40 128.8 42C171.7 44 214.3 52 257.2 50C300 48 343 36 385.8 40C428.7 44 471.3 56 514.2 54C557 52 600 36 642.8 34C685.7 32 728.3 44 771.2 48C814 52 857 48 878.5 46L900 44L900 120L0 120Z",
  ],
  layer2: [
    "M0 58L21.5 56C43 54 86 50 128.8 52C171.7 54 214.3 62 257.2 60C300 58 343 46 385.8 50C428.7 54 471.3 66 514.2 64C557 62 600 46 642.8 44C685.7 42 728.3 54 771.2 58C814 62 857 58 878.5 56L900 54L900 120L0 120Z",
    "M0 52L21.5 60C43 66 86 78 128.8 74C171.7 70 214.3 50 257.2 46C300 42 343 54 385.8 60C428.7 66 471.3 66 514.2 62C557 58 600 50 642.8 54C685.7 58 728.3 74 771.2 70C814 66 857 42 878.5 40L900 38L900 120L0 120Z",
    "M0 64L21.5 62C43 60 86 56 128.8 58C171.7 60 214.3 68 257.2 66C300 64 343 52 385.8 56C428.7 60 471.3 72 514.2 70C557 68 600 52 642.8 50C685.7 48 728.3 60 771.2 64C814 68 857 64 878.5 62L900 60L900 120L0 120Z",
  ],
  layer3: [
    "M0 78L21.5 76C43 74 86 70 128.8 72C171.7 74 214.3 82 257.2 80C300 78 343 66 385.8 70C428.7 74 471.3 86 514.2 84C557 82 600 66 642.8 64C685.7 62 728.3 74 771.2 78C814 82 857 78 878.5 76L900 74L900 120L0 120Z",
    "M0 72L21.5 80C43 86 86 98 128.8 94C171.7 90 214.3 70 257.2 66C300 62 343 74 385.8 80C428.7 86 471.3 86 514.2 82C557 78 600 70 642.8 74C685.7 78 728.3 94 771.2 90C814 86 857 62 878.5 60L900 58L900 120L0 120Z",
    "M0 84L21.5 82C43 80 86 76 128.8 78C171.7 80 214.3 88 257.2 86C300 84 343 72 385.8 76C428.7 80 471.3 92 514.2 90C557 88 600 72 642.8 70C685.7 68 728.3 80 771.2 84C814 88 857 84 878.5 82L900 80L900 120L0 120Z",
  ],
  layer4: [
    "M0 92L21.5 90C43 88 86 84 128.8 86C171.7 88 214.3 96 257.2 94C300 92 343 80 385.8 84C428.7 88 471.3 100 514.2 98C557 96 600 80 642.8 78C685.7 76 728.3 88 771.2 92C814 96 857 92 878.5 90L900 88L900 120L0 120Z",
    "M0 86L21.5 94C43 100 86 112 128.8 108C171.7 104 214.3 84 257.2 80C300 76 343 88 385.8 94C428.7 100 471.3 100 514.2 96C557 92 600 84 642.8 88C685.7 92 728.3 108 771.2 104C814 100 857 76 878.5 74L900 72L900 120L0 120Z",
    "M0 98L21.5 96C43 94 86 90 128.8 92C171.7 94 214.3 102 257.2 100C300 98 343 86 385.8 90C428.7 94 471.3 106 514.2 104C557 102 600 86 642.8 84C685.7 82 728.3 94 771.2 98C814 102 857 98 878.5 96L900 94L900 120L0 120Z",
  ],
};

const WAVE_LAYERS = [
  {
    paths: WAVE_PATHS.layer1,
    fill: "gradient",
    opacity: 1,
    duration: 7,
    delay: 0,
  },
  {
    paths: WAVE_PATHS.layer2,
    fill: "#053478",
    opacity: 0.75,
    duration: 9,
    delay: 1.2,
  },
  {
    paths: WAVE_PATHS.layer3,
    fill: "#062553",
    opacity: 0.6,
    duration: 11,
    delay: 2.5,
  },
  {
    paths: WAVE_PATHS.layer4,
    fill: "#072047",
    opacity: 0.45,
    duration: 13,
    delay: 3.8,
  },
];

const GRADIENT_STOPS = [
  { offset: "0%", color: "#0c3d91", opacity: 0.95 },
  { offset: "12.5%", color: "#073884", opacity: 0.9 },
  { offset: "25%", color: "#053478", opacity: 0.85 },
  { offset: "37.5%", color: "#052f6b", opacity: 0.8 },
  { offset: "50%", color: "#052a5f", opacity: 0.85 },
  { offset: "62.5%", color: "#062553", opacity: 0.9 },
  { offset: "75%", color: "#072047", opacity: 0.92 },
  { offset: "87.5%", color: "#081c3c", opacity: 0.95 },
  { offset: "100%", color: "#081731", opacity: 0.98 },
];

const WaveLayer = React.memo(
  ({
    layer,
    projectId,
    index,
  }: {
    layer: any;
    projectId: string;
    index: number;
  }) => (
    <motion.path
      d={layer.paths[0]}
      fill={
        layer.fill === "gradient"
          ? `url(#waveGradient-${projectId})`
          : layer.fill
      }
      opacity={layer.opacity}
      filter={`url(#blur-${projectId})`}
      animate={{ d: [...layer.paths, layer.paths[0]] }}
      transition={{
        duration: layer.duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        delay: layer.delay,
      }}
    />
  ),
);

WaveLayer.displayName = "WaveLayer";

const ProjectAnimatedWawes = ({
  project,
  categories,
  projectHover,
  setProjectHover,
  imageurl,
}: ProjectAnimatedWawesProps) => {
  const projectId = String(project?.id);
  const isHovered = projectHover === project?.id;
  const categoryName = categories?.[project?.category]?.name;

  const gradientStops = useMemo(
    () =>
      GRADIENT_STOPS.map((stop, index) => (
        <stop
          key={index}
          offset={stop.offset}
          stopColor={stop.color}
          stopOpacity={stop.opacity}
        />
      )),
    [],
  );

  const waveLayers = useMemo(
    () =>
      WAVE_LAYERS.map((layer, index) => (
        <WaveLayer
          key={index}
          layer={layer}
          projectId={projectId}
          index={index}
        />
      )),
    [projectId],
  );

  return (
    <motion.div
      onHoverStart={() => setProjectHover(project.id)}
      onHoverEnd={() => setProjectHover(-1)}
      className="rounded-2xl overflow-hidden max-w-[600px]"
    >
      <Link
        href={`/projects/${createProjectSlug(project.name, project.id)}/`}
        className="block relative"
      >
        <div className="absolute bottom-0 left-0 px-3 flex w-full h-1/3 flex-col z-20 overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="absolute inset-0 w-full h-full">
              <svg
                className="absolute bottom-0 left-0 w-full h-full"
                viewBox="0 0 900 120"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id={`waveGradient-${projectId}`}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    {gradientStops}
                  </linearGradient>
                  <filter id={`blur-${projectId}`}>
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
                  </filter>
                </defs>
                {waveLayers}
              </svg>
            </div>
          </motion.div>

          <div className="relative z-10 flex flex-col justify-end h-full pb-3">
            <motion.h1
              className="text-xs text-white/50 font-medium font-comfortaa uppercase tracking-wide drop-shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
            >
              {categoryName}
            </motion.h1>
            <motion.h1
              className="text-lg text-white/95 font-medium font-comfortaa drop-shadow-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
            >
              {project?.name}
            </motion.h1>
          </div>
        </div>

        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ damping: 30 }}
          className="w-full h-full overflow-hidden"
        >
          <Image
            width={600}
            height={450}
            src={imageurl}
            alt={`${project.name} project image`}
            className="w-full h-auto object-cover aspect-[4/3]"
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ProjectAnimatedWawes;
