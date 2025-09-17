"use client";
import Footer from "@/components/footer";
import GoogleMap from "@/components/map";
import Nav from "@/components/navbar";
import { contactSchema } from "@/lib/schemas";
import Head from "next/head";
import Link from "next/link";

const Contact = () => {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(contactSchema),
          }}
        />
      </Head>
      <main className="bg-creatBG">
        <Nav />
        <section
          className="grid md:grid-cols-5 md:py-20 md:px-28 md:gap-10
          w-full relative gap-6"
        >
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-2/3 hidden md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              viewBox="0 0 900 600"
            >
              <path
                fill="#072045"
                d="m0 181 25-15c25-15 75-45 125-45s100 30 150 36 100-12 150-7 100 33 150 39 100-10 150-33 100-53 125-68l25-15V53l-25 17c-25 17-75 51-125 74s-100 35-150 22-100-51-150-62-100 5-150 1-100-28-150-30S50 93 25 103L0 113Z"
              />
              <path
                fill="#05285b"
                d="m0 277 25-16c25-16 75-48 125-43s100 47 150 50 100-33 150-35 100 30 150 31 100-29 150-55 100-48 125-59l25-11V71l-25 15c-25 15-75 45-125 68s-100 39-150 33-100-34-150-39-100 13-150 7-100-36-150-36-100 30-125 45L0 179Z"
              />
              <path
                fill="#053171"
                d="m0 307 25-17c25-17 75-51 125-50s100 37 150 48 100-3 150-4 100 11 150 8 100-21 150-39l125-45 25-9v-62l-25 11c-25 11-75 33-125 59s-100 56-150 55-100-33-150-31-100 38-150 35-100-45-150-50-100 27-125 43L0 275Z"
              />
              <path
                fill="#083a88"
                d="m0 313 25-16c25-16 75-48 125-43s100 47 150 62 100 3 150 4 100 15 150 10 100-29 150-53l125-60 25-12v-8l-25 9-125 45c-50 18-100 36-150 39s-100-9-150-8-100 15-150 4-100-47-150-48-100 33-125 50L0 305Z"
              />
              <path
                fill="#0c3d91"
                d="m0 349 25-2c25-2 75-6 125 9s100 49 150 58 100-7 150-4 100 25 150 26 100-19 150-23 100 8 125 14l25 6V203l-25 12-125 60c-50 24-100 48-150 53s-100-9-150-10-100 11-150-4-100-57-150-62-100 27-125 43L0 311Z"
              />
              <path
                fill="#0c3d91"
                d="m0 391 25-6c25-6 75-18 125-7s100 45 150 57 100 2 150 7 100 25 150 26 100-17 150-20 100 9 125 15l25 6v-38l-25-6c-25-6-75-18-125-14s-100 24-150 23-100-23-150-26-100 13-150 4-100-43-150-58-100-11-125-9l-25 2Z"
              />
              <path
                fill="#083a88"
                d="m0 427 25-3c25-3 75-9 125-1s100 30 150 40 100 8 150 14 100 20 150 21 100-11 150-10 100 15 125 22l25 7v-50l-25-6c-25-6-75-18-125-15s-100 21-150 20-100-21-150-26-100 5-150-7-100-46-150-57-100 1-125 7l-25 6Z"
              />
              <path
                fill="#053171"
                d="m0 463 25-8c25-8 75-24 125-22s100 22 150 31 100 7 150 19 100 38 150 43 100-11 150-16 100 1 125 4l25 3v-2l-25-7c-25-7-75-21-125-22s-100 11-150 10-100-15-150-21-100-4-150-14-100-32-150-40-100-2-125 1l-25 3Z"
              />
              <path
                fill="#05285b"
                d="m0 511 25-7c25-7 75-21 125-21s100 14 150 21 100 7 150 17 100 30 150 32 100-14 150-22 100-8 125-8h25v-8l-25-3c-25-3-75-9-125-4s-100 21-150 16-100-31-150-43-100-10-150-19-100-29-150-31-100 14-125 22l-25 8Z"
              />
              <path
                fill="#072045"
                d="M0 517h25c25 0 75 0 125 7s100 21 150 24 100-5 150-2 100 17 150 22 100 1 150-1 100-2 125-2h25v-44h-25c-25 0-75 0-125 8s-100 24-150 22-100-22-150-32-100-10-150-17-100-21-150-21-100 14-125 21l-25 7Z"
              />
            </svg>
          </div>
          <div
            className="col-span-2 md:bg-black/10 md:backdrop-blur-md md:border-2 \
          border-black/5 md:rounded-2xl md:drop-shadow-md md:p-10 md:flex flex-col md:gap-y-8 \
            gap-y-4 text-white px-6 grid grid-cols-2 grid-rows-2 gap-x-4 md:gap-x-0"
          >
            <div className="flex flex-col md:gap-y-4 gap-y-2 col-span-2">
              <h1 className="md:text-3xl text-lg font-bold">Where we are</h1>
              <address className="not-italic">
                <Link
                  aria-label="View on Google Maps"
                  rel="noopener noreferrer"
                  href="https://maps.app.goo.gl/CS2koQtTpYHTVvRq7"
                  target="_blank"
                >
                  <p className="md:text-lg font-medium hover:text-creatBright transition-colors">
                    Baku, Azerbaijan <br />
                    Samad Vurgun st. 110 <br />
                    Vurgun Residence Building <br />
                    2nd Floor, Creat Office
                  </p>
                </Link>
              </address>
            </div>
            <div className="flex flex-col md:gap-y-4 gap-y-2">
              <h1 className="md:text-3xl text-lg font-bold">Contact us</h1>
              <div className="flex flex-col gap-y-2 md:text-lg">
                <div className="flex flex-col">
                  <a
                    aria-label="Call +994554158215"
                    href="tel:+994554158215"
                    className="font-medium hover:text-creatBright transition-colors"
                  >
                    (994) 55 415 82 15
                  </a>
                  <a
                    aria-label="Call +994502242944"
                    href="tel:+994502242944"
                    className="font-medium hover:text-creatBright transition-colors"
                  >
                    (994) 50 224 29 44
                  </a>
                </div>
                <div className="flex flex-col">
                  <a
                    aria-label="Email info@creat.az"
                    href="mailto:info@creat.az"
                    className="font-medium hover:text-creatBright transition-colors"
                  >
                    info@creat.az
                  </a>
                  <a
                    aria-label="Email contact@creat.az"
                    href="mailto:contact@creat.az"
                    className="font-medium hover:text-creatBright transition-colors"
                  >
                    contact@creat.az
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:gap-y-4 gap-y-2">
              <h1 className="md:text-3xl text-lg font-bold">Office hours</h1>
              <div className="flex flex-col md:text-lg">
                <time className="font-medium">Monday - Friday</time>
                <time className="font-medium">9:00-18:00</time>
              </div>
            </div>
          </div>
          <div className="col-span-3 overflow-hidden md:rounded-2xl md:drop-shadow-md h-[600px]">
            <GoogleMap className="w-full h-full" />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};
export default Contact;
