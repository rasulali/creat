"use client";
import Nav from "@/components/navbar";
import Image from "next/image";
import HAC from "../../public/Heydar_Aliyev_Center.png";
import CreatText from "@/components/creat";

export default function Home() {
  return (
    <main>
      <Nav />
      <section className="w-screen h-screen">
        <div className="w-full h-full relative flex items-end justify-end">
          <div className="w-1/2 -z-50">
            <Image src={HAC} alt="Image of Heydar Aliyev Center" />
          </div>
          <div
            className="w-full h-24 bg-gradient-to-t from-white
          to-transparent absolute bottom-0 left-0 -z-40"
          />
        </div>
      </section>
    </main>
  );
}
