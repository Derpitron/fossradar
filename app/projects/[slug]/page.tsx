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

  const pageUrl = `https://fossradar.in/projects/${slug}`;

  // Build OG image URL with project details
  const ogImageParams = new URLSearchParams({
    title: project.name,
    description: project.short_desc,
    type: "project",
    language: project.primary_lang,
    stars: project.stars?.toString() || "",
    location: project.location_city,
  });
  const ogImageUrl = `https://fossradar.in/api/og?${ogImageParams.toString()}`;

  return {
    title: `${project.name} - FOSSRadar`,
    description: project.short_desc,
    keywords: [...project.tags, "open source", "fossradar", "india", project.primary_lang.toLowerCase()],
    authors: [{ name: "FOSSRadar" }],
    creator: "wbfoss",
    publisher: "wbfoss",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.name} - Open Source Project from India`,
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
          alt: `${project.name} - Open Source Project`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} - FOSSRadar`,
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

  return (
    <div className="min-h-screen bg-gray-950">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://fossradar.in" },
          { name: "Projects", url: "https://fossradar.in" },
          { name: project.name, url: `https://fossradar.in/projects/${slug}` },
        ]}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <ProjectDetail project={project} cache={cache} similarProjects={similarProjects} />
      </main>

      {/* SEO Content Section */}
      <section className="border-t border-gray-800 bg-gray-900/30">
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-4xl mx-auto">
            {/* Related Searches */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Explore More Open Source from India
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 5).map((tag) => (
                  <Link
                    key={tag}
                    href={`/?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    {tag} projects
                  </Link>
                ))}
                <Link
                  href={`/?location=${project.location_city?.toLowerCase()}`}
                  className="px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {project.location_city} developers
                </Link>
                {project.primary_lang && (
                  <Link
                    href={`/?q=${project.primary_lang.toLowerCase()}`}
                    className="px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    {project.primary_lang} open source India
                  </Link>
                )}
              </div>
            </div>

            {/* SEO Description */}
            <p className="text-sm text-gray-500 leading-relaxed">
              {project.name} is an open source {project.primary_lang || "software"} project from {project.location_city}, India.
              Discover more Indian open source projects, GitHub repositories from Indian developers,
              and FOSS contributions on FOSSRadar—India's premier open source directory.
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

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: project.name,
            description: project.short_desc,
            codeRepository: project.repo,
            license: `https://spdx.org/licenses/${project.license}.html`,
            programmingLanguage: project.primary_lang,
            keywords: project.tags,
            ...(project.website && { url: project.website }),
          }),
        }}
      />
    </div>
  );
}
