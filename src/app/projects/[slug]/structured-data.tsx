"use client";
import { projectSchema } from "@/lib/schemas";
import { useEffect } from "react";

interface StructuredDataProps {
  project: any;
}

export default function StructuredData({ project }: StructuredDataProps) {
  useEffect(() => {
    if (!project) return;

    const existingScript = document.querySelector(
      'script[data-structured-data="project"]',
    );
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-structured-data", "project");
    script.textContent = JSON.stringify(projectSchema(project)).replace(
      /</g,
      "\\u003c",
    );
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
