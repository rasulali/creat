"use client";
import Footer from "@/components/footer";
import Nav from "@/components/navbar";

const Services = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Engineering Services - CREAT Company LLC",
    description:
      "Professional engineering services including renewable energy, mining, infrastructure projects, and urban planning in Azerbaijan",
    numberOfItems: 11,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Alternative Energy Systems",
          description:
            "Design and implementation of renewable energy solutions including solar and wind power systems",
          serviceType: "Renewable Energy Engineering",
          areaServed: "Azerbaijan",
          provider: {
            "@type": "Organization",
            name: "CREAT Company LLC",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Mining Projects",
          description:
            "Comprehensive mining engineering services from exploration to operational management",
          serviceType: "Mining Engineering",
          areaServed: "Azerbaijan",
          provider: {
            "@type": "Organization",
            name: "CREAT Company LLC",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Road Projects",
          description:
            "Design, planning, and construction of road infrastructure and transportation networks",
          serviceType: "Civil Engineering",
          areaServed: "Azerbaijan",
          provider: {
            "@type": "Organization",
            name: "CREAT Company LLC",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "Landscaping Works",
          description:
            "Professional landscaping design and implementation for commercial and public spaces",
          serviceType: "Landscape Architecture",
          areaServed: "Azerbaijan",
          provider: {
            "@type": "Organization",
            name: "CREAT Company LLC",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Service",
          name: "Main Water and Power Lines",
          description:
            "Engineering solutions for water distribution systems and power line infrastructure",
          serviceType: "Utility Engineering",
          areaServed: "Azerbaijan",
          provider: {
            "@type": "Organization",
            name: "CREAT Company LLC",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Service",
          name: "Industrial Buildings",
          description:
            "Design and construction of industrial facilities and manufacturing plants",
          serviceType: "Industrial Engineering",
          areaServed: "Azerbaijan",
          provider: {
            "@type": "Organization",
            name: "CREAT Company LLC",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 7,
        item: {
          "@type": "Service",
          name: "Educational and Child Development Spaces",
          description:
            "Design of educational facilities and environments optimized for learning and development",
          serviceType: "Educational Facility Design",
          areaServed: "Azerbaijan",
          provider: {
            "@type": "Organization",
            name: "CREAT Company LLC",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 8,
        item: {
          "@type": "Service",
          name: "Residential and Non-Residential Buildings",
          description:
            "Architectural design and engineering for both residential and commercial buildings",
          serviceType: "Architectural Engineering",
          areaServed: "Azerbaijan",
          provider: {
            "@type": "Organization",
            name: "CREAT Company LLC",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 9,
        item: {
          "@type": "Service",
          name: "Urban Planning",
          description:
            "Comprehensive urban development planning and city infrastructure design",
          serviceType: "Urban Planning",
          areaServed: "Azerbaijan",
          provider: {
            "@type": "Organization",
            name: "CREAT Company LLC",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 10,
        item: {
          "@type": "Service",
          name: "Industrial Facility Projects",
          description:
            "End-to-end solutions for industrial facility design, construction, and optimization",
          serviceType: "Industrial Facility Engineering",
          areaServed: "Azerbaijan",
          provider: {
            "@type": "Organization",
            name: "CREAT Company LLC",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 11,
        item: {
          "@type": "Service",
          name: "Waste Management Projects",
          description:
            "Engineering solutions for waste management systems and environmental sustainability",
          serviceType: "Environmental Engineering",
          areaServed: "Azerbaijan",
          provider: {
            "@type": "Organization",
            name: "CREAT Company LLC",
          },
        },
      },
    ],
  };

  return (
    <main>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-creatBG flex items-center justify-center h-screen">
        <div className="text-white text-xl">Still working on this page</div>
      </div>
      <Footer />
    </main>
  );
};

export default Services;
