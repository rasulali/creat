'use client'

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { createClient } from "../../../../utils/supabase/client";
import Nav from "@/components/navbar";
import TextAnim from "@/components/animatedText";
import ParagraphAnimation from "@/components/paragraphAnim";
import { categories, formatDate, handleDisplayName } from "@/lib/helperFunctions";
import { Carousel } from "@/components/carousel";
const Project = ({ params }: { params: { slug: string } }) => {
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<any>(null);

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
      }
    };

    fetchProject();
  }, [params.slug]);

  return (
    <main>
      <section className="flex flex-col relative bg-creatBG">
        <Nav isTransparent={true} />
        <div className="relative z-10 w-full h-full grid [grid-template-rows:1fr_4fr_1fr]">
          <div className="row-span-1 row-start-2 flex flex-col justify-center gap-y-8">
            <TextAnim dir=">">
              <div className="ml-32">
                <h1
                  className="text-7xl text-white/90"
                >{project?.name || ''}</h1>
              </div>
            </TextAnim>
            <ParagraphAnimation>
              <div className="w-1/2 px-32">
                <p className="text-white/80 text-3xl">
                  {project?.description || ''}
                </p>
              </div>
            </ParagraphAnimation>
          </div>
          <div className="row-span-1 row-start-3 w-1/2 h-full flex flex-col">
            <div className="h-px bg-white/50 w-[calc(100%-64px)]">
            </div>
            <div className="flex w-full h-full pl-32 pr-16 pt-16 pb-4 justify-between">
              <div className="flex flex-col">
                <h1 className="text-2xl text-white/50 uppercase">Date</h1>
                <h1
                  className="text-2xl text-white/90"
                >{formatDate(project?.date || '')}</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl text-white/50 uppercase">Location</h1>
                <h1
                  className="text-2xl text-white/90"
                >{project?.location || ''}</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl text-white/50 uppercase">Service</h1>
                <h1 className="text-2xl text-white/90">
                  {project?.category && project.category in categories
                    ? categories[project.category].name
                    : ''}
                </h1>

              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 grid grid-cols-2">
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
            <div className="absolute inset-0 bg-black/20">
            </div>
          </div>
        </div>
      </section>
      <section className="bg-creatBG py-32">
        <div className="ml-32 flex w-[calc(100%-128px)] gap-x-4">
          <span className="text-white/90 text-xl font-medium font-jost border border-white/50 w-14 h-14 flex justify-center items-center rounded-full">
            02
          </span >
          <div className="flex flex-col w-full h-28">
            <span className="w-full h-px bg-white/50 mt-7">
            </span>
            <h1 className="text-white/90 mt-7 font-jost text-xl tracking-wide">Gallery</h1>
          </div>
        </div>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Carousel project={project} />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default Project;
