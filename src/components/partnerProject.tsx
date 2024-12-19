import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const PartnerProject: React.FC<PartnerProjectProps> = ({ activePartner, setSrcSet, setFullScreenIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % activePartner.images.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + activePartner.images.length) % activePartner.images.length
    );
  };

  const imageVariants = {
    center: { x: '-50%', scale: 1, zIndex: 3 },
    left: { x: '-70%', scale: 0.9, zIndex: 2 },
    right: { x: '-30%', scale: 0.9, zIndex: 1 },
  };

  return (
    <div className="w-full flex flex-col h-[318px] self-center">
      <h1 className="text-3xl font-bold mb-4">{activePartner.name}</h1>
      <div className="grid grid-cols-2 gap-x-4 h-full">
        <div className="w-full relative h-full">
          <AnimatePresence initial={false}>
            {[-1, 0, 1].map((offset) => {
              const index = (currentIndex + offset + activePartner.images.length) % activePartner.images.length;
              return (
                <motion.div
                  key={index}
                  custom={offset}
                  variants={imageVariants}
                  initial={offset === -1 ? "left" : offset === 1 ? "right" : "center"}
                  animate={offset === -1 ? "left" : offset === 1 ? "right" : "center"}
                  exit={offset === -1 ? "left" : "right"}
                  transition={{
                    mass: 0.5,
                  }}
                  className="rounded-2xl overflow-hidden absolute h-4/5 aspect-[5/3] top-0 left-1/2"
                >
                  <Image
                    src={activePartner.images[index]}
                    width={340}
                    height={340}
                    quality={50}
                    alt={`${activePartner.name} image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onClick={() => {
                      if (offset === 0) {
                        setSrcSet(activePartner.images || []);
                        setFullScreenIndex(index);
                      }
                    }}
                  />
                  {offset !== 0 && (
                    <div className="absolute inset-0 bg-black/20"></div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div className="absolute w-full flex items-center justify-center bottom-0 left-0 gap-x-4 h-1/5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full p-1.5 drop-shadow-md bg-white"
              onClick={prevSlide}
            >
              <FaChevronLeft className="text-2xl text-zinc-900 drop-shadow-none" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full p-1.5 drop-shadow-md bg-white"
              onClick={nextSlide}
            >
              <FaChevronRight className="text-2xl text-zinc-900 drop-shadow-none" />
            </motion.button>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <h1 className="text-2xl font-medium mb-4">{activePartner.heading}</h1>
          <p className="text-lg max-w-[600px]">{activePartner.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default PartnerProject;
