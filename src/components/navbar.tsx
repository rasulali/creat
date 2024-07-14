"use state";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Slant as MenuIcon } from "hamburger-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSquareFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
const Nav = () => {
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

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const menuVariants = {
    initial: { x: "calc(100% + 100px)" },
    enter: { x: "0", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
    exit: {
      x: "calc(100% + 100px)",
      transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const itemVariants = {
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
  const itemHoverVariants = {
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

  const items = [
    { label: "home", href: "/" },
    { label: "portfolio", href: "/portfolio" },
    { label: "about", href: "/about" },
    { label: "contact", href: "/contact" },
  ];
  return (
    <>
      <motion.div
        initial={{
          rotate: 0,
        }}
        exit={{
          rotate: 0,
        }}
        whileHover={{
          rotate: menuState ? 30 : 0,
        }}
        className="fixed top-[6px] md:top-[12px] right-4 md:right-[22px] z-50"
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
          color={`${menuState ? "white" : "black"}`}
        />
      </motion.div>
      <AnimatePresence mode="wait">
        {menuState && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed right-0 top-0 h-full w-full max-w-[769px] bg-zinc-900 z-40"
          >
            <div className="mt-[6px] md:mt-[12px] ml-4 md:ml-[22px] w-12 aspect-square flex items-center justify-center">
              <Link
                href="/admin"
                className="text-xs md:text-base uppercase text-white/50 hover:text-white transition-colors duration-300"
              >
                login
              </Link>
            </div>
            <div className="grid grid-rows-10 h-full px-12 md:px-32">
              <h1 className="text-xs md:text-base uppercase text-white/50 row-span-1 row-start-2">
                navigation
              </h1>
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
                      <Link href={item.href}>{item.label}</Link>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col gap-y-4 row-start-9">
                {/*label*/}
                <div className="flex text-xs md:text-base uppercase text-white/50 gap-x-4">
                  <h1>socials</h1>
                  <span>/</span>
                  <h1>contact</h1>
                </div>

                <div className="grid grid-rows-2 md:gap-y-2">
                  {/*icons*/}
                  <div className="flex text-lg md:text-2xl gap-x-4 text-white items-center">
                    <motion.div
                      whileHover={{
                        y: -4,
                      }}
                      whileTap={{
                        scale: 0.9,
                      }}
                    >
                      <Link
                        href=""
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
                        href=""
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
                        href=""
                        target="_blank"
                        onClick={(e) => e.preventDefault()}
                      >
                        <FaInstagram />
                      </Link>
                    </motion.div>
                  </div>

                  {/*numbers*/}
                  <div className="flex gap-x-4 text-base md:text-2xl">
                    <Link
                      href=""
                      onClick={(e) => e.preventDefault()}
                      className="text-white/50 hover:text-white transition-colors duration-300"
                    >
                      010 100 10 10
                    </Link>
                    <Link
                      href=""
                      onClick={(e) => e.preventDefault()}
                      className="text-white/50 hover:text-white transition-colors duration-300"
                    >
                      012 200 20 20
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <svg className="absolute top-0 left-[-99px] w-[100px] h-full fill-zinc-900 stroke-none">
              <motion.path
                variants={curve}
                initial="initial"
                animate="enter"
                exit="exit"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Nav;
