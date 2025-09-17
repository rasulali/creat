import { ReactNode, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface ServiceProps {
  name: string;
  description: string;
  icon: ReactNode;
}
const Service: React.FC<ServiceProps> = ({ name, description, icon }) => {
  const ref = useRef(null);
  const serviceInView = useInView(ref, { once: true, amount: 0.5 });
  const [serviceHovered, setServiceHovered] = useState(false);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={serviceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
      className="flex flex-col border-t pt-6 px-2 border-white/50 relative"
      onHoverStart={() => {
        setServiceHovered(true);
      }}
      onHoverEnd={() => {
        setServiceHovered(false);
      }}
    >
      <motion.span
        initial={{ width: "0%" }}
        animate={{ width: serviceHovered ? "100%" : "0%" }}
        className="absolute top-0 left-1/2 h-px bg-white -translate-x-1/2"
      />

      <div className="stroke-white md:w-12 w-6 mb-3 md:mb-8">{icon}</div>
      <motion.span
        initial={{ opacity: 0.8 }}
        animate={{ opacity: serviceHovered ? 0.5 : 0.8 }}
        className="md:text-3xl text-lg font-comfortaa text-white"
      >
        <h1>{name}</h1>
      </motion.span>
      <div className="md:my-4">
        <p className="text-white md:text-xl font-manrope font-light">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
export default Service;
