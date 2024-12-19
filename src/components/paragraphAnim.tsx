import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, ReactNode, useMemo, cloneElement } from "react";

export const ParagraphAnimation = ({
  children,
  maxDelay = 1,
  minDelay = 0.1,
}: ParagraphAnimationProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const createWordSpans = useMemo(() => (text: string) => {
    const words = text.split(/\s+/).filter(Boolean);

    return words.map((word, index) => {
      const delayIncrement = ((maxDelay - minDelay) / Math.max(words.length - 1, 1));
      const wordDelay = minDelay + (index * delayIncrement);

      return (
        <motion.span
          key={`${word}-${index}`}
          style={{
            display: 'inline-block',
            marginRight: '0.25em',
          }}
          variants={{
            hidden: {
              opacity: 0.5,
              y: 10,
              transition: { duration: 0.3 }
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.3,
                delay: wordDelay,
                ease: "easeOut"
              }
            }
          }}
        >
          {word}
        </motion.span>
      );
    });
  }, [minDelay, maxDelay]);

  const processChildren = useMemo(() => (children: ReactNode): ReactNode => {
    if (typeof children === 'string') {
      return createWordSpans(children);
    }

    const childElement = children as React.ReactElement;

    if (!childElement?.props?.children) {
      return children;
    }

    return cloneElement(childElement, {
      ...childElement.props,
      children: typeof childElement.props.children === 'string'
        ? createWordSpans(childElement.props.children)
        : childElement.props.children
    });
  }, [createWordSpans]);

  const processedContent = useMemo(() => processChildren(children), [children, processChildren]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0,
          }
        },
        hidden: {}
      }}
    >
      {processedContent}
    </motion.div>
  );
};

export default ParagraphAnimation;
