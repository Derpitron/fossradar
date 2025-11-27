"use client";

import { useState, useMemo, useEffect } from "react";
import Fuse from "fuse.js";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { SearchIndexItem } from "@/lib/schema";
import { ProjectCard } from "./ProjectCard";
import { CategoryTabs } from "./CategoryTabs";
import { Project } from "@/lib/schema";
import { cn } from "@/lib/utils";

interface ProjectGridProps {
  initialProjects: SearchIndexItem[];
  categories: { id: string; label: string }[];
  projectCount: number;
}

type SortOption = "recent" | "stars" | "name";

export function ProjectGrid({ initialProjects, categories, projectCount }: ProjectGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Debounced search query
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Create Fuse instance for fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(initialProjects, {
        keys: ["name", "short_desc", "tags", "category"],
        threshold: 0.3,
        includeScore: true,
      }),
    [initialProjects]
  );

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let results = initialProjects;

    // Apply search
    if (debouncedQuery.trim()) {
      const fuseResults = fuse.search(debouncedQuery);
      results = fuseResults.map((result) => result.item);
    }

    // Apply category filter
    if (selectedCategory) {
      results = results.filter((project) => project.category === selectedCategory);
    }

    // Apply sorting
    results = [...results].sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return (b.stars || 0) - (a.stars || 0);
        case "recent":
          return new Date(b.added_at).getTime() - new Date(a.added_at).getTime();
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return results;
  }, [initialProjects, debouncedQuery, selectedCategory, sortBy, fuse]);

  const sortLabels: Record<SortOption, string> = {
    recent: "Recently Added",
    stars: "Most Stars",
    name: "Alphabetical",
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-700 transition-colors"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:border-gray-700 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm">{sortLabels[sortBy]}</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", showSortMenu && "rotate-180")} />
          </button>

          {showSortMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowSortMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-20 overflow-hidden">
                {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setShowSortMenu(false);
                    }}
                    className={cn(
                      "w-full px-4 py-2.5 text-sm text-left transition-colors",
                      sortBy === option
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-gray-300 hover:bg-gray-800"
                    )}
                  >
                    {sortLabels[option]}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500">
        Showing {filteredProjects.length} of {projectCount} projects
      </div>

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project as unknown as Project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-gray-400 text-lg mb-2">No projects found</p>
          <p className="text-sm text-gray-500">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
