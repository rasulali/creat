'use client'
import { useState } from 'react'
import { cn } from "@/lib/utils" // Assuming you have a utility file with cn function
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

const Projects = () => {
  type Category = {
    name: string,
    icon: IconType,
    color: string
  }

  const categories: Record<string, Category> = {
    'green-energy-sustainability': {
      name: 'Green Energy',
      icon: FaLeaf,
      color: 'bg-green-500'
    },
    'industrial-manufacturing': {
      name: 'Industrial',
      icon: FaHelmetSafety,
      color: 'bg-blue-500'
    },
    'agriculture-food': {
      name: 'Agriculture',
      icon: FaTractor,
      color: 'bg-yellow-600'
    },
    'commercial-social': {
      name: 'Infrastructure',
      icon: FaBuilding,
      color: 'bg-emerald-500'
    },
    'transportation-logistics': {
      name: 'Logistics',
      icon: FaTruck,
      color: 'bg-indigo-500'
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
                  <span>
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
                      "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                      activeFilters.includes(key)
                        ? `${category.color} text-white`
                        : 'bg-white/10 text-white/50 hover:bg-white/20'
                    )}
                  >
                    <category.icon />
                    {category.name}
                  </button>
                ))}
              </div>
              <div className="text-white/50 text-lg tracking-wide">
                {activeFilters.length
                  ? `Showing projects in ${activeFilters.join(', ')}`
                  : 'Showing all projects'}
              </div>
            </div>

            <div className=''>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Projects
