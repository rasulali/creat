import type { MetadataRoute } from "next";
import { createClient } from "../../utils/supabase/server";

const createProjectSlug = (name: string, id: number): string => {
  const slugifiedName = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${slugifiedName}-${id}`;
};

export const dynamic = "force-static";
export const revalidate = 86400;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://creat.az";
  const currentDate = new Date();

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  let projectRoutes: MetadataRoute.Sitemap = [];

  try {
    const supabase = await createClient();
    const { data: projects, error } = await supabase
      .from("images")
      .select("id, name, created_at, rank")
      .order("rank", { ascending: true });

    if (!error && projects) {
      projectRoutes = projects.map((project) => {
        const priority = calculatePriority(project.rank);

        return {
          url: `${baseUrl}/projects/${createProjectSlug(project.name, project.id)}`,
          lastModified: project.created_at
            ? new Date(project.created_at)
            : currentDate,
          changeFrequency: "monthly" as const,
          priority: priority,
        };
      });
    }
  } catch (error) {
    console.error("Error fetching projects for sitemap:", error);
  }

  return [...staticRoutes, ...projectRoutes];
}

function calculatePriority(rank: number): number {
  const minPriority = 0.3;
  const maxPriority = 0.8;

  const normalized = Math.min(Math.max(rank / 100, 0), 1);
  return minPriority + normalized * (maxPriority - minPriority);
}
