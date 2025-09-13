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
          ></svg>
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
