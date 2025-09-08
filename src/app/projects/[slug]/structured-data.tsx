"use client";
import { useEffect } from "react";

interface StructuredDataProps {
  project: any;
}

export default function StructuredData({ project }: StructuredDataProps) {
  useEffect(() => {
    if (!project) return;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project?.name || "",
      description: project?.description || "",
      datePublished: project?.created_at || new Date().toISOString(),
      creator: {
        "@type": "Organization",
        name: "CREAT Company LLC",
        url: "https://creat.az",
      },
      location: project?.location
        ? {
            "@type": "Place",
            name: project?.location,
          }
        : undefined,
    };

    const existingScript = document.querySelector(
      'script[data-structured-data="project"]',
    );
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-structured-data", "project");
    script.textContent = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
    document.head.appendChild(script);

    return () => {
      const currentScript = document.querySelector(
        'script[data-structured-data="project"]',
      );
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [project]);

  return null;
}
