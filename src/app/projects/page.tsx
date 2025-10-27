"use client";

import { useEffect, useState, useRef, Suspense, useCallback } from "react";
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
    searchParams.get("category")?.split(",").filter(Boolean) || [],
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1", 10),
  );

  const projectsPerPage = 12;

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const sheetInputRef = useRef<HTMLInputElement | null>(null);

  const debounceTimer = useRef<number | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (debounceTimer.current) window.clearTimeout(debounceTimer.current);

    debounceTimer.current = window.setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => {
      if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (mobileFiltersOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => sheetInputRef.current?.focus(), 80);
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileFiltersOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileFiltersOpen(false);
    };

    if (mobileFiltersOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [mobileFiltersOpen]);

  const updateUrlParams = useCallback(() => {
    const params = new URLSearchParams();

    if (activeFilters.length > 0) {
      params.set("category", activeFilters.join(","));
    }

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    }

    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    const newUrl = params.toString() ? `?${params.toString()}` : "/projects";

    router.replace(newUrl, { scroll: true });
  }, [activeFilters, debouncedSearch, currentPage, router]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    updateUrlParams();
  }, [updateUrlParams]);

  const toggleCategory = useCallback((category: string) => {
    setActiveFilters((current) =>
      current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category],
    );
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters([]);
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  const supabase = createClient();
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("images")
        .select("*")
        .order("rank", { ascending: true });

      if (!error && data) {
        setProjects(data);
      }
      setProjectsLoading(false);
    };

    fetchData();
  }, [supabase]);

  const filteredProjects = useCallback(() => {
    return projects.filter((project) => {
      if (
        activeFilters.length > 0 &&
        !activeFilters.includes(project.category)
      ) {
        return false;
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          project.name,
          project.description,
          project.location,
          project.service,
          project.category,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      }

      return true;
    });
  }, [projects, activeFilters, searchQuery]);

  const totalPages = Math.ceil(filteredProjects().length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects().slice(
    indexOfFirstProject,
    indexOfLastProject,
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const isMobileView = () => window.innerWidth < 768;

  return (
    <main>
      <section className="w-full bg-creatBG min-h-screen">
        <Nav isTransparent={false} />
        <div className="w-full h-full md:py-24 flex relative items-center mx-auto">
          <div className="flex flex-col md:px-12 px-6 w-full">
            <TextAnim>
              <span className="inline-flex flex-col md:flex-row gap-x-4 md:items-center">
                <span className="inline-flex md:gap-x-4 gap-x-2 items-center">
                  <span className="md:w-12 w-6 md:h-1 h-px bg-white/90 inline-block"></span>
                  <h1 className="md:text-5xl text-2xl text-white/90">
                    Projects
                  </h1>
                </span>
                <span className="md:text-base text-sm text-white/50 self-end">
                  Showing {Math.min(filteredProjects().length, projectsPerPage)}{" "}
                  of {projects.length} projects
                </span>
              </span>
            </TextAnim>

            <div className="md:mt-12 mt-3 relative">
              <div className="relative flex items-center">
                <FaMagnifyingGlass className="absolute md:left-4 left-2 text-white/50 md:text-lg text-sm" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  onFocus={() => {
                    if (isMobileView()) setMobileFiltersOpen(true);
                  }}
                  className="w-full md:pl-12 md:pr-10 md:py-3 py-1 pl-6 rounded-lg bg-white/10 text-white
                  placeholder:truncate placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 text-white/50 hover:text-white transition-colors"
                    aria-label="Clear search"
                  >
                    <FaX className="md:text-lg text-sm" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center md:hidden gap-x-2 mt-6">
              <button
                onClick={clearFilters}
                className={cn(
                  "transition-colors inline-block h-6 px-2 rounded-lg",
                  activeFilters.length || searchQuery
                    ? "text-white bg-white/30"
                    : "text-white/50 bg-white/10",
                )}
              >
                {activeFilters.length || searchQuery ? (
                  <FaX className="text-xs font-bold" />
                ) : (
                  <FaFilter className="text-xs font-bold" />
                )}
              </button>
              <div className="flex w-full overflow-x-auto scrollbar-hide gap-x-2">
                {Object.entries(categories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => toggleCategory(key)}
                    className={cn(
                      "px-2 py-1 text-xs font-bold text-nowrap rounded-lg transition-colors",
                      activeFilters.includes(key)
                        ? "text-white bg-white/30"
                        : "text-white/50 bg-white/10",
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-col md:mt-8 gap-y-4 hidden md:flex">
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
                  <span>
                    {activeFilters.length || searchQuery
                      ? "Clear filters"
                      : "Filters"}
                  </span>
                </button>

                {Object.entries(categories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => toggleCategory(key)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full transition-all border-[2px]",
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
            </div>

            <div className="md:mt-12 mt-6 grid md:grid-cols-3 w-fit mx-auto md:gap-12 gap-8 place-items-center">
              {projectsLoading ? (
                <div className="col-span-3">
                  <p className="text-white/50 text-center text-lg">
                    Loading projects...
                  </p>
                </div>
              ) : currentProjects.length === 0 ? (
                <div className="col-span-3">
                  <p className="text-white/50 text-center text-lg">
                    No projects found
                  </p>
                </div>
              ) : (
                currentProjects.map((project) => (
                  <ProjectAnimatedWawes
                    key={project.id}
                    project={project}
                    categories={categories}
                    imageurl={
                      project.images[project.bannerImage] ||
                      Object.values(project.images)[0]
                    }
                  />
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div className="py-4 md:py-0 md:pt-12 flex justify-center items-center space-x-2">
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

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
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
                  ),
                )}

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
