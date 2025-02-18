'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "../../../../utils/supabase/client";
import Nav from "@/components/navbar";
import TextAnim from "@/components/animatedText";
import ParagraphAnimation from "@/components/paragraphAnim";
import { Carousel } from "@/components/carousel";
import { motion } from 'framer-motion'
import Footer from "@/components/footer";
import { BackgroundBeams } from "@/components/bgBeams";

const Project = ({ params }: { params: { slug: string } }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const id = parseInt(params.slug.split('-').pop() || '', 10);
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from('images')
          .select('*')
          .eq('id', id)
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
  }, [params.slug]);

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
      <Nav isTransparent={true} />
      <section className="flex flex-col relative">
        <div className="relative z-10 w-full h-full grid [grid-template-rows:1fr_4fr_1fr]">
          <div className="row-span-1 row-start-2 flex flex-col justify-center
            gap-y-8 px-6">
            <TextAnim dir=">">
              <div className="flex flex-col gap-y-2">
                <h1
                  className="text-7xl text-white/90"
                >{project?.name || ''}</h1>
                <h1
                  className="text-5xl text-white/70"
                >{project?.location || ''}</h1>
              </div>
            </TextAnim>
            <ParagraphAnimation>
              <div className="w-1/2 px-4">
                <p className="text-white/80 text-xl">
                  {project?.description || ''}
                </p>
              </div>
            </ParagraphAnimation>
          </div>
          <div className="row-span-1 row-start-3 w-1/2 h-full flex flex-col">
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "calc(100% - 64px)", opacity: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.2,
              }}
              viewport={{ once: true }}
              className="h-px bg-white/50 w-0" />
            <div className="flex w-full h-full px-4 pt-16 pb-4 gap-x-16 max-w-[664px] ml-auto">
              <div className="flex flex-col">
                <h1 className="text-white/50 uppercase">Location</h1>
                <h1
                  className="text-xl font-medium text-white/90"
                >{project?.location || ''}</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-white/50 uppercase">Service</h1>
                <h1 className="text-xl font-medium text-white/90">
                  {project?.service
                    ? project.service
                    : ''}
                </h1>

              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 grid grid-cols-2 z-[2]">
          <div className="relative col-start-2 h-full">
            <Image
              src={project?.images ? Object.values(project.images)[0] : ''}
              alt={project?.name || ''}
              fill
              priority
              sizes="50vw"
              className="object-cover"
              quality={90}
            />
            <div className="absolute inset-0 bg-black/60">
            </div>
          </div>
        </div>
      </section>
      <section className="py-32">
        <div className="ml-32 flex w-[calc(100%-128px)] gap-x-4">
          <motion.span
            className="text-white/90 text-xl font-medium font-jost border border-white/50 w-14 h-14 flex justify-center items-center rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            viewport={{ once: true }}
          >
            02
          </motion.span>
          <div className="flex flex-col w-full h-28">
            <motion.span
              viewport={{ once: true }}
              className="w-0 h-px bg-white/50 mt-7"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "100%", opacity: 1 }}
              transition={{
                duration: 0.2,
                delay: 0.2,
              }}
            />
            <motion.h1
              className="text-white/90 mt-7 font-jost text-xl tracking-wide"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Gallery
            </motion.h1>
          </div>
        </div>
        <div>
          <Carousel project={project} />
        </div>
      </section>
      <BackgroundBeams className="z-[1]" />
      <Footer className="relative z-[2]" />
    </main>
  );
};

export default Project;
