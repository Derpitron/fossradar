import Link from "next/link";
import Image from "next/image";
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

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group block rounded-xl overflow-hidden transition-all duration-300",
        "bg-gray-900 border border-gray-800",
        "hover:border-gray-700 hover:bg-gray-800/50",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
      )}
    >
      {/* Project Image/Logo Area */}
      <div className="aspect-[16/10] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        {project.logo ? (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <img
              src={project.logo}
              alt={project.name}
              className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </div>
        ) : (
          /* GitHub-style repo preview */
          <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900">
            {/* Top: GitHub icon and repo path */}
            <div className="flex items-center gap-2 text-gray-400">
              <Github className="w-4 h-4" />
              {repoInfo && (
                <span className="text-xs truncate">
                  {repoInfo.owner}/{repoInfo.repo}
                </span>
              )}
            </div>

            {/* Center: Project name */}
            <div className="flex-1 flex items-center justify-center">
              <h4 className="text-2xl font-bold text-white/90 text-center line-clamp-2 group-hover:text-orange-400 transition-colors">
                {project.name}
              </h4>
            </div>

            {/* Bottom: Language indicator */}
            {project.primary_lang && (
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                <span className="text-xs text-gray-400">{project.primary_lang}</span>
              </div>
            )}
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {project.verified && (
            <span className="px-2 py-1 rounded-md bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium backdrop-blur-sm">
              Verified
            </span>
          )}
          {project.looking_for_contributors && (
            <span className="px-2 py-1 rounded-md bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-medium backdrop-blur-sm">
              Seeking Contributors
            </span>
          )}
        </div>

        {/* Stars badge */}
        {project.stars > 0 && (
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-yellow-500/20 border border-yellow-500/30 backdrop-blur-sm">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-yellow-400">
                {formatNumber(project.stars)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
            {project.name}
          </h3>
          <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-orange-400 transition-colors flex-shrink-0 mt-1" />
        </div>

        <p className="text-sm text-gray-400 line-clamp-2 mb-3 leading-relaxed">
          {project.short_desc}
        </p>

        {/* Meta info */}
        <div className="flex items-center gap-3 text-xs text-gray-500">
          {project.primary_lang && (
            <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-400">
              {project.primary_lang}
            </span>
          )}
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {project.location_city}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-xs text-gray-400 bg-gray-800/50"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-0.5 rounded text-xs text-gray-500">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
