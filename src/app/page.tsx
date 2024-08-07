"use client";
import Card from "@/components/card";
import Nav from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { motion, useInView } from "framer-motion";

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
  const bannerInView = useInView(bannerRef, { once: true });

  return (
    <main>
      <Nav />
      <section className="flex justify-center w-full h-screen">
        <div className="w-full max-w-[1920px] h-full flex relative items-center">
          <div className="md:ml-28 h-fit flex flex-col md:gap-y-4 flex-shrink-0">
            <div className="md:px-3 md:py-1 md:border-x-2 border-x-creatBright w-fit h-fit md:rounded-md bg-creatBright/5">
              <h1 className="capitalize md:text-lg font-medium text-creatBright">
                Trusted Project Partner
              </h1>
            </div>
            <div className="flex flex-col md:gap-y-4">
              <h1 className="md:text-7xl font-bold md:leading-[1.2] text-nowrap">
                Project <br />Services with <br />
                <span className="text-creatBright font-bold md:tracking-wide">
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
              <Image src="/hac.png" alt="" width={1080} height={720} quality={100}
                className="w-3/5 object-cover absolute bottom-0 opacity-20" />

              <div className="absolute w-3/5 h-1/5 bottom-0 bg-gradient-to-t from-white via-white to-transparent" />
              <div className="absolute w-4/5 h-full right-0 top-0 bg-gradient-to-l from-white via-white to-transparent" />

              <div
                className="box-border absolute right-0 top-1/2 -translate-y-1/2 opacity-20 rotate-90"
                style={{
                  width: '300px',
                  height: '300px',
                  backgroundImage: 'repeating-conic-gradient(#ED145A 0% 25%, transparent 0% 50%)',
                  backgroundSize: '75px 75px',
                }} />

            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-screen">
        <div className="w-full overflow-hidden whitespace-nowrap border-y md:py-12">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="inline-flex justify-center gap-x-12 mr-12 animate-slide [--slide-duration:12s]">
              {partners.map((partner, i) => (
                <Link href={partner.link} key={`${index}-${i}`} className="inline-block">
                  <Image src={partner.logo} alt={partner.name} width={200} height={50} />
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col md:px-80 h-full w-full max-w-[1920px] mx-auto justify-center">
          <div className="flex gap-x-2 items-center">
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
          <div className="flex gap-x-2 items-center">
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
                initial={{ scale: 0.8 }}
                animate={bannerInView ? { scale: 1 } : { scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
                className="w-full h-full relative">
                <Image src="/banner-about.jpg" width={720} height={720} alt="" quality={70} className="w-full h-full object-cover" />
                <motion.div
                  initial={{ x: 0 }}
                  animate={bannerInView ? { x: "-100%" } : { x: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                  className="absolute top-0 left-0 w-1/2 h-full bg-zinc-900"
                />
                <motion.div
                  initial={{ x: 0 }}
                  animate={bannerInView ? { x: "100%" } : { x: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
                  className="absolute top-0 right-0 w-1/2 h-full bg-zinc-900"
                />
                <motion.div
                  initial={{ x: 0 }}
                  animate={bannerInView ? { x: "-100%" } : { x: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-1/2 h-full bg-creatBright"
                />
                <motion.div
                  initial={{ x: 0 }}
                  animate={bannerInView ? { x: "100%" } : { x: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute top-0 right-0 w-1/2 h-full bg-creatBright"
                />
              </motion.div>
            </div>
            <div className="w-3/5 absolute right-0 top-40 border-4 border-white rounded-2xl overflow-hidden bg-white flex flex-col">
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
