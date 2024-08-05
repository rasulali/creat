import Link from "next/link";
import { ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa6";

interface CardProps {
  icon: ReactNode
  link: string
  name: string
  text: string
}

const Card = ({ link, name, text, icon }: CardProps) => {
  return <div className="w-full border col-span-1 md:rounded-2xl md:p-8 flex flex-col gap-y-6 cursor-default
              transform-gpu hover:translate-y-3 transition-all duration-300 bg-white hover:drop-shadow-2xl
              hover:border-zinc-900 parent-group">
    {icon}
    <Link href={link} className="md:text-2xl font-semibold hover:text-creatBright transition-colors duration-300 w-fit">
      {name}
    </Link>
    <p className="text-neutral-500 text-lg">{text}</p>
    <Link href={link}
      className="w-fit transition-all duration-300 flex md:gap-x-3 items-center group">
      <h1 className="md:text-2xl text-zinc-900 group-hover:text-creatBright font-semibold">
        Learn More
      </h1>
      <FaArrowRight className="text-lg text-zinc-900 duration-300 group-hover:translate-x-1/2
                  group-hover:text-creatBright mt-1" />
    </Link>
  </div>;
};

export default Card;
