"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
  useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight, FaX } from "react-icons/fa6";
import { cn, useOutsideClick } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { handleDisplayName } from "@/lib/helperFunctions";

type ImageUrls = Record<string, string>;
type Project = {
  name: string;
  images: ImageUrls | null;
};

interface CarouselProps {
  project: Project | null;
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
  cards: Card[];
}>({
  onCardClose: () => { },
  currentIndex: 0,
  cards: []
});

export const Carousel = ({ project, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = Object.entries(project?.images || {}).reverse().map(([filename, imageUrl]) => ({
    category: project?.name || "",
    title: filename || "",
    src: imageUrl || "",
  }));

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

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

  const handleCardClose = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex, cards }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"></div>

          <div className="flex flex-row justify-start gap-4 pl-4 max-w-[calc(100%-256px)] mx-auto">
            {cards.reverse().map((card, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
              >
                <Card card={card} index={index} layout={true} />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10">
          <button
            className="relative z-30 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <FaArrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-30 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <FaArrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(card);
  const [currentIndex, setCurrentIndex] = useState(index);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, cards } = useContext(CarouselContext);

  const handleNext = useCallback(() => {
    const totalCards = cards.length;
    const nextIndex = (currentIndex + 1) % totalCards;
    setCurrentCard(cards[nextIndex]);
    setCurrentIndex(nextIndex);
  }, [cards, currentIndex]);

  const handlePrev = useCallback(() => {
    const totalCards = cards.length;
    const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
    setCurrentCard(cards[prevIndex]);
    setCurrentIndex(prevIndex);
  }, [cards, currentIndex]);

  const handleClose = useCallback(() => {
    setOpen(false);
    onCardClose(currentIndex);
  }, [onCardClose, currentIndex]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      } else if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrev();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKeyDown);
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, handleNext, handlePrev, handleClose]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
    setCurrentCard(card);
    setCurrentIndex(index);
  };


  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="h-screen w-screen relative"
            >
              <button
                className="absolute top-6 right-6 h-8 w-8 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center z-50"
                onClick={handleClose}
              >
                <FaX className="h-6 w-6 text-white" />
              </button>
              <button
                className="absolute bottom-6 right-6 translate-x-[calc(-100%-8px)] h-8 w-8 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center z-50"
                onClick={handlePrev}
              >
                <FaArrowLeft className="h-6 w-6 text-white" />
              </button>
              <button
                className="absolute bottom-6 right-6 h-8 w-8 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center z-50"
                onClick={handleNext}
              >
                <FaArrowRight className="h-6 w-6 text-white" />
              </button>

              <div className="absolute top-0 left-0 z-50 p-6 bg-gradient-to-r
                via-creatBG from-creatBG to-transparent">
                <motion.p
                  className="text-base font-medium text-white"
                >
                  {currentCard.category}
                </motion.p>
                <motion.p
                  className="text-2xl md:text-4xl font-semibold text-white mt-1"
                >
                  {handleDisplayName(currentCard.title)}
                </motion.p>
              </div>

              <div className="w-full h-full p-4 md:p-10">
                <div className="relative w-full h-full">
                  <BlurImage
                    src={currentCard.src}
                    alt={currentCard.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="rounded-3xl bg-gray-100 w-96 md:w-[512px] aspect-[3/4] overflow-hidden flex flex-col items-start justify-start relative z-10"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 px-4 py-2 border-red-500">
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
          >
            {handleDisplayName(card.title)}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="object-cover absolute z-10 inset-0"
        />
      </motion.button>
    </>
  );
};


export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      fill
      sizes="50vw"
      loading="lazy"
      decoding="async"
      quality={70}
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
