"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, MapPin, ExternalLink, Github } from "lucide-react";
import { Project } from "@/lib/schema";
import { cn, formatNumber } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

// Extract owner/repo from GitHub URL
function getRepoInfo(repoUrl: string | undefined): { owner: string; repo: string } | null {
  if (!repoUrl) return null;
  const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (match) {
    return { owner: match[1], repo: match[2].replace(/\/?$/, '') };
  }
  return null;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const repoInfo = getRepoInfo(project.repo);
  const [logoError, setLogoError] = useState(false);

  // Use GitHub OpenGraph as default, custom logo only if provided and loads successfully
  const showGitHubPreview = repoInfo && (!project.logo || logoError);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group block rounded-xl overflow-hidden transition-all duration-300",
        "bg-gray-900 border border-gray-800",
        "hover:border-gray-700 hover:bg-gray-800/50 active:bg-gray-800/70",
        "sm:hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
      )}
    >
      {/* Project Image/Logo Area */}
      <div className="aspect-[16/10] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        {project.logo && !logoError ? (
          <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8">
            <img
              src={project.logo}
              alt={project.name}
              className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              onError={() => setLogoError(true)}
            />
          </div>
        ) : showGitHubPreview ? (
          /* GitHub OpenGraph preview image */
          <img
            src={`https://opengraph.githubassets.com/1/${repoInfo.owner}/${repoInfo.repo}`}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity sm:group-hover:scale-105 duration-300"
            loading="lazy"
          />
        ) : (
          /* Fallback text preview */
          <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4 bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900">
            <div className="flex items-center gap-2 text-gray-400">
              <Github className="w-4 h-4" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <h4 className="text-xl sm:text-2xl font-bold text-white/90 text-center line-clamp-2 group-hover:text-orange-400 transition-colors">
                {project.name}
              </h4>
            </div>
            {project.primary_lang && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                <span className="text-xs text-gray-400">{project.primary_lang}</span>
              </div>
            )}
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-wrap gap-1.5 sm:gap-2">
          {project.verified && (
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-green-500/20 border border-green-500/30 text-green-400 text-[10px] sm:text-xs font-medium backdrop-blur-sm">
              Verified
            </span>
          )}
          {project.looking_for_contributors && (
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] sm:text-xs font-medium backdrop-blur-sm">
              <span className="hidden sm:inline">Seeking Contributors</span>
              <span className="sm:hidden">Contributors</span>
            </span>
          )}
        </div>

        {/* Stars badge */}
        {project.stars > 0 && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
            <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-yellow-500/20 border border-yellow-500/30 backdrop-blur-sm">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-[10px] sm:text-xs font-medium text-yellow-400">
                {formatNumber(project.stars)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5 sm:mb-2">
          <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
            {project.name}
          </h3>
          <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-orange-400 transition-colors flex-shrink-0 mt-0.5 sm:mt-1" />
        </div>

        <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 mb-2.5 sm:mb-3 leading-relaxed">
          {project.short_desc}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-500">
          {project.primary_lang && (
            <span className="px-1.5 sm:px-2 py-0.5 rounded bg-gray-800 text-gray-400">
              {project.primary_lang}
            </span>
          )}
          <span className="flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{project.location_city}</span>
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2.5 sm:mt-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs text-gray-400 bg-gray-800/50"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs text-gray-500">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
