"use client";
import { Suspense, useEffect, useState } from "react";
import { createClient } from "../../../../utils/supabase/client";
import Nav from "@/components/navbar";
import TextAnim from "@/components/animatedText";
import { ProjectLightbox } from "@/components/projectLightbox";
import { motion } from "motion/react";
import Footer from "@/components/footer";
import { ParagraphAnimation } from "@/components/paragraphAnim";
import StructuredData from "./structured-data";
import { useParams } from "next/navigation";
import Image from "next/image";

const Content = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const slug = params.slug as string;

  useEffect(() => {
    const fetchProject = async () => {
      const id = parseInt(slug.split("-").pop() || "", 10);
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from("images")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          setError(error);
        } else {
          setProject(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-creatBG flex items-center justify-center h-screen">
        <div className="text-white text-xl">Loading...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-creatBG flex items-center justify-center h-screen">
        <div className="text-red-500 text-xl">
          An error occurred: {error.message}
        </div>
      </main>
    );
  }

  return (
    <main className="bg-creatBG relative">
      <StructuredData project={project} />
      <Nav isTransparent={true} />
      <section className="flex flex-col relative">
        <div className="relative z-10 w-full h-[80vh] grid md:[grid-template-rows:1fr_4fr_1fr]">
          <div
            className="row-span-1 row-start-2 flex flex-col justify-center
            md:gap-y-8 gap-y-3 px-6 pt-16 md:pt-0"
          >
            <div className="md:w-[calc(50%-24px)]">
              <TextAnim dir=">">
                <h1 className="md:text-4xl text-2xl text-white/90">
                  {project?.name}
                </h1>
              </TextAnim>
            </div>
            <ParagraphAnimation>
              <div className="md:w-1/2">
                <p className="text-white/70 md:text-xl">
                  {project?.description}
                </p>
              </div>
            </ParagraphAnimation>
          </div>
          <div className="row-span-1 row-start-3 md:w-1/2 h-full flex flex-col">
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "calc(100% - 64px)", opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-px bg-white/50 w-0 hidden md:block"
            />
            <div className="flex w-full h-full px-6 py-16 md:gap-x-16 gap-x-6 md:max-w-[664px] ml-auto">
              <div className="flex flex-col">
                <h1 className="md:text-base text-sm text-white/50 uppercase">
                  Location
                </h1>
                <h1 className="md:text-xl font-medium text-white/90">
                  {project?.location}
                </h1>
              </div>
              <div className="flex flex-col">
                <h1 className="md:text-base text-sm text-white/50 uppercase">
                  Service
                </h1>
                <h1 className="md:text-xl font-medium text-white/90">
                  {project?.service}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {project && (
              <Image
                src={project.images[project.bannerImage]}
                alt={project.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                className="object-cover"
                quality={50}
              />
            )}
            <div className="bg-creatBG/20 absolute inset-0 backdrop-blur-sm" />
          </div>
        </div>
      </section>
      <section className="md:py-32 py-6">
        <div className="md:ml-32 ml-6 flex md:w-[calc(100%-128px)] gap-x-4">
          <motion.span
            className="text-white/90 md:text-xl wf font-medium font-comfortaa \
            border border-white/50 md:w-14 md:h-14 w-10 h-10 shrink-0 flex justify-center items-center rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
          >
            02
          </motion.span>
          <div className="flex flex-col w-full md:h-28">
            <motion.span
              viewport={{ once: true }}
              className="w-0 h-px bg-white/50 md:mt-7 mt-5"
              initial={{
                width: 0,
                opacity: 0,
              }}
              whileInView={{ width: "100%", opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            />
            <motion.h1
              className="text-white/90 md:mt-7 mt-2 font-comfortaa md:text-xl tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Gallery
            </motion.h1>
          </div>
        </div>
        <div className="px-6">
          <ProjectLightbox project={project} />
        </div>
      </section>
      <Footer />
    </main>
  );
};

const Project = () => {
  return (
    <Suspense
      fallback={
        <main className="bg-creatBG flex items-center justify-center h-screen">
          <div className="text-white text-xl">Loading...</div>
        </main>
      }
    >
      <Content />
    </Suspense>
  );
};

export default Project;
