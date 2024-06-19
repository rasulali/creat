"use client";
import Nav from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Nav />
      <section className="w-screen h-screen">
        <div className="w-full h-full flex items-end justify-end relative">
          <Image
            src="/Heydar_Aliyev_Center.png"
            alt=""
            width={1920}
            height={1080}
            className="md:w-1/2 md:h-auto h-1/2 w-full object-cover object-right "
          />
          <div
            className="w-full h-32 bg-gradient-to-t from-white via-white/50
          to-transparent absolute bottom-0 left-0"
          />
        </div>
      </section>
    </main>
  );
}
