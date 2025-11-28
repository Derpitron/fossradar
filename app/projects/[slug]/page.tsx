import { notFound } from "next/navigation";
import { loadAllProjects, getProjectBySlug } from "@/lib/projects";
import { findSimilarProjects } from "@/lib/similar";
import { ProjectDetail } from "@/components/ProjectDetail";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { Header } from "@/components/Header";
import { Github } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = loadAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const pageUrl = `https://fossradar.dev/projects/${slug}`;

  // SEO-optimized title with keywords
  const seoTitle = `${project.name} - ${project.primary_lang} Open Source Project from ${project.location_city}, India | FOSSRadar`;

  // SEO-optimized description with keywords
  const seoDescription = `${project.short_desc} ${project.name} is an open source ${project.primary_lang} project from ${project.location_city}, India with ${project.stars || 0}+ GitHub stars. ${project.looking_for_contributors ? 'Looking for contributors!' : ''} Licensed under ${project.license}.`;

  // Comprehensive keywords
  const keywords = [
    project.name.toLowerCase(),
    `${project.name.toLowerCase()} github`,
    `${project.primary_lang.toLowerCase()} open source`,
    `${project.primary_lang.toLowerCase()} projects india`,
    ...project.tags,
    "open source india",
    "indian open source",
    "foss india",
    `${project.location_city.toLowerCase()} developers`,
    `${project.location_city.toLowerCase()} open source`,
    "github india",
    "indian developers",
    project.license.toLowerCase(),
  ];

  // Build OG image URL
  const ogImageUrl = `https://fossradar.dev/projects/${slug}/opengraph-image`;

  return {
    title: seoTitle,
    description: seoDescription.slice(0, 160),
    keywords: keywords,
    authors: [{ name: "FOSSRadar", url: "https://fossradar.dev" }],
    creator: "wbfoss",
    publisher: "wbfoss",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.name} - Open Source ${project.primary_lang} Project from India`,
      description: project.short_desc,
      type: "website",
      url: pageUrl,
      siteName: "FOSSRadar",
      locale: "en_IN",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${project.name} - ${project.primary_lang} Open Source Project from ${project.location_city}, India`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} - Open Source from India`,
      description: project.short_desc,
      creator: "@wbfoss",
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "article:published_time": project.added_at,
      "article:section": "Open Source Software",
      "article:tag": project.tags.join(", "),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Load cache data
  let cache;
  try {
    const cachePath = path.join(process.cwd(), "public", "cache", `${slug}.json`);
    if (fs.existsSync(cachePath)) {
      const cacheData = fs.readFileSync(cachePath, "utf-8");
      cache = JSON.parse(cacheData);
    }
  } catch (error) {
    console.error("Error loading cache:", error);
  }

  // Find similar projects
  const allProjects = loadAllProjects();
  const similarProjects = findSimilarProjects(project, allProjects, 4);

  const pageUrl = `https://fossradar.dev/projects/${slug}`;

  // SoftwareApplication Schema for rich results
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": pageUrl,
    name: project.name,
    description: project.short_desc,
    codeRepository: project.repo,
    programmingLanguage: {
      "@type": "ComputerLanguage",
      name: project.primary_lang,
    },
    license: `https://spdx.org/licenses/${project.license}.html`,
    keywords: project.tags.join(", "),
    datePublished: project.added_at,
    author: {
      "@type": "Organization",
      name: project.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: project.location_city,
        addressRegion: project.location_indian_state,
        addressCountry: "India",
      },
    },
    ...(project.website && { url: project.website }),
    ...(project.stars && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: Math.min(5, 4 + (project.stars > 100 ? 1 : project.stars / 100)),
        bestRating: 5,
        ratingCount: project.stars,
      },
    }),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    operatingSystem: "Cross-platform",
    applicationCategory: "DeveloperApplication",
  };

  // FAQ Schema for common questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${project.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${project.name} is an open source ${project.primary_lang} project from ${project.location_city}, India. ${project.short_desc}`,
        },
      },
      {
        "@type": "Question",
        name: `How to install ${project.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can install ${project.name} by cloning the GitHub repository: git clone ${project.repo}. Check the project's README for detailed installation instructions.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${project.name} free to use?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, ${project.name} is free and open source software licensed under ${project.license}. You can use, modify, and distribute it according to the license terms.`,
        },
      },
      ...(project.looking_for_contributors
        ? [
            {
              "@type": "Question",
              name: `How can I contribute to ${project.name}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `${project.name} is actively looking for contributors! Visit the GitHub repository at ${project.repo} to find open issues, read contribution guidelines, and submit pull requests.`,
              },
            },
          ]
        : []),
    ],
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://fossradar.dev" },
          { name: "Projects", url: "https://fossradar.dev" },
          { name: project.name, url: pageUrl },
        ]}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <article itemScope itemType="https://schema.org/SoftwareSourceCode">
          <meta itemProp="name" content={project.name} />
          <meta itemProp="description" content={project.short_desc} />
          <meta itemProp="programmingLanguage" content={project.primary_lang} />
          <meta itemProp="codeRepository" content={project.repo} />
          <ProjectDetail project={project} cache={cache} similarProjects={similarProjects} />
        </article>
      </main>

      {/* SEO Content Section */}
      <section className="border-t border-gray-800 bg-gray-900/30">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-4xl mx-auto">
            {/* About This Project - SEO Text */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-3">
                About {project.name}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {project.name} is an open source {project.primary_lang} project developed in {project.location_city}, {project.location_indian_state}, India.
                {project.stars ? ` With ${project.stars}+ stars on GitHub, it's one of the notable open source projects from India.` : ''}
                {project.looking_for_contributors ? ' The project is actively looking for contributors to help improve and expand its capabilities.' : ''}
                Licensed under {project.license}, {project.name} is free to use, modify, and distribute.
              </p>
            </div>

            {/* Related Searches */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Related Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/?q=${project.name.toLowerCase().replace(/\s+/g, "+")}`}
                  className="px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {project.name} alternatives
                </Link>
                {project.tags.slice(0, 4).map((tag) => (
                  <Link
                    key={tag}
                    href={`/?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    {tag} projects India
                  </Link>
                ))}
                <Link
                  href={`/?q=${project.primary_lang.toLowerCase()}`}
                  className="px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {project.primary_lang} open source India
                </Link>
                <Link
                  href={`/?location=${project.location_city?.toLowerCase()}`}
                  className="px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Open source {project.location_city}
                </Link>
                <Link
                  href="/"
                  className="px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Indian GitHub projects
                </Link>
              </div>
            </div>

            {/* Discover More */}
            <p className="text-sm text-gray-500 leading-relaxed">
              Discover more open source projects from Indian developers on FOSSRadar. Browse {project.primary_lang} projects,
              explore software from {project.location_city}, or find projects by technology and category.
              FOSSRadar is India's premier directory for discovering GitHub repositories and FOSS contributions
              from developers across Bangalore, Mumbai, Delhi, Hyderabad, Chennai, Pune, Kolkata and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">
                &copy; 2025{" "}
                <Link href="/" className="text-orange-400 hover:underline">
                  FOSSRadar
                </Link>
                . Open source directory.
              </p>
              <p className="text-sm text-gray-600 mt-1">
                An initiative by{" "}
                <Link
                  href="https://wbfoss.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline"
                >
                  wbfoss
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="https://github.com/wbfoss/fossradar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
              <Link
                href="/about"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* JSON-LD Structured Data - Software Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />

      {/* JSON-LD Structured Data - FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </div>
  );
}
