import { useInView, motion } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { SubmitEmailResponse } from "@/app/submit-email/types";

const EmailForm = () => {
  const emailRef = useRef(null);
  const emailInView = useInView(emailRef, {
    once: true,
    amount: 0.5
  });


  const formRef = useRef<HTMLFormElement>(null);

  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result: SubmitEmailResponse = await response.json();

      if (response.ok) {
        if (result.isSpam) {
          setMessage('Your submission has been flagged as potential spam. Please try again later.');
        } else {
          setMessage('Email submitted successfully!');
        }
      } else {
        setMessage(`Error: ${(result as any).error}`);
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setMessage('An error occurred while submitting your email. Please try again.');
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
      delay: 0.2
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
