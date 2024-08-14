"use client";
import Card from "@/components/iconCard";
import Nav from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { motion, useInView } from "framer-motion";
import ProjectCard from "@/components/projectCard";

export default function Home() {
  type partners = { logo: string, link: string, name: string }
  const partners: partners[] = [
    {
      logo: "/partners/temp1.png",
      link: "",
      name: "Partner 1"
    },
    {
      logo: "/partners/temp2.png",
      link: "",
      name: "Partner 2"
    },
    {
      logo: "/partners/temp3.png",
      link: "",
      name: "Partner 3"
    },
    {
      logo: "/partners/temp4.png",
      link: "",
      name: "Partner 4"
    },
    {
      logo: "/partners/temp5.png",
      link: "",
      name: "Partner 5"
    }
  ]

  const [activeTab, setActiveTab] = useState(0);

  type AboutTab = {
    [key: number]: {
      main: {
        name: string;
        desc: string;
      };
      tab_l: {
        name: string;
        desc: string;
      };
      tab_r: {
        name: string;
        desc: string;
      };
    };
  };
  const aboutTabs: AboutTab = {
    0: {
      main: {
        name: "Crafting Projects That Inspire",
        desc: "We are committed to exceeding client expectations by delivering innovative, sustainable, and cost-effective project solutions.",
      },
      tab_l: {
        name: "Best Project Design",
        desc: "Creat explains how you can enjoy high-end design trends like modern architecture and eco-friendly materials."
      },
      tab_r: {
        name: "Effective Teamwork",
        desc: "We build trust and integrity with our clients, ensuring seamless collaboration and outstanding results"
      }
    },
    1: {
      main: {
        name: "Shaping the Future",
        desc: "We strive to lead the industry by embracing cutting-edge technologies and sustainable practices for a brighter tomorrow."
      },
      tab_l: {
        name: "Innovative Solutions",
        desc: "Creat leverages the latest technologies to provide forward-thinking solutions tailored to modern needs."
      },
      tab_r: {
        name: "Sustainable Growth",
        desc: "Our vision focuses on creating long-term value through environmentally responsible and sustainable practices."
      }
    }
  }

  const bannerRef = useRef(null)
  const bannerInView = useInView(bannerRef, {
    once: true,
    margin: "0px 0px -20% 0px"
  });
  const [hacLoaded, setHacLoaded] = useState(false);

  const [partnerCount, setPartnerCount] = useState<number | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPartnerCount(Math.floor(window.innerWidth / 1192) * 3)
    }
  }, []);

  const projectsRef = useRef(null)
  const projectsInView = useInView(projectsRef, {
    once: false,
    margin: "0px 0px -240px 0px"
  });

  return (
    <main>
      <Nav />
      <section className="flex justify-center w-full h-[calc(100vh-178px)] max-h-[785px]">
        <div className="w-full max-w-[1920px] h-full flex relative items-center">
          <div className="md:ml-28 h-fit flex flex-col md:gap-y-4 flex-shrink-0">
            <div className="md:px-3 md:py-1 md:border-x-2 border-x-creatBright w-fit h-fit md:rounded-md bg-creatBright/5">
              <h1 className="capitalize md:text-lg font-medium text-creatBright">
                Trusted Project Partner
              </h1>
            </div>
            <div className="flex flex-col md:gap-y-4">
              <h1 className="md:text-7xl font-bold md:leading-[1.2] text-nowrap">
                Architectural <br />Services with
                {" "}<span className="text-creatBright font-bold md:tracking-wide">
                  Creat
                </span>
              </h1>
              <p className="md:text-xl text-neutral-700 md:leading-8 md:ml-1 font-semibold">
                Discover top-tier construction services with Creat.<br />From
                concept to completion, we turn your vision into reality with <br />
                expertise and dedication.
              </p>
              <div className="md:mt-4">
                <Link href="/services"
                  className="md:rounded-lg md:py-5 md:px-7 uppercase w-fit bg-creatBright group
          font-medium hover:bg-zinc-900 transition-colors duration-300 flex md:gap-x-3 items-center">
                  <h1 className="md:text-lg text-white font-semibold">
                    Our Services
                  </h1>
                  <div className="flex items-center justify-center md:h-6 aspect-square rounded-full bg-white relative overflow-hidden">
                    <FaArrowRight className="absolute text-base text-creatBright top-1/2 -translate-y-1/2 left-1/2
                -translate-x-[200%] transition-all duration-300 group-hover:-translate-x-1/2 group-hover:text-zinc-900" />
                    <FaArrowRight className="absolute text-base text-creatBright top-1/2 -translate-y-1/2 left-1/2
                -translate-x-1/2 transition-all duration-300 group-hover:translate-x-[200%] group-hover:text-zinc-900" />
                  </div>
                </Link>
              </div>
            </div>
          </div>


          <div className="w-full h-full absolute top-0 left-0 -z-50 flex items-end">
            <div className="relative w-full h-full">
              <Image src="/hac.png" alt="" width={1080} height={720} quality={100} priority
                onLoad={() => setHacLoaded(true)}
                className="w-3/5 object-cover absolute bottom-0 opacity-20" />

              <div className="absolute w-3/5 h-1/5 bottom-0 bg-gradient-to-t from-white via-white to-transparent" />
              <div className="absolute w-4/5 h-full right-0 top-0 bg-gradient-to-l from-white via-white to-transparent" />

              <div className="h-[500px] flex ml-auto mt-auto absolute bottom-[0px] right-0">
                <motion.svg className="w-full h-full" viewBox="0 0 3343 4102" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: hacLoaded ? 1 : 0 }}
                    transition={{
                      duration: 2,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    className="stroke-zinc-900"
                    strokeWidth={12}
                    strokeDasharray="0 1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M941.316 4094.88C941.316 4019.47 930.038 3910.91 1002.06 3865.86C1013.13 3858.94 1120.05 3801.11 1101.46 3797.32C1069.46 3790.8 929.704 3892.23 965.797 3798.91C975.21 3774.56 1244.21 3701.92 1029.6 3733.52C928.624 3748.39 935.798 3783.72 916.012 3674.86C905.372 3616.27 909.224 3558.52 892.184 3501.83C891.517 3499.59 889.783 3490.55 889.783 3487.99C826.17 3386.19 794.357 3335.31 794.357 3335.31C947.037 3546.51 1023.37 3652.12 1023.37 3652.12C1503.04 3760.26 1742.88 3814.34 1742.88 3814.34C1738.44 3802.56 1736.21 3796.68 1736.21 3796.68C1243.5 3688.22 997.158 3633.98 997.158 3633.98C916.998 3539.19 876.918 3491.8 876.918 3491.8C883.398 3573.91 795.598 3566.23 728.531 3566.23C597.385 3566.23 449.931 3527.94 388.224 3399.59C376.691 3375.62 323.651 3246.56 403.651 3310.99C450.264 3348.52 674.411 3532.91 719.971 3446.16C741.211 3405.72 769.291 3389.88 765.291 3339.12C771.344 3337.36 808.611 3299.78 866.438 3284.43C974.277 3255.8 917.212 3169.06 757.545 3242.23C643.318 3294.58 377.438 3248.7 485.665 3366.44C542.531 3428.31 683.358 3351.46 744.291 3321.46C816.291 3286.02 675.238 3333.24 663.158 3338.03C552.638 3381.8 483.584 3375.54 399.184 3292.67C367.224 3261.28 425.624 3172.98 495.544 3154.32C544.264 3141.34 812.998 3054.86 833.064 3057.92C926.224 3072.16 882.371 3145.96 811.145 3168.78C713.265 3200.14 384.931 3375.92 353.544 3214.31C343.998 3165.14 204.931 3111.86 462.118 2996.74C521.144 2970.32 679.998 2903.7 743.145 2929.72C803.118 2954.44 800.557 2961.5 759.557 3012.44C759.117 3012.99 635.944 3054.68 616.158 3063.16C585.251 3076.4 376.744 3185.7 347.931 3162.56C269.664 3099.74 338.224 3112.79 293.731 3031.36C258.411 2966.74 334.45 2908.15 363.25 2859.76C364.637 2857.46 377.184 2845.51 379.771 2842.92C423.704 2810.55 543.051 2731.56 592.504 2783.5C628.144 2820.94 538.251 2905.19 517.825 2939.04C494.185 2978.2 397.384 3037.48 504.384 2935.16C533.611 2907.22 573.758 2864.19 579.464 2823.31C593.091 2725.63 416.558 2833.32 406.584 2820.96C405.571 2819.7 379.091 2773.94 375.971 2768.47C129.771 2387.42 6.66406 2196.88 6.66406 2196.88C429.077 2242.7 640.292 2265.59 640.292 2265.59C636.865 2110.11 851.957 2083.39 954.264 2148.19C1021.52 2190.79 1089.2 2218.08 1164.2 2195.95C1345.24 2142.56 1209.41 2350.71 1102.14 2214.06C1090.97 2199.82 1130.36 2223.26 1169.54 2337.18C1188.38 2391.94 1290.33 2566.95 1244.68 2607.87C1239.69 2612.34 1070.01 2882.63 1064.3 2836.23C1050.29 2722.3 745.584 2484.08 843.57 2465C925.45 2449.04 812.916 2474 776.396 2424.98C703.556 2327.2 806.917 2388.78 893.197 2333.36C902.917 2327.12 916.184 2370.72 762.438 2351.8C655.371 2338.63 571.798 2111.32 942.158 2241.76C1016.82 2268.06 634.185 2173.43 666.691 2237.62C723.131 2349.08 907.904 2597.04 934.197 2664.46C1445.68 3384.6 1731 3777.12 1731 3777.12C1517.25 3459.67 1410.37 3300.96 1410.37 3300.96C1423.32 3188.58 1655.37 2920.48 1607.26 2852.47C1521.84 2731.7 1453.12 2634.98 1310.53 2584.63C1355.7 2652.44 1499.52 2758.16 1576.4 2792.71C1763.8 2876.9 1705.2 2893.54 1955.26 2964.14C2024.7 2983.75 2657.88 3259.47 2558.68 3176.03C2480.8 3110.52 2304.88 3087.55 2162.36 2982.9C2115.88 2948.76 2389.81 3071.67 2434.57 3080.83C2791.06 3153.82 2345.99 3038.27 2247.21 2949.2C2142.12 2854.43 2194.06 2735.7 2247.86 2611.34C2324.06 2435.2 2416.7 2026.44 2588.88 1986.02C2793.88 1937.88 2830.04 2013 2987.7 2063.66C3079.09 2093.03 3096.37 2145.47 3007.77 1986.99C2951.92 1887.11 2550.79 1620.6 2444.39 1563.31C2327.8 1500.54 2320.64 1470.66 2244.71 1379.12C2241.96 1375.8 1741.42 1702.43 1752.97 1762.12C1763.37 1815.96 1884.17 2059.24 1953.62 1968.9C2018.2 1884.9 2351.58 1516.24 2342.96 1543.91C2323.04 1607.75 1990.08 2026.36 1946.65 1989.5C1793.93 1859.9 1725.58 1624.71 1602.48 1887.1C1497.28 2111.28 1568.88 1873.34 1565.28 1806.95C1562.45 1754.66 1353.18 1673.94 1310.53 1737.91C1300.04 1753.63 1116.6 1799.79 998.744 2069.99C917.637 2255.88 1020.48 1905.27 1129.82 1828.2C1183.4 1790.46 1210.58 1738.75 1290.13 1711.19C1440.44 1659.14 1478.06 1779.03 1443.8 1695.92C1403.97 1593.43 1302.57 1611.26 1265.97 1408.84C1254.14 1343.42 1174.7 1342.68 1199.94 1240.3C1217.16 1170.47 1178.98 1114.4 1127.92 1075.19C1083.7 1041.24 1092.09 990.629 1103.1 947.816C1585.02 817.669 1845.21 724.149 1883.68 667.256C2102.61 597.963 2219.67 596.682 2234.84 663.442C2289.63 626.895 2282.62 593.816 2213.85 564.202C2204.69 500.096 2191.99 463.202 2175.68 453.509C1938.76 462.482 1728.2 527.363 1543.97 648.176C1207.81 763.403 1011.24 820.656 954.25 819.949C971.517 906.523 932.076 972.683 835.93 1018.42C993.69 973.896 1072.58 951.629 1072.58 951.629C1084.64 880.629 1073.82 841.175 1040.13 833.295C1000.69 842.202 980.971 846.656 980.971 846.656C900.691 517.749 1005.65 256.922 1295.86 64.189C1666.41 -69.931 1942.5 31.8554 2124.16 369.535C2162.3 476.829 2182.51 539.335 2184.75 557.055C2212.01 640.348 2173.21 793.056 2165.67 880.856C2159.01 958.189 2133.01 1310.98 1991.34 1148.04C1956.02 1107.42 1970.44 918.443 1933.76 960.416C1899.3 999.83 1833.94 977.496 1800.81 929.002C1753.49 859.762 1758.73 676.309 1782.05 776.323C1793.46 825.203 1821.68 972.283 1896.41 942.256C1926.54 930.136 1927.9 906.016 1942.4 940.416C1908.09 1007.3 2052.38 1296.26 1800.88 1574.19C1715.04 1669.04 1700.48 1736.9 1563.57 1753.75C1560.14 1754.16 1527 1759.54 1525.56 1760.12C1430.69 1753.47 1458.56 1666.47 1363.84 1596.66C1246.85 1510.44 1246.86 1380.55 1442.08 1383.67C1536.7 1385.18 1520.69 1389.67 1604.29 1407.22C1664.65 1419.88 1676.88 1355.9 1707.36 1308.42C1739.08 1258.99 1817.77 1065.55 1815.48 1007.7C1812.18 924.029 1880.14 948.642 1915.21 926.122C1989.38 878.496 1921.16 997.935 1942.53 906.922C1976.84 761.202 2173.78 704.256 2198.76 1011.28C2200.73 1035.54 2210.58 1141.91 2215.28 1155.84C2244.56 1239.46 2163.02 1359.6 2268.73 1463.1C2356.36 1548.91 2390.72 1581.23 2502.81 1641.68C2542.66 1663.18 2737.41 1795.56 2774.32 1828.11C2797.04 1848.16 2818.28 1861.18 2843.18 1877.24C2921.09 1970.88 2929.44 1962.98 3007.67 2037.19C3107.29 2131.71 3107.38 2227.06 3135.48 2364.47C3180.96 2586.92 3113.54 2811.58 3044.53 3023.28C2939.9 3175.36 2982.48 3147.99 2830.45 3313.7C2566.84 3601.06 2619.15 3920.34 2093.79 3766.94C1757.48 3668.74 1444.82 3344.79 1446.53 3347.4C1487.24 3409.71 1440.17 3385.4 1544.46 3485.14C1764.45 3695.48 2172.05 3929.9 2486.6 3829.98C2565.05 3805.04 2757.76 3586.58 2806.24 3496.04C2812.62 3484.12 2945.04 3215.36 2909.41 3338.99C2848.08 3551.87 2960.77 3476.15 2751.5 3697.68C2563.34 3896.87 2801.7 3713.79 2843.54 3654.06C2855.98 3636.3 2883.79 3806.38 2621.83 3919.62C2620.88 3920.03 2395.32 4071.15 2567.75 3984.5C2665.45 3935.4 2775.17 3896.72 2838.41 3802.92C2873.48 3750.92 2855.21 3931.52 2871.79 3973.38C2871.96 3973.8 2884.22 4088.22 2884.22 4088.22C2885.81 4093.5 2885.81 4095.72 2884.22 4094.88C3097.33 4094.88 3335.48 4088.22 3335.48 4088.22" />
                </motion.svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="w-full overflow-hidden whitespace-nowrap border-y md:py-12">
          {[...Array(partnerCount || 4)].map((_, index) => (
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 'calc(-100% - 48px)' }}
              transition={{
                duration: 12,
                ease: 'linear',
                repeat: Infinity,
              }}
              key={index} className="inline-flex justify-center gap-x-12 mr-12">
              {partners.map((partner, i) => (
                <Link href={partner.link} key={`${index}-${i}`} className="inline-block">
                  <Image src={partner.logo} alt={partner.name} width={200} height={50} />
                </Link>
              ))}
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col md:px-80 h-full w-full max-w-[1920px] mx-auto justify-center pt-24 pb-36">
          <div className="flex gap-x-2 items-center mb-4">
            <div className="h-px bg-creatBright w-8" />
            <h1 className="text-creatBright font-medium">Our Services</h1>
          </div>

          <div className="flex w-full justify-between items-end">
            <h1 className="text-5xl font-medium leading-tight">
              Comprehensive Solutions <br /> Tailored to
              <span className="inline-block relative px-6"> You
                <img src="/icons/circle.svg" alt="" className="absolute w-full
                    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              </span>
            </h1>
            <Link href="/services"
              className="md:rounded-lg md:py-5 md:px-7 uppercase w-fit group border-2 border-zinc-900 font-medium hover:bg-creatBright hover:border-creatBright transition-colors duration-300 flex md:gap-x-3 items-center">
              <h1 className="md:text-lg text-zinc-900 group-hover:text-white font-semibold">
                View All Services
              </h1>
              <div className="flex items-center justify-center md:h-6 aspect-square outline outline-2 outline-offset-2 outline-zinc-900
                rounded-full relative overflow-hidden bg-zinc-900 group-hover:bg-white group-hover:outline-white">
                <FaArrowRight className="absolute text-base text-white top-1/2 -translate-y-1/2 left-1/2
                -translate-x-[200%] transition-all duration-300 group-hover:-translate-x-1/2 group-hover:text-creatBright" />
                <FaArrowRight className="absolute text-base text-white top-1/2 -translate-y-1/2 left-1/2
                -translate-x-1/2 transition-all duration-300 group-hover:translate-x-[200%] group-hover:text-creatBright" />
              </div>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8 w-full md:mt-16">
            <Card
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-20 h-20">
                  <path className="fill-neutral-500 parent-group-hover:fill-zinc-900 transition-colors duration-300" d="M29 14h-1v-4h-2v4h-2v-4h-2v4h-1a1 1 0 0 0-1 1v4a5.01 5.01 0 0 0 4 4.899V27a1 1 0 0 1-1 1H5a1 1 0 0 1 0-2h5a3 3 0 0 0 0-6H5a1 1 0 0 1 0-2h5a3.003 3.003 0 0 0 3-3v-4h1a4.005 4.005 0 0 0 4-4V4h-3a3.98 3.98 0 0 0-2.747 1.106A6 6 0 0 0 7 2H4v3a6.007 6.007 0 0 0 6 6h1v4a1 1 0 0 1-1 1H5a3 3 0 0 0 0 6h5a1 1 0 0 1 0 2H5a3 3 0 0 0 0 6h18a3.003 3.003 0 0 0 3-3v-3.101A5.01 5.01 0 0 0 30 19v-4a1 1 0 0 0-1-1M13 8a2 2 0 0 1 2-2h1v1a2 2 0 0 1-2 2h-1Zm-3 1a4.005 4.005 0 0 1-4-4V4h1a4.005 4.005 0 0 1 4 4v1Zm18 10a3 3 0 0 1-6 0v-3h6Z">
                  </path>
                </svg>
              }
              link="/services/#" name="Sustainable Energy"
              text="We are committed to sustainability and environmental stewardship.That's why we offer renewable energy solutions"
            ></Card>

            <Card
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" viewBox="0 0 512 512">
                  <path className="fill-neutral-500 parent-group-hover:fill-zinc-900 transition-colors duration-300" d="M360.848 22.51L0 113.456L85.163 489.49L512 357.774zm104.72 313.314l-57.37 17.351l-15.834-86.248l-12.89 3.273l-63.58-158.109l47.772-12.67zM360.325 91.671l-47.631 12.46l-15.951-39.667L343.44 52.5zm-72.551-24.909l15.725 39.774l-174.233 45.575l-3.378-10.977l-77.612 36.79l-11.47-46.854zM112.81 442.594l-39.315-160.69l160.393-44.408l51.417 152.683zm161.436-272.773L60.488 227.809L48.43 178.555l86.453-7.41l-3.295-10.167l175.075-46.438l62.841 158.948l-13.363 4.236l50.876 75.809l-59.063 17.863zM148.565 378.208c-33.107-19.087-31.347-66.645 3.161-85.084c33.704-18.01 74.81-1.317 76.918 40.83c1.974 39.47-46.972 63.34-80.08 44.254m72.522-45.626c-3.004-35.527-36.778-49.694-66.138-34.006c-30.06 16.063-29.866 58.072-.753 74.214c27.301 15.137 69.957-3.951 66.891-40.208m-59.82 28.56l4.79-46.585l9.839-3.134l27.95 36.049l-7.579 4.212l-8.036-10.171l-17.476 5.113l-.78 11.991zm9.84-21.681l13.178-3.943l-11.696-15.71z" />
                </svg>
              }
              link="/services/#" name="Tecnical Design"
              text="We are focused on precision and innovation. Therefore we offer expert technical design services for everyone"
            ></Card>

            <Card
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" viewBox="0 0 48 48">
                  <path className="fill-neutral-500 parent-group-hover:fill-zinc-900 transition-colors duration-300" d="M14.79 26.746L8 35.347V40h34v2H7a1 1 0 0 1-1-1V7h2v25.12l5.33-6.751A3 3 0 1 1 19 23.946l6.633 2.21a2.995 2.995 0 0 1 3.41-.97l6.378-7.653a3 3 0 1 1 1.536 1.28l-6.378 7.654A3 3 0 1 1 25 28.054l-6.633-2.21a2.995 2.995 0 0 1-3.577.902" />
                </svg>
              }
              link="/services/#" name="Project Management"
              text="We ensure seamless execution and timely completion, while providing comprehensive project management"
            ></Card>

          </div>
        </div>
      </section>
      <section className="w-full bg-zinc-100 pt-36 pb-72">
        <div className="flex flex-col md:px-80 h-full w-full max-w-[1920px] mx-auto">
          <div className="flex gap-x-2 items-center mb-4">
            <div className="h-px bg-creatBright w-8" />
            <h1 className="text-creatBright font-medium">About Us</h1>
          </div>

          <div className="flex w-full justify-between items-end mb-16">
            <h1 className="text-5xl font-medium leading-tight text-nowrap">
              Discover the Power of<br />Excellence at
              {" "}<span className="text-creatBright font-bold">Creat
              </span>
            </h1>
            <p className="text-neutral-700 text-lg max-w-[50%]">
              At Creat, we are more than just a design company.
              We are your partners in turning visions into reality,
              dedicated to delivering superior quality and exceptional service every step of the way.
            </p>
          </div>
          <div className="relative w-full flex">
            <div ref={bannerRef} className="max-w-[60%] overflow-hidden rounded-2xl">
              <motion.div
                initial={{ scale: 0.85 }}
                animate={bannerInView ? { scale: 1 } : { scale: 0.85 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
                className="w-full h-full relative">
                <Image src="/banner-about.jpg" width={720} height={720} alt="" quality={70} className="w-full h-full object-cover" />
                <motion.div
                  initial={{ x: 0 }}
                  animate={bannerInView ? { x: "-100%" } : { x: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.05 }}
                  className="absolute top-0 left-0 w-1/2 h-full bg-zinc-900"
                />
                <motion.div
                  initial={{ x: 0 }}
                  animate={bannerInView ? { x: "100%" } : { x: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.05 }}
                  className="absolute top-0 right-0 w-1/2 h-full bg-zinc-900"
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ x: 100 }}
              animate={bannerInView ? { x: 0 } : { x: 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-3/5 absolute right-0 top-40 border-4 border-white
              rounded-2xl overflow-hidden bg-white flex flex-col drop-shadow-xl">
              <div className="flex flex-nowrap">
                <div
                  onMouseDown={() => setActiveTab(0)}
                  className={`py-6 ${activeTab ? 'bg-pink-100 text-black' : 'bg-creatBright text-white'} cursor-pointer w-1/2`}>
                  <h1 className="text-3xl font-bold text-center">Our Mission</h1>
                </div>
                <div
                  onMouseDown={() => setActiveTab(1)}
                  className={`py-6 ${activeTab ? 'bg-creatBright text-white' : 'bg-pink-100 text-black'} cursor-pointer w-1/2`}>
                  <h1 className="text-3xl font-bold text-center">Our Vision</h1>
                </div>
              </div>
              <div className="px-10 py-8 flex flex-col">
                <h1 className="text-3xl font-bold mb-4">
                  {aboutTabs[activeTab].main.name}
                </h1>
                <p className="text-xl text-neutral-700 mb-8">
                  {aboutTabs[activeTab].main.desc}
                </p>
                <div className="flex w-full flex-nowrap gap-x-10 mb-12">
                  <div className="flex w-1/2 gap-x-4">
                    <div className="flex flex-shrink-0 p-3 rounded-full bg-zinc-900 w-12 h-12
                      outline outline-2 outline-zinc-900 outline-offset-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-full h-full">
                        <path className="fill-white" d="M27 19.001A4.006 4.006 0 0 0 23 15H9a2.003 2.003 0 0 1-2-2V9.857A4 4 0 0 0 9.858 7h12.284a4 4 0 1 0 0-2H9.858A3.992 3.992 0 1 0 5 9.858v3.141A4.006 4.006 0 0 0 9.001 17H23a2.003 2.003 0 0 1 2 2.001V22h-3v3H9.858a4 4 0 1 0 0 2H22v3h8v-8h-3ZM26 4a2 2 0 1 1-2 2a2 2 0 0 1 2-2M4 6a2 2 0 1 1 2 2a2 2 0 0 1-2-2m2 22a2 2 0 1 1 2-2a2 2 0 0 1-2 2m22-4v4h-4v-4Z" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-y-4">
                      <h1 className="text-2xl font-bold">
                        {aboutTabs[activeTab].tab_l.name}
                      </h1>
                      <p className="text-neutral-700">{aboutTabs[activeTab].tab_l.desc}</p>
                    </div>
                  </div>
                  <div className="flex w-1/2 gap-x-4">
                    <div className="flex flex-shrink-0 p-3 rounded-full bg-zinc-900 w-12 h-12
                      outline outline-2 outline-zinc-900 outline-offset-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 2048 2048">
                        <path className="fill-white" d="M1664 1088q66 0 124 25t102 68t69 102t25 125q0 52-16 101t-48 91v424l-256-128l-256 128v-424q-31-42-47-91t-17-101q0-66 25-124t68-102t102-69t125-25m0 128q-40 0-75 15t-61 41t-41 61t-15 75t15 75t41 61t61 41t75 15t75-15t61-41t41-61t15-75t-15-75t-41-61t-61-41t-75-15m128 600v-115q-60 27-128 27t-128-27v115l128-64zM1664 512q-53 0-99 20t-82 55t-55 81t-20 100q0 92-41 173t-116 137q19 9 36 20t35 23l-75 104q-49-35-106-54t-117-19q-80 0-149 30t-122 82t-83 123t-30 149H512q0-73 20-141t57-128t89-108t118-82q-74-55-115-136t-41-173q0-53-20-99t-55-82t-81-55t-100-20q-53 0-99 20t-82 55t-55 81t-20 100H0q0-52 14-101t39-93t62-80t83-62q-33-35-51-81t-19-95q0-53 20-99t55-82t81-55T384 0q53 0 99 20t82 55t55 81t20 100q0 49-18 95t-52 81q82 45 134 124q27-40 62-72t76-54t87-34t95-12q48 0 94 12t87 34t77 54t62 72q52-79 134-124q-33-35-51-81t-19-95q0-53 20-99t55-82t81-55t100-20q53 0 99 20t82 55t55 81t20 100q0 49-18 95t-52 81q46 26 82 62t62 79t40 93t14 102h-128q0-53-20-99t-55-82t-81-55t-100-20m-128-256q0 27 10 50t27 40t41 28t50 10q27 0 50-10t40-27t28-41t10-50q0-27-10-50t-27-40t-41-28t-50-10q-27 0-50 10t-40 27t-28 41t-10 50m-1280 0q0 27 10 50t27 40t41 28t50 10q27 0 50-10t40-27t28-41t10-50q0-27-10-50t-27-40t-41-28t-50-10q-27 0-50 10t-40 27t-28 41t-10 50m512 512q0 53 20 99t55 82t81 55t100 20q53 0 99-20t82-55t55-81t20-100q0-53-20-99t-55-82t-81-55t-100-20q-53 0-99 20t-82 55t-55 81t-20 100" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-y-4">
                      <h1 className="text-2xl font-bold">
                        {aboutTabs[activeTab].tab_r.name}
                      </h1>
                      <p className="text-neutral-700">
                        {aboutTabs[activeTab].tab_r.desc}
                      </p>
                    </div>
                  </div>
                </div>
                <Link href="/about"
                  className="md:rounded-lg md:py-5 md:px-7 uppercase w-fit h-fit group border-2 border-zinc-900 font-medium
                  hover:bg-creatBright hover:border-creatBright transition-colors duration-300 flex md:gap-x-3 items-center">
                  <h1 className="md:text-lg text-zinc-900 group-hover:text-white font-semibold">
                    More About Us
                  </h1>
                  <div className="flex items-center justify-center md:h-6 aspect-square outline outline-2 outline-offset-2 outline-zinc-900
                rounded-full relative overflow-hidden bg-zinc-900 group-hover:bg-white group-hover:outline-white">
                    <FaArrowRight className="absolute text-base text-white top-1/2 -translate-y-1/2 left-1/2
                -translate-x-[200%] transition-all duration-300 group-hover:-translate-x-1/2 group-hover:text-creatBright" />
                    <FaArrowRight className="absolute text-base text-white top-1/2 -translate-y-1/2 left-1/2
                -translate-x-1/2 transition-all duration-300 group-hover:translate-x-[200%] group-hover:text-creatBright" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="w-full pt-36 pb-72">
        <div className="flex flex-col md:px-80 h-full w-full max-w-[1920px] mx-auto">
          <div className="flex gap-x-2 items-center mb-4">
            <div className="h-px bg-creatBright w-8" />
            <h1 className="text-creatBright font-medium">Our Projects</h1>
          </div>
          <div ref={projectsRef} className="w-full flex justify-between items-center mb-16">
            <h1 className="text-5xl font-medium leading-tight text-nowrap">
              Explore Our Projects <br /> That
              {" "}<span className="text-creatBright font-bold uppercase">Inspire
              </span>
            </h1>
            <Link href="/projects"
              className="md:rounded-lg md:py-5 md:px-7 uppercase w-fit h-fit group border-2 border-zinc-900 font-medium
                  hover:bg-creatBright hover:border-creatBright transition-colors duration-300 flex md:gap-x-3 items-center">
              <h1 className="md:text-lg text-zinc-900 group-hover:text-white font-semibold">
                View All Projects
              </h1>
              <div className="flex items-center justify-center md:h-6 aspect-square outline outline-2 outline-offset-2 outline-zinc-900
                rounded-full relative overflow-hidden bg-zinc-900 group-hover:bg-white group-hover:outline-white">
                <FaArrowRight className="absolute text-base text-white top-1/2 -translate-y-1/2 left-1/2
                -translate-x-[200%] transition-all duration-300 group-hover:-translate-x-1/2 group-hover:text-creatBright" />
                <FaArrowRight className="absolute text-base text-white top-1/2 -translate-y-1/2 left-1/2
                -translate-x-1/2 transition-all duration-300 group-hover:translate-x-[200%] group-hover:text-creatBright" />
              </div>
            </Link>
          </div>
          <div className="flex w-full items-center justify-around">

            <ProjectCard projectsInView={projectsInView}
              id={1}
              name="Project Gold Mine"
              link="#"
              date="August 20, 2022"
              image="/projects/mine.jpg"
              desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi natus accusantium incidunt aspernatur voluptatibus enim blanditiis perferendis! Nam placeat optio, voluptas non, enim consequuntur delectus excepturi itaque fugiat nesciunt nulla. Ullam, veniam, sit molestias alias nesciunt aut est pariatur harum blanditiis, iusto sunt! Consequatur incidunt dolorem consequuntur maxime dolorum blanditiis?"
            />

            <ProjectCard projectsInView={projectsInView}
              id={2}
              delay={0.1}
              name="Project Building"
              link="#"
              date="September 10, 2019"
              image="/projects/building.jpg"
              desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi natus accusantium incidunt aspernatur voluptatibus enim blanditiis perferendis! Nam placeat optio, voluptas non, enim consequuntur delectus excepturi itaque fugiat nesciunt nulla. Ullam, veniam, sit molestias alias nesciunt aut est pariatur harum blanditiis, iusto sunt! Consequatur incidunt dolorem consequuntur maxime dolorum blanditiis?"
            />

            <ProjectCard projectsInView={projectsInView}
              id={3}
              delay={0.2}
              name="Project Something"
              link="#"
              date="August 20, 2022"
              image="/projects/mine.jpg"
              desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi natus accusantium incidunt aspernatur voluptatibus enim blanditiis perferendis! Nam placeat optio, voluptas non, enim consequuntur delectus excepturi itaque fugiat nesciunt nulla. Ullam, veniam, sit molestias alias nesciunt aut est pariatur harum blanditiis, iusto sunt! Consequatur incidunt dolorem consequuntur maxime dolorum blanditiis?"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
