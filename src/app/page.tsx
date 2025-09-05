"use client";
import Nav from "@/components/navbar";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaChevronDown } from "react-icons/fa6";
import { AnimatePresence, motion, useInView } from "framer-motion";
import ProjectCard from "@/components/projectCard";
import Comment from "@/components/comment";
import TextAnim from "@/components/animatedText";
import Footer from "@/components/footer";
import EmailForm from "@/components/email";
import { IoClose } from "react-icons/io5";
import { LuExternalLink } from "react-icons/lu";
import { GlareCard } from "@/components/glareCard";
import { BASE_URI, partners, testimonials } from "@/lib/vars";
import Image from "next/image";
import { ParagraphAnimation } from "@/components/paragraphAnim";

export default function Home() {
  const projectsRef = useRef(null);
  const projectsInView = useInView(projectsRef, {
    once: true,
    amount: 0.5,
  });

  const [activeIndexTestimonial, setActiveIndexTestimonial] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isAutoCycleOn, setIsAutoCycleOn] = useState(true);

  const nextTestimonial = () => {
    setActiveIndexTestimonial((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const startAutoCycle = () => {
    intervalRef.current = setInterval(() => {
      nextTestimonial();
      setIsAutoCycleOn(true);
    }, 1500);
  };

  const stopAutoCycle = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsAutoCycleOn(false);
  };

  const handleClickLeftTestimonial = () => {
    stopAutoCycle();
    if (activeIndexTestimonial === 0) {
      setActiveIndexTestimonial(testimonials.length - 1);
    } else {
      setActiveIndexTestimonial((prevIndex) => prevIndex - 1);
    }
    timeoutRef.current = setTimeout(startAutoCycle, 5000);
  };

  const handleClickRightTestimonial = () => {
    stopAutoCycle();
    if (activeIndexTestimonial === testimonials.length - 1) {
      setActiveIndexTestimonial(0);
    } else {
      setActiveIndexTestimonial((prevIndex) => prevIndex + 1);
    }
    timeoutRef.current = setTimeout(startAutoCycle, 5000);
  };

  useEffect(() => {
    startAutoCycle();
    return () => {
      stopAutoCycle();
    };
  }, []);

  const handlePartnerHover = (index: number) => {
    setPartnerIndex(index);
  };

  const [partnerIndex, setPartnerIndex] = useState(-1);
  const partnersRef = useRef(null);
  const partnersInView = useInView(partnersRef, {
    once: true,
    amount: 0.5,
  });

  const [activePartnerIndex, setActivePartnerIndex] = useState(-1);
  useEffect(() => {
    if (activePartnerIndex > -1) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setActivePartnerIndex(-1);
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [activePartnerIndex]);

  const prettifyUrl = (url: string) => {
    try {
      const urlObject = new URL(url);
      return urlObject.hostname;
    } catch (error) {
      return url;
    }
  };

  return (
    <main className="bg-creatBG text-white">
      <section className="flex flex-col min-h-dvh relative">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            loop
          >
            <source src={`${BASE_URI}/home/bg.mp4`} type="video/mp4" />
            <source src={`${BASE_URI}/home/bg.webm`} type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-creatBG/25"></div>
        </div>
        <Nav isTransparent={true} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <FaChevronDown className="text-white text-3xl animate-bounce" />
        </div>
        <div className="my-auto py-16 flex justify-center">
          <div className="w-full max-w-[1920px] h-full py-24 flex relative items-center">
            <div className="md:pl-28 h-fit flex flex-col md:gap-y-4 flex-shrink-0 w-full relative">
              <div className="h-[500px] flex absolute bottom-0 right-0">
                <motion.svg
                  className="w-full h-full"
                  viewBox="0 0 3343 4102"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 2,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    className="stroke-white/70"
                    strokeWidth={12}
                    strokeDasharray="0 1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M941.316 4094.88C941.316 4019.47 930.038 3910.91 1002.06 3865.86C1013.13 3858.94 1120.05 3801.11 1101.46 3797.32C1069.46 3790.8 929.704 3892.23 965.797 3798.91C975.21 3774.56 1244.21 3701.92 1029.6 3733.52C928.624 3748.39 935.798 3783.72 916.012 3674.86C905.372 3616.27 909.224 3558.52 892.184 3501.83C891.517 3499.59 889.783 3490.55 889.783 3487.99C826.17 3386.19 794.357 3335.31 794.357 3335.31C947.037 3546.51 1023.37 3652.12 1023.37 3652.12C1503.04 3760.26 1742.88 3814.34 1742.88 3814.34C1738.44 3802.56 1736.21 3796.68 1736.21 3796.68C1243.5 3688.22 997.158 3633.98 997.158 3633.98C916.998 3539.19 876.918 3491.8 876.918 3491.8C883.398 3573.91 795.598 3566.23 728.531 3566.23C597.385 3566.23 449.931 3527.94 388.224 3399.59C376.691 3375.62 323.651 3246.56 403.651 3310.99C450.264 3348.52 674.411 3532.91 719.971 3446.16C741.211 3405.72 769.291 3389.88 765.291 3339.12C771.344 3337.36 808.611 3299.78 866.438 3284.43C974.277 3255.8 917.212 3169.06 757.545 3242.23C643.318 3294.58 377.438 3248.7 485.665 3366.44C542.531 3428.31 683.358 3351.46 744.291 3321.46C816.291 3286.02 675.238 3333.24 663.158 3338.03C552.638 3381.8 483.584 3375.54 399.184 3292.67C367.224 3261.28 425.624 3172.98 495.544 3154.32C544.264 3141.34 812.998 3054.86 833.064 3057.92C926.224 3072.16 882.371 3145.96 811.145 3168.78C713.265 3200.14 384.931 3375.92 353.544 3214.31C343.998 3165.14 204.931 3111.86 462.118 2996.74C521.144 2970.32 679.998 2903.7 743.145 2929.72C803.118 2954.44 800.557 2961.5 759.557 3012.44C759.117 3012.99 635.944 3054.68 616.158 3063.16C585.251 3076.4 376.744 3185.7 347.931 3162.56C269.664 3099.74 338.224 3112.79 293.731 3031.36C258.411 2966.74 334.45 2908.15 363.25 2859.76C364.637 2857.46 377.184 2845.51 379.771 2842.92C423.704 2810.55 543.051 2731.56 592.504 2783.5C628.144 2820.94 538.251 2905.19 517.825 2939.04C494.185 2978.2 397.384 3037.48 504.384 2935.16C533.611 2907.22 573.758 2864.19 579.464 2823.31C593.091 2725.63 416.558 2833.32 406.584 2820.96C405.571 2819.7 379.091 2773.94 375.971 2768.47C129.771 2387.42 6.66406 2196.88 6.66406 2196.88C429.077 2242.7 640.292 2265.59 640.292 2265.59C636.865 2110.11 851.957 2083.39 954.264 2148.19C1021.52 2190.79 1089.2 2218.08 1164.2 2195.95C1345.24 2142.56 1209.41 2350.71 1102.14 2214.06C1090.97 2199.82 1130.36 2223.26 1169.54 2337.18C1188.38 2391.94 1290.33 2566.95 1244.68 2607.87C1239.69 2612.34 1070.01 2882.63 1064.3 2836.23C1050.29 2722.3 745.584 2484.08 843.57 2465C925.45 2449.04 812.916 2474 776.396 2424.98C703.556 2327.2 806.917 2388.78 893.197 2333.36C902.917 2327.12 916.184 2370.72 762.438 2351.8C655.371 2338.63 571.798 2111.32 942.158 2241.76C1016.82 2268.06 634.185 2173.43 666.691 2237.62C723.131 2349.08 907.904 2597.04 934.197 2664.46C1445.68 3384.6 1731 3777.12 1731 3777.12C1517.25 3459.67 1410.37 3300.96 1410.37 3300.96C1423.32 3188.58 1655.37 2920.48 1607.26 2852.47C1521.84 2731.7 1453.12 2634.98 1310.53 2584.63C1355.7 2652.44 1499.52 2758.16 1576.4 2792.71C1763.8 2876.9 1705.2 2893.54 1955.26 2964.14C2024.7 2983.75 2657.88 3259.47 2558.68 3176.03C2480.8 3110.52 2304.88 3087.55 2162.36 2982.9C2115.88 2948.76 2389.81 3071.67 2434.57 3080.83C2791.06 3153.82 2345.99 3038.27 2247.21 2949.2C2142.12 2854.43 2194.06 2735.7 2247.86 2611.34C2324.06 2435.2 2416.7 2026.44 2588.88 1986.02C2793.88 1937.88 2830.04 2013 2987.7 2063.66C3079.09 2093.03 3096.37 2145.47 3007.77 1986.99C2951.92 1887.11 2550.79 1620.6 2444.39 1563.31C2327.8 1500.54 2320.64 1470.66 2244.71 1379.12C2241.96 1375.8 1741.42 1702.43 1752.97 1762.12C1763.37 1815.96 1884.17 2059.24 1953.62 1968.9C2018.2 1884.9 2351.58 1516.24 2342.96 1543.91C2323.04 1607.75 1990.08 2026.36 1946.65 1989.5C1793.93 1859.9 1725.58 1624.71 1602.48 1887.1C1497.28 2111.28 1568.88 1873.34 1565.28 1806.95C1562.45 1754.66 1353.18 1673.94 1310.53 1737.91C1300.04 1753.63 1116.6 1799.79 998.744 2069.99C917.637 2255.88 1020.48 1905.27 1129.82 1828.2C1183.4 1790.46 1210.58 1738.75 1290.13 1711.19C1440.44 1659.14 1478.06 1779.03 1443.8 1695.92C1403.97 1593.43 1302.57 1611.26 1265.97 1408.84C1254.14 1343.42 1174.7 1342.68 1199.94 1240.3C1217.16 1170.47 1178.98 1114.4 1127.92 1075.19C1083.7 1041.24 1092.09 990.629 1103.1 947.816C1585.02 817.669 1845.21 724.149 1883.68 667.256C2102.61 597.963 2219.67 596.682 2234.84 663.442C2289.63 626.895 2282.62 593.816 2213.85 564.202C2204.69 500.096 2191.99 463.202 2175.68 453.509C1938.76 462.482 1728.2 527.363 1543.97 648.176C1207.81 763.403 1011.24 820.656 954.25 819.949C971.517 906.523 932.076 972.683 835.93 1018.42C993.69 973.896 1072.58 951.629 1072.58 951.629C1084.64 880.629 1073.82 841.175 1040.13 833.295C1000.69 842.202 980.971 846.656 980.971 846.656C900.691 517.749 1005.65 256.922 1295.86 64.189C1666.41 -69.931 1942.5 31.8554 2124.16 369.535C2162.3 476.829 2182.51 539.335 2184.75 557.055C2212.01 640.348 2173.21 793.056 2165.67 880.856C2159.01 958.189 2133.01 1310.98 1991.34 1148.04C1956.02 1107.42 1970.44 918.443 1933.76 960.416C1899.3 999.83 1833.94 977.496 1800.81 929.002C1753.49 859.762 1758.73 676.309 1782.05 776.323C1793.46 825.203 1821.68 972.283 1896.41 942.256C1926.54 930.136 1927.9 906.016 1942.4 940.416C1908.09 1007.3 2052.38 1296.26 1800.88 1574.19C1715.04 1669.04 1700.48 1736.9 1563.57 1753.75C1560.14 1754.16 1527 1759.54 1525.56 1760.12C1430.69 1753.47 1458.56 1666.47 1363.84 1596.66C1246.85 1510.44 1246.86 1380.55 1442.08 1383.67C1536.7 1385.18 1520.69 1389.67 1604.29 1407.22C1664.65 1419.88 1676.88 1355.9 1707.36 1308.42C1739.08 1258.99 1817.77 1065.55 1815.48 1007.7C1812.18 924.029 1880.14 948.642 1915.21 926.122C1989.38 878.496 1921.16 997.935 1942.53 906.922C1976.84 761.202 2173.78 704.256 2198.76 1011.28C2200.73 1035.54 2210.58 1141.91 2215.28 1155.84C2244.56 1239.46 2163.02 1359.6 2268.73 1463.1C2356.36 1548.91 2390.72 1581.23 2502.81 1641.68C2542.66 1663.18 2737.41 1795.56 2774.32 1828.11C2797.04 1848.16 2818.28 1861.18 2843.18 1877.24C2921.09 1970.88 2929.44 1962.98 3007.67 2037.19C3107.29 2131.71 3107.38 2227.06 3135.48 2364.47C3180.96 2586.92 3113.54 2811.58 3044.53 3023.28C2939.9 3175.36 2982.48 3147.99 2830.45 3313.7C2566.84 3601.06 2619.15 3920.34 2093.79 3766.94C1757.48 3668.74 1444.82 3344.79 1446.53 3347.4C1487.24 3409.71 1440.17 3385.4 1544.46 3485.14C1764.45 3695.48 2172.05 3929.9 2486.6 3829.98C2565.05 3805.04 2757.76 3586.58 2806.24 3496.04C2812.62 3484.12 2945.04 3215.36 2909.41 3338.99C2848.08 3551.87 2960.77 3476.15 2751.5 3697.68C2563.34 3896.87 2801.7 3713.79 2843.54 3654.06C2855.98 3636.3 2883.79 3806.38 2621.83 3919.62C2620.88 3920.03 2395.32 4071.15 2567.75 3984.5C2665.45 3935.4 2775.17 3896.72 2838.41 3802.92C2873.48 3750.92 2855.21 3931.52 2871.79 3973.38C2871.96 3973.8 2884.22 4088.22 2884.22 4088.22C2885.81 4093.5 2885.81 4095.72 2884.22 4094.88C3097.33 4094.88 3335.48 4088.22 3335.48 4088.22"
                  />
                </motion.svg>
              </div>
              <div className="md:px-3 md:py-1 md:border-x-2 border-x-creatBright backdrop-blur w-fit h-fit md:rounded-md bg-creatBright/25 cursor-default">
                <h1 className="capitalize md:text-lg font-medium text-creatBright">
                  Trusted Project Partner
                </h1>
              </div>
              <div className="flex flex-col md:gap-y-4">
                <h1 className="md:text-7xl font-bold md:leading-[1.2] text-nowrap ">
                  Architectural <br />
                  Services with{" "}
                  <span className="text-creatBright font-bold md:tracking-wide">
                    Creat
                  </span>
                </h1>
                <p className="md:text-xl text-neutral-200 md:leading-8 md:ml-1 font-semibold">
                  Discover top-tier construction services with Creat.
                  <br />
                  From concept to completion, we turn your vision into reality
                  with <br />
                  expertise and dedication.
                </p>
                <div className="md:mt-4">
                  <Link
                    href="/services"
                    className="md:rounded-lg md:py-5 md:px-7 uppercase w-fit bg-creatBright group
          font-medium hover:shadow-drop-shadow-button-creatBright transition-all duration-300 flex md:gap-x-3 items-center"
                  >
                    <h1 className="md:text-lg font-semibold">Our Services</h1>
                    <div className="flex items-center justify-center md:h-6 aspect-square rounded-full bg-white relative overflow-hidden">
                      <FaArrowRight
                        className="absolute text-base text-creatBright top-1/2 -translate-y-1/2 left-1/2
                -translate-x-[200%] transition-all duration-300 group-hover:-translate-x-1/2"
                      />
                      <FaArrowRight
                        className="absolute text-base text-creatBright top-1/2 -translate-y-1/2 left-1/2
                -translate-x-1/2 transition-all duration-300 group-hover:translate-x-[200%]"
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full relative">
        <AnimatePresence>
          {activePartnerIndex > -1 && (
            <div className="fixed inset-0 z-40">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 backdrop-blur pointer-events-none" />
                <div
                  onClick={() => setActivePartnerIndex(-1)}
                  className="h-1/5 w-full"
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{
                    y: activePartnerIndex > -1 ? 0 : "100%",
                  }}
                  exit={{ y: "100%" }}
                  transition={{
                    stiffness: 300,
                    mass: 0.5,
                  }}
                  className="absolute w-full h-4/5 bottom-0 left-0"
                >
                  <div className="relative w-full h-full bg-white text-black flex flex-col">
                    <span
                      onClick={() => setActivePartnerIndex(-1)}
                      className="absolute cursor-pointer right-12 top-12 translate-x-full -translate-y-full inline-flex items-center justify-center"
                    >
                      <IoClose className="text-4xl text-black" />
                    </span>
                    <div className="w-full h-full flex items-stretch p-12 gap-x-12 overflow-hidden">
                      <div className="flex flex-col w-fit h-fit items-center self-center">
                        <Link
                          href={partners[activePartnerIndex].link || ""}
                          target="_blank"
                          className="w-[400px] flex-shrink-0"
                        >
                          <img
                            src={partners[activePartnerIndex].logo}
                            alt=""
                            className="w-full h-auto"
                          />
                        </Link>
                        <Link
                          href={partners[activePartnerIndex].link || ""}
                          target="_blank"
                          className="font-medium text-lg flex items-center gap-x-2 hover:text-creatBright transition-colors"
                        >
                          {prettifyUrl(
                            partners[activePartnerIndex].link as string,
                          )}
                          <LuExternalLink className="text-lg" />
                        </Link>
                      </div>
                      <div className="flex flex-col w-full h-full relative justify-end">
                        <div className="absolute inset-0">
                          <Image
                            className=""
                            src=""
                            layout=""
                            alt=""
                            sizes="50vw"
                            quality={70}
                          />

                          <div className="absolute inset-[48px] overflow-hidden">
                            <div
                              className="w-full h-full"
                              style={{
                                backgroundImage: `repeating-linear-gradient(
                                                  -45deg,
                                                  transparent,
                                                  transparent 60px,
                                                  rgb(244 244 245) 60px,
                                                  rgb(244 244 245) 120px
                                                )`,
                              }}
                            />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center border-[24px] border-dashed border-zinc-300">
                            <h1 className="text-zinc-300 text-[7vw] font-black">
                              IMAGE GOES HERE
                            </h1>
                          </div>
                        </div>

                        <div className="w-full bg-black/10 z-10 flex gap-x-2 px-12 py-6">
                          <Link
                            href=""
                            className="text-3xl font-medium relative"
                          >
                            Info About Special Project For{" "}
                            {partners[activePartnerIndex].name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>
        <motion.div
          animate={{
            scale: activePartnerIndex > -1 ? 0.9 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.5,
          }}
          className="flex flex-col h-full w-full max-w-[1920px] mx-auto justify-center pt-24 pb-36 origin-center"
        >
          <div className="px-28">
            <div className="flex gap-x-2 items-center mb-4">
              <div className="h-px bg-creatBright w-8" />
              <h1 className="text-creatBright font-medium">Our Clients</h1>
            </div>
            <div className="flex flex-col gap-y-16">
              <div className="flex flex-col gap-y-4">
                <TextAnim>
                  <h1 className="text-5xl font-medium">
                    People who choose to work with{" "}
                    <span className="text-creatBright">us</span>
                  </h1>
                </TextAnim>
                <TextAnim delay={0.1}>
                  <p className="text-xl max-w-[500px] leading-relaxed">
                    Over the course of{" "}
                    <span className="relative">
                      only 5 years
                      <span className="absolute bottom-0 left-0 w-full h-px bg-creatBright" />
                    </span>
                    , we have been fortunate to work with a diverse range of
                    clients, including government agencies, large corporations,
                    and international companies. Our commitment to excellence
                    and innovative solutions has allowed us to deliver impactful
                    projects across industries and borders
                  </p>
                </TextAnim>
              </div>
              <TextAnim dir="<" delay={0.2}>
                <h1 className="text-5xl text-right capitalize leading-snug">
                  Trusted by{" "}
                  <span className="relative">
                    Leading Business
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-creatBright" />
                  </span>
                  <br />&{" "}
                  <span className="relative">
                    Government Agencies
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-creatBright" />
                  </span>
                </h1>
              </TextAnim>
            </div>
          </div>
          <div
            ref={partnersRef}
            className="flex flex-col gap-y-16 items-center mt-16"
          >
            {Array(6)
              .fill(null)
              .map((_, Gindex) => (
                <motion.div
                  initial={{
                    x: Gindex % 2 ? 100 : -100,
                  }}
                  animate={{
                    x: partnersInView
                      ? Gindex === 5
                        ? 0
                        : Gindex % 2
                          ? -100
                          : 100
                      : Gindex % 2
                        ? 100
                        : -100,
                  }}
                  transition={{
                    type: "spring",
                    bounce: 0.1,
                    delay: 0.1 * (Gindex + 1),
                  }}
                  key={`G-${Gindex}`}
                  className="flex gap-x-16"
                >
                  {partners
                    .slice(Gindex * 5, (Gindex + 1) * 5)
                    .map((partner, index) => {
                      const absoluteIndex = Gindex * 5 + index;
                      return (
                        <motion.div
                          key={absoluteIndex}
                          className="w-fit h-fit z-10 relative"
                        >
                          <motion.div
                            onClick={() => {
                              setActivePartnerIndex(absoluteIndex);
                            }}
                            animate={{
                              x: partnerIndex === absoluteIndex ? -4 : 0,
                              y: partnerIndex === absoluteIndex ? -4 : 0,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 20,
                              mass: 0.5,
                            }}
                            className="relative w-fit h-fit cursor-pointer"
                            onHoverStart={() => {
                              handlePartnerHover(absoluteIndex);
                            }}
                            onHoverEnd={() => {
                              handlePartnerHover(-1);
                            }}
                          >
                            <div className="w-full h-full">
                              <motion.div
                                animate={{
                                  x: partnerIndex === absoluteIndex ? 8 : 0,
                                  y: partnerIndex === absoluteIndex ? 8 : 0,
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 20,
                                  mass: 0.5,
                                }}
                                className={`absolute w-full h-full rounded-[13px]
${partnerIndex === absoluteIndex ? "bg-[#E6D2D8]" : "bg-neutral-200"} -z-20 -right-2 top-2`}
                              />
                              <motion.div
                                initial={{
                                  opacity: 0,
                                }}
                                animate={{
                                  opacity:
                                    partnerIndex === absoluteIndex ? 1 : 0,
                                  x: partnerIndex === absoluteIndex ? 8 : 0,
                                  y: partnerIndex === absoluteIndex ? 8 : 0,
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 20,
                                  mass: 0.5,
                                }}
                                className="absolute w-full h-full rounded-[13px] bg-creatBright/50 -z-10 shadow-drop-shadow-lg-creatBright backdrop-blur"
                              />
                              <div className="w-[240px] drop-shadow-lg">
                                <img
                                  src={partner.logo}
                                  alt=""
                                  className="w-full h-full select-none pointer-events-none"
                                />
                              </div>
                            </div>
                          </motion.div>
                          <motion.div
                            animate={{
                              x: partnerIndex === absoluteIndex ? -4 : 0,
                              y: partnerIndex === absoluteIndex ? -4 : 0,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 20,
                              mass: 0.5,
                            }}
                            className="w-fit h-fit absolute -top-2 -left-2"
                          >
                            <div className="relative block w-fit h-fit rounded-full cursor-pointer group">
                              <motion.div
                                initial={{
                                  opacity: 0,
                                }}
                                animate={{
                                  opacity:
                                    partnerIndex === absoluteIndex ? 1 : 0,
                                }}
                                style={{
                                  background: partner.color || "#fbbf24",
                                  opacity: 0.5,
                                }}
                                className="absolute w-full h-1/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md z-10"
                              />
                              <div className="px-4 py-2 rounded-full bg-white/50 backdrop-blur h-fit drop-shadow max-w-[240px] overflow-hidden">
                                <div className="w-full overflow-hidden h-full">
                                  <motion.h1
                                    animate={{
                                      x:
                                        partner.animated &&
                                        partnerIndex === absoluteIndex
                                          ? ["0%", "-100%"]
                                          : "0%",
                                    }}
                                    transition={{
                                      x: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration:
                                          partnerIndex === absoluteIndex
                                            ? 8
                                            : 0,
                                        ease: "linear",
                                      },
                                    }}
                                    initial={false}
                                    className="text-black text-sm font-semibold text-nowrap"
                                  >
                                    {partner.name}
                                  </motion.h1>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                </motion.div>
              ))}
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full h-[100px] pointer-events-none translate-y-1/2 z-10">
          <svg
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 1920 100"
          >
            <path
              d="M0 28L45.7 30C91.3 32 182.7 36 274.2 37.8C365.7 39.7 457.3 39.3 548.8 36.2C640.3 33 731.7 27 823 24.5C914.3 22 1005.7 23 1097 23.8C1188.3 24.7 1279.7 25.3 1371.2 30C1462.7 34.7 1554.3 43.3 1645.8 44.7C1737.3 46 1828.7 40 1874.3 37L1920 34L1920 101L1874.3 101C1828.7 101 1737.3 101 1645.8 101C1554.3 101 1462.7 101 1371.2 101C1279.7 101 1188.3 101 1097 101C1005.7 101 914.3 101 823 101C731.7 101 640.3 101 548.8 101C457.3 101 365.7 101 274.2 101C182.7 101 91.3 101 45.7 101L0 101Z"
              fill="#183566"
            ></path>
            <path
              d="M0 38L45.7 38.7C91.3 39.3 182.7 40.7 274.2 43.8C365.7 47 457.3 52 548.8 51C640.3 50 731.7 43 823 41.2C914.3 39.3 1005.7 42.7 1097 46.2C1188.3 49.7 1279.7 53.3 1371.2 53.8C1462.7 54.3 1554.3 51.7 1645.8 48.8C1737.3 46 1828.7 43 1874.3 41.5L1920 40L1920 101L1874.3 101C1828.7 101 1737.3 101 1645.8 101C1554.3 101 1462.7 101 1371.2 101C1279.7 101 1188.3 101 1097 101C1005.7 101 914.3 101 823 101C731.7 101 640.3 101 548.8 101C457.3 101 365.7 101 274.2 101C182.7 101 91.3 101 45.7 101L0 101Z"
              fill="#142d58"
            ></path>
            <path
              d="M0 53L45.7 55.8C91.3 58.7 182.7 64.3 274.2 64.5C365.7 64.7 457.3 59.3 548.8 59.2C640.3 59 731.7 64 823 63.5C914.3 63 1005.7 57 1097 54.3C1188.3 51.7 1279.7 52.3 1371.2 53.7C1462.7 55 1554.3 57 1645.8 59.8C1737.3 62.7 1828.7 66.3 1874.3 68.2L1920 70L1920 101L1874.3 101C1828.7 101 1737.3 101 1645.8 101C1554.3 101 1462.7 101 1371.2 101C1279.7 101 1188.3 101 1097 101C1005.7 101 914.3 101 823 101C731.7 101 640.3 101 548.8 101C457.3 101 365.7 101 274.2 101C182.7 101 91.3 101 45.7 101L0 101Z"
              fill="#10264b"
            ></path>
            <path
              d="M0 79L45.7 78.3C91.3 77.7 182.7 76.3 274.2 74.5C365.7 72.7 457.3 70.3 548.8 71.2C640.3 72 731.7 76 823 76.7C914.3 77.3 1005.7 74.7 1097 72.7C1188.3 70.7 1279.7 69.3 1371.2 70.7C1462.7 72 1554.3 76 1645.8 76.5C1737.3 77 1828.7 74 1874.3 72.5L1920 71L1920 101L1874.3 101C1828.7 101 1737.3 101 1645.8 101C1554.3 101 1462.7 101 1371.2 101C1279.7 101 1188.3 101 1097 101C1005.7 101 914.3 101 823 101C731.7 101 640.3 101 548.8 101C457.3 101 365.7 101 274.2 101C182.7 101 91.3 101 45.7 101L0 101Z"
              fill="#0c1e3e"
            ></path>
            <path
              d="M0 84L45.7 82.8C91.3 81.7 182.7 79.3 274.2 77.8C365.7 76.3 457.3 75.7 548.8 76.2C640.3 76.7 731.7 78.3 823 81.2C914.3 84 1005.7 88 1097 88.5C1188.3 89 1279.7 86 1371.2 85C1462.7 84 1554.3 85 1645.8 85.7C1737.3 86.3 1828.7 86.7 1874.3 86.8L1920 87L1920 101L1874.3 101C1828.7 101 1737.3 101 1645.8 101C1554.3 101 1462.7 101 1371.2 101C1279.7 101 1188.3 101 1097 101C1005.7 101 914.3 101 823 101C731.7 101 640.3 101 548.8 101C457.3 101 365.7 101 274.2 101C182.7 101 91.3 101 45.7 101L0 101Z"
              fill="#081731"
            ></path>
          </svg>
        </div>
      </section>
      <section className="w-full relative">
        <div className="flex flex-col md:px-80 h-full w-full max-w-[1920px] mx-auto justify-center pt-24 pb-36">
          <div className="flex gap-x-2 items-center mb-4">
            <div className="h-px bg-creatBright w-8" />
            <h1 className="text-creatBright font-medium">Our Services</h1>
          </div>
          <div className="flex w-full justify-between items-end">
            <TextAnim>
              <h1 className="text-5xl font-medium leading-tight">
                Comprehensive Solutions <br /> Tailored to
                <span className="inline-block relative px-6">
                  {" "}
                  You
                  <img
                    src="/icons/circle.svg"
                    alt=""
                    className="absolute w-full
                    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  />
                </span>
              </h1>
            </TextAnim>
            <Link
              href="/services"
              className="md:rounded-lg md:py-5 md:px-7 uppercase w-fit group border-2 border-white/10 font-medium
              hover:bg-creatBright hover:border-creatBright transition-all duration-300 flex flex-shrink-0 md:gap-x-3 items-center
              hover:shadow-drop-shadow-button-creatBright"
            >
              <h1 className="md:text-lg font-semibold">View All Services</h1>
              <div
                className="flex items-center justify-center md:h-6 aspect-square
                relative overflow-hidden"
              >
                <FaArrowRight
                  className="absolute text-base top-1/2 -translate-y-1/2 left-1/2
                -translate-x-[200%] transition-all duration-300 group-hover:-translate-x-1/2"
                />
                <FaArrowRight
                  className="absolute text-base top-1/2 -translate-y-1/2 left-1/2
                -translate-x-1/2 transition-all duration-300 group-hover:translate-x-[200%]"
                />
              </div>
            </Link>
          </div>
          <div className="w-full mt-16">
            <TextAnim delay={0.2}>
              <p className="text-neutral-300 text-2xl">
                <span className="text-creatBright font-semibold">
                  CREAT Company LLC{" "}
                </span>
                offers a wide range of project management services
                <br />
                These services cover all stages from the beginning to the end of
                the project
              </p>
            </TextAnim>
          </div>
          <div className="grid md:grid-cols-3 gap-8 w-full mt-16">
            <GlareCard
              className="group"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-20 h-20"
                >
                  <path
                    className="transition-colors duration-1000 fill-white/50 group-hover:fill-green-800/50"
                    d="M29 14h-1v-4h-2v4h-2v-4h-2v4h-1a1 1 0 0 0-1 1v4a5.01 5.01 0 0 0 4 4.899V27a1 1 0 0 1-1 1H5a1 1 0 0 1 0-2h5a3 3 0 0 0 0-6H5a1 1 0 0 1 0-2h5a3.003 3.003 0 0 0 3-3v-4h1a4.005 4.005 0 0 0 4-4V4h-3a3.98 3.98 0 0 0-2.747 1.106A6 6 0 0 0 7 2H4v3a6.007 6.007 0 0 0 6 6h1v4a1 1 0 0 1-1 1H5a3 3 0 0 0 0 6h5a1 1 0 0 1 0 2H5a3 3 0 0 0 0 6h18a3.003 3.003 0 0 0 3-3v-3.101A5.01 5.01 0 0 0 30 19v-4a1 1 0 0 0-1-1M13 8a2 2 0 0 1 2-2h1v1a2 2 0 0 1-2 2h-1Zm-3 1a4.005 4.005 0 0 1-4-4V4h1a4.005 4.005 0 0 1 4 4v1Zm18 10a3 3 0 0 1-6 0v-3h6Z"
                  ></path>
                </svg>
              }
              name="Green Energy"
              text="We are committed to sustainability and environmental stewardship.That's why we offer renewable energy solutions"
            />

            <GlareCard
              className="group"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20"
                  viewBox="0 0 512 512"
                >
                  <path
                    className="transition-colors duration-1000 fill-white/50 group-hover:fill-cyan-800/50"
                    d="M360.848 22.51L0 113.456L85.163 489.49L512 357.774zm104.72 313.314l-57.37 17.351l-15.834-86.248l-12.89 3.273l-63.58-158.109l47.772-12.67zM360.325 91.671l-47.631 12.46l-15.951-39.667L343.44 52.5zm-72.551-24.909l15.725 39.774l-174.233 45.575l-3.378-10.977l-77.612 36.79l-11.47-46.854zM112.81 442.594l-39.315-160.69l160.393-44.408l51.417 152.683zm161.436-272.773L60.488 227.809L48.43 178.555l86.453-7.41l-3.295-10.167l175.075-46.438l62.841 158.948l-13.363 4.236l50.876 75.809l-59.063 17.863zM148.565 378.208c-33.107-19.087-31.347-66.645 3.161-85.084c33.704-18.01 74.81-1.317 76.918 40.83c1.974 39.47-46.972 63.34-80.08 44.254m72.522-45.626c-3.004-35.527-36.778-49.694-66.138-34.006c-30.06 16.063-29.866 58.072-.753 74.214c27.301 15.137 69.957-3.951 66.891-40.208m-59.82 28.56l4.79-46.585l9.839-3.134l27.95 36.049l-7.579 4.212l-8.036-10.171l-17.476 5.113l-.78 11.991zm9.84-21.681l13.178-3.943l-11.696-15.71z"
                  />
                </svg>
              }
              name="Tecnical Planning"
              text="We are focused on precision and innovation. Therefore we offer expert technical design services for everyone"
            />

            <GlareCard
              className="group"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20"
                  viewBox="0 0 64 64"
                >
                  <path
                    className="transition-colors duration-1000 fill-white/50 group-hover:fill-amber-600/50"
                    d="M58 8h-4V4.801C54 3.26 52.842 2 51.43 2H38.566C37.158 2 36 3.26 36 4.801V8H11.941L6 20h4.125v8h-.668l-3.332 4l3.332 4h.73v2.148c0 .543.419.982.938.982c1.551 0 2.813 1.324 2.813 2.951s-1.262 2.951-2.813 2.951s-2.813-1.324-2.813-2.951c0-.543-.42-.982-.938-.982c-.519 0-.938.439-.938.982C6.438 44.795 8.54 47 11.125 47s4.688-2.205 4.688-4.918c0-2.375-1.613-4.363-3.75-4.818V36h.729l3.333-4l-3.333-4h-.667v-8H36v7.199c0 1.328.861 2.441 2 2.727V62h2.625v-6l8.75 3l-8.75 3H52V29.925c1.14-.285 2-1.398 2-2.726V20h4v-3h-2.078L58 13.055zm-47.357 9l2.336-4.799L15.505 17zm4.422-6h4.153l-2.076 3.945zm3.714 6l2.077-3.945L22.934 17zm3.715-6h4.153l-2.077 3.945zm3.715 6l2.076-3.945L30.361 17zm3.714-6h4.153L32 14.945zM36 17h-2.363l2.076-3.945l.287.545zm13.375 39l-8.75-3l8.75-3zm-8.75-6v-6l8.75 3.002zm8.75-6l-8.75-3l8.75-3zm-8.75-6v-5.998L49.375 35zm8.75-5.998L43.54 30h5.835zm1.5-16.754c0 .963-.676 1.752-1.5 1.752h-9.002c-.824 0-1.498-.789-1.498-1.752v-8.49c0-.969.674-1.758 1.498-1.758h9.002c.824 0 1.5.789 1.5 1.758zm3.41-.303L54 14.403V11h2.361z"
                  />
                </svg>
              }
              name="Construction & Management"
              text="We ensure seamless execution and timely completion, while providing comprehensive project management"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[100px] pointer-events-none translate-y-[calc(100%-1px)] z-10">
          <svg
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            fill="#081731"
            viewBox="0 0 1920 100"
          >
            <path
              d="M0 43L40 44.3C80 45.7 160 48.3 240 56.5C320 64.7 400 78.3 480 76C560 73.7 640 55.3 720 52.3C800 49.3 880 61.7 960 59.8C1040 58 1120 42 1200 34.8C1280 27.7 1360 29.3 1440 33.3C1520 37.3 1600 43.7 1680 42.5C1760 41.3 1840 32.7 1880 28.3L1920 24L1920 0L1880 0C1840 0 1760 0 1680 0C1600 0 1520 0 1440 0C1360 0 1280 0 1200 0C1120 0 1040 0 960 0C880 0 800 0 720 0C640 0 560 0 480 0C400 0 320 0 240 0C160 0 80 0 40 0L0 0Z"
              strokeLinecap="round"
              strokeLinejoin="miter"
            ></path>
          </svg>
        </div>
      </section>
      {/* About Part Goes Here  */}
      <section className="w-full py-36 relative bg-creatBGLight">
        <div className="flex flex-col md:px-80 h-full w-full max-w-[1920px] mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2 items-center mb-4">
              <div className="h-px bg-creatBright w-8" />
              <h1 className="text-creatBright font-medium">About Us</h1>
            </div>
            <Link
              href="/about"
              className="uppercase font-bold text-white
              hover:text-white/50 transition-colors duration-300"
            >
              More About Us
            </Link>
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <TextAnim>
              <h1 className="font-bold text-4xl text-creatBright">
                CREAT Company LLC
              </h1>
            </TextAnim>
            <ParagraphAnimation>
              <p className="text-white text-2xl">
                Achieve Project Success with Alternative Energy and Innovative
                Approaches
              </p>
            </ParagraphAnimation>
          </div>
          <div className="w-full mt-12 flex flex-col gap-y-4">
            <ParagraphAnimation>
              <p className="text-white text-2xl">
                CREAT Company LLC has been recognized for delivering
                high-quality and innovative projects across several key sectors
                since its establishment in 2019. Our company has extensive
                experience in modern construction and design fields,
                implementing each project according to the specific needs of our
                clients, driven by innovation and technological advancements.
                Our goal is to meet our clients' needs at the highest level in
                every project, ensuring their long-term success
              </p>
            </ParagraphAnimation>
            <ParagraphAnimation>
              <p className="text-white text-2xl">
                At CREAT Company LLC, we prioritize quality, sustainability, and
                customer satisfaction in every project. We are committed to
                delivering more successful projects in the future
              </p>
            </ParagraphAnimation>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[100px] pointer-events-none translate-y-[calc(100%-1px)] z-10">
          <svg
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            fill="#0c3d91"
            viewBox="0 0 1920 100"
          >
            <path
              d="M0 43L40 44.3C80 45.7 160 48.3 240 56.5C320 64.7 400 78.3 480 76C560 73.7 640 55.3 720 52.3C800 49.3 880 61.7 960 59.8C1040 58 1120 42 1200 34.8C1280 27.7 1360 29.3 1440 33.3C1520 37.3 1600 43.7 1680 42.5C1760 41.3 1840 32.7 1880 28.3L1920 24L1920 0L1880 0C1840 0 1760 0 1680 0C1600 0 1520 0 1440 0C1360 0 1280 0 1200 0C1120 0 1040 0 960 0C880 0 800 0 720 0C640 0 560 0 480 0C400 0 320 0 240 0C160 0 80 0 40 0L0 0Z"
              strokeLinecap="round"
              strokeLinejoin="miter"
            ></path>
          </svg>
        </div>
      </section>
      <section className="w-full pt-36 pb-72 relative">
        <div className="flex flex-col md:px-80 h-full w-full max-w-[1920px] mx-auto">
          <div className="flex gap-x-2 items-center mb-4">
            <div className="h-px bg-creatBright w-8" />
            <h1 className="text-creatBright font-medium">Our Projects</h1>
          </div>
          <div
            ref={projectsRef}
            className="w-full flex justify-between items-center mb-16"
          >
            <TextAnim>
              <h1 className="text-5xl font-medium leading-tight text-nowrap">
                Explore Our Projects <br /> That{" "}
                <span className="text-creatBright font-bold uppercase">
                  Inspire
                </span>
              </h1>
            </TextAnim>
            <Link
              href="/projects"
              className="md:rounded-lg md:py-5 md:px-7 uppercase w-fit group border-2 border-white/10 font-medium
              hover:bg-creatBright hover:border-creatBright transition-all duration-300 flex md:gap-x-3 items-center
              hover:shadow-drop-shadow-button-creatBright"
            >
              <h1 className="md:text-lg font-semibold">View All Projects</h1>
              <div
                className="flex items-center justify-center md:h-6 aspect-square
                relative overflow-hidden"
              >
                <FaArrowRight
                  className="absolute text-base top-1/2 -translate-y-1/2 left-1/2
                -translate-x-[200%] transition-all duration-300 group-hover:-translate-x-1/2"
                />
                <FaArrowRight
                  className="absolute text-base top-1/2 -translate-y-1/2 left-1/2
                -translate-x-1/2 transition-all duration-300 group-hover:translate-x-[200%]"
                />
              </div>
            </Link>
          </div>
          <div className="flex w-full items-center justify-around gap-x-6">
            <ProjectCard
              projectsInView={projectsInView}
              id={1}
              name="HDEC (PowerChina)"
              link="https://creat.az/projects/hdec-powerchina-x-z-rayonunda-avtomobil-k-rp-s-v-k-l-k-turbinl-ri-layih-l-ri-85"
              image={`${BASE_URI}/home/projects/hdec.png`}
              desc="HDEC (PowerChina), Xızı rayonu ərazisində inşa etdiyi avtomobil körpüsü
və külək turbinləri layihəsi ilə əlaqədar müasir infrastruktur və bərpa
olunan enerji sahəsində mühüm addımlar atır. Bu layihələr ətraf mühitin
qorunması və enerji səmərəliliyini artırmaq məqsədini daşıyır."
            />

            <ProjectCard
              projectsInView={projectsInView}
              id={2}
              delay={0.1}
              name="ACWA Power külək turbinləri"
              link="http://creat.az/projects/acwa-power-t-r-find-n-qobustan-rayonunda-in-a-edil-n-k-l-k-turbinl-ri-layih-si-86"
              image={`${BASE_URI}/home/projects/acwa.jpg`}
              desc="The 240 MW Wind Farm, developed by ACWA Power and CREAT LLC, will be located in Absheron and Khizi districts. Implemented under presidential order, this greenfield Independent Power Project marks a significant step towards sustainable energy"
            />

            <ProjectCard
              projectsInView={projectsInView}
              id={3}
              delay={0.2}
              name="AzerGold QSC Çovdar"
              link="http://creat.az/projects/azergold-qsc-ovdar-filiz-emal-sah-sind-m-d-n-i-l-rinin-layih-l-ndirilm-si-111"
              image={`${BASE_URI}/home/projects/azergold.png`}
              desc="AzerGold QSC Çovdar Filiz Emalı Sahəsində Mədən
İşlərinin Layihələndirilməsi və 1 Ədəd 5.8 mln. Kubluq
Topaşındırmanın Layihələndirilməsi. Layihə çərçivəsində,
məhsuldarlığın artırılması və təhlükəsizlik tədbirlərinin
təmin edilməsi məqsədilə müasir texnologiyaların tətbiqi
nəzərdə tutulub."
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[100px] pointer-events-none translate-y-[calc(100%-1px)]">
          <svg
            fill="#081731"
            preserveAspectRatio="none"
            viewBox="0 0 1920 100"
            width="100%"
            height="100%"
          >
            <path
              d="M0 11L32 15.7C64 20.3 128 29.7 192 29C256 28.3 320 17.7 384 16.2C448 14.7 512 22.3 576 27.5C640 32.7 704 35.3 768 37.8C832 40.3 896 42.7 960 42.7C1024 42.7 1088 40.3 1152 39.2C1216 38 1280 38 1344 32C1408 26 1472 14 1536 12C1600 10 1664 18 1728 25.2C1792 32.3 1856 38.7 1888 41.8L1920 45L1920 0L1888 0C1856 0 1792 0 1728 0C1664 0 1600 0 1536 0C1472 0 1408 0 1344 0C1280 0 1216 0 1152 0C1088 0 1024 0 960 0C896 0 832 0 768 0C704 0 640 0 576 0C512 0 448 0 384 0C320 0 256 0 192 0C128 0 64 0 32 0L0 0Z"
              strokeLinecap="round"
              strokeLinejoin="miter"
            ></path>
          </svg>
        </div>
      </section>
      <section className="w-full py-36 bg-creatBGLight">
        <div className="flex flex-col h-full w-full">
          <div className="flex flex-col h-full w-full max-w-[1920px] mx-auto md:px-80">
            <div className="flex gap-x-2 items-center mb-4">
              <div className="h-px bg-creatBright w-8" />
              <h1 className="text-creatBright font-medium">Testimonial</h1>
            </div>
            <div className="w-full flex justify-between items-center mb-16">
              <TextAnim>
                <h1 className="text-5xl font-medium leading-tight text-nowrap">
                  What Our{" "}
                  <span className="text-creatBright font-bold">Clients</span>{" "}
                  Say
                  <br /> About Us
                </h1>
              </TextAnim>
            </div>
          </div>
          <div className="flex w-full items-center">
            <div className="flex flex-col w-1/2 h-fit">
              <motion.div
                onHoverStart={() => stopAutoCycle()}
                onHoverEnd={() => startAutoCycle()}
                className="w-full overflow-hidden h-[280px] relative"
              >
                {testimonials.map((t, index) => (
                  <motion.div
                    animate={{
                      scale: index === activeIndexTestimonial ? 1 : 0.8,
                      x: index === activeIndexTestimonial ? 0 : -100,
                      zIndex: index === activeIndexTestimonial ? 1 : 0,
                    }}
                    className="absolute top-4 right-4"
                    transition={{
                      mass: 0.5,
                      stiffness: 100,
                      type: "spring",
                    }}
                    key={index}
                  >
                    <Comment
                      stars={t.stars}
                      comment={t.comment}
                      name={t.name}
                      role={t.role}
                    />
                  </motion.div>
                ))}
              </motion.div>
              <div className="flex gap-x-12 w-fit items-center justify-center p-4 ml-auto mr-[303px] translate-x-1/2">
                <motion.div
                  animate={{
                    scale: isAutoCycleOn ? 1 : 1.2,
                    x: isAutoCycleOn ? 0 : -10,
                  }}
                  whileTap={{
                    x: -10,
                    rotate: -15,
                  }}
                  whileHover={{
                    rotate: 15,
                  }}
                  onClick={() => {
                    handleClickLeftTestimonial();
                  }}
                  className={`w-10 h-10 bg-creatBright rounded-full flex items-center justify-center
                  outline outline-2 outline-creatBright outline-offset-4 cursor-pointer`}
                >
                  <motion.span>
                    <FaArrowLeft className="text-xl text-creatBGLight" />
                  </motion.span>
                </motion.div>
                <motion.div
                  animate={{
                    scale: isAutoCycleOn ? 1 : 1.2,
                    x: isAutoCycleOn ? 0 : 10,
                  }}
                  whileTap={{
                    x: 10,
                    rotate: 15,
                  }}
                  whileHover={{
                    rotate: -15,
                  }}
                  onClick={() => {
                    handleClickRightTestimonial();
                  }}
                  className={`w-10 h-10 bg-creatBright rounded-full flex items-center justify-center
                  outline outline-2 outline-creatBright outline-offset-4 cursor-pointer`}
                >
                  <FaArrowRight className="text-xl text-creatBGLight" />
                </motion.div>
              </div>
            </div>
            <div className="w-1/2 min-h-[500px] flex items-center justify-center relative p-4">
              <motion.div
                className="relative w-[420px] h-[580px]"
                onHoverStart={() => stopAutoCycle()}
                onHoverEnd={() => startAutoCycle()}
              >
                {testimonials.map((t, index) => {
                  const position = index - activeIndexTestimonial;
                  const isActive = position === 0;
                  const isPrevious = position === -1;
                  const isNext = position === 1;
                  const isFarLeft = position < -1;
                  const isFarRight = position > 1;

                  return (
                    <motion.div
                      key={index}
                      className="absolute top-0 left-0 w-full h-full bg-white rounded-lg shadow-lg overflow-hidden"
                      style={{
                        originX: 0.5,
                        originY: 0.5,
                        zIndex: testimonials.length - Math.abs(position),
                      }}
                      animate={{
                        scale: isActive ? 1 : isPrevious || isNext ? 0.9 : 0.8,
                        rotate: isActive
                          ? 0
                          : isPrevious
                            ? -5
                            : isNext
                              ? 5
                              : isFarLeft
                                ? -15
                                : isFarRight
                                  ? 15
                                  : 0,
                        x: isActive
                          ? 0
                          : isPrevious
                            ? -20
                            : isNext
                              ? 20
                              : isFarLeft
                                ? -100
                                : isFarRight
                                  ? 100
                                  : 0,
                        y: isActive ? 0 : 20,
                        opacity: isActive ? 1 : isPrevious || isNext ? 0.7 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        mass: 0.5,
                      }}
                    >
                      <div className="w-full h-full relative">
                        {/* Client image */}
                        <div className="relative w-full h-full overflow-hidden rounded-md drop-shadow-md">
                          <Image
                            src={`${BASE_URI}/home/letters/${t.image}`}
                            alt={t.name}
                            fill
                            quality={70}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full min-h-[600px] py-36 bg-creatBG relative flex items-center justify-center">
        <EmailForm />
        <div className="absolute w-full h-[300px] top-[-2px] left-0">
          <svg
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 1920 300"
          >
            <path
              d="M0 31L32 29C64 27 128 23 192 21C256 19 320 19 384 19.5C448 20 512 21 576 19.5C640 18 704 14 768 15.5C832 17 896 24 960 28C1024 32 1088 33 1152 30C1216 27 1280 20 1344 19.5C1408 19 1472 25 1536 28.5C1600 32 1664 33 1728 31.5C1792 30 1856 26 1888 24L1920 22L1920 0L1888 0C1856 0 1792 0 1728 0C1664 0 1600 0 1536 0C1472 0 1408 0 1344 0C1280 0 1216 0 1152 0C1088 0 1024 0 960 0C896 0 832 0 768 0C704 0 640 0 576 0C512 0 448 0 384 0C320 0 256 0 192 0C128 0 64 0 32 0L0 0Z"
              fill="#0c3d91"
            ></path>
            <path
              d="M0 55L32 52C64 49 128 43 192 40C256 37 320 37 384 39.5C448 42 512 47 576 45.5C640 44 704 36 768 35C832 34 896 40 960 46C1024 52 1088 58 1152 59C1216 60 1280 56 1344 55C1408 54 1472 56 1536 57C1600 58 1664 58 1728 59C1792 60 1856 62 1888 63L1920 64L1920 20L1888 22C1856 24 1792 28 1728 29.5C1664 31 1600 30 1536 26.5C1472 23 1408 17 1344 17.5C1280 18 1216 25 1152 28C1088 31 1024 30 960 26C896 22 832 15 768 13.5C704 12 640 16 576 17.5C512 19 448 18 384 17.5C320 17 256 17 192 19C128 21 64 25 32 27L0 29Z"
              fill="#073884"
            ></path>
            <path
              d="M0 73L32 73.5C64 74 128 75 192 76.5C256 78 320 80 384 82.5C448 85 512 88 576 83.5C640 79 704 67 768 66C832 65 896 75 960 82C1024 89 1088 93 1152 94C1216 95 1280 93 1344 90C1408 87 1472 83 1536 80.5C1600 78 1664 77 1728 81.5C1792 86 1856 96 1888 101L1920 106L1920 62L1888 61C1856 60 1792 58 1728 57C1664 56 1600 56 1536 55C1472 54 1408 52 1344 53C1280 54 1216 58 1152 57C1088 56 1024 50 960 44C896 38 832 32 768 33C704 34 640 42 576 43.5C512 45 448 40 384 37.5C320 35 256 35 192 38C128 41 64 47 32 50L0 53Z"
              fill="#053478"
            ></path>
            <path
              d="M0 85L32 88C64 91 128 97 192 98C256 99 320 95 384 97C448 99 512 107 576 105.5C640 104 704 93 768 92.5C832 92 896 102 960 107C1024 112 1088 112 1152 113C1216 114 1280 116 1344 114.5C1408 113 1472 108 1536 104.5C1600 101 1664 99 1728 101C1792 103 1856 109 1888 112L1920 115L1920 104L1888 99C1856 94 1792 84 1728 79.5C1664 75 1600 76 1536 78.5C1472 81 1408 85 1344 88C1280 91 1216 93 1152 92C1088 91 1024 87 960 80C896 73 832 63 768 64C704 65 640 77 576 81.5C512 86 448 83 384 80.5C320 78 256 76 192 74.5C128 73 64 72 32 71.5L0 71Z"
              fill="#052f6b"
            ></path>
            <path
              d="M0 112L32 118.5C64 125 128 138 192 139.5C256 141 320 131 384 133C448 135 512 149 576 151C640 153 704 143 768 142.5C832 142 896 151 960 152.5C1024 154 1088 148 1152 146.5C1216 145 1280 148 1344 151C1408 154 1472 157 1536 155.5C1600 154 1664 148 1728 147C1792 146 1856 150 1888 152L1920 154L1920 113L1888 110C1856 107 1792 101 1728 99C1664 97 1600 99 1536 102.5C1472 106 1408 111 1344 112.5C1280 114 1216 112 1152 111C1088 110 1024 110 960 105C896 100 832 90 768 90.5C704 91 640 102 576 103.5C512 105 448 97 384 95C320 93 256 97 192 96C128 95 64 89 32 86L0 83Z"
              fill="#052a5f"
            ></path>
            <path
              d="M0 136L32 142.5C64 149 128 162 192 162C256 162 320 149 384 151.5C448 154 512 172 576 174.5C640 177 704 164 768 161.5C832 159 896 167 960 167.5C1024 168 1088 161 1152 158.5C1216 156 1280 158 1344 163C1408 168 1472 176 1536 176C1600 176 1664 168 1728 165C1792 162 1856 164 1888 165L1920 166L1920 152L1888 150C1856 148 1792 144 1728 145C1664 146 1600 152 1536 153.5C1472 155 1408 152 1344 149C1280 146 1216 143 1152 144.5C1088 146 1024 152 960 150.5C896 149 832 140 768 140.5C704 141 640 151 576 149C512 147 448 133 384 131C320 129 256 139 192 137.5C128 136 64 123 32 116.5L0 110Z"
              fill="#062553"
            ></path>
            <path
              d="M0 205L32 209.5C64 214 128 223 192 227.5C256 232 320 232 384 232C448 232 512 232 576 230C640 228 704 224 768 222.5C832 221 896 222 960 226.5C1024 231 1088 239 1152 242C1216 245 1280 243 1344 245.5C1408 248 1472 255 1536 254.5C1600 254 1664 246 1728 238C1792 230 1856 222 1888 218L1920 214L1920 164L1888 163C1856 162 1792 160 1728 163C1664 166 1600 174 1536 174C1472 174 1408 166 1344 161C1280 156 1216 154 1152 156.5C1088 159 1024 166 960 165.5C896 165 832 157 768 159.5C704 162 640 175 576 172.5C512 170 448 152 384 149.5C320 147 256 160 192 160C128 160 64 147 32 140.5L0 134Z"
              fill="#072047"
            ></path>
          </svg>
        </div>
        <div className="absolute w-full h-[300px] bottom-0 left-0 translate-y-[1px]">
          <svg
            viewBox="0 0 1920 300"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
          >
            <path
              d="M0 70L32 75.5C64 81 128 92 192 95.5C256 99 320 95 384 86C448 77 512 63 576 58C640 53 704 57 768 55.5C832 54 896 47 960 53C1024 59 1088 78 1152 88.5C1216 99 1280 101 1344 92C1408 83 1472 63 1536 51.5C1600 40 1664 37 1728 43C1792 49 1856 64 1888 71.5L1920 79L1920 0L1888 0C1856 0 1792 0 1728 0C1664 0 1600 0 1536 0C1472 0 1408 0 1344 0C1280 0 1216 0 1152 0C1088 0 1024 0 960 0C896 0 832 0 768 0C704 0 640 0 576 0C512 0 448 0 384 0C320 0 256 0 192 0C128 0 64 0 32 0L0 0Z"
              fill="#081731"
            ></path>
            <path
              d="M0 127L32 126.5C64 126 128 125 192 122.5C256 120 320 116 384 108.5C448 101 512 90 576 85.5C640 81 704 83 768 82.5C832 82 896 79 960 85C1024 91 1088 106 1152 117.5C1216 129 1280 137 1344 129.5C1408 122 1472 99 1536 87.5C1600 76 1664 76 1728 84C1792 92 1856 108 1888 116L1920 124L1920 77L1888 69.5C1856 62 1792 47 1728 41C1664 35 1600 38 1536 49.5C1472 61 1408 81 1344 90C1280 99 1216 97 1152 86.5C1088 76 1024 57 960 51C896 45 832 52 768 53.5C704 55 640 51 576 56C512 61 448 75 384 84C320 93 256 97 192 93.5C128 90 64 79 32 73.5L0 68Z"
              fill="#081c3c"
            ></path>
            <path
              d="M0 151L32 149C64 147 128 143 192 143C256 143 320 147 384 143.5C448 140 512 129 576 121C640 113 704 108 768 107.5C832 107 896 111 960 121C1024 131 1088 147 1152 156.5C1216 166 1280 169 1344 157.5C1408 146 1472 120 1536 111C1600 102 1664 110 1728 118C1792 126 1856 134 1888 138L1920 142L1920 122L1888 114C1856 106 1792 90 1728 82C1664 74 1600 74 1536 85.5C1472 97 1408 120 1344 127.5C1280 135 1216 127 1152 115.5C1088 104 1024 89 960 83C896 77 832 80 768 80.5C704 81 640 79 576 83.5C512 88 448 99 384 106.5C320 114 256 118 192 120.5C128 123 64 124 32 124.5L0 125Z"
              fill="#072047"
            ></path>
            <path
              d="M0 172L32 170C64 168 128 164 192 166C256 168 320 176 384 173.5C448 171 512 158 576 149C640 140 704 135 768 134C832 133 896 136 960 144C1024 152 1088 165 1152 173C1216 181 1280 184 1344 175.5C1408 167 1472 147 1536 137.5C1600 128 1664 129 1728 134C1792 139 1856 148 1888 152.5L1920 157L1920 140L1888 136C1856 132 1792 124 1728 116C1664 108 1600 100 1536 109C1472 118 1408 144 1344 155.5C1280 167 1216 164 1152 154.5C1088 145 1024 129 960 119C896 109 832 105 768 105.5C704 106 640 111 576 119C512 127 448 138 384 141.5C320 145 256 141 192 141C128 141 64 145 32 147L0 149Z"
              fill="#062553"
            ></path>
            <path
              d="M0 208L32 208C64 208 128 208 192 209C256 210 320 212 384 214C448 216 512 218 576 220.5C640 223 704 226 768 224.5C832 223 896 217 960 216C1024 215 1088 219 1152 221.5C1216 224 1280 225 1344 228C1408 231 1472 236 1536 233.5C1600 231 1664 221 1728 221.5C1792 222 1856 233 1888 238.5L1920 244L1920 155L1888 150.5C1856 146 1792 137 1728 132C1664 127 1600 126 1536 135.5C1472 145 1408 165 1344 173.5C1280 182 1216 179 1152 171C1088 163 1024 150 960 142C896 134 832 131 768 132C704 133 640 138 576 147C512 156 448 169 384 171.5C320 174 256 166 192 164C128 162 64 166 32 168L0 170Z"
              fill="#052a5f"
            ></path>
            <path
              d="M0 241L32 241.5C64 242 128 243 192 244C256 245 320 246 384 245.5C448 245 512 243 576 243C640 243 704 245 768 246C832 247 896 247 960 245C1024 243 1088 239 1152 241C1216 243 1280 251 1344 255.5C1408 260 1472 261 1536 259C1600 257 1664 252 1728 252.5C1792 253 1856 259 1888 262L1920 265L1920 242L1888 236.5C1856 231 1792 220 1728 219.5C1664 219 1600 229 1536 231.5C1472 234 1408 229 1344 226C1280 223 1216 222 1152 219.5C1088 217 1024 213 960 214C896 215 832 221 768 222.5C704 224 640 221 576 218.5C512 216 448 214 384 212C320 210 256 208 192 207C128 206 64 206 32 206L0 206Z"
              fill="#052f6b"
            ></path>
            <path
              d="M0 256L32 259C64 262 128 268 192 268.5C256 269 320 264 384 262.5C448 261 512 263 576 265C640 267 704 269 768 270C832 271 896 271 960 269C1024 267 1088 263 1152 262.5C1216 262 1280 265 1344 267C1408 269 1472 270 1536 271.5C1600 273 1664 275 1728 276C1792 277 1856 277 1888 277L1920 277L1920 263L1888 260C1856 257 1792 251 1728 250.5C1664 250 1600 255 1536 257C1472 259 1408 258 1344 253.5C1280 249 1216 241 1152 239C1088 237 1024 241 960 243C896 245 832 245 768 244C704 243 640 241 576 241C512 241 448 243 384 243.5C320 244 256 243 192 242C128 241 64 240 32 239.5L0 239Z"
              fill="#053478"
            ></path>
            <path
              d="M0 280L32 281.5C64 283 128 286 192 285.5C256 285 320 281 384 280.5C448 280 512 283 576 285C640 287 704 288 768 288C832 288 896 287 960 286.5C1024 286 1088 286 1152 285.5C1216 285 1280 284 1344 284C1408 284 1472 285 1536 286.5C1600 288 1664 290 1728 290.5C1792 291 1856 290 1888 289.5L1920 289L1920 275L1888 275C1856 275 1792 275 1728 274C1664 273 1600 271 1536 269.5C1472 268 1408 267 1344 265C1280 263 1216 260 1152 260.5C1088 261 1024 265 960 267C896 269 832 269 768 268C704 267 640 265 576 263C512 261 448 259 384 260.5C320 262 256 267 192 266.5C128 266 64 260 32 257L0 254Z"
              fill="#073884"
            ></path>
            <path
              d="M0 301L32 301C64 301 128 301 192 301C256 301 320 301 384 301C448 301 512 301 576 301C640 301 704 301 768 301C832 301 896 301 960 301C1024 301 1088 301 1152 301C1216 301 1280 301 1344 301C1408 301 1472 301 1536 301C1600 301 1664 301 1728 301C1792 301 1856 301 1888 301L1920 301L1920 287L1888 287.5C1856 288 1792 289 1728 288.5C1664 288 1600 286 1536 284.5C1472 283 1408 282 1344 282C1280 282 1216 283 1152 283.5C1088 284 1024 284 960 284.5C896 285 832 286 768 286C704 286 640 285 576 283C512 281 448 278 384 278.5C320 279 256 283 192 283.5C128 284 64 281 32 279.5L0 278Z"
              fill="#0c3d91"
            ></path>
          </svg>
        </div>
      </section>
      <Footer />
    </main>
    // TODO add keep alive to supabase via vercel https://github.com/travisvn/supabase-pause-prevention
  );
}
