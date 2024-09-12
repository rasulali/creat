"use state";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Slant as MenuIcon } from "hamburger-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaSquareFacebook, FaSquareInstagram, FaLinkedin, FaRegUser, FaChevronDown } from "react-icons/fa6";
import Logo from "./logo";
import { Tooltip } from 'react-tooltip'
import { GrLanguage } from "react-icons/gr";


type Item = {
  label: string;
  href: string;
};

export const items: Item[] = [
  { label: "portfolio", href: "/portfolio" },
  { label: "services", href: "/services" },
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];


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
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const menuVariants = {
    initial: { x: "calc(100% + 100px)" },
    enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: {
      x: "calc(100% + 100px)",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
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


  const navRef = useRef(null)
  const menuInView = useInView(navRef);
  const menuRef = useRef(null)
  const menuIconRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuIconRef.current && (menuIconRef.current as Node).contains(event.target as Node)) {
        return;
      }
      if (menuRef.current && !(menuRef.current as Node).contains(event.target as Node)) {
        setMenuState(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const [langHover, setLangHover] = useState(false)

  type LanguageState = {
    en: boolean;
    az: boolean;
    ru: boolean;
  };

  const [actiteLang, setActiteLang] = useState<LanguageState>({
    en: true,
    az: false,
    ru: false,
  });

  const handleLangChange = (key: keyof LanguageState) => {
    if (actiteLang[key]) {
      return;
    }

    const newLangState: LanguageState = Object.keys(actiteLang).reduce((acc, currentKey) => {
      acc[currentKey as keyof LanguageState] = (currentKey === key);
      return acc;
    }, {} as LanguageState);

    setActiteLang(newLangState);
  };

  return (
    <>
      <motion.div
        onHoverStart={() => { setLangHover(true) }}
        onHoverEnd={() => { setLangHover(false) }}
        initial={{ height: 24, width: 40 }}
        animate={{
          height: langHover ? 124 : 24,
          width: langHover ? 68 : 40
        }}
        transition={{ duration: 0 }}
        className="absolute right-4 top-9 z-50">
        <AnimatePresence mode="wait">
          {
            langHover && <motion.div
              initial={{ height: 0 }}
              animate={{ height: langHover ? 'auto' : 0 }}
              exit={{ height: 0 }}
              className="absolute flex flex-col px-4 rounded-lg z-40 right-0 top-8 backdrop-blur bg-black/30 overflow-hidden">
              <div className="py-1">
                {Object.entries(actiteLang).map(([key], index) => (
                  <div key={index} className="flex gap-x-2 items-center">
                    <h1
                      onClick={() => handleLangChange(key as keyof LanguageState)}
                      className="text-white text-lg font-medium cursor-pointer
              hover:text-creatBright transition-colors min-w-6">{key}</h1>
                    {actiteLang[key as keyof LanguageState] && <div
                      className="w-1 h-1 rounded-full bg-white inline pointer-events-none" />}
                  </div>
                ))}
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </motion.div>

      <nav ref={navRef} className="w-full flex justify-center border-b drop-shadow-sm border-white/5 bg-creatBG">
        <div className="flex w-full max-w-[1920px] justify-center items-center md:py-6 relative">
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col">
            <div className="flex gap-x-2 items-center">
              <GrLanguage className={`text-xl ${langHover ? 'text-creatBright' : 'text-white'} transition-colors`} />
              <motion.div
                animate={{ rotate: langHover ? 180 : 0 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                  mass: 0.5
                }}
                className="origin-center cursor-pointer"
              >
                <FaChevronDown className={`text-xs ${langHover ? 'text-creatBright' : 'text-white'} transition-colors`} />
              </motion.div>
            </div>
          </div>
          <div className="flex md:gap-x-16 items-center">
            <Tooltip anchorSelect="#logo" content="Home" place="top" />
            {
              items.map((item, i) => {
                if (item.href === '/') return (
                  <Logo
                    key={i}
                    href="/" className="md:h-12" />
                )
                else return (
                  <Link href={item.href} key={i}
                    className="hover:text-creatBright transition-colors duration-300
              md:text-xl capitalize h-fit block text-white font-medium">
                    {item.label}
                  </Link>
                )
              })
            }
          </div>
        </div>
      </nav>

      <AnimatePresence mode="sync">
        {(!menuInView || menuState) && <motion.div
          initial={{
            rotate: 0,
            y: -100,
          }}
          animate={{
            y: 0,
            transition: { duration: 0.5, ease: [.51, .92, .24, 1.15] },
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
        </motion.div>}
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
              className="fixed right-0 top-0 h-full w-full max-w-[769px] bg-[#053478] z-40"
              ref={menuRef}
            >
              <a href="/admin"
                className="w-12 aspect-square flex items-center justify-center absolute top-3 left-3 group"
              ><FaRegUser className="text-white/50 text-lg group-hover:text-white transition-colors duration-300" /></a>
              <div className="absolute flex gap-x-2 top-3 translate-y-1/2 left-16">
                {Object.entries(actiteLang).map(([key], index) => (
                  <h1
                    key={index}
                    onClick={() => handleLangChange(key as keyof LanguageState)}
                    className={`uppercase cursor-pointer hover:text-creatBright transition-colors duration-300
              ${actiteLang[key as keyof LanguageState] ? 'text-white' : 'text-white/50'}`}>{key}</h1>
                ))}
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
                          <FaSquareInstagram />
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
                        010 311 26 12
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
              <svg className="absolute top-0 left-[-99px] w-[100px] h-full fill-[#053478] stroke-none">
                <motion.path
                  variants={curve}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                />
              </svg>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default Nav;
