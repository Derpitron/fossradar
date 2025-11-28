"use client";

import { useState, useMemo, useEffect } from "react";
import Fuse from "fuse.js";
import { Search, X, ChevronDown, Sparkles } from "lucide-react";
import { SearchIndexItem } from "@/lib/schema";
import { ProjectCard } from "./ProjectCard";
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
  const [showSearch, setShowSearch] = useState(false);

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
      {/* Filter Bar */}
      <div className="flex items-center gap-2 sm:gap-4 py-3 border-b border-gray-800">
        {/* Category Tabs - Scrollable */}
        <div className="flex-1 min-w-0 overflow-x-auto scrollbar-hide -mx-1 px-1">
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all rounded-md min-h-[36px]",
                selectedCategory === null
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white active:bg-gray-800/50"
              )}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-all rounded-md min-h-[36px]",
                  selectedCategory === category.id
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white active:bg-gray-800/50"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side Controls - Fixed */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={cn(
              "p-2.5 sm:p-2 rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center",
              showSearch || searchQuery
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800/50 active:bg-gray-800"
            )}
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-lg border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white transition-colors text-xs sm:text-sm min-h-[36px] active:bg-gray-800/50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{sortLabels[sortBy]}</span>
              <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", showSortMenu && "rotate-180")} />
            </button>

            {showSortMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowSortMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-44 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden">
                  {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setShowSortMenu(false);
                      }}
                      className={cn(
                        "w-full px-4 py-3 sm:py-2.5 text-sm text-left transition-colors",
                        sortBy === option
                          ? "bg-orange-500/10 text-orange-400"
                          : "text-gray-300 hover:bg-gray-800 active:bg-gray-800"
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
      </div>

      {/* Expandable Search Bar */}
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full pl-10 pr-10 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-colors text-sm sm:text-base"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Results Count */}
      <div className="text-xs sm:text-sm text-gray-500">
        {filteredProjects.length === projectCount
          ? `${projectCount} projects`
          : `${filteredProjects.length} of ${projectCount} projects`
        }
      </div>

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project as unknown as Project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-16">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-600" />
          </div>
          <p className="text-gray-400 text-base sm:text-lg mb-2">No projects found</p>
          <p className="text-xs sm:text-sm text-gray-500">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
