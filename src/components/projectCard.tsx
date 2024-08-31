import { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link"
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface CardProps {
  projectsInView: boolean
  delay?: number
  id: number
  image: string | StaticImport
  name: string
  date?: string
  link: string
  desc: string
}
const ProjectCard: React.FC<CardProps> = ({ projectsInView, delay, id, name, date, link, desc, image }) => {

  const [projectHover, setProjectHover] = useState(false)
  return <motion.div
    initial={{ y: '50%' }}
    animate={{ y: projectsInView ? 0 : '50%' }}
    onHoverStart={() => { setProjectHover(true) }}
    onHoverEnd={() => { setProjectHover(false) }}
    transition={{ duration: 0.5, delay: delay }}
    className="p-9 rounded-2xl overflow-hidden w-[410px] h-[500px] flex flex-col items-start border relative z-10">
    <div className="w-full h-full absolute top-0 left-0 -z-50 pointer-events-none">
      <Image src={image} width={400} height={500} alt="project1" className="w-full h-full object-cover" />
    </div>
    <div className="flex flex-col mt-auto h-fit w-full gap-y-2">
      <Link href={link} className="text-3xl font-bold text-white hover:text-zinc-900 transition-colors duration-300">{name}</Link>
      <p className="text-white font-semibold">{date}</p>
    </div>
    <AnimatePresence mode="wait">
      {projectHover &&
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: projectHover ? '100%' : 0 }}
          exit={{
            height: 0,
            transition: { duration: 0.2, ease: "linear" }
          }}
          transition={{ duration: 0.5, ease: "linear" }}
          className="w-full overflow-hidden flex items-center">
          <p className="text-white">
            {desc}
          </p>
        </motion.div>
      }
    </AnimatePresence>

    <Link href={link}
      className="uppercase w-fit
          font-medium flex items-center mt-8 group">
      <h1 className="md:text-lg text-white font-bold group-hover:text-zinc-900 transition-all duration-300">
        View Project
      </h1>
      <div className="flex items-center justify-center md:h-6 aspect-square rounded-full text-white relative overflow-hidden">
        <FaArrowRight className="absolute text-base top-1/2 -translate-y-1/2 left-1/2
                -translate-x-[200%] transition-all duration-300 group-hover:-translate-x-1/2 group-hover:text-zinc-900" />
        <FaArrowRight className="absolute text-base top-1/2 -translate-y-1/2 left-1/2
                -translate-x-1/2 transition-all duration-300 group-hover:translate-x-[200%] group-hover:text-zinc-900" />
      </div>
    </Link>

    <motion.div
      className="absolute inset-0 -z-10 pointer-events-none"
      initial={false}
      animate={{ opacity: projectHover ? 1 : 0 }}
      transition={{ duration: 0.1 }}
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <motion.mask id={`circleMask-${id}`}>
            <motion.circle
              cx="0"
              cy="0"
              fill="white"
              initial={{ r: 0 }}
              animate={{ r: projectHover ? "150%" : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.mask>
        </defs>
      </svg>
      <motion.div
        className="w-full h-full bg-creatDark/90"
        style={{ maskImage: `url(#circleMask-${id})`, WebkitMaskImage: `url(#circleMask-${id})` }}
      />
    </motion.div>
    <div
      style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
        opacity: projectHover ? 0 : 1,
      }}
      className="absolute top-0 left-0 w-full h-full -z-30 pointer-events-none transition-all duration-200" />
    <div
      style={{
        opacity: projectHover ? 0 : 1,
      }}
      className="absolute top-0 left-0 w-full h-full transition-all duration-200
                bg-gradient-to-t from-zinc-900/50 to-zinc-900/10 -z-40 pointer-events-none" />

  </motion.div>
}
export default ProjectCard
