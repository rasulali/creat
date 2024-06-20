"use client";
import { useState } from "react";
import { login } from "./actions";
import { ImSpinner9 } from "react-icons/im";
import {
  BsFillQuestionCircleFill,
  BsExclamationCircleFill,
} from "react-icons/bs";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      const response = await login(formData);
      if (response?.error) {
        const normalizedError = response.error.toLowerCase();
        const errorKeywords = ["invalid", "login", "credentials", "incorrect"];
        if (
          errorKeywords.some((keyword) => normalizedError.includes(keyword))
        ) {
          setError(true);
          if (!toast.isActive(0)) {
            toast.error("Giriş bilgiləri yalnışdır!", {
              toastId: 0,
              position: "top-left",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Slide,
              icon: () => (
                <BsExclamationCircleFill className="text-lg text-red-500" />
              ),
            });
          }
        } else {
          if (!toast.isActive(1)) {
            toast.error(
              "Gözlənilməz xəta baş verdi. İnternet bağlantınızı yoxlayın və yenidən cəhd edin",
              {
                toastId: 1,
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Slide,
                icon: () => (
                  <BsFillQuestionCircleFill className="text-lg text-amber-500" />
                ),
              },
            );
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col bg-zinc-100">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={2}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />

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
