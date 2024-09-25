import { motion, useAnimation, useInView, Variants } from "framer-motion"
import { useEffect, useRef } from "react"
const TextAnim = ({ children, delay, dir }: { children: React.ReactNode, delay?: number, dir?: '<' | '>' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5
  })
  const controls = useAnimation()
  useEffect(() => {
    if (isInView) controls.start("visible")
  }, [isInView])
  const variants: Variants = {
    hidden: (custom) => {
      if (custom === '<') {
        return ({ opacity: 0, x: 100 })
      }
      return ({ opacity: 0, x: -100 })
    },
    visible: { opacity: 1, x: 0 }
  }
  return <div ref={ref} className={`w-fit relative inline
  ${dir === '<' ? 'ml-auto' : 'mr-auto'}
`}>
    <motion.div
      variants={variants}
      initial="hidden"
      animate={controls}
      custom={dir || '>'}
      transition={{ duration: 0.5, delay: delay || 0 }}>
      {children}
    </motion.div>
  </div>
}
export default TextAnim
