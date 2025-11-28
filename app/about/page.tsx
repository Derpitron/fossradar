import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { Header } from "@/components/Header";
import { Github, Heart, Globe, Users, Code, Target, Zap, Plus, Radar, FileCode } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About FOSSRadar - India's Premier Open Source Directory",
  description: "FOSSRadar is a Git-based, community-driven platform showcasing India's FOSS ecosystem. Built by wbfoss, we celebrate Indian developers, organizations & open source contributions worldwide.",
  keywords: [
    "about fossradar",
    "foss india",
    "open source directory",
    "indian developers",
    "wbfoss",
    "open source mission",
    "git-based directory",
    "community driven",
    "transparent platform",
  ],
  openGraph: {
    title: "About FOSSRadar - India's Open Source Directory",
    description: "Learn about our mission to celebrate and showcase India's vibrant FOSS ecosystem through founders, creators, and contributors.",
    url: "https://fossradar.in/about",
    type: "website",
  },
  alternates: {
    canonical: "https://fossradar.in/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://fossradar.in" },
          { name: "About", url: "https://fossradar.in/about" },
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
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-500">FOSSRadar</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
              India's comprehensive directory celebrating Free and Open Source Software (FOSS) projects through their founders, creators, core contributors, and community impact.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Our Mission
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4">
              FOSSRadar exists to shine a spotlight on India's vibrant open source ecosystem. We believe that open source innovation from India deserves recognition, celebration, and a central platform where developers, organizations, and enthusiasts can discover and connect with incredible projects.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Our mission is to build a comprehensive, Git-based directory that showcases the diversity and depth of FOSS contributions from India—whether through their founders, creators, core contributors, organizational base, or projects that serve the Indian community.
            </p>
          </div>

          {/* What We Are Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                What is FOSSRadar?
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
              FOSSRadar is a <strong className="text-white">Git-based, community-driven directory</strong> that highlights open source projects with connections to India. We showcase projects where:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Founders from India</h3>
                    <p className="text-sm text-gray-400">Projects created by Indian founders, innovators, and entrepreneurs who are building the future of open source.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                <div className="flex items-start gap-3">
                  <Code className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Organizations Based in India</h3>
                    <p className="text-sm text-gray-400">Companies and organizations headquartered in India that maintain significant open source projects.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Community Impact</h3>
                    <p className="text-sm text-gray-400">Projects that serve the Indian community, solve local challenges, or have significant adoption in India.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl border border-gray-800 bg-gray-900/50">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-2">Core Contributors</h3>
                    <p className="text-sm text-gray-400">Projects with significant contributions from developers based in India or of Indian origin.</p>
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
                Why FOSSRadar?
              </h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <h3 className="font-semibold text-orange-400 mb-2">Discoverability</h3>
                <p className="text-sm text-gray-300">
                  India has thousands of talented open source contributors and innovative projects, but they're often scattered across platforms. FOSSRadar brings them together in one searchable, organized directory.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
                <h3 className="font-semibold text-orange-400 mb-2">Recognition</h3>
                <p className="text-sm text-gray-300">
                  We celebrate the contributions of Indian developers, organizations, and communities to the global open source movement. Every project listed here is a testament to India's growing influence in FOSS.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <h3 className="font-semibold text-green-400 mb-2">Connection</h3>
                <p className="text-sm text-gray-300">
                  FOSSRadar helps developers find projects to contribute to, organizations discover talent, and users find solutions built by and for the Indian community.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <h3 className="font-semibold text-green-400 mb-2">Transparency</h3>
                <p className="text-sm text-gray-300">
                  Built on Git with a PR-based submission workflow, every project addition is reviewed by the community. Our directory is fully open source, version-controlled, and transparent.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <FileCode className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                How It Works
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
              FOSSRadar operates on a simple, transparent, Git-based workflow:
            </p>
            <ol className="space-y-4 text-gray-300">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">1</span>
                <div>
                  <strong className="text-white">Submit Your Project</strong>
                  <p className="text-gray-400 mt-1">Create a TOML file with your project details and submit a pull request to our GitHub repository.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-sm">2</span>
                <div>
                  <strong className="text-white">Community Review</strong>
                  <p className="text-gray-400 mt-1">Our maintainers and community members review your submission for quality and relevance.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">3</span>
                <div>
                  <strong className="text-white">Verification</strong>
                  <p className="text-gray-400 mt-1">Add the <code className="px-2 py-1 rounded bg-gray-800 text-sm text-green-400">fossradar</code> topic to your GitHub repo and include our badge to get verified status.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">4</span>
                <div>
                  <strong className="text-white">Automatic Updates</strong>
                  <p className="text-gray-400 mt-1">We automatically update star counts, contributor information, and other metadata daily via GitHub Actions.</p>
                </div>
              </li>
            </ol>
          </div>

          {/* Behind FOSSRadar Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Behind FOSSRadar
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4">
              FOSSRadar is built and maintained by <Link href="https://wbfoss.org" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline font-semibold">wbfoss</Link>, a community-driven initiative dedicated to promoting Free and Open Source Software in India.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4">
              We believe in the power of open source to drive innovation, collaboration, and positive change. FOSSRadar is our contribution to making India's FOSS ecosystem more visible, connected, and vibrant.
            </p>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              The platform itself is <strong className="text-white">100% open source</strong>, built with Next.js 16, TypeScript, and Tailwind CSS 4. Every line of code, every design decision, and every feature is publicly available on GitHub for anyone to inspect, contribute to, or fork.
            </p>
          </div>

          {/* Get Involved Section */}
          <div className="mb-12">
            <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-br from-orange-500/20 to-green-500/20 border border-orange-500/30">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Get Involved
              </h2>
              <p className="text-base sm:text-lg mb-6 text-gray-300">
                FOSSRadar is a community project, and we welcome contributions from everyone. Whether you're submitting a project, fixing a bug, or suggesting improvements, your participation makes FOSSRadar better for everyone.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  Submit Your Project
                </Link>
                <Link
                  href="https://github.com/wbfoss/fossradar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 text-white font-medium transition-colors"
                >
                  <Github className="h-5 w-5" />
                  View on GitHub
                </Link>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Our Values
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="font-semibold text-white mb-2">Open & Transparent</h3>
                <p className="text-sm text-gray-400">Everything we do is open source, publicly visible, and community-driven.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="font-semibold text-white mb-2">Community First</h3>
                <p className="text-sm text-gray-400">We're built by the community, for the community. Every voice matters.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="font-semibold text-white mb-2">Quality Focused</h3>
                <p className="text-sm text-gray-400">We maintain high standards for project quality and maintain accurate, up-to-date information.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

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
