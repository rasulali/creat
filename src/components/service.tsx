import { ReactNode, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { MdArrowOutward } from "react-icons/md"
import Link from "next/link"

interface ServiceProps {
  name: string
  description: string
  icon: ReactNode
  link?: string
}
const Service: React.FC<ServiceProps> = ({ name, description, icon, link }) => {
  const ref = useRef(null)
  const serviceInView = useInView(ref, { once: true, amount: 0.5 })
  const [serviceHovered, setServiceHovered] = useState(false)
  return <motion.div
    ref={ref}
    initial={{ opacity: 0, x: 20 }}
    animate={serviceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
    className="flex flex-col border-t pt-6 px-2 border-white/50 relative"
    onHoverStart={() => { setServiceHovered(true) }}
    onHoverEnd={() => { setServiceHovered(false) }}
  >
    <motion.span
      initial={{ width: '0%' }}
      animate={{ width: serviceHovered ? '100%' : '0%' }}
      className="absolute top-0 left-1/2 h-px bg-white -translate-x-1/2"
    />

    <motion.span
      animate={{
        x: serviceHovered ? 6 : 0,
        y: serviceHovered ? -6 : 0
      }}
      transition={{
        mass: 0.5,
      }}
      className="absolute top-4 right-4">
      <MdArrowOutward className="text-4xl text-white" />
    </motion.span>
    <div className="stroke-white w-12 mb-8">
      {icon}
    </div>
    <motion.span
      initial={{ opacity: 0.8 }}
      animate={{ opacity: serviceHovered ? 0.5 : 0.8 }}
      className="text-3xl font-jost text-white">
      <Link href={link || ''}>
        {name}
      </Link>
    </motion.span>
    <div className="my-4">
      <p className="text-white text-xl font-manrope font-light">
        {description}
      </p>
    </div>
  </motion.div>
}
export default Service
