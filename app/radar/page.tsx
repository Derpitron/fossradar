import { loadAllProjects } from "@/lib/projects";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { Header } from "@/components/Header";
import { RadarChart } from "@/components/RadarChart";
import { Github, MapPin, Package, TrendingUp, Building2, Star, ArrowUpRight, Users, GitFork, Code2, GitCommit } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

export const revalidate = 3600; // Revalidate every hour

// Load all cache data
function loadAllCacheData() {
  const cacheDir = path.join(process.cwd(), "public", "cache");
  const cacheData: Record<string, any> = {};

  try {
    if (fs.existsSync(cacheDir)) {
      const files = fs.readdirSync(cacheDir).filter(f => f.endsWith('.json'));
      for (const file of files) {
        const slug = file.replace('.json', '');
        const filePath = path.join(cacheDir, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        cacheData[slug] = data;
      }
    }
  } catch (error) {
    console.error('Error loading cache data:', error);
  }

  return cacheData;
}

export const metadata: Metadata = {
  title: "Geographic Radar - Explore Indian Open Source Projects by Location",
  description: "Interactive map of India's open source ecosystem. View projects by state, city & region. Discover tech hubs in Bangalore, Mumbai, Delhi, Hyderabad, Pune & Kolkata with real-time statistics.",
  keywords: [
    "open source india map",
    "projects by state",
    "indian tech cities",
    "kolkata projects",
    "bangalore projects",
    "mumbai projects",
    "delhi projects",
    "geographic distribution",
    "tech hubs india"
  ],
  openGraph: {
    title: "Geographic Radar - Explore Indian Open Source Projects by Location",
    description: "Interactive analytics dashboard showing open source project distribution across Indian states and cities.",
    url: "https://fossradar.dev/radar",
    type: "website",
  },
  alternates: {
    canonical: "https://fossradar.dev/radar",
  },
};

export default function RadarPage() {
  const projects = loadAllProjects();
  const cacheData = loadAllCacheData();

  // Aggregate projects by state
  const projectsByState = projects.reduce((acc, project) => {
    const state = project.location_indian_state;
    if (!acc[state]) {
      acc[state] = {
        count: 0,
        cities: {},
        projects: [],
      };
    }
    acc[state].count += 1;
    acc[state].projects.push(project);

    // Track cities within state
    const city = project.location_city;
    if (!acc[state].cities[city]) {
      acc[state].cities[city] = {
        count: 0,
        projects: [],
      };
    }
    acc[state].cities[city].count += 1;
    acc[state].cities[city].projects.push(project);

    return acc;
  }, {} as Record<string, { count: number; cities: Record<string, { count: number; projects: typeof projects }>; projects: typeof projects }>);

  // Sort states by project count (descending)
  const sortedStates = Object.entries(projectsByState)
    .sort(([, a], [, b]) => b.count - a.count);

  const totalProjects = projects.length;
  const totalStates = sortedStates.length;
  const totalCities = new Set(projects.map(p => `${p.location_city}, ${p.location_indian_state}`)).size;
  const totalStars = projects.reduce((sum, p) => sum + (p.stars || 0), 0);
  const verifiedProjects = projects.filter(p => p.verified).length;

  // Aggregate stats from cache
  let totalForks = 0;
  let totalContributors = 0;
  let totalCommits = 0;
  const languageStats: Record<string, number> = {};
  const allContributors = new Set<string>();

  Object.values(cacheData).forEach((cache: any) => {
    // Forks
    if (cache.stats?.forks) {
      totalForks += cache.stats.forks;
    }

    // Contributors
    if (cache.contributors) {
      cache.contributors.forEach((c: any) => {
        if (c.login && !c.login.includes('[bot]')) {
          allContributors.add(c.login);
        }
        if (c.contributions) {
          totalCommits += c.contributions;
        }
      });
    }

    // Languages
    if (cache.languages) {
      Object.entries(cache.languages).forEach(([lang, bytes]) => {
        languageStats[lang] = (languageStats[lang] || 0) + (bytes as number);
      });
    }
  });

  totalContributors = allContributors.size;

  // Sort languages by bytes
  const sortedLanguages = Object.entries(languageStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const totalBytes = sortedLanguages.reduce((sum, [, bytes]) => sum + bytes, 0);

  return (
    <div className="min-h-screen bg-gray-950">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://fossradar.dev" },
          { name: "Geographic Radar", url: "https://fossradar.dev/radar" },
        ]}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
                Geographic <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-500">Radar</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-400">
                Real-time analytics of India&apos;s open source landscape
              </p>
            </div>
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-700 hover:bg-gray-800 text-white text-sm font-medium transition-all hover:scale-105 flex-shrink-0"
            >
              <Package className="h-4 w-4" />
              All Projects
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
            {/* Total Projects */}
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 sm:p-6 text-white shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5 opacity-90" />
                  <p className="text-xs sm:text-sm font-semibold opacity-90 tracking-wide">PROJECTS</p>
                </div>
                <p className="text-3xl sm:text-5xl font-bold mb-1 tracking-tight">{totalProjects}</p>
                <p className="text-xs opacity-80 hidden sm:block">Total repositories</p>
              </div>
            </div>

            {/* Total Stars */}
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-4 sm:p-6 text-white shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 opacity-90" />
                  <p className="text-xs sm:text-sm font-semibold opacity-90 tracking-wide">STARS</p>
                </div>
                <p className="text-3xl sm:text-5xl font-bold mb-1 tracking-tight">{totalStars}</p>
                <p className="text-xs opacity-80 hidden sm:block">GitHub stars earned</p>
              </div>
            </div>

            {/* States */}
            <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 sm:p-6 text-white shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 opacity-90" />
                  <p className="text-xs sm:text-sm font-semibold opacity-90 tracking-wide">STATES</p>
                </div>
                <p className="text-3xl sm:text-5xl font-bold mb-1 tracking-tight">{totalStates}</p>
                <p className="text-xs opacity-80 hidden sm:block">Across India</p>
              </div>
            </div>

            {/* Cities */}
            <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 sm:p-6 text-white shadow-xl shadow-green-500/30 hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-4 w-4 sm:h-5 sm:w-5 opacity-90" />
                  <p className="text-xs sm:text-sm font-semibold opacity-90 tracking-wide">CITIES</p>
                </div>
                <p className="text-3xl sm:text-5xl font-bold mb-1 tracking-tight">{totalCities}</p>
                <p className="text-xs opacity-80 hidden sm:block">Urban centers</p>
              </div>
            </div>

            {/* Verified */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white/90 to-gray-100 rounded-xl p-4 sm:p-6 text-gray-900 shadow-xl shadow-white/20 hover:shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 opacity-90" />
                  <p className="text-xs sm:text-sm font-semibold opacity-90 tracking-wide">VERIFIED</p>
                </div>
                <p className="text-3xl sm:text-5xl font-bold mb-1 tracking-tight">{verifiedProjects}</p>
                <p className="text-xs opacity-80 hidden sm:block">{Math.round((verifiedProjects/totalProjects)*100)}% of total</p>
              </div>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {/* Contributors */}
            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 sm:p-5 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-400" />
                <p className="text-xs font-semibold text-gray-400 tracking-wide">CONTRIBUTORS</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">{totalContributors}</p>
              <p className="text-xs text-gray-500 mt-1">Unique developers</p>
            </div>

            {/* Forks */}
            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 sm:p-5 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <GitFork className="h-4 w-4 text-purple-400" />
                <p className="text-xs font-semibold text-gray-400 tracking-wide">FORKS</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">{totalForks}</p>
              <p className="text-xs text-gray-500 mt-1">Total forks</p>
            </div>

            {/* Commits */}
            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 sm:p-5 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <GitCommit className="h-4 w-4 text-green-400" />
                <p className="text-xs font-semibold text-gray-400 tracking-wide">COMMITS</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">{totalCommits.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Contributions</p>
            </div>

            {/* Languages */}
            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 sm:p-5 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="h-4 w-4 text-orange-400" />
                <p className="text-xs font-semibold text-gray-400 tracking-wide">LANGUAGES</p>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">{sortedLanguages.length}</p>
              <p className="text-xs text-gray-500 mt-1">Technologies used</p>
            </div>
          </div>
        </div>

        {/* Language Breakdown */}
        <div className="mb-12">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Code2 className="h-6 w-6 text-orange-400" />
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Language Distribution
                </h2>
                <p className="text-sm text-gray-400">
                  Top programming languages across all projects
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {sortedLanguages.map(([language, bytes], index) => {
                const percentage = ((bytes / totalBytes) * 100).toFixed(1);
                const colors = [
                  'from-orange-500 to-orange-600',
                  'from-blue-500 to-blue-600',
                  'from-green-500 to-green-600',
                  'from-purple-500 to-purple-600',
                  'from-pink-500 to-pink-600',
                  'from-yellow-500 to-yellow-600',
                  'from-cyan-500 to-cyan-600',
                  'from-red-500 to-red-600',
                  'from-indigo-500 to-indigo-600',
                  'from-teal-500 to-teal-600',
                ];
                const colorClass = colors[index % colors.length];

                return (
                  <div key={language} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 flex items-center justify-center rounded-md bg-gray-800 text-xs font-bold text-gray-400">
                          {index + 1}
                        </span>
                        <span className="font-medium text-white group-hover:text-orange-400 transition-colors">
                          {language}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400 font-medium">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`bg-gradient-to-r ${colorClass} h-2.5 rounded-full transition-all duration-700`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Radar Chart Visualization */}
        <div className="mb-12">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1 w-full">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Top States Distribution
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Hexagonal visualization of project distribution across India&apos;s leading tech hubs
                </p>
                <div className="flex justify-center lg:justify-start">
                  <RadarChart
                    data={sortedStates.slice(0, 6).map(([state, data]) => ({
                      label: state,
                      value: data.count,
                    }))}
                    className="w-full max-w-md"
                  />
                </div>
              </div>
              <div className="w-full lg:w-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                  {sortedStates.slice(0, 6).map(([state, data], index) => (
                    <div
                      key={state}
                      className="p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-green-500 flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-400 truncate">
                            {state}
                          </p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {data.count}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {data.count === 1 ? 'project' : 'projects'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* State-wise Breakdown */}
        <div className="space-y-5">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Detailed State Breakdown
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Complete project listings by state and city
            </p>
          </div>

          {sortedStates.map(([state, data], index) => {
            const sortedCities = Object.entries(data.cities)
              .sort(([, a], [, b]) => b.count - a.count);

            const maxCount = Math.max(...sortedCities.map(([, c]) => c.count));
            const statePercentage = Math.round((data.count / totalProjects) * 100);

            return (
              <div
                key={state}
                className="group relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:border-orange-500/30 hover:-translate-y-1"
              >
                {/* State Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-orange-500 to-green-500 text-white font-bold text-base sm:text-lg flex-shrink-0">
                      #{index + 1}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-white break-words">
                        {state}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-0.5 break-words">
                        {data.count} {data.count === 1 ? 'project' : 'projects'} · {sortedCities.length} {sortedCities.length === 1 ? 'city' : 'cities'} · {statePercentage}% of total
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end sm:text-right">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-orange-500/20 border border-orange-500/30">
                      <Package className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
                      <span className="text-xl sm:text-2xl font-bold text-orange-400">
                        {data.count}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cities Grid */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-800">
                    <Building2 className="h-4 w-4 text-gray-500" />
                    <h4 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                      Cities
                    </h4>
                  </div>

                  {sortedCities.map(([city, cityData]) => {
                    const percentage = (cityData.count / maxCount) * 100;
                    const cityPercentage = Math.round((cityData.count / data.count) * 100);

                    return (
                      <div key={city} className="space-y-3">
                        {/* City Header with Progress */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2">
                                <span className="font-semibold text-white">
                                  {city}
                                </span>
                                <span className="text-xs text-gray-500 font-medium">
                                  {cityData.count} {cityData.count === 1 ? 'project' : 'projects'} · {cityPercentage}%
                                </span>
                              </div>
                              {/* Enhanced Progress Bar */}
                              <div className="mt-2 w-full bg-gray-800 rounded-full h-2 overflow-hidden shadow-inner">
                                <div
                                  className="bg-gradient-to-r from-orange-500 to-green-500 h-2 rounded-full transition-all duration-700 ease-out shadow-sm"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Project List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-7">
                          {cityData.projects.map((project) => (
                            <Link
                              key={project.slug}
                              href={`/projects/${project.slug}`}
                              className="group/project flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-800/50 hover:bg-orange-500/10 border border-gray-700/50 hover:border-orange-500/30 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate group-hover/project:text-orange-400 transition-colors">
                                  {project.name}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  {project.verified && (
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium">
                                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                      Verified
                                    </span>
                                  )}
                                  {project.stars > 0 && (
                                    <span className="inline-flex items-center gap-1 text-xs text-gray-400 font-medium">
                                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                      {project.stars}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <ArrowUpRight className="h-4 w-4 text-gray-500 group-hover/project:text-orange-400 transition-colors flex-shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Back to home - Mobile only */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors"
          >
            <Package className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">
                &copy; 2025{" "}
                <Link href="/" className="text-orange-400 hover:underline">
                  FOSSRadar.dev
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
    </div>
  );
}
