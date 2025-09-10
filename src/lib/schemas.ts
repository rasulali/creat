import {
  Organization,
  WithContext,
  LocalBusiness,
  ItemList,
  CreativeWork,
  CollectionPage,
  BreadcrumbList,
} from "schema-dts";

// Constants for reuse
export const COMPANY_NAME = "CREAT Company LLC";
export const COMPANY_URL = "https://creat.az";
export const ADDRESS_LOCALITY = "Baku";
export const ADDRESS_COUNTRY = "AZ";
export const AREA_SERVED = "Azerbaijan";

// Base address to avoid repetition
const baseAddress = {
  "@type": "PostalAddress" as const,
  streetAddress: "Samad Vurgun st. 110, Vurgun Residence Building",
  addressLocality: ADDRESS_LOCALITY,
  addressCountry: ADDRESS_COUNTRY,
};

// Core organization schema
export const baseOrganization: Organization = {
  "@type": "Organization",
  name: COMPANY_NAME,
  url: COMPANY_URL,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+994-55-415-82-15",
      email: "info@creat.az",
      contactType: "customer service" as const,
    },
    {
      "@type": "ContactPoint",
      telephone: "+994-50-224-29-44",
      email: "contact@creat.az",
      contactType: "technical support" as const,
    },
  ],
  address: baseAddress,
};

// Service list for reuse
const serviceListItems = [
  {
    name: "Alternative Energy Systems",
    description:
      "Design and implementation of renewable energy solutions including solar and wind power systems",
    serviceType: "Renewable Energy Engineering",
  },
  {
    name: "Mining Projects",
    description:
      "Comprehensive mining engineering services from exploration to operational management",
    serviceType: "Mining Engineering",
  },
  {
    name: "Road Projects",
    description:
      "Design, planning, and construction of road infrastructure and transportation networks",
    serviceType: "Civil Engineering",
  },
  {
    name: "Landscaping Works",
    description:
      "Professional landscaping design and implementation for commercial and public spaces",
    serviceType: "Landscape Architecture",
  },
  {
    name: "Main Water and Power Lines",
    description:
      "Engineering solutions for water distribution systems and power line infrastructure",
    serviceType: "Utility Engineering",
  },
  {
    name: "Industrial Buildings",
    description:
      "Design and construction of industrial facilities and manufacturing plants",
    serviceType: "Industrial Engineering",
  },
  {
    name: "Educational and Child Development Spaces",
    description:
      "Design of educational facilities and environments optimized for learning and development",
    serviceType: "Educational Facility Design",
  },
  {
    name: "Residential and Non-Residential Buildings",
    description:
      "Architectural design and engineering for both residential and commercial buildings",
    serviceType: "Architectural Engineering",
  },
  {
    name: "Urban Planning",
    description:
      "Comprehensive urban development planning and city infrastructure design",
    serviceType: "Urban Planning",
  },
  {
    name: "Industrial Facility Projects",
    description:
      "End-to-end solutions for industrial facility design, construction, and optimization",
    serviceType: "Industrial Facility Engineering",
  },
  {
    name: "Waste Management Projects",
    description:
      "Engineering solutions for waste management systems and environmental sustainability",
    serviceType: "Environmental Engineering",
  },
];

// Helper function to create service items
const createServiceItem = (
  service: (typeof serviceListItems)[0],
  position: number,
) => ({
  "@type": "ListItem" as const,
  position,
  item: {
    "@type": "Service" as const,
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    areaServed: AREA_SERVED,
    provider: {
      "@type": "Organization" as const,
      name: COMPANY_NAME,
    },
  },
});

// Services schema
export const servicesSchema: WithContext<ItemList> = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Engineering Services - CREAT Company LLC",
  description:
    "Professional engineering services including renewable energy, mining, infrastructure projects, and urban planning in Azerbaijan",
  numberOfItems: serviceListItems.length,
  itemListElement: serviceListItems.map((service, index) =>
    createServiceItem(service, index + 1),
  ),
};

// Home schema
export const homeSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  ...baseOrganization,
  logo: `${COMPANY_URL}/logo.png`,
  description:
    "Professional engineering firm specializing in project management and innovative solutions",
};

// Project schema function
export const projectSchema = (project: Project) => {
  const schema: WithContext<CreativeWork> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    datePublished: project?.created_at,
    genre: project.service,
    creator: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: COMPANY_URL,
    },
  };

  if (project?.location) {
    schema.locationCreated = {
      "@type": "Place",
      name: project.location,
    };
  }

  return schema;
};

// Projects schema function
export const projectsSchema = (projects: Project[]) => {
  const mainEntity = {
    "@type": "ItemList" as const,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      item: {
        "@type": "CreativeWork" as const,
        name: project.name,
        description: project.description,
        creator: baseOrganization,
        genre: project.service || project.category,
        locationCreated: project.location,
        url: `${COMPANY_URL}/projects/${project.name.toLowerCase().replace(/\s+/g, "-")}-${project.id}`,
        ...(project.images && {
          image:
            project.images[project.bannerImage] ||
            Object.values(project.images)[0],
        }),
      },
    })),
  };

  const breadcrumb: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${COMPANY_URL}/projects`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${COMPANY_URL}/projects`,
      },
    ],
  };

  const schema: WithContext<CollectionPage> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Engineering Projects - CREAT Company LLC",
    description:
      "Browse our portfolio of engineering projects in Azerbaijan including renewable energy, infrastructure, and industrial developments",
    mainEntity,
    breadcrumb,
  };

  return schema;
};

// About schema
export const aboutSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  ...baseOrganization,
  alternateName: "CREAT",
  logo: `${COMPANY_URL}/logos/horizontal.svg`,
  description:
    "Azerbaijan's leading engineering firm with 70+ major projects and 29+ international partners",
  foundingDate: "2019",
  address: {
    ...baseAddress,
    streetAddress: "Samad Vurgun st. 110, Vurgun Residence Building, 2nd Floor",
  },
};

// Contact schema
export const contactSchema: WithContext<LocalBusiness> = {
  "@context": "https://schema.org",
  ...baseOrganization,
  "@type": "LocalBusiness",
  logo: `${COMPANY_URL}/logo.png`,
  description:
    "Contact CREAT Company LLC for professional engineering services in Azerbaijan",
  address: {
    ...baseAddress,
    streetAddress:
      "Samad Vurgun st. 110, Vurgun Residence Building, 2nd Floor, Creat Office",
  },
  openingHours: "Mo-Fr 09:00-18:00",
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.3777,
    longitude: 49.892,
  },
};
