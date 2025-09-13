"use client";
import TextAnim from "@/components/animatedText";
import Footer from "@/components/footer";
import Nav from "@/components/navbar";
import { categories } from "@/lib/helperFunctions";
import { servicesSchema } from "@/lib/schemas";
import Head from "next/head";
import { FaAngleDown, FaArrowRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { createClient } from "../../../utils/supabase/client";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  category: string;
  name: string;
  bannerImage: string;
  images: Record<string, string>;
  rank: number;
};

const ANIMATION_CONFIG = {
  EASING: [0.16, 1, 0.3, 1] as [number, number, number, number],
  DURATION: 0.6,
  STAGGER: 0.08,
  HOVER_DURATION: 0.3,
  CARD_DELAY: 0.1,
};

const AnimatedDivider = ({
  className = "",
  animateOnHover = false,
  isHovered = false,
}: {
  className?: string;
  animateOnHover?: boolean;
  isHovered?: boolean;
}) => {
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      whileInView={{ width: "100%", opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: ANIMATION_CONFIG.EASING }}
      onViewportEnter={() => setIsInView(true)}
      className={cn("relative h-px", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-sm"
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: animateOnHover ? (isHovered ? 1 : 0) : isInView ? 1 : 0,
        }}
        transition={{
          delay: animateOnHover ? 0 : 0.5,
          duration: 0.8,
          ease: ANIMATION_CONFIG.EASING,
        }}
      />
      <motion.div
        className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-transparent via-white to-transparent"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{
          x: animateOnHover
            ? isHovered
              ? "calc(100% + 100%)"
              : "-100%"
            : isInView
              ? "calc(100vw + 100%)"
              : "-100%",
          opacity: animateOnHover
            ? isHovered
              ? [0, 1, 1, 0]
              : 0
            : isInView
              ? [0, 1, 1, 0]
              : 0,
        }}
        transition={{
          delay: animateOnHover ? 0 : 1,
          duration: 2,
          ease: ANIMATION_CONFIG.EASING,
        }}
      />
    </motion.div>
  );
};

const ProjectCard = ({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) => {
  const getImagePosition = () => {
    if (total === 1) return 0;
    if (total === 2) return index === 0 ? 15 : -15;
    return index === 0 ? 15 : index === 1 ? -15 : 15;
  };

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: getImagePosition(),
      }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{
        delay: index * ANIMATION_CONFIG.CARD_DELAY,
        duration: ANIMATION_CONFIG.DURATION,
        ease: ANIMATION_CONFIG.EASING,
      }}
      whileHover={{
        scale: 1.05,
        y: getImagePosition() - 8,
        transition: {
          duration: ANIMATION_CONFIG.HOVER_DURATION,
          ease: ANIMATION_CONFIG.EASING,
        },
      }}
      className="w-48 aspect-[3/4] rounded-lg overflow-hidden shadow-xl bg-black/30 border border-white/20 backdrop-blur-sm"
      style={{ zIndex: total - index }}
    >
      {project.bannerImage && (
        <div className="relative w-full h-full">
          <Image
            src={project.images[project.bannerImage]}
            alt={project.name}
            fill
            quality={75}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <h1 className="absolute bottom-2 left-2 right-2 text-base font-bold text-white z-10 truncate">
            {project.name}
          </h1>
        </div>
      )}
    </motion.div>
  );
};

