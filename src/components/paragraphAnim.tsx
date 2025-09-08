import { motion, useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";

interface ParagraphAnimationProps {
  children: React.ReactNode;
  delay?: number;
}

export const ParagraphAnimation = ({
  children,
  delay = 0.2,
}: ParagraphAnimationProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: "easeOut",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
