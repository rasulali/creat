import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { createClient } from "../../utils/supabase/client";

const EmailForm = () => {
  const emailRef = useRef(null);
  const emailInView = useInView(emailRef, {
    once: true,
  });

  const supabase = createClient();

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    await supabase
      .from("email_submissions")
      .insert({ email });

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return <motion.div
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
    }}
    className="max-h-[400px] rounded-2xl bg-creatBGLight/10 border-2 backdrop-blur
          border-creatBGLight/20 flex gap-x-12 justify-between px-[60px] py-[72px] z-10">
    <div className="flex flex-col gap-y-4">
      <h1 className="text-4xl font-bold">Contact with us for <br />Further discussion</h1>
      <p className="text-xl text-neutral-200">Do you have a big project in mind?<br />Let’s turn your vision into reality</p>
    </div>
    <div className="my-auto flex items-center justify-center w-fit">
      <svg viewBox="0 0 24 24" className="w-12 h-12">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
          <motion.path
            strokeDasharray={20}
            strokeDashoffset={20}
            d="M3 12h17.5"
            initial={{ strokeDashoffset: 20 }}
            animate={{ strokeDashoffset: emailInView ? 0 : 20 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          />
          <motion.path
            strokeDasharray={12}
            strokeDashoffset={12}
            d="M21 12l-7 7M21 12l-7 -7"
            initial={{ strokeDashoffset: 12 }}
            animate={{ strokeDashoffset: emailInView ? 0 : 10 }}
            transition={{ duration: 0.2, delay: 0.3 }}
          />
        </g>
      </svg>
    </div>
    <div className="flex flex-col gap-y-4">
      <h1 className="text-2xl font-bold">
        Submit Your Email
      </h1>
      <form ref={formRef} className="flex gap-x-4" onSubmit={handleSubmit}>
        <input name="email" type="email" className="min-w-[300px] px-6 py-5 rounded-lg
                outline-none text-xl border-2 border-transparent focus:border-black text-black" placeholder="Enter your email" />
        <button type="submit" className="bg-black px-6 py-5 rounded-lg text-white text-xl font-bold
                group hover:bg-white hover:text-black transition-colors">
          Submit
        </button>
      </form>
    </div>
  </motion.div>
}
export default EmailForm;
