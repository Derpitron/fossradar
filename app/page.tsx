import { ProjectGrid } from "@/components/ProjectGrid";
import { Header } from "@/components/Header";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { Github, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "FOSSRadar - Build India's Open Source Index Together | Community-Driven FOSS Directory",
  description: "Join us in building India's open source index. A community-driven directory by developers, for developers. Add your project, discover others, and help put Indian open source on the map.",
  keywords: [
    "open source india",
    "indian open source projects",
    "foss india",
    "github india",
    "indian developers github",
    "open source directory india",
    "made in india open source",
    "indian github repositories",
    "best indian open source",
    "indian developer tools",
    "foss projects india",
    "bangalore developers",
    "mumbai open source",
    "delhi github projects",
    "indian tech startups open source",
    "india software developers",
    "open source contributions india",
    "indian foss community"
  ],
  openGraph: {
    title: "FOSSRadar - Build India's Open Source Index Together",
    description: "Join us in building India's open source index. A community-driven directory by developers, for developers. Add your project and be part of the movement.",
    url: "https://fossradar.dev",
    type: "website",
  },
  alternates: {
    canonical: "https://fossradar.dev",
  },
};

// Load categories from JSON file
function loadCategories() {
  const categoriesPath = path.join(process.cwd(), "data", "categories.json");
  const data = JSON.parse(fs.readFileSync(categoriesPath, "utf-8"));
  return Object.entries(data.categories).map(([id, cat]: [string, any]) => ({
    id,
    label: cat.label,
  }));
}

export default function Home() {
  // Read pre-built search index
  const indexPath = path.join(process.cwd(), "public", "index.json");
  const searchIndex = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
  const categories = loadCategories();

  return (
    <div className="min-h-screen bg-gray-950">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://fossradar.dev" },
        ]}
      />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient - India flag inspired */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/20 via-gray-950 to-gray-950 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] sm:h-[400px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 pt-10 sm:pt-16 pb-8 sm:pb-12 text-center">
          {/* Badge */}
          <Link
            href="/submit"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs sm:text-sm font-medium hover:bg-orange-500/20 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="hidden xs:inline">Add Your Project to the Index</span>
            <span className="xs:hidden">Add Project</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
            India's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-500">
              open source
            </span>{" "}
            story. Written by you.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
            One index. Every Indian dev. Add your repo, find your tribe, and let's put our code on the map.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12 sm:pb-16">
        {searchIndex.length > 0 ? (
          <ProjectGrid
            initialProjects={searchIndex}
            categories={categories}
            projectCount={searchIndex.length}
          />
        ) : (
          <div className="text-center py-12 sm:py-16">
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              No projects yet. Be the first to add one!
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors"
            >
              Submit Your Project
            </Link>
          </div>
        )}
      </main>

      {/* Developer CTA Section */}
      <section className="border-t border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto px-4 py-10 sm:py-16 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            You built it. Now let India find it.
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
            Solo project or team effort—if it's open source and it's Indian, it belongs here. Drop your repo. Get discovered. Simple as that.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add Your Project
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg border border-gray-700 hover:bg-gray-800 text-gray-300 font-medium transition-colors text-sm sm:text-base"
            >
              How to Contribute
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="border-t border-gray-800 bg-gray-900/30">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          {/* Discover by City */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">
              Discover Open Source Projects by City
            </h2>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Kochi"].map((city) => (
                <Link
                  key={city}
                  href={`/?location=${city.toLowerCase()}`}
                  className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-400 hover:text-white active:text-white bg-gray-800/50 hover:bg-gray-800 active:bg-gray-800 rounded-lg transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>

          {/* Browse by Technology */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">
              Open Source Projects by Technology
            </h2>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {["JavaScript", "TypeScript", "Python", "Go", "Rust", "Java", "React", "Node.js", "Django", "FastAPI", "Next.js", "Vue.js"].map((tech) => (
                <Link
                  key={tech}
                  href={`/?q=${tech.toLowerCase()}`}
                  className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-400 hover:text-white active:text-white bg-gray-800/50 hover:bg-gray-800 active:bg-gray-800 rounded-lg transition-colors"
                >
                  {tech}
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Categories */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">
              Popular Categories
            </h2>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {["Developer Tools", "APIs", "Web Frameworks", "CLI Tools", "DevOps", "Security", "AI/ML", "Databases", "Mobile", "Infrastructure"].map((category) => (
                <Link
                  key={category}
                  href={`/?q=${category.toLowerCase().replace(/\//g, " ")}`}
                  className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm text-gray-400 hover:text-white active:text-white bg-gray-800/50 hover:bg-gray-800 active:bg-gray-800 rounded-lg transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          {/* SEO Description */}
          <div className="pt-6 sm:pt-8 border-t border-gray-800">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
              Built by the Community, for the Community
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-4xl">
              FOSSRadar is a community-driven index of open source projects from India.
              We're building this together—developers from Bangalore, Mumbai, Delhi, Hyderabad,
              Chennai, Pune, Kolkata, and every corner of India contributing to a shared directory.
              Add your project, discover what others are building, and help grow India's FOSS ecosystem.
              Every contribution counts.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs sm:text-sm text-gray-500">
                &copy; 2025{" "}
                <Link href="/" className="text-orange-400 hover:underline">
                  FOSSRadar
                </Link>
                . Open source directory.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
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
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="https://github.com/wbfoss/fossradar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors p-1"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
              <Link
                href="/about"
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors p-1"
              >
                About
              </Link>
              <Link
                href="/radar"
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors p-1"
              >
                Radar
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
