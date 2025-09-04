"use client";
import { useEffect, useState } from "react";
import { createClient } from "../../../utils/supabase/client";
import { cn } from "@/lib/utils";
import TextAnim from "@/components/animatedText";
import Nav from "@/components/navbar";
import { categories } from "@/lib/helperFunctions";
import { FaFilter } from "react-icons/fa6";
import Footer from "@/components/footer";
import ProjectAnimatedWawes from "@/components/projectAnimatedWawes";

const Projects = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setActiveFilters((current) =>
      current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category],
    );
  };

  const clearFilters = () => setActiveFilters([]);
  const supabase = createClient();

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      let { data, error } = await supabase
        .from("images")
        .select("*")
        .order("rank", { ascending: true });
      if (error) {
        setProjectsLoading(false);
        return;
      }

      if (data) {
        setProjects(data);
      }
      setProjectsLoading(false);
    }
    fetchData();
  }, []);

  const filteredProjects =
    activeFilters.length > 0
      ? projects.filter((project) => activeFilters.includes(project.category))
      : projects;

  const [projectHover, setProjectHover] = useState(-1);

  return (
    <main>
      <section className="w-full bg-creatBG min-h-screen pb-36">
        <Nav isTransparent={false} />
        <div className="w-full h-full py-24 flex relative items-center mx-auto">
          <div className="flex flex-col px-12 w-full">
            <TextAnim>
              <span className="inline-flex gap-x-4 items-center">
                <span className="w-12 h-1 bg-white/90 inline-block"></span>
                <h1 className="text-5xl text-white/90">Projects</h1>
                <span className="text-base text-white/50 self-end">
                  {filteredProjects.length} projecs are showing
                </span>
              </span>
            </TextAnim>

            <div className="flex flex-col mt-12 gap-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={clearFilters}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                    activeFilters.length
                      ? "bg-white/10 text-white"
                      : "bg-transparent text-white/50",
                  )}
                >
                  <FaFilter />
                  <span className="min-w-16">
                    {activeFilters.length
                      ? `Clear (${activeFilters.length})`
                      : "Filters"}
                  </span>
                </button>
                {Object.entries(categories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => toggleCategory(key)}
                    className={cn(
                      "text-nowrap flex items-center gap-2 px-4 py-2 rounded-full transition-all min-w-[140px] justify-center border-[2px]",
                      activeFilters.includes(key)
                        ? "bg-white/10 border-white/10 text-white"
                        : "border-white/50 text-white/50 hover:bg-white/20",
                    )}
                  >
                    <category.icon />
                    {category.name}
                  </button>
                ))}
              </div>
              <div className="text-white/50 text-lg tracking-wide">
                {activeFilters.length === 0 ||
                activeFilters.length === Object.keys(categories).length
                  ? "Showing all projects"
                  : `Showing projects in ${activeFilters.join(", ")}`}
              </div>
            </div>

            <div className="mt-24 grid grid-cols-3 w-fit mx-auto gap-8 place-items-center">
              {projectsLoading ? (
                <div className="col-span-3">
                  <p className="text-white/50 text-center text-lg">
                    Loading projects...
                  </p>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="col-span-2">
                  <p className="text-white/50 text-center text-lg">
                    No projects found for this category
                  </p>
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <ProjectAnimatedWawes
                    project={project}
                    key={project.id}
                    categories={categories}
                    projectHover={projectHover}
                    setProjectHover={setProjectHover}
                    imageurl={
                      project?.images ? Object.values(project.images)[0] : ""
                    }
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Projects;
