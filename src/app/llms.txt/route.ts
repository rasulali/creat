export const runtime = "edge";

export async function GET() {
  const site =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://creat.az";

  const body = [
    "# llms.txt — Guidelines for LLM crawlers & trainers",
    "# Generated automatically by app/llms.txt/route.ts",
    "",
    "User-Agent: *",
    "Crawl: allow",
    "Index: allow",
    "Train: disallow",
    "",
    "Disallow: /admin",
    "Disallow: /api/",
    "Disallow: /private/",
    "",
    `Sitemap: ${site}/sitemap.xml`,
    "Contact: mailto:contact@creat.az",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
