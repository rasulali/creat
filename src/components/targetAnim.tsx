import React, { useRef } from "react"
import { motion, useInView, useAnimationControls, Variants } from "framer-motion"

const TargetAnim = () => {
  const ref = useRef(null)
  const targetInView = useInView(ref, {
    once: true,
    margin: "-50% 0px"
  })
  const arrowControls = useAnimationControls()
  const ringControls = useAnimationControls()

  React.useEffect(() => {
    if (targetInView) {
      const animateSequence = async () => {
        await arrowControls.start("visible")
        ringControls.start("animate")
      }
      animateSequence()
    }
  }, [targetInView, arrowControls, ringControls])

  const circleVariants: Variants = {
    initial: { scale: 1, opacity: 1 },
    animate: (i: number) => ({
      scale: [1, 1.1, 0.9, 1],
      opacity: [0.5, 1, 1, 0.5, 1],
      transition: {
        duration: 1.5,
        times: [0, 0.2, 0.5, 1],
        delay: i * 0.1,
      },
    }),
  }

  const arrowVariants: Variants = {
    hidden: { x: -1000, y: -500, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeIn",
        duration: 0.3,
      }
    }
  }


  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: targetInView ? 0.3 : 0 }}
      transition={{ duration: 0.5 }}
      className="w-[500px] absolute right-0 top-0"
    >
      <svg
        className="overflow-visible"
        viewBox="0 0 1206 1033" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="target">
          <g id="target_2">
            {[88, 188, 288, 388, 488].map((radius, index) => (
              <motion.circle
                key={`r_${index}`}
                cx="706"
                cy="533"
                r={radius}
                stroke="white"
                strokeWidth="24"
                initial="initial"
                animate={ringControls}
                variants={circleVariants}
                custom={index}
              />
            ))}
          </g>
          <motion.path
            id="arrow"
            d="M227.707 289.99L711.601 538.569M683.878 452.458L711.55 538.619L625.399 566.322M227.717 290.021L200.034 203.829L86.1605 145.32L113.843 231.511L27.6815 259.184L141.515 317.673L227.717 290.021Z"
            stroke="white"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial="hidden"
            animate={arrowControls}
            variants={arrowVariants}
          />
        </g>
      </svg>
    </motion.div>
  )
}

export default TargetAnim
