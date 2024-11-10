import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

type ParagraphAnimationProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export const ParagraphAnimation = ({
  children,
  delay = 0.5,
  className,
}: ParagraphAnimationProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const createWordSpans = (text: string) => {
    const words = text.split(/\s+/).filter(Boolean);
    const totalWords = words.length;

    return words.map((word, index) => {
      // Calculate the delay based on the index and total words
      const wordDelay = delay * (1 - index / totalWords);

      return (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: {
              opacity: 0.5,
              y: 10,
              transition: { duration: 0.4 }
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                delay: wordDelay
              }
            }
          }}
        >
          {word}&nbsp;
        </motion.span>
      );
    });
  };

  const processChildren = (children: ReactNode): ReactNode => {
    if (typeof children === 'string') {
      return createWordSpans(children);
    }

    if (!children || typeof children !== 'object' || !('props' in children)) {
      return children;
    }

    const childElement = children as any;

    if (childElement.props.children) {
      const processedChildren = typeof childElement.props.children === 'string'
        ? createWordSpans(childElement.props.children)
        : childElement.props.children;

      return {
        ...childElement,
        props: {
          ...childElement.props,
          children: processedChildren,
        },
      };
    }

    return children;
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0,
            delayChildren: 0,
          }
        },
        hidden: {}
      }}
    >
      {processChildren(children)}
    </motion.div>
  );
};

export default ParagraphAnimation;
