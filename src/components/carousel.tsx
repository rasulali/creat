"use client";
import React, { useState, createContext, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { handleDisplayName } from "@/lib/helperFunctions";
import { FaX, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useOutsideClick } from "../../utils/hooks/use-outside-click";

type ImageUrls = Record<string, string>;

type Project = {
  id: number;
  created_at: string;
  category: string;
  description?: string;
  page: string;
  name: string;
  images: ImageUrls | null;
  location?: string;
  date?: string;
};

type CarouselContextType = {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
};

const CarouselContext = createContext<CarouselContextType>({
  currentIndex: 0,
  setCurrentIndex: () => { },
});

type CardType = {
  src: string;
  title: string;
  name: string;
  content: React.ReactNode;
};


export const Carousel: React.FC<{ project: Project | null }> = ({ project }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <CarouselContext.Provider value={{ currentIndex, setCurrentIndex }}>
      <div className="relative w-[calc(100%-256px)] mx-auto">
        <div className="flex w-full overflow-x-scroll py-10 scroll-smooth">
          <div className="flex flex-row justify-start gap-4 pl-4">
            {Object.entries(project?.images || {}).map(([imageName, imageUrl], index) => (
              <Card
                key={`${project?.id}-image-${index}`}
                card={{
                  src: imageUrl || "",
                  title: handleDisplayName(imageName) || "",
                  name: project?.name || "",
                  content: (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        layout="fill"
                        sizes="90vw"
                        quality={90}
                        src={imageUrl}
                        alt={`Project Image ${index + 1}`}
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                      />
                    </div>
                  )
                }}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

type CardProps = {
  card: CardType;
  index: number;
};

const Card: React.FC<CardProps> = ({ card, index }) => {
  const [open, setOpen] = useState(false);
  const { currentIndex, setCurrentIndex } = useContext(CarouselContext);

  const handleOpen = () => {
    setOpen(true);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const imageRef = useRef(null)

  useOutsideClick(imageRef, handleClose);

  return (
    <>
      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 h-screen z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/50 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-screen w-screen flex flex-col items-center justify-center p-4 md:p-10 relative"
            >
              <motion.div
                key={currentIndex}
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -200, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="h-full w-full flex items-center justify-center"
              >
                {card.content}
              </motion.div>
              <button
                className="absolute top-4 bg-black/50 w-12 h-12 rounded-full right-4 flex items-center justify-center z-50"
                onClick={handleClose}
              >
                <FaX className="text-white text-2xl" />
              </button>
              <button
                className="absolute bottom-4 -translate-x-full bg-black/50 w-12 h-12 rounded-full right-4 flex items-center justify-center z-50"
              // onClick={handleClose}
              >
                <FaArrowLeft className="text-white text-2xl" />
              </button>
              <button
                className="absolute bottom-4 bg-black/50 w-12 h-12 rounded-full right-4 flex items-center justify-center z-50"
              // onClick={handleClose}
              >
                <FaArrowRight className="text-white text-2xl" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={handleOpen}
        className="rounded-3xl bg-gray-100 w-96 md:w-[512px] aspect-[3/4] overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <motion.p className="text-white text-sm md:text-base font-medium font-sans text-left">
            {card.name}
          </motion.p>
          <motion.p className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2">
            {card.title}
          </motion.p>
        </div>
        <Image
          src={card.src}
          alt={card.title}
          fill
          className="object-cover absolute z-10 inset-0"
        />
      </motion.button>
    </>
  );
};
