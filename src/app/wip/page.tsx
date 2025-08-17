"use client";
import { FlipWords } from "@/components/flipWords";
import Footer from "@/components/footer";
import Nav from "@/components/navbar";

const WorkInProgress = () => {
  return (
    <main className="text-white">
      <section className="flex flex-col min-h-dvh w-full">
        <div className="flex items-center justify-center h-full w-full relative overflow-hidden">
          <FlipWords
            className="text-5xl font-comfortaa font-[500]"
            delay={5000}
            duration={2000}
            words={[
              "Sorry, This Website is Still Under Construction",
              "Great Things Takes Time :)",
            ]}
          />
        </div>
        <Nav isTransparent={true} />
      </section>
      <Footer />
    </main>
  );
};
export default WorkInProgress;
