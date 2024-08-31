import Link from "next/link";
import { ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";

interface CardProps {
  icon: ReactNode
  link: string
  name: string
  text: string
}

const Card = ({ link, name, text, icon }: CardProps) => {
  return <motion.div
    whileHover={{
      translateY: 12,
      scale: 1.04
    }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 20,
      mass: 0.5
    }}
    className="w-full col-span-1 md:rounded-2xl md:p-8 flex flex-col gap-y-6 cursor-default
             transition-colors duration-300
    hover:shadow-drop-shadow-lg-white hover:border-white/20 parent-group bg-creatBG border border-white/10">
    {icon}
    <Link href={link} className="md:text-2xl font-semibold text-neutral-100 hover:text-creatBright transition-colors duration-300 w-fit">
      {name}
    </Link>
    <p className="text-neutral-300 text-lg">{text}</p>
    <Link href={link}
      className="w-fit transition-all duration-300 flex md:gap-x-3 items-center group">
      <h1 className="md:text-2xl text-neutral-100 group-hover:text-creatBright font-semibold">
        Learn More
      </h1>
      <FaArrowRight className="text-lg text-neutral-100 duration-300 group-hover:translate-x-1/2
                  group-hover:text-creatBright mt-1" />
    </Link>
  </motion.div>;
};

export default Card;
