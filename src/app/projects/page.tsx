'use client'
import { useEffect, useState } from 'react'
import { createClient } from "../../../utils/supabase/client";
import { cn } from "@/lib/utils"
import TextAnim from "@/components/animatedText"
import Nav from "@/components/navbar"
import { IconType } from "react-icons"
import {
  FaLeaf,
  FaHelmetSafety,
  FaTractor,
  FaBuilding,
  FaTruck,
  FaFilter
} from "react-icons/fa6"
import Link from 'next/link';
import Image from 'next/image';

const Projects = () => {
  type Category = {
    name: string,
    icon: IconType,
  }

  const categories: Record<string, Category> = {
    'green-energy-sustainability': {
      name: 'Green Energy',
      icon: FaLeaf,
    },
    'industrial-manufacturing': {
      name: 'Industrial',
      icon: FaHelmetSafety,
    },
    'agriculture-food': {
      name: 'Agriculture',
      icon: FaTractor,
    },
    'commercial-social': {
      name: 'Infrastructure',
      icon: FaBuilding,
    },
    'transportation-logistics': {
      name: 'Logistics',
      icon: FaTruck,
    }
  };

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

  type ImageUrls = Record<string, string>
  type Project = {
    id: number,
    created_at: string,
    category: string,
    description?: string,
    page: string
    name: string
    images: ImageUrls
  }
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    async function fetchData() {
      let { data, error } = await supabase
        .from('images')
        .select('*')

      if (error) {
        console.error('Error fetching projects:', error)
        return
      }

      if (data) {
        setProjects(data)
      }
    }
    fetchData()
  }, []);

  const createProjectSlug = (name: string, id: number): string => {
    const slugifiedName = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    return `${slugifiedName}-${id}`;
  }

  const filteredProjects = activeFilters.length > 0
    ? projects.filter(project => activeFilters.includes(project.category))
    : projects;

  return (
    <main>
      <section className="w-full bg-creatBG min-h-screen">
        <Nav isTransparent={false} />
        <div className="w-full max-w-[1920px] h-full py-24 flex relative items-center">
          <div className="flex flex-col px-80 w-full">
            <TextAnim>
              <span className="inline-flex gap-x-4 items-center">
                <span className="w-12 h-0.5 bg-white/90 inline-block"></span>
                <h1 className="text-5xl text-white/90">Projects</h1>
              </span>
            </TextAnim>

            <div className='flex flex-col mt-12 gap-y-2'>
              <div className="flex items-center gap-4">
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
                      "flex items-center gap-2 px-4 py-2 rounded-full transition-all min-w-[140px] justify-center border-[1px]",
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

            <div className='mt-24 grid grid-cols-2 gap-4'>
              {
                filteredProjects.map((project) => (
                  <div key={project.id}>
                    <Image
                      width={400}
                      height={400}
                      src={Object.values(project.images)[0]}
                      alt={`${project.name} project image`}
                      className="w-full h-auto object-cover aspect-[4/3]"
                    />
                    <Link
                      href={`/projects/${createProjectSlug(project.name, project.id)}/`}
                      className='text-white text-2xl block mt-4 hover:text-white/80 transition-colors'
                    >
                      {project.name}
                    </Link>
                    <p className='text-white/50 mt-2'>{project.description}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Projects
