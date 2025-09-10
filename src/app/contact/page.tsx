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
      <main className="relative w-full h-dvh">
        <Nav />
        <div className="w-full h-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 960 540"
          >
            <path
              fill="#3e62b3"
              d="m0 266 11.5 7.5C23 281 46 296 68.8 303.3c22.9 7.4 45.5 7 68.4 5.4 22.8-1.7 45.8-4.7 68.6-14.5 22.9-9.9 45.5-26.5 68.4-30.7 22.8-4.2 45.8 4.2 68.6 4.8 22.9.7 45.5-6.3 68.4.4 22.8 6.6 45.8 27 68.8 32.1 23 5.2 46-4.8 68.8-14.6 22.9-9.9 45.5-19.5 68.4-17.7 22.8 1.8 45.8 15.2 68.6 22.8 22.9 7.7 45.5 9.7 68.4 11.4 22.8 1.6 45.8 3 68.6 5.8 22.9 2.8 45.5 7.2 68.4.2 22.8-7 45.8-25.4 57.3-34.5L960 265v276H0Z"
            />
            <path
              fill="#375bad"
              d="m0 279 11.5 4.2c11.5 4.1 34.5 12.5 57.3 20.6 22.9 8.2 45.5 16.2 68.4 21.5 22.8 5.4 45.8 8 68.6 8.7 22.9.7 45.5-.7 68.4-4.5 22.8-3.8 45.8-10.2 68.6-15 22.9-4.8 45.5-8.2 68.4-4.3C434 314 457 325 480 325.7c23 .6 46-9 68.8-16.2 22.9-7.2 45.5-11.8 68.4-7 22.8 4.8 45.8 19.2 68.6 22.2 22.9 3 45.5-5.4 68.4-13.2 22.8-7.8 45.8-15.2 68.6-16.2 22.9-1 45.5 4.4 68.4 8.7 22.8 4.3 45.8 7.7 57.3 9.3L960 315v226H0Z"
            />
            <path
              fill="#2f54a7"
              d="m0 340 11.5-5.3c11.5-5.4 34.5-16 57.3-19.7 22.9-3.7 45.5-.3 68.4 4.8C160 325 183 332 205.8 335.3c22.9 3.4 45.5 3 68.4 1.5 22.8-1.5 45.8-4.1 68.6-4.6 22.9-.5 45.5 1.1 68.4 5.1 22.8 4 45.8 10.4 68.8 6.2s46-18.8 68.8-21.5c22.9-2.7 45.5 6.7 68.4 14.2 22.8 7.5 45.8 13.1 68.6 12.1 22.9-1 45.5-8.6 68.4-13.5C777 330 800 328 822.8 322c22.9-6 45.5-16 68.4-14 22.8 2 45.8 16 57.3 23l11.5 7v203H0Z"
            />
            <path
              fill="#274ea0"
              d="m0 339 11.5-2.7c11.5-2.6 34.5-8 57.3-3.6 22.9 4.3 45.5 18.3 68.4 22.5 22.8 4.1 45.8-1.5 68.6-.9 22.9.7 45.5 7.7 68.4 7.7 22.8 0 45.8-7 68.6-12.7 22.9-5.6 45.5-10 68.4-10 22.8 0 45.8 4.4 68.8 3.9 23-.5 46-5.9 68.8-8.5 22.9-2.7 45.5-2.7 68.4-2 22.8.6 45.8 2 68.6 1 22.9-1 45.5-4.4 68.4.8 22.8 5.2 45.8 18.8 68.6 22.8 22.9 4 45.5-1.6 68.4-3.8 22.8-2.2 45.8-.8 57.3-.2l11.5.7v187H0Z"
            />
            <path
              fill="#1e479a"
              d="m0 342 11.5 4.7c11.5 4.6 34.5 14 57.3 18.6 22.9 4.7 45.5 4.7 68.4.7 22.8-4 45.8-12 68.6-13.2 22.9-1.1 45.5 4.5 68.4 11.5 22.8 7 45.8 15.4 68.6 14.2 22.9-1.2 45.5-11.8 68.4-16.5 22.8-4.7 45.8-3.3 68.8-5 23-1.7 46-6.3 68.8-9.3 22.9-3 45.5-4.4 68.4-3.7 22.8.7 45.8 3.3 68.6 5.2 22.9 1.8 45.5 2.8 68.4 2.1 22.8-.6 45.8-3 68.6 1.2 22.9 4.2 45.5 14.8 68.4 18.7 22.8 3.8 45.8.8 57.3-.7L960 369v172H0Z"
            />
            <path
              fill="#134094"
              d="m0 369 11.5 2.2c11.5 2.1 34.5 6.5 57.3 13.1 22.9 6.7 45.5 15.7 68.4 18.5 22.8 2.9 45.8-.5 68.6-5.1 22.9-4.7 45.5-10.7 68.4-10.2 22.8.5 45.8 7.5 68.6 10.7 22.9 3.1 45.5 2.5 68.4 3 22.8.5 45.8 2.1 68.8-3 23-5.2 46-17.2 68.8-21.4 22.9-4.1 45.5-.5 68.4 3 22.8 3.5 45.8 6.9 68.6 5.2 22.9-1.7 45.5-8.3 68.4-7.5 22.8.8 45.8 9.2 68.6 9 22.9-.2 45.5-8.8 68.4-12.5 22.8-3.7 45.8-2.3 57.3-1.7l11.5.7v168H0Z"
            />
            <path
              fill="#0a3c8d"
              d="m0 412 11.5-1.5c11.5-1.5 34.5-4.5 57.3-4 22.9.5 45.5 4.5 68.4 7.8 22.8 3.4 45.8 6 68.6 2.4 22.9-3.7 45.5-13.7 68.4-13.7 22.8 0 45.8 10 68.6 14.5 22.9 4.5 45.5 3.5 68.4-1C434 412 457 404 480 399s46-7 68.8-6.3c22.9.6 45.5 4 68.4 9.8 22.8 5.8 45.8 14.2 68.6 17.3 22.9 3.2 45.5 1.2 68.4-3.6 22.8-4.9 45.8-12.5 68.6-18 22.9-5.5 45.5-8.9 68.4-9 22.8-.2 45.8 2.8 57.3 4.3L960 395v146H0Z"
            />
            <path
              fill="#063987"
              d="m0 422 11.5 3c11.5 3 34.5 9 57.3 9.8 22.9.9 45.5-3.5 68.4-7.8 22.8-4.3 45.8-8.7 68.6-6.2 22.9 2.5 45.5 11.9 68.4 15.9 22.8 4 45.8 2.6 68.6-.2 22.9-2.8 45.5-7.2 68.4-11.8C434 420 457 415 480 417.8c23 2.9 46 13.5 68.8 16.7 22.9 3.2 45.5-1.2 68.4-6.7 22.8-5.5 45.8-12.1 68.6-12.8 22.9-.7 45.5 4.7 68.4 4.8 22.8.2 45.8-4.8 68.6-3.8 22.9 1 45.5 8 68.4 12.2 22.8 4.1 45.8 5.5 57.3 6.1l11.5.7v106H0Z"
            />
            <path
              fill="#043680"
              d="m0 448 11.5 1.7c11.5 1.6 34.5 5 57.3 3.6 22.9-1.3 45.5-7.3 68.4-11.3 22.8-4 45.8-6 68.6-4.8 22.9 1.1 45.5 5.5 68.4 8.8 22.8 3.3 45.8 5.7 68.6 5.5 22.9-.2 45.5-2.8 68.4-4.8 22.8-2 45.8-3.4 68.8-5 23-1.7 46-3.7 68.8-4.5 22.9-.9 45.5-.5 68.4 3 22.8 3.5 45.8 10.1 68.6 12.6 22.9 2.5 45.5.9 68.4.7 22.8-.2 45.8 1.2 68.6-1.2 22.9-2.3 45.5-8.3 68.4-8 22.8.4 45.8 7 57.3 10.4L960 458v83H0Z"
            />
            <path
              fill="#023379"
              d="m0 463 11.5-.2c11.5-.1 34.5-.5 57.3 1.7 22.9 2.2 45.5 6.8 68.4 6.8 22.8 0 45.8-4.6 68.6-5.6 22.9-1 45.5 1.6 68.4 3 22.8 1.3 45.8 1.3 68.6 0 22.9-1.4 45.5-4 68.4-2.9C434 467 457 472 480 473.5s46-.5 68.8-1.3c22.9-.9 45.5-.5 68.4-1 22.8-.5 45.8-1.9 68.6-4.5 22.9-2.7 45.5-6.7 68.4-8.4 22.8-1.6 45.8-1 68.6.9 22.9 1.8 45.5 4.8 68.4 5 22.8.1 45.8-2.5 57.3-3.9L960 459v82H0Z"
            />
            <path
              fill="#013172"
              d="m0 480 11.5 1.3c11.5 1.4 34.5 4 57.3 4.4 22.9.3 45.5-1.7 68.4-.7 22.8 1 45.8 5 68.6 6.5 22.9 1.5 45.5.5 68.4-1.7 22.8-2.1 45.8-5.5 68.6-6.3 22.9-.8 45.5.8 68.4 2.5 22.8 1.7 45.8 3.3 68.8 2.3s46-4.6 68.8-4.5c22.9.2 45.5 4.2 68.4 5.7 22.8 1.5 45.8.5 68.6-.5 22.9-1 45.5-2 68.4-2.8 22.8-.9 45.8-1.5 68.6-.9 22.9.7 45.5 2.7 68.4 3.4 22.8.6 45.8 0 57.3-.4l11.5-.3v53H0Z"
            />
            <path
              fill="#0c3d91"
              d="m0 504 11.5.3c11.5.4 34.5 1 57.3 1.2 22.9.2 45.5-.2 68.4-.2 22.8 0 45.8.4 68.6-.1 22.9-.5 45.5-1.9 68.4-2.2 22.8-.3 45.8.3 68.6 1.8 22.9 1.5 45.5 3.9 68.4 4.4 22.8.5 45.8-.9 68.8-1.2 23-.3 46 .3 68.8-.7 22.9-1 45.5-3.6 68.4-4.6 22.8-1 45.8-.4 68.6 1 22.9 1.3 45.5 3.3 68.4 4.3 22.8 1 45.8 1 68.6-.3 22.9-1.4 45.5-4 68.4-4.4 22.8-.3 45.8 1.7 57.3 2.7l11.5 1v34H0Z"
            />
          </svg>
        </div>
        <section className="grid grid-cols-5 max-w-[1600px] py-20 gap-10 w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="col-span-2 bg-black/10 backdrop-blur-md border-2 \
          border-black/5 rounded-2xl drop-shadow-md p-10 flex flex-col gap-y-8 text-white"
          >
            <div className="flex flex-col gap-y-4">
              <h1 className="text-3xl font-bold">Where we are</h1>
              <address className="not-italic">
                <Link
                  aria-label="View on Google Maps"
                  rel="noopener noreferrer"
                  href="https://maps.app.goo.gl/CS2koQtTpYHTVvRq7"
                  target="_blank"
                >
                  <p className="text-lg font-medium hover:text-creatBright transition-colors">
                    Baku, Azerbaijan <br />
                    Samad Vurgun st. 110 <br />
                    Vurgun Residence Building <br />
                    2nd Floor, Creat Office
                  </p>
                </Link>
              </address>
            </div>
            <div className="flex flex-col gap-y-4">
              <h1 className="text-3xl font-bold">Contact us</h1>
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col">
                  <a
                    aria-label="Call +994554158215"
                    href="tel:+994554158215"
                    className="text-lg font-medium hover:text-creatBright transition-colors"
                  >
                    (994) 55 415 82 15
                  </a>
                  <a
                    aria-label="Call +994502242944"
                    href="tel:+994502242944"
                    className="text-lg font-medium hover:text-creatBright transition-colors"
                  >
                    (994) 50 224 29 44
                  </a>
                </div>
                <div className="flex flex-col">
                  <a
                    aria-label="Email info@creat.az"
                    href="mailto:info@creat.az"
                    className="text-lg font-medium hover:text-creatBright transition-colors"
                  >
                    info@creat.az
                  </a>
                  <a
                    aria-label="Email contact@creat.az"
                    href="mailto:contact@creat.az"
                    className="text-lg font-medium hover:text-creatBright transition-colors"
                  >
                    contact@creat.az
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <h1 className="text-3xl font-bold">Office hours</h1>
              <div className="flex flex-col">
                <time className="text-lg font-medium">Monday - Friday</time>
                <time className="text-lg font-medium">9:00-18:00</time>
              </div>
            </div>
          </div>
          <div className="col-span-3 overflow-hidden rounded-2xl drop-shadow-md h-[600px]">
            <GoogleMap className="w-full h-full" />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};
export default Contact;
