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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards: CardType[] = Object.entries(project?.images || {})
    .map(([filename, imageUrl]) => ({
      category: project?.name || "",
      title: filename,
      src: imageUrl,
      alt: project?.images[filename] || "",
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
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

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
      <div className="relative w-full pb-20 md:pb-24">
        <div
          ref={carouselRef}
          onScroll={checkScrollability}
          className="flex w-full overflow-x-scroll overscroll-x-auto py-6 md:py-20 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"></div>

          <div className="flex flex-row justify-start gap-3 pl-4 mx-auto md:gap-4 md:max-w-[calc(100%-256px)]">
            {cards.map((card, index) => (
              <motion.div
                key={"card" + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl snap-start"
              >
                <Card card={card} index={index} layout={true} />
              </motion.div>
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

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);

    return () => {
      window.removeEventListener("resize", setViewportHeight);
    };
  }, []);

  useEffect(() => {
    if (open) {
      const styleId = "modal-viewport-fix";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.innerHTML = `
          .modal-full-height {
            height: 100vh;
            height: 100svh;
            height: calc(var(--vh, 1vh) * 100);
            min-height: -webkit-fill-available;
          }
        `;
        document.head.appendChild(style);
      }
    }
  }, [open]);

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
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      window.addEventListener("keydown", onKeyDown);
    } else {
      window.removeEventListener("keydown", onKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);

      if (open) {
        // Restore scroll position
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    };
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
          <div className="fixed inset-0 z-[9999] overflow-hidden modal-full-height">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[50] modal-full-height"
              style={{ width: "100vw" }}
              onClick={handleClose}
            />

            <motion.div
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              className="relative z-[60] modal-full-height"
              style={{ width: "100vw" }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <button
                onClick={handleClose}
                aria-label="Close"
                className="absolute top-3 right-3 md:top-6 md:right-6 h-10 w-10 md:h-8 md:w-8 bg-black/50 hover:bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center z-[70] cursor-pointer"
              >
                <FaX className="h-4 w-4 md:h-6 md:w-6 text-white" />
              </button>

              <div className="absolute bottom-10 right-4 z-[70] flex items-center gap-3 md:hidden">
                <button
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="h-12 w-12 bg-black/70 border border-white/70 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <FaArrowLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next image"
                  className="h-12 w-12 bg-black/70 border border-white/70 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <FaArrowRight className="h-6 w-6 text-white" />
                </button>
              </div>

              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="hidden md:flex absolute top-1/2 left-6 -translate-y-1/2 h-12 w-12 bg-black border-2 border-white rounded-full items-center justify-center z-[70] cursor-pointer"
              >
                <FaArrowLeft className="h-6 w-6 text-white" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next image"
                className="hidden md:flex absolute top-1/2 right-6 -translate-y-1/2 h-12 w-12 bg-black border-2 border-white rounded-full items-center justify-center z-[70] cursor-pointer"
              >
                <FaArrowRight className="h-6 w-6 text-white" />
              </button>

              <div className="absolute top-0 left-0 z-[70] p-4 md:p-6 bg-gradient-to-r via-creatBG from-creatBG to-transparent">
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
        className="rounded-3xl bg-gray-100 aspect-[3/4] overflow-hidden flex flex-col items-start justify-start relative z-10 cursor-pointer snap-start w-72 md:w-[512px]"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />

        <div className="relative z-40 px-4 py-2">
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
