'use client'
import { useEffect, useState } from 'react'
import { createClient } from "../../../utils/supabase/client";
import { cn } from "@/lib/utils"
import TextAnim from "@/components/animatedText"
import Nav from "@/components/navbar"
import { motion } from 'framer-motion'
import { categories, createProjectSlug } from '@/lib/helperFunctions'
import {
  FaFilter
} from "react-icons/fa6"
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/footer';

const Projects = () => {

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setActiveFilters(current =>
      current.includes(category)
        ? current.filter(c => c !== category)
        : [...current, category]
    );
  };

  const clearFilters = () => setActiveFilters([]);
  const supabase = createClient()

  const [projects, setProjects] = useState<Project[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      let { data, error } = await supabase
        .from('images')
        .select('*')

      if (error) {
        setProjectsLoading(false)
        return
      }

      if (data) {
        setProjects(data)
      }
      setProjectsLoading(false)
    }
    fetchData()
  }, []);


  const filteredProjects = activeFilters.length > 0
    ? projects.filter(project => activeFilters.includes(project.category))
    : projects;

  const [projectHover, setProjectHover] = useState(-1)

  return (
    <main>
      <section className="w-full bg-creatBG min-h-screen pb-36">
        <Nav isTransparent={false} />
        <div className="w-full max-w-[1920px] h-full py-24 flex relative items-center mx-auto">
          <div className="flex flex-col px-80 w-full">
            <TextAnim>
              <span className="inline-flex gap-x-4 items-center">
                <span className="w-12 h-1 bg-white/90 inline-block"></span>
                <h1 className="text-5xl text-white/90">Projects</h1>
              </span>
            </TextAnim>

            <div className='flex flex-col mt-12 gap-y-4'>
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={clearFilters}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                    activeFilters.length
                      ? 'bg-white/10 text-white'
                      : 'bg-transparent text-white/50'
                  )}
                >
                  <FaFilter />
                  <span className='min-w-16'>
                    {activeFilters.length
                      ? `Clear (${activeFilters.length})`
                      : 'Filters'}
                  </span>
                </button>
                {Object.entries(categories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => toggleCategory(key)}
                    className={cn(
                      "text-nowrap flex items-center gap-2 px-4 py-2 rounded-full transition-all min-w-[140px] justify-center border-[2px]",
                      activeFilters.includes(key)
                        ? 'bg-white/10 border-white/10 text-white'
                        : 'border-white/50 text-white/50 hover:bg-white/20'
                    )}
                  >
                    <category.icon />
                    {category.name}
                  </button>
                ))}
              </div>
              <div className="text-white/50 text-lg tracking-wide">
                {activeFilters.length === 0 || activeFilters.length === Object.keys(categories).length
                  ? 'Showing all projects'
                  : `Showing projects in ${activeFilters.join(', ')}`}
              </div>
            </div>

            <div className='mt-24 grid grid-cols-2 gap-8'>
              {
                projectsLoading ? <div className='col-span-2'>
                  <p className='text-white/50 text-center text-lg'>Loading projects...</p>
                </div> :
                  filteredProjects.length === 0

                    ?
                    <div className='col-span-2'>
                      <p className='text-white/50 text-center text-lg'>No projects found for this category</p>
                    </div>
                    :
                    filteredProjects.map((project) => (<motion.div
                      onHoverStart={() => setProjectHover(project.id)}
                      onHoverEnd={() => setProjectHover(-1)}
                      className="rounded-2xl overflow-hidden"
                    >
                      <Link
                        key={project.id}
                        href={`/projects/${createProjectSlug(project.name, project.id)}/`}
                        className='block relative'
                      >

                        <motion.div
                          animate={{
                            opacity: projectHover === project.id ? 1 : 0
                          }}
                          className='absolute inset-0 backdrop-blur-sm z-10'
                        />

                        <motion.div
                          initial={{
                            x: '-200%',
                            opacity: 0
                          }}
                          animate={{
                            x: projectHover === project.id ? 0 : '-200%',
                            opacity: projectHover === project.id ? 1 : 0
                          }}
                          transition={{
                            mass: 5
                          }}
                          className='absolute bottom-12 left-12 px-8 py-6 flex
                          flex-col bg-white rounded-xl z-20 max-w-[calc(100%-96px)]'>
                          <h1 className='text-xs text-stone-500 font-medium font-jost uppercase'>
                            {categories[project.category].name}</h1>
                          <h1
                            className='text-2xl text-stone-700 font-medium font-jost'
                          >{project.name}</h1>
                        </motion.div>

                        <motion.div
                          animate={{
                            scale: projectHover === project.id ? 1.1 : 1
                          }}
                          transition={{
                            damping: 30,
                          }}
                          className="w-full h-full overflow-hidden"
                        >
                          <Image
                            width={600}
                            height={450}
                            src={project?.images ? Object.values(project.images)[0] : ''}
                            alt={`${project.name} project image`}
                            className="w-full h-auto object-cover aspect-[4/3]"
                          />
                        </motion.div>
                      </Link>
                    </motion.div>
                    ))
              }
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default Projects
