"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Slant as MenuIcon } from "hamburger-react";
import { motion, AnimatePresence, useInView, Variants } from "motion/react";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaLinkedin,
  FaRegUser,
} from "react-icons/fa6";
import Logo from "./logo";
import { cn } from "@/lib/utils";

export const items: Item[] = [
  { label: "projects", href: "/projects" },
  { label: "services", href: "/services" },
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];

interface NavProps {
  isTransparent?: boolean;
}

const Nav: React.FC<NavProps> = ({ isTransparent = false }) => {
  const [menuState, setMenuState] = useState(false);

  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({
        w: window.innerWidth,
        h: window.innerHeight,
      });

      const handleResize = () =>
        setWindowSize({
          w: window.innerWidth,
          h: window.innerHeight,
        });

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const initialPath = `M100 0 L200 0 L200 ${windowSize.h} L100 ${windowSize.h} Q-100 ${windowSize.h / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${windowSize.h} L100 ${windowSize.h} Q100 ${windowSize.h / 2} 100 0`;

  const curveVariants: Variants = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const menuVariants: Variants = {
    initial: { x: "calc(100% + 100px)" },
    enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: {
      x: "calc(100% + 100px)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const itemVariants: Variants = {
    initial: { x: 80 },
    enter: (i: number) => ({
      x: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
    }),
    exit: (i: number) => ({
      x: 80,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
    }),
  };
  const itemHoverVariants: Variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 20,
      transition: {
        duration: 0.3,
        type: "spring",
      },
    },
  };

  const navRef = useRef(null);
  const menuInView = useInView(navRef);
  const menuRef = useRef(null);
  const menuIconRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuIconRef.current &&
        (menuIconRef.current as Node).contains(event.target as Node)
      ) {
        return;
      }
      if (
        menuRef.current &&
        !(menuRef.current as Node).contains(event.target as Node)
      ) {
        setMenuState(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="font-manrope">
      <nav className="w-full md:hidden flex bg-creatBG p-6">
        <motion.div
          initial={{
            rotate: 0,
            y: -100,
          }}
          animate={{
            y: 0,
            transition: { duration: 0.5, ease: [0.51, 0.92, 0.24, 1.15] },
          }}
          exit={{
            rotate: 0,
            y: -100,
          }}
          className="h-6 w-[108px]"
        >
          <Logo href="/" className="h-full w-full" />
        </motion.div>
      </nav>
      <nav
        ref={navRef}
        className={cn(
          "w-full md:flex hidden justify-center border-b backdrop-blur top-0 left-0",
          isTransparent
            ? "absolute z-50 border-creatBG/10 bg-creatBG/60"
            : "relative border-creatBG bg-creatBG",
        )}
      >
        <div className="flex w-full max-w-[1920px] justify-center items-center py-6 relative">
          <div className="flex gap-x-16 items-center">
            {items.map((item, i) => {
              if (item.href === "/")
                return <Logo key={i} href="/" className="h-12" />;
              else
                return (
                  <Link
                    aria-label={`Visit ${item.label} page`}
                    rel="noopener noreferrer"
                    href={item.href}
                    key={i}
                    className="hover:text-creatBright transition-colors duration-300
              md:text-xl capitalize h-fit block text-white font-medium"
                  >
                    {item.label}
                  </Link>
                );
            })}
          </div>
        </div>
      </nav>

      <AnimatePresence mode="sync">
        {(!menuInView || menuState) && (
          <motion.div
            initial={{
              rotate: 0,
              y: -100,
            }}
            animate={{
              y: 0,
              transition: { duration: 0.5, ease: [0.51, 0.92, 0.24, 1.15] },
            }}
            exit={{
              rotate: 0,
              y: -100,
            }}
            whileHover={{
              rotate: menuState ? 30 : 0,
            }}
            className="fixed z-50 top-3 right-3"
            ref={menuIconRef}
          >
            <MenuIcon
              toggled={menuState}
              toggle={setMenuState}
              size={24}
              direction="right"
              duration={0.5}
              distance="md"
              easing="cubic-bezier(.51,.92,.24,1.15)"
              rounded
              color="#fff"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuState && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: menuState ? 1 : 0 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 backdrop-blur-sm z-40 bg-white/5"
            />
            <motion.div
              variants={menuVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="fixed right-0 top-0 h-full w-full max-w-[769px] bg-creatBG z-40"
              ref={menuRef}
            >
              <a
                href="/admin"
                className="w-12 aspect-square flex items-center justify-center absolute top-3 left-3 group"
              >
                <FaRegUser className="text-white/50 text-lg group-hover:text-white transition-colors duration-300" />
              </a>
              <div className="grid grid-rows-10 h-full px-12 md:px-32">
                <div className="text-5xl md:text-7xl flex flex-col gap-y-4 capitalize text-white row-span-5 row-start-3">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.label}
                      variants={itemVariants}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                      custom={index}
                    >
                      <motion.div
                        variants={itemHoverVariants}
                        whileHover="animate"
                      >
                        <Link
                          aria-label={`Visit ${item.label} page`}
                          rel="noopener noreferrer"
                          href={item.href}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col gap-y-4 row-start-10">
                  <div className="grid grid-rows-2 md:gap-y-2">
                    <div className="flex gap-x-4 text-base md:text-xl items-end md:items-start">
                      <div className="flex md:gap-x-4 flex-col">
                        <a
                          aria-label="Call +994554158215"
                          href="tel:+994554158215"
                          className="text-white/50 hover:text-white transition-colors duration-300"
                        >
                          +994 55 415 82 15
                        </a>
                        <a
                          aria-label="Call +994502242944"
                          href="tel:+994502242944"
                          className="text-white/50 hover:text-white transition-colors duration-300"
                        >
                          +994 50 224 29 44
                        </a>
                      </div>
                      <span className="h-full bg-white/50 w-[1px]" />
                      <div className="flex md:gap-x-4 flex-col h-full gap-y-1">
                        <a
                          aria-label="Email info@creat.az"
                          href="mailto:info@creat.az"
                          className="text-white/50 hover:text-white transition-colors duration-300"
                        >
                          info@creat.az
                        </a>
                        <div className="flex text-lg md:text-2xl md:gap-x-4 gap-x-2 text-white items-center">
                          <motion.div
                            whileHover={{
                              y: -4,
                            }}
                          >
                            <Link
                              href="https://www.linkedin.com/"
                              rel="noopener noreferrer"
                              aria-label="Visit Our Linkedin Page"
                              target="_blank"
                              onClick={(e) => e.preventDefault()}
                            >
                              <FaLinkedin />
                            </Link>
                          </motion.div>

                          <motion.div
                            whileHover={{
                              y: -4,
                            }}
                          >
                            <Link
                              href="https://www.facebook.com/"
                              aria-label="Visit Our Facebook Page"
                              rel="noopener noreferrer"
                              target="_blank"
                              onClick={(e) => e.preventDefault()}
                            >
                              <FaSquareFacebook />
                            </Link>
                          </motion.div>

                          <motion.div
                            whileHover={{
                              y: -4,
                            }}
                          >
                            <Link
                              href="https://www.instagram.com/"
                              aria-label="Visit Our Instagram Page"
                              rel="noopener noreferrer"
                              target="_blank"
                              onClick={(e) => e.preventDefault()}
                            >
                              <FaSquareInstagram />
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <svg className="absolute top-0 left-[-99px] w-[100px] h-full fill-creatBG stroke-none">
                <motion.path
                  variants={curveVariants}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                />
              </svg>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Nav;