const ServicesContent = () => {
  const [activeService, setActiveService] = useState(-1);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [projects, setProjects] = useState<Record<string, Project[]>>({});
  const [projectsLoading, setProjectsLoading] = useState(true);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const serviceParam = searchParams.get("service");

  const handleServiceClick = (index: number, categoryKey: string) => {
    const newActiveService = activeService === index ? -1 : index;
    setActiveService(newActiveService);

    const params = new URLSearchParams(searchParams.toString());
    if (newActiveService === -1) {
      params.delete("service");
    } else {
      params.set("service", categoryKey);
    }

    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    router.push(newUrl, { scroll: false });
  };

  const supabase = createClient();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("images")
          .select("*")
          .order("rank", { ascending: true });

        if (error) {
          setProjectsLoading(false);
          return;
        }

        if (data) {
          const projectsByCategory = data.reduce(
            (acc, project) => {
              if (!acc[project.category]) {
                acc[project.category] = [];
              }
              if (acc[project.category].length < 3) {
                acc[project.category].push(project as Project);
              }
              return acc;
            },
            {} as Record<string, Project[]>,
          );

          setProjects(projectsByCategory);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setProjectsLoading(false);
      }
    }
    fetchProjects();
  }, [supabase]);

  useEffect(() => {
    if (serviceParam && Object.keys(categories).includes(serviceParam)) {
      const categoryKeys = Object.keys(categories);
      const categoryIndex = categoryKeys.indexOf(serviceParam);

      if (categoryIndex !== -1) {
        const timer = setTimeout(() => {
          serviceRefs.current[categoryIndex]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          setTimeout(() => {
            setActiveService(categoryIndex);
          }, 300);
        }, 100);

        return () => clearTimeout(timer);
      }
    }
  }, [serviceParam, projectsLoading]);

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
      </Head>
      <main className="relative overflow-hidden">
        <Nav />
        <section className="px-8 md:px-28 py-32 flex flex-col">
          <div className="flex flex-col gap-y-12">
            <TextAnim>
              <h1 className="text-4xl md:text-5xl text-white/90 font-light tracking-wide">
                Our Services
              </h1>
            </TextAnim>
            <AnimatedDivider />
          </div>

          <div className="flex flex-col relative mt-12">
            {Object.entries(categories).map(([key, category], index) => {
              const number = (index + 1).toString().padStart(2, "0");
              const categoryProjects = projects[key] || [];
              const isHovered =
                hoveredService === key && activeService !== index;
              const isActive = activeService === index;

              return (
                <div key={key} className="relative">
                  <motion.div
                    ref={(el) => {
                      serviceRefs.current[index] = el;
                    }}
                    className="relative group cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * ANIMATION_CONFIG.STAGGER,
                      duration: ANIMATION_CONFIG.DURATION,
                      ease: ANIMATION_CONFIG.EASING,
                    }}
                    onMouseEnter={() => !isActive && setHoveredService(key)}
                    onMouseLeave={() => !isActive && setHoveredService(null)}
                    onClick={() => handleServiceClick(index, key)}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/3 via-white/8 to-transparent rounded-2xl"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : -50,
                      }}
                      transition={{
                        duration: ANIMATION_CONFIG.DURATION,
                        ease: ANIMATION_CONFIG.EASING,
                      }}
                    />

                    <div className="flex flex-col p-8 md:p-12 relative z-10">
                      <AnimatePresence>
                        {isHovered && !projectsLoading && (
                          <motion.div
                            className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{
                              duration: ANIMATION_CONFIG.HOVER_DURATION,
                            }}
                          >
                            {categoryProjects.length > 0 ? (
                              <div className="flex gap-x-4 items-center justify-center">
                                {categoryProjects.map((project, idx) => (
                                  <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={idx}
                                    total={categoryProjects.length}
                                  />
                                ))}
                              </div>
                            ) : (
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-white/40 text-center text-lg font-light"
                              >
                                No projects available
                              </motion.p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div
                        className="flex justify-between items-center text-white/90 text-2xl md:text-3xl relative z-30"
                        animate={{ scale: isHovered ? 1.01 : 1 }}
                        transition={{
                          duration: ANIMATION_CONFIG.HOVER_DURATION,
                        }}
                      >
                        <div className="flex gap-x-4 md:gap-x-6 items-center pr-8 md:pr-16">
                          <motion.span
                            className="w-12 md:w-16 text-lg md:text-2xl font-mono transition-all duration-300"
                            animate={{
                              opacity: isHovered ? 1 : 0.6,
                              color: isHovered ? "#ffffff" : "#ffffff99",
                            }}
                          >
                            {number}.
                          </motion.span>
                          <motion.h2
                            className="font-light tracking-wide"
                            animate={{
                              color: isHovered ? "#ffffff" : "#ffffffcc",
                            }}
                            transition={{
                              duration: ANIMATION_CONFIG.HOVER_DURATION,
                            }}
                          >
                            {category.name}
                          </motion.h2>
                        </div>
                      </motion.div>

                      <div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2">
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{
                            duration: ANIMATION_CONFIG.DURATION,
                            ease: ANIMATION_CONFIG.EASING,
                          }}
                          className="origin-center"
                        >
                          <FaAngleDown
                            className={cn(
                              "text-white w-8 h-8 md:w-12 md:h-12 transition-opacity duration-300",
                              isHovered ? "opacity-100" : "opacity-60",
                            )}
                          />
                        </motion.div>
                      </div>

                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={
                          isActive
                            ? { height: "auto", opacity: 1 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{
                          duration: ANIMATION_CONFIG.DURATION,
                          ease: ANIMATION_CONFIG.EASING,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-8 pl-20 pr-4 pb-4">
                          <div className="space-y-6">
                            <div className="relative">
                              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-white/60 to-transparent rounded-full" />
                              <div className="flex gap-x-12">
                                <motion.p
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    delay: 0.1,
                                    duration: ANIMATION_CONFIG.DURATION,
                                    ease: ANIMATION_CONFIG.EASING,
                                  }}
                                  className="text-xl text-white/80 leading-relaxed max-w-4xl"
                                >
                                  {category.description}
                                </motion.p>
                                {categoryProjects.length > 0 && (
                                  <motion.div
                                    className="flex gap-4 items-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      delay: 0.2,
                                      duration: ANIMATION_CONFIG.DURATION,
                                      ease: ANIMATION_CONFIG.EASING,
                                    }}
                                  >
                                    {categoryProjects.map((project, idx) => (
                                      <motion.div
                                        key={project.id}
                                        initial={{
                                          opacity: 0,
                                          scale: 0.9,
                                          y: 20,
                                        }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{
                                          delay:
                                            0.3 +
                                            idx * ANIMATION_CONFIG.CARD_DELAY,
                                          duration: ANIMATION_CONFIG.DURATION,
                                          ease: ANIMATION_CONFIG.EASING,
                                        }}
                                        className="w-32 aspect-[3/4] rounded-lg overflow-hidden shadow-xl bg-black/30 border border-white/20 backdrop-blur-sm"
                                      >
                                        {project.bannerImage && (
                                          <div className="relative w-full h-full">
                                            <Image
                                              src={
                                                project.images[
                                                  project.bannerImage
                                                ]
                                              }
                                              alt={project.name}
                                              fill
                                              quality={75}
                                              className="object-cover transition-transform duration-300 hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                            <h1 className="absolute bottom-1 left-1 right-1 text-xs font-bold text-white z-10 truncate">
                                              {project.name}
                                            </h1>
                                          </div>
                                        )}
                                      </motion.div>
                                    ))}
                                  </motion.div>
                                )}
                              </div>
                            </div>

                            <Link
                              href={`/projects?category=${key}`}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-x-2 text-xl font-medium px-8 py-4 border text-white/90 hover:text-creatBG hover:bg-white transition-all duration-300 rounded-lg backdrop-blur-sm border-white/30 hover:border-white/60"
                            >
                              <span>View Projects</span>
                              <FaArrowRight className="text-lg" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <AnimatedDivider
                      className="absolute bottom-0 left-8 right-8"
                      animateOnHover
                      isHovered={isHovered}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};
const Services = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-creatBG">
          <div className="text-white text-xl">Loading services...</div>
        </div>
      }
    >
      <ServicesContent />
    </Suspense>
  );
};

export default Services;
