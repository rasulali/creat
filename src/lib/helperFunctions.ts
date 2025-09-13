import {
  FaLeaf,
  FaHelmetSafety,
  FaTractor,
  FaBuilding,
  FaRoad,
  FaCity,
  FaHillRockslide,
  FaIndustry,
  FaDumpster,
  FaGripLines,
  FaSchool,
} from "react-icons/fa6";
export const handleImageUrl = ({
  endpoint,
  dir,
  name,
}: {
  endpoint: string;
  dir: string;
  name: string;
  isBanner?: boolean;
}) => {
  return `${endpoint}/${encodeURIComponent(dir + "/" + name)}`;
};

export const createProjectSlug = (name: string, id: number): string => {
  const slugifiedName = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${slugifiedName}-${id}`;
};

export const categories: Record<string, Category> = {
  road: {
    name: "Road Projects",
    icon: FaRoad,
    description:
      "Design and construction of transportation infrastructure including highways, mine access roads, and pedestrian bridges to improve connectivity and support industrial and community needs.",
  },
  mining: {
    name: "Mining Projects",
    icon: FaHelmetSafety,
    description:
      "Comprehensive mining operations and facility design including tailings storage, rockfill units, acid rock drainage systems, and processing plants for efficient mineral resource extraction.",
  },
  urban: {
    name: "Urban Planning",
    icon: FaCity,
    description:
      "Development of modern urban infrastructure including smart bus stops, amphitheaters, coffee shops, and post-conflict reconstruction projects to enhance city living and cultural spaces.",
  },
  landscape: {
    name: "Landscaping Works",
    icon: FaHillRockslide,
    description:
      "Ecological development and rehabilitation projects for lakes and urban areas, focusing on environmental restoration, water purification, and infrastructure improvement.",
  },
  industrial: {
    name: "Industrial Buildings",
    icon: FaIndustry,
    description:
      "Design and construction of industrial facilities including paint factories, adhesive plants, cement factories, and bank buildings to support various manufacturing and commercial sectors.",
  },
  residential: {
    name: "Residential Buildings",
    icon: FaBuilding,
    description:
      "Development of residential complexes, hotel accommodations, family recreation centers, and mosque buildings to create comfortable living and community spaces.",
  },
  "waste-management": {
    name: "Waste Management",
    icon: FaDumpster,
    description:
      "Projects focused on sustainable waste handling and environmental protection measures.",
  },
  "alternative-energy": {
    name: "Alternative Energy Systems",
    icon: FaLeaf,
    description:
      "Implementation of renewable energy solutions including wind turbine projects, solar power stations, and green zone developments for sustainable energy production.",
  },
  "water-power": {
    name: "Water & Power Lines",
    icon: FaGripLines,
    description:
      "Infrastructure projects for water supply systems, electrical transmission lines, pipeline networks, and pump stations to support industrial and agricultural needs.",
  },
  "industrial-facility": {
    name: "Industrial Facility Projects",
    icon: FaTractor,
    description:
      "Design and development of specialized industrial complexes including explosive material plants, agricultural processing facilities, warehouse complexes, and logistics centers.",
  },
  "education-development": {
    name: "Educational Spaces",
    icon: FaSchool,
    description:
      "Construction and development of educational infrastructure including kindergartens and secondary schools to support community education and early childhood development.",
  },
};

export const handleImageName = (name: string) => {
  let displayName: string = name;
  let extension = "";
  if (name.startsWith("$")) {
    displayName = name.slice(1);
  }
  const maxLength = 18;
  const dotIndex = displayName.lastIndexOf(".");
  if (dotIndex !== -1) {
    extension = displayName.slice(dotIndex);
    displayName = displayName.slice(0, dotIndex);
  }

  const availableChars = Math.max(0, maxLength - extension.length - 3);
  if (displayName.length > availableChars) {
    return displayName.slice(0, availableChars) + "..." + extension;
  } else return displayName + extension;
};

export const handleDisplayName = (name: string) => {
  let displayName: string = name;
  const dotIndex = name.lastIndexOf(".");

  if (dotIndex !== -1) {
    displayName = name.slice(0, dotIndex);
  }

  if (displayName.startsWith("$")) {
    displayName = displayName.slice(1);
  } else {
    displayName = "";
  }

  return displayName;
};

/**
 * Formats a date string from "2024-11-24 19:27:32.65693+00" to "24 Nov, 2024"
 * Handles empty strings, null values, undefined, and promises
 *
 * @param dateInput - The date input in various possible formats
 * @returns A formatted date string or empty string if input is invalid
 */
export const formatDate = (
  dateInput:
    | string
    | Date
    | null
    | undefined
    | Promise<string | Date | null | undefined>,
): string => {
  try {
    // Handle promise inputs
    if (dateInput instanceof Promise) {
      const resolvedDate = dateInput;
      return formatDate(resolvedDate);
    }

    // Return empty string for null/undefined/empty inputs
    if (!dateInput) return "";

    // Convert to Date object if it's a string
    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;

    // Check if date is valid
    if (isNaN(date.getTime())) return "";

    // Format the date
    const day = date.getDate();
    const month = date.toLocaleString("en", { month: "short" }).toLowerCase();
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  } catch (error) {
    return "";
  }
};
