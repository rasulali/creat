"use client";
import { useState } from "react";
import { login } from "./actions";
import { ImSpinner9, ImWarning } from "react-icons/im";
import { AnimatePresence, motion } from "framer-motion";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      const response = await login(formData);
      if (response?.error) {
        setError(true);
        const normalizedError = response.error.toLowerCase();
        const errorKeywords = ["invalid", "login", "credentials", "incorrect"];
        if (
          errorKeywords.some((keyword) => normalizedError.includes(keyword))
        ) {
          setMessage("Giriş bilgiləri yalnışdır");
        } else
          setMessage(
            "Gözlənilməz xəta baş verdi. İnternet bağlantınızı yoxlayın və yenidən cəhd edin",
          );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col bg-zinc-100">
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="w-[calc(100%-32px)] md:w-fit bg-red-500 h-16 fixed top-4 left-4 rounded-lg flex"
          >
            <div className="h-full aspect-square flex items-center justify-center">
              <ImWarning className="text-white text-xl" />
            </div>
            <div className="w-full h-full flex items-center md:pr-[22px]">
              <h1 className="text-white font-semibold">{message}</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full h-full flex flex-col flex-grow items-center justify-center">
        <div className="flex flex-col gap-y-1 p-4 rounded-lg bg-white drop-shadow-lg">
          <div className="flex flex-col pb-4">
            <h1 className="text-xl font-semibold">Login</h1>
            <p className="text-zinc-500">Sign in with your credentials</p>
          </div>
          <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <input
              id="email"
              name="email"
              type="email"
              onChange={() => {
                setError(false);
              }}
              required
              className={`w-full text-lg px-4 py-2 rounded-lg focus:outline-none border-2
              ${error && "border-red-400"}
                `}
              placeholder="email"
            />
            <input
              id="password"
              name="password"
              type="password"
              onChange={() => {
                setError(false);
              }}
              required
              className={`w-full text-lg px-4 py-2 rounded-lg focus:outline-none border-2
              ${error && "border-red-400"}
                `}
              placeholder="password"
            />
            <button
              type="submit"
              className="text-lg uppercase bg-blue-500 text-white w-full py-2
          font-semibold flex items-center justify-center border-2 border-blue-500 hover:text-blue-500
          rounded-lg focus:outline-none hover:bg-transparent transition-colors duration-300"
            >
              {loading ? <ImSpinner9 className="animate-spin h-7" /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
