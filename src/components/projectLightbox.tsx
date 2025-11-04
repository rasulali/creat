"use client";
import React, { useState, useRef, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { handleDisplayName } from "@/lib/helperFunctions";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Image from "next/image";
import { motion } from "motion/react";

type ImageUrls = Record<string, string>;
type Project = {
  name: string;
  images: ImageUrls;
  category: string;
};

interface ProjectLightboxProps {
  project: Project | null;
}

type CustomSlide = {
  src: string;
  title: string;
  category: string;
};

export const ProjectLightbox = ({ project }: ProjectLightboxProps) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const slides: CustomSlide[] = Object.entries(project?.images || {})
    .map(([filename, imageUrl]) => ({
      src: imageUrl,
      title: filename,
      category: project?.name || "",
    }))
    .reverse();

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      checkScrollability();
    }
  }, []);

  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      };
    }
  }, [open]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        .yarl__navigation_prev,
        .yarl__navigation_next {
          background-color: #000000 !important;
          border: none !important;
          padding: 0 !important;
          width: 48px !important;
          height: 48px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        @media (max-width: 767px) {
          .yarl__navigation_prev,
          .yarl__navigation_next,
          button[aria-label="Zoom in"],
          button[aria-label="Zoom out"] {
            display: none !important;
          }
        }
      `}</style>
      <div className="relative w-full pb-20 md:pb-24">
        <div
          ref={carouselRef}
          onScroll={checkScrollability}
          className="flex w-full overflow-x-scroll overscroll-x-auto py-6 md:py-20 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex flex-row justify-start gap-3 pl-4 mx-auto md:gap-4 md:max-w-[calc(100%-256px)]">
            {slides.map((slide, idx) => (
              <motion.button
                key={`card-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * idx,
                    ease: "easeOut",
                  },
                }}
                onClick={() => {
                  setIndex(idx);
                  setOpen(true);
                }}
                className="rounded-3xl bg-gray-100 aspect-[3/4] overflow-hidden flex flex-col items-start justify-start relative z-10 cursor-pointer snap-start w-72 md:w-[512px] flex-shrink-0 last:pr-[5%] md:last:pr-[33%]"
              >
                <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
                <div className="relative z-40 px-4 py-2">
                  <p className="text-white text-lg md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2">
                    {handleDisplayName(slide.title)}
                  </p>
                </div>
                <Image
                  src={slide.src}
                  fill
                  sizes="50vw"
                  loading="lazy"
                  decoding="async"
                  quality={75}
                  alt={slide.title}
                  className="object-cover absolute z-10 inset-0"
                />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-10 flex gap-2 z-30">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 cursor-pointer"
          >
            <FaArrowLeft className="h-5 w-5 md:h-6 md:w-6 text-gray-500" />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 cursor-pointer"
          >
            <FaArrowRight className="h-5 w-5 md:h-6 md:w-6 text-gray-500" />
          </button>
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 1.5,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 1,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
          scrollToZoom: false,
        }}
        on={{
          view: ({ index: newIndex }) => setIndex(newIndex),
        }}
        render={{
          slideHeader: () => (
            <div className="absolute top-0 left-0 z-[70] p-4 md:p-6 bg-gradient-to-r from-creatBG to-transparent rounded-br-2xl pointer-events-none select-none max-w-[calc(100%-4rem)] md:max-w-[50vw]">
              <p className="text-sm md:text-base font-medium text-white/80">
                {slides[index]?.category}
              </p>
              <p className="text-xl md:text-4xl font-semibold text-white mt-1 break-words">
                {slides[index]?.title && handleDisplayName(slides[index].title)}
              </p>
            </div>
          ),
          iconPrev: () => <FaArrowLeft className="h-6 w-6 text-white" />,
          iconNext: () => <FaArrowRight className="h-6 w-6 text-white" />,
        }}
        carousel={{
          finite: false,
          preload: 2,
        }}
        controller={{
          closeOnBackdropClick: false,
          closeOnPullDown: true,
          closeOnPullUp: false,
        }}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(16px)",
          },
        }}
      />
    </>
  );
};
