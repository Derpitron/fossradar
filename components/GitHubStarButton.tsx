"use client";

import { Star, ExternalLink } from "lucide-react";

interface GitHubStarButtonProps {
  repoUrl: string;
  projectName: string;
  stars?: number;
}

export function GitHubStarButton({ repoUrl, projectName, stars = 0 }: GitHubStarButtonProps) {
  return (
    <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-700/50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-heading font-normal text-yellow-900 dark:text-yellow-100 mb-1 tracking-wide flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-500 dark:fill-yellow-400 text-yellow-600 dark:text-yellow-500" />
            Support {projectName} on GitHub
          </h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Show your support by starring this repository
          </p>
        </div>
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white font-semibold transition-colors shadow-md hover:shadow-lg text-sm sm:text-base whitespace-nowrap"
        >
          <Star className="h-5 w-5" />
          <span className="font-bold">{stars.toLocaleString()}</span>
          <span>Stars</span>
          <ExternalLink className="h-4 w-4 ml-1" />
        </a>
      </div>
    </div>
  );
}
