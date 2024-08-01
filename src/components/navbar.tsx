"use state";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Slant as MenuIcon } from "hamburger-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FaSquareFacebook, FaSquareInstagram, FaLinkedin, FaEnvelope, FaPhone, FaLocationDot, FaLinkedinIn, FaFacebookF, FaInstagram, FaRegUser } from "react-icons/fa6";
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

  type Item = {
    label: string;
    href: string;
  };

  const items: Item[] = [
    { label: "home", href: "/" },
    { label: "portfolio", href: "/portfolio" },
    { label: "services", href: "/services" },
    { label: "about", href: "/about" },
    { label: "contact", href: "/contact" },
  ];
  const navRef = useRef(null)
  const menuInView = useInView(navRef);
  const menuRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as Node).contains(event.target as Node)) {
        setMenuState(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="w-full flex flex-col">

        <div className="w-full flex bg-zinc-100 justify-center">
          <div className="flex md:py-4 items-center justify-between md:px-28 w-full max-w-[1920px]">
            <div className="flex md:text-lg text-zinc-600 md:gap-x-8">
              <Link href="mailto:contact@creat.az"
                className="flex items-center md:gap-x-2">
                <FaEnvelope className="md:text-xl" />
                <span className="md:mb-0.5 hover:text-creatBright transition-colors duration-300">
                  contact@creat.az
                </span>
              </Link>
              <Link href="tel:+994127777777"
                className="flex items-center md:gap-x-2">
                <FaPhone className="md:text-lg" />
                <span className="md:mb-0.5 hover:text-creatBright transition-colors duration-300">
                  012 777 77 77
                </span>
              </Link>
              <Link href="#"
                className="flex items-center md:gap-x-2">
                <FaLocationDot className="md:text-lg" />
                <span className="md:mb-0.5 hover:text-creatBright transition-colors duration-300">
                  Samad vurgun 110, Baku, Azerbaijan
                </span>
              </Link>
            </div>
            <div className="flex md:text-sm md:gap-x-4 text-zinc-600 items-center">
              <Link
                href=""
                target="_blank"
                onClick={(e) => e.preventDefault()}
                className="border border-zinc-600 rounded-full md:p-2
            hover:text-creatBright hover:border-creatBright transition-colors duration-300"
              >
                <FaLinkedinIn />
              </Link>

              <Link
                href=""
                target="_blank"
                onClick={(e) => e.preventDefault()}
                className="border border-zinc-600 rounded-full md:p-2
            hover:text-creatBright hover:border-creatBright transition-colors duration-300"
              >
                <FaFacebookF />
              </Link>

              <Link
                href=""
                target="_blank"
                onClick={(e) => e.preventDefault()}
                className="border border-zinc-600 rounded-full md:p-2
            hover:text-creatBright hover:border-creatBright transition-colors duration-300"
              >
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>

        <nav ref={navRef} className="w-full flex justify-center drop-shadow bg-white">
          <div className="flex w-full max-w-[1920px] md:px-28 justify-between items-center md:py-8">
            <Link href="/" className="block">
              <img src="/logo.svg" alt="" className="object-cover md:h-12" />
            </Link>
            <div className="flex md:gap-x-12">
              {items.map((item, i) => (
                <Link href={item.href} key={i}
                  className="hover:text-creatBright transition-colors duration-300
              text-xl capitalize">
                  {item.label}
                </Link>
              ))}
            </div>
            <Link className="border border-zinc-600 md:rounded-lg md:py-3 md:px-6 uppercase
          font-medium hover:border-creatBright hover:bg-creatBright hover:text-white transition-colors duration-300" href="/contact" >
              Contact Us
            </Link>
          </div>
        </nav>

      </div>

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
        </motion.div>}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {menuState && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed right-0 top-0 h-full w-full max-w-[769px] bg-zinc-900 z-40"
            ref={menuRef}
          >
            <a href="/admin"
              className="w-12 aspect-square flex items-center justify-center absolute top-3 left-3 group"
            ><FaRegUser className="text-white/50 text-lg group-hover:text-white transition-colors duration-300" /></a>
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
