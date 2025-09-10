"use client";
import Footer from "@/components/footer";
import Nav from "@/components/navbar";
import { servicesSchema } from "@/lib/schemas";
import Head from "next/head";

const Services = () => {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
      </Head>
      <main>
        <Nav />
        <div className="bg-creatBG flex items-center justify-center h-screen">
          <div className="text-white text-xl">Still working on this page</div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Services;
