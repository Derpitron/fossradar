"use client";

import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { ExternalLink, AlertCircle, Github, CheckCircle, GitBranch } from "lucide-react";

interface Step1Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
}

export function Step1SelectRepo({ form, onNext, onBack }: Step1Props) {
  const [repoUrl, setRepoUrl] = useState(form.getValues("repo") || "");
  const [isValid, setIsValid] = useState(false);
  const [repoType, setRepoType] = useState<"github" | "gitlab" | null>(null);

  const validateUrl = (url: string) => {
    // Check for GitHub URL
    const isGitHub = url.match(/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/);
    // Check for GitLab URL (gitlab.com)
    const isGitLab = url.match(/^https:\/\/gitlab\.com\/[^/]+\/[^/]+\/?$/);

    if (isGitHub) {
      setRepoType("github");
      setIsValid(true);
      return true;
    } else if (isGitLab) {
      setRepoType("gitlab");
      setIsValid(true);
      return true;
    } else {
      setRepoType(null);
      setIsValid(false);
      return false;
    }
  };

  const handleUrlChange = (url: string) => {
    setRepoUrl(url);
    if (validateUrl(url)) {
      form.setValue("repo", url, { shouldValidate: true });
      form.setValue("_repoType", url.includes("gitlab.com") ? "gitlab" : "github");
    }
  };

  const handleNext = () => {
    if (isValid) {
      form.setValue("repo", repoUrl, { shouldValidate: true });
      form.setValue("_repoType", repoType);
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-2">
          Enter Repository URL
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Provide the GitHub or GitLab repository URL for your open source project
        </p>
      </div>

      {/* Repository URL Input */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Repository URL <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <GitBranch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Supported: GitHub (github.com) and GitLab (gitlab.com)
          </p>
        </div>

        {/* Validation Messages */}
        {repoUrl && !isValid && (
          <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800 dark:text-red-200">
                Please enter a valid GitHub or GitLab repository URL
              </p>
            </div>
          </div>
        )}

        {repoUrl && isValid && (
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-green-800 dark:text-green-200 font-medium flex items-center gap-2">
                  Valid {repoType === "github" ? "GitHub" : "GitLab"} URL
                  {repoType === "github" ? (
                    <Github className="h-4 w-4" />
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
                    </svg>
                  )}
                </p>
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-700 dark:text-green-300 hover:underline flex items-center gap-1 mt-1"
                >
                  {repoUrl}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Requirements */}
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Repository Requirements
          </h3>
          <ul className="space-y-1.5 text-sm text-blue-800 dark:text-blue-200">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Must be a public repository
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Must have an OSI-approved open source license
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Must have a connection to India (founder, contributors, or community)
            </li>
          </ul>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!isValid}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
