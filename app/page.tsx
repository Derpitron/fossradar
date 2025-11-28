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
  title: "FOSSRadar - Discover Open Source Projects from India",
  description: "India's leading directory of open source projects. Discover 100+ FOSS projects from Indian developers across Bangalore, Mumbai, Delhi, Kolkata & more. Search by tech stack, location & tags.",
  keywords: [
    "open source india",
    "foss projects",
    "indian developers",
    "github projects india",
    "open source directory",
    "indian tech community",
    "developer projects",
    "open source contributors"
  ],
  openGraph: {
    title: "FOSSRadar - Discover Open Source Projects from India",
    description: "Explore India's vibrant open source ecosystem. Search and discover FOSS projects by Indian founders and contributors.",
    url: "https://fossradar.in",
    type: "website",
  },
  alternates: {
    canonical: "https://fossradar.in",
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
          { name: "Home", url: "https://fossradar.in" },
        ]}
      />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient - India flag inspired */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/20 via-gray-950 to-gray-950 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container mx-auto px-4 pt-16 pb-12 text-center">
          {/* Badge */}
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium hover:bg-orange-500/20 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Submit Your Open Source Project
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            India's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-500">
              open source
            </span>{" "}
            hall of fame
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Production-grade repos. Real commits. Zero toy projects. The code Indian devs are actually shipping.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        {searchIndex.length > 0 ? (
          <ProjectGrid
            initialProjects={searchIndex}
            categories={categories}
            projectCount={searchIndex.length}
          />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 mb-4">
              No projects yet. Be the first to add one!
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors"
            >
              Submit Your Project
            </Link>
          </div>
        )}
      </main>

      {/* Developer CTA Section */}
      <section className="border-t border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ship code that matters? Get listed.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
            You've pushed commits, squashed bugs, and built something real. Now put your project where serious developers look. No fluff—just code that counts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors"
            >
              <Plus className="w-5 h-5" />
              Submit Your Project
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 text-gray-300 font-medium transition-colors"
            >
              Learn What It Takes
            </Link>
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
              <Link
                href="/radar"
                className="text-sm text-gray-400 hover:text-white transition-colors"
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
