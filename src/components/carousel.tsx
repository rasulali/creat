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
import { useOutsideClick } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { handleDisplayName } from "@/lib/helperFunctions";
import Image from "next/image";

type ImageUrls = Record<string, string>;
type Project = {
  name: string;
  images: ImageUrls;
  category: string;
};

interface CarouselProps {
  project: Project | null;
  initialScroll?: number;
}

type CardType = {
  src: string;
  title: string;
  category: string;
  alt: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
  cards: CardType[];
}>({
  onCardClose: () => {},
  currentIndex: 0,
  cards: [],
});

export const Carousel = ({ project, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards: CardType[] = Object.entries(project?.images || {})
    .map(([filename, imageUrl]) => ({
      category: project?.name || "",
      title: filename,
      src: imageUrl,
      alt: project?.images[filename] || "",
    }))
    .reverse();

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
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
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
          className={[
            "flex w-full overflow-x-scroll overscroll-x-auto py-6 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "md:py-20",
          ].join(" ")}
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"></div>

          <div
            className={[
              "flex flex-row justify-start gap-3 pl-4 mx-auto",
              "md:gap-4 md:max-w-[calc(100%-256px)]",
            ].join(" ")}
          >
            {cards.map((card, index) => (
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
                  },
                }}
                key={"card" + index}
                className={[
                  "last:pr-[5%] rounded-3xl snap-start",
                  "md:last:pr-[33%]",
                ].join(" ")}
              >
                <Card card={card} index={index} layout={true} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className={["flex justify-end gap-2 mr-4", "md:mr-10"].join(" ")}>
          <button
            className={[
              "relative z-30 h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50",
              "md:h-10 md:w-10",
            ].join(" ")}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <FaArrowLeft className="h-5 w-5 text-gray-500 md:h-6 md:w-6" />
          </button>
          <button
            className={[
              "relative z-30 h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50",
              "md:h-10 md:w-10",
            ].join(" ")}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <FaArrowRight className="h-5 w-5 text-gray-500 md:h-6 md:w-6" />
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
  card: CardType;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(card);
  const [currentIndex, setCurrentIndex] = useState(index);
  const containerRef = useRef<HTMLDivElement | null>(null);
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
                className="absolute top-3 right-3 md:top-6 md:right-6 h-8 w-8 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center z-50"
                onClick={handleClose}
              >
                <FaX className="h-3 w-3 text-white md:h-6 md:w-6" />
              </button>

              <button
                className={[
                  "absolute top-1/2 left-3 -translate-y-1/2 h-10 w-10 bg-black/70 border border-white/70 rounded-full flex items-center justify-center z-50",
                  "md:left-6 md:h-12 md:w-12 md:bg-black md:border-2 md:border-white",
                ].join(" ")}
                onClick={handlePrev}
              >
                <FaArrowLeft className="h-5 w-5 text-white md:h-6 md:w-6" />
              </button>

              <button
                className={[
                  "absolute top-1/2 right-3 -translate-y-1/2 h-10 w-10 bg-black/70 border border-white/70 rounded-full flex items-center justify-center z-50",
                  "md:right-6 md:h-12 md:w-12 md:bg-black md:border-2 md:border-white",
                ].join(" ")}
                onClick={handleNext}
              >
                <FaArrowRight className="h-5 w-5 text-white md:h-6 md:w-6" />
              </button>

              <div
                className={[
                  "absolute top-0 left-0 z-50 p-4 bg-gradient-to-r via-creatBG from-creatBG to-transparent",
                  "md:p-6",
                ].join(" ")}
              >
                <motion.p className="text-sm md:text-base font-medium text-white">
                  {currentCard.category}
                </motion.p>
                <motion.p className="text-xl md:text-4xl font-semibold text-white mt-1">
                  {handleDisplayName(currentCard.title)}
                </motion.p>
              </div>

              <div className="w-full h-full p-4 md:p-10">
                <div className="relative w-full h-full">
                  <Image
                    src={currentCard.src}
                    alt={currentCard.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
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
        className={[
          "rounded-3xl bg-gray-100 aspect-[3/4] overflow-hidden flex flex-col items-start justify-start relative z-10 cursor-pointer snap-start",
          "w-72 md:w-[512px]",
        ].join(" ")}
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />

        <div className="relative z-40 px-4 py-2 border-red-500">
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white text-lg md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
          >
            {handleDisplayName(card.title)}
          </motion.p>
        </div>

        <Image
          src={card.src}
          fill
          sizes="50vw"
          loading="lazy"
          decoding="async"
          quality={75}
          alt={card.alt}
          className="object-cover absolute z-10 inset-0"
        />
      </motion.button>
    </>
  );
};
