"use client";
import { useEffect, useState, Suspense } from "react";
import { createClient } from "../../../utils/supabase/client";
import { cn } from "@/lib/utils";
import TextAnim from "@/components/animatedText";
import Nav from "@/components/navbar";
import { categories } from "@/lib/helperFunctions";
import {
  FaFilter,
  FaX,
  FaMagnifyingGlass,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import Footer from "@/components/footer";
import ProjectAnimatedWawes from "@/components/projectAnimatedWawes";
import { useRouter, useSearchParams } from "next/navigation";

function ProjectsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeFilters, setActiveFilters] = useState<string[]>(
    searchParams.get("category")?.split(",") || [],
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10),
  );
  const projectsPerPage = 12;

  const updateUrlParams = () => {
    const params = new URLSearchParams();

    if (activeFilters.length > 0) {
      params.set("category", activeFilters.join(","));
    }

    if (searchQuery) {
      params.set("search", searchQuery);
    }

    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    const newUrl = params.toString() ? `?${params.toString()}` : "/projects";
    router.push(newUrl, { scroll: false });
  };

  useEffect(() => {
    updateUrlParams();
  }, [activeFilters, searchQuery, currentPage]);

  const toggleCategory = (category: string) => {
    setActiveFilters((current) =>
      current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category],
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchQuery("");
    setCurrentPage(1);
  };

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

  const filteredProjects = projects.filter((project) => {
    if (activeFilters.length > 0 && !activeFilters.includes(project.category)) {
      return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchableFields = [
        project.name,
        project.description,
        project.location,
        project.service,
        project.category,
      ]
        .filter(Boolean)
        .map((field) => field?.toLowerCase());

      if (!searchableFields.some((field) => field?.includes(query))) {
        return false;
      }
    }

    return true;
  });

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject,
  );

  const [projectHover, setProjectHover] = useState(-1);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
                  Showing {Math.min(filteredProjects.length, projectsPerPage)}{" "}
                  of {filteredProjects.length} projects
                </span>
              </span>
            </TextAnim>

            <div className="mt-12 relative">
              <div className="relative flex items-center">
                <FaMagnifyingGlass
                  className="absolute left-4 text-white/50"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search projects by name, description, category..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-12 pr-10 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 text-white/50 hover:text-white transition-colors"
                  >
                    <FaX size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col mt-8 gap-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <button
                  onClick={clearFilters}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                    activeFilters.length || searchQuery
                      ? "bg-white/10 text-white"
                      : "bg-transparent text-white/50",
                  )}
                >
                  <FaFilter />
                  <span className="min-w-16">
                    {activeFilters.length || searchQuery
                      ? `Clear filters`
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
                {activeFilters.length === 0 && !searchQuery
                  ? "Showing all projects"
                  : `Filtering by: ${activeFilters.length ? `categories (${activeFilters.join(", ")})` : ""} ${activeFilters.length && searchQuery ? "and " : ""} ${searchQuery ? `search "${searchQuery}"` : ""}`}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-3 w-fit mx-auto gap-8 place-items-center">
              {projectsLoading ? (
                <div className="col-span-3">
                  <p className="text-white/50 text-center text-lg">
                    Loading projects...
                  </p>
                </div>
              ) : currentProjects.length === 0 ? (
                <div className="col-span-3">
                  <p className="text-white/50 text-center text-lg">
                    No projects found matching your criteria
                  </p>
                </div>
              ) : (
                currentProjects.map((project) => (
                  <ProjectAnimatedWawes
                    project={project}
                    key={project.id}
                    categories={categories}
                    projectHover={projectHover}
                    setProjectHover={setProjectHover}
                    imageurl={
                      project.images[project.bannerImage] ||
                      Object.values(project.images)[0]
                    }
                  />
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg transition-all",
                    currentPage === 1
                      ? "bg-white/5 text-white/30 cursor-not-allowed"
                      : "bg-white/10 text-white hover:bg-white/20",
                  )}
                >
                  <FaChevronLeft size={14} />
                </button>

                {pageNumbers.map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-lg transition-all",
                      currentPage === number
                        ? "bg-white/20 text-white font-medium"
                        : "bg-white/10 text-white/70 hover:bg-white/20",
                    )}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-lg transition-all",
                    currentPage === totalPages
                      ? "bg-white/5 text-white/30 cursor-not-allowed"
                      : "bg-white/10 text-white hover:bg-white/20",
                  )}
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

const Projects = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-creatBG">
          <div className="text-white text-xl">Loading projects...</div>
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
};

export default Projects;
