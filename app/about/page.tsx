import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { Header } from "@/components/Header";
import { Github, Heart, Globe, Users, Code, Target, Zap, Plus, Radar, FileCode } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About FOSSRadar - Join Us in Building India's Open Source Index",
  description: "FOSSRadar is built by developers like you. A community-driven, Git-based platform where Indian developers come together to build the definitive open source index. Contribute, collaborate, belong.",
  keywords: [
    "about fossradar",
    "foss india",
    "open source directory",
    "indian developers",
    "wbfoss",
    "open source community",
    "git-based directory",
    "community driven",
    "contribute open source",
    "indian developer community",
  ],
  openGraph: {
    title: "About FOSSRadar - Join Us in Building India's Open Source Index",
    description: "We're building this together. Join the community of Indian developers creating the definitive open source index for India.",
    url: "https://fossradar.dev/about",
    type: "website",
  },
  alternates: {
    canonical: "https://fossradar.dev/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://fossradar.dev" },
          { name: "About", url: "https://fossradar.dev/about" },
        ]}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Not a directory. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-500">A movement.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
              FOSSRadar is what happens when Indian devs decide their work deserves a spotlight. No gatekeepers. No algorithms. Just code, creators, and a community that ships.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Why We're Doing This
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4">
              India has incredible open source talent—solo developers shipping side projects at 2 AM, startups open-sourcing their tools, teams building infrastructure that powers the web. But this work is scattered. Hard to find. Easy to miss.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              We're changing that. Together, we're building a single place where Indian open source can be discovered, celebrated, and grown. Not as a showcase we control, but as a community resource we all own.
            </p>
          </div>

          {/* What We Are Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Who Can Contribute?
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
              If you're building open source with any connection to India, your project belongs here. We welcome:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Indian Founders & Creators</h3>
                    <p className="text-sm text-gray-400">You started a project? Add it. Doesn't matter if it has 5 stars or 5000. Your work counts.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                <div className="flex items-start gap-3">
                  <Code className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Teams & Organizations</h3>
                    <p className="text-sm text-gray-400">Companies and teams in India shipping open source tools? You're building the ecosystem. Join us.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Community Projects</h3>
                    <p className="text-sm text-gray-400">Building something for the Indian developer community? Solving local problems? We want to feature it.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Core Contributors</h3>
                    <p className="text-sm text-gray-400">Indian developers making significant contributions to any project? That's part of our story too.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why FOSSRadar Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Radar className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Why This Matters
              </h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <h3 className="font-semibold text-orange-400 mb-2">Visibility for Your Work</h3>
                <p className="text-sm text-gray-300">
                  You've built something. Now let people find it. FOSSRadar puts your project where developers are looking—alongside the best open source from India.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <h3 className="font-semibold text-orange-400 mb-2">Find Your People</h3>
                <p className="text-sm text-gray-300">
                  Looking for contributors? Want to find projects to contribute to? FOSSRadar connects developers who ship with developers who want to help ship.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <h3 className="font-semibold text-green-400 mb-2">Grow the Ecosystem</h3>
                <p className="text-sm text-gray-300">
                  Every project you add makes the index more useful. Every developer who joins makes the community stronger. We're all building this together.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <h3 className="font-semibold text-green-400 mb-2">100% Open & Transparent</h3>
                <p className="text-sm text-gray-300">
                  No gatekeepers. No black boxes. FOSSRadar runs on Git—submit via PR, everything is public, the code is open source. You own this as much as we do.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <FileCode className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                How to Get Involved
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
              Adding your project takes 5 minutes. Here's how:
            </p>
            <ol className="space-y-4 text-gray-300">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">1</span>
                <div>
                  <strong className="text-white">Add Your Project</strong>
                  <p className="text-gray-400 mt-1">Create a simple TOML file with your project details. Fork the repo, add the file, submit a PR. That's it.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">2</span>
                <div>
                  <strong className="text-white">We Review Together</strong>
                  <p className="text-gray-400 mt-1">Community maintainers check submissions. Not to gatekeep—to help make sure everything looks good.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">3</span>
                <div>
                  <strong className="text-white">Get Verified (Optional)</strong>
                  <p className="text-gray-400 mt-1">Add the <code className="px-2 py-1 rounded bg-gray-800 text-sm text-green-400">fossradar</code> topic to your repo for a verified badge. Shows you're part of the community.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">4</span>
                <div>
                  <strong className="text-white">Stay Updated</strong>
                  <p className="text-gray-400 mt-1">Stars, contributors, activity—all synced automatically. Your listing stays fresh without any work from you.</p>
                </div>
              </li>
            </ol>
          </div>

          {/* Behind FOSSRadar Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Who's Behind This?
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4">
              FOSSRadar started as a project by <Link href="https://wbfoss.org" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline font-semibold">wbfoss</Link>, but it belongs to everyone who contributes. Every developer who adds a project, every person who submits a PR, every user who spreads the word—you're all part of this.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4">
              We're not building a platform we control. We're building a resource the community owns. The code is open. The data is open. The process is open. If FOSSRadar becomes valuable, it's because developers like you made it that way.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Built with Next.js, TypeScript, and Tailwind CSS. Every line of code is on GitHub. Fork it, improve it, make it yours.
            </p>
          </div>

          {/* Get Involved Section */}
          <div className="mb-12">
            <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-br from-orange-500/20 to-green-500/20 border border-orange-500/30">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to Join?
              </h2>
              <p className="text-base sm:text-lg mb-6 text-gray-300">
                This is your community. Your index. Your platform. Add your project, contribute code, help review PRs, or just spread the word. Every contribution—big or small—helps India's open source story grow.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  Add Your Project
                </Link>
                <Link
                  href="https://github.com/wbfoss/fossradar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 text-white font-medium transition-colors"
                >
                  <Github className="h-5 w-5" />
                  Contribute on GitHub
                </Link>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                What We Stand For
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="font-semibold text-white mb-2">Radically Open</h3>
                <p className="text-sm text-gray-400">No hidden agendas. The code, the data, the process—all public. Always.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="font-semibold text-white mb-2">You're the Owner</h3>
                <p className="text-sm text-gray-400">This isn't our platform. It's yours. Every contributor has a stake in what we build.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="font-semibold text-white mb-2">Quality Matters</h3>
                <p className="text-sm text-gray-400">We curate, not gatekeep. Good projects deserve visibility regardless of star count.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SEO Content Section */}
      <section className="border-t border-gray-800 bg-gray-900/30">
        <div className="container mx-auto px-4 py-10">
          {/* Related Topics */}
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Explore Indian Open Source
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "GitHub India",
                "FOSS India",
                "Indian Developers",
                "Open Source Bangalore",
                "Made in India Software",
                "Indian Tech Startups",
                "Developer Tools India",
                "Indian GitHub Projects"
              ].map((topic) => (
                <Link
                  key={topic}
                  href={`/?q=${topic.toLowerCase().replace(/ /g, "+")}`}
                  className="px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </div>

          {/* SEO Description */}
          <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
            FOSSRadar is a community-built index of open source projects from India.
            Developers from Bangalore, Mumbai, Delhi, Hyderabad, Chennai, Pune, Kolkata and beyond
            are coming together to create a shared resource for Indian open source.
            Add your project, discover what others are building, and be part of India's growing FOSS movement.
          </p>
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
