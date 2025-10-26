"use client";

import { useInView, motion } from "motion/react";
import { useRef } from "react";
import { isEmail } from "validator";
import { createClient } from "../../utils/supabase/client";

const EmailForm = () => {
  const emailRef = useRef(null);
  const emailInView = useInView(emailRef, {
    once: true,
    amount: 0.5,
  });

  const supabase = createClient();

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    if (!isEmail(email)) {
      if (formRef.current) {
        formRef.current.reset();
      }
      return;
    } else {
      await supabase.from("email_submissions").insert({ email });

      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  return (
    <motion.div
      ref={emailRef}
      initial={{
        scale: 0.9,
      }}
      animate={{
        scale: emailInView ? 1 : 0.9,
      }}
      transition={{
        mass: 0.5,
        stiffness: 400,
        damping: 20,
        delay: 0.2,
      }}
      className="
        rounded-2xl text-white flex flex-col gap-y-6 px-6 py-8 z-10
        md:max-h-[400px] md:bg-creatBGLight/10 md:border-2 md:border-creatBGLight/20 md:backdrop-blur
        md:flex-row md:gap-x-12 md:justify-between md:px-[60px] md:py-[72px]
      "
    >
      {/* Left text block */}
      <div className="flex flex-col gap-y-2 md:gap-y-4">
        <h1 className="text-2xl md:text-4xl font-bold leading-tight">
          Contact with us for <br />
          Further discussion
        </h1>

        <p className="text-sm md:text-xl text-neutral-200 leading-relaxed">
          Do you have a big project in mind?
          <br className="hidden md:block" />
          Let’s turn your vision into reality
        </p>
      </div>

      {/* Arrow (hidden on mobile, keep original on md+) */}
      <div className="hidden md:flex my-auto items-center justify-center w-fit text-white">
        <svg viewBox="0 0 24 24" className="w-12 h-12">
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          >
            <motion.path
              strokeDasharray={20}
              strokeDashoffset={20}
              d="M3 12h17.5"
              initial={{ strokeDashoffset: 20 }}
              animate={{ strokeDashoffset: emailInView ? 0 : 20 }}
              transition={{ duration: 0.2, delay: 0.3 }}
            />
            <motion.path
              strokeDasharray={12}
              strokeDashoffset={12}
              d="M21 12l-7 7M21 12l-7 -7"
              initial={{ strokeDashoffset: 12 }}
              animate={{ strokeDashoffset: emailInView ? 0 : 10 }}
              transition={{ duration: 0.2, delay: 0.5 }}
            />
          </g>
        </svg>
      </div>

      {/* Form block */}
      <div className="flex flex-col gap-y-3 md:gap-y-4 md:my-auto">
        <h1 className="text-xl md:text-2xl font-bold">Submit Your Email</h1>

        <form
          ref={formRef}
          className="flex flex-col gap-y-3 md:flex-row md:gap-x-4 md:gap-y-0"
          onSubmit={handleSubmit}
        >
          <input
            required
            name="email"
            type="email"
            className="
              w-full rounded-lg outline-none text-base text-white
              bg-transparent border-2 border-white/30 px-4 py-4
              transition-colors focus:border-white
              md:min-w-[300px] md:w-auto md:px-6 md:py-5 md:text-xl
              md:border-creatBGLight/50 md:focus:border-creatBGLight
            "
            placeholder="Enter your email"
          />

          <button
            type="submit"
            className="
              w-full rounded-lg font-bold
              px-4 py-4 text-base
              bg-white text-black
              transition-colors
              md:w-auto md:px-6 md:py-5 md:text-xl
              md:bg-black md:text-white
              md:hover:bg-white md:hover:text-black
            "
          >
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default EmailForm;
