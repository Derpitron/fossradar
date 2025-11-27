import { NextRequest, NextResponse } from "next/server";
import { getRepoMetadata, hasFossradarTopic, isRepoAccessible } from "@/lib/github";

// GitLab API helper functions
async function getGitLabRepoMetadata(repoUrl: string) {
  try {
    const url = new URL(repoUrl);
    const pathParts = url.pathname.replace(/^\/+/, "").replace(/\/+$/, "").split("/");
    if (pathParts.length < 2) return null;

    const projectPath = encodeURIComponent(pathParts.join("/"));
    const apiUrl = `https://gitlab.com/api/v4/projects/${projectPath}`;

    const response = await fetch(apiUrl);
    if (!response.ok) return null;

    const data = await response.json();

    return {
      stars: data.star_count || 0,
      language: null, // GitLab doesn't have a primary language field like GitHub
      description: data.description || "",
      homepage: data.web_url || "",
      license: data.license?.name || "Unknown",
      forks: data.forks_count || 0,
      topics: data.topics || [],
      archived: data.archived || false,
    };
  } catch (error) {
    console.error("Error fetching GitLab repo metadata:", error);
    return null;
  }
}

async function isGitLabRepoAccessible(repoUrl: string): Promise<boolean> {
  try {
    const url = new URL(repoUrl);
    const pathParts = url.pathname.replace(/^\/+/, "").replace(/\/+$/, "").split("/");
    if (pathParts.length < 2) return false;

    const projectPath = encodeURIComponent(pathParts.join("/"));
    const apiUrl = `https://gitlab.com/api/v4/projects/${projectPath}`;

    const response = await fetch(apiUrl);
    if (!response.ok) return false;

    const data = await response.json();
    return data.visibility === "public";
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const repoUrl = searchParams.get("repoUrl");

    if (!repoUrl) {
      return NextResponse.json(
        { error: "Repository URL is required" },
        { status: 400 }
      );
    }

    // Determine if it's GitHub or GitLab
    const isGitHub = repoUrl.includes("github.com");
    const isGitLab = repoUrl.includes("gitlab.com");

    if (!isGitHub && !isGitLab) {
      return NextResponse.json(
        { error: "Only GitHub and GitLab repositories are supported" },
        { status: 400 }
      );
    }

    // Validate URL format
    if (isGitHub) {
      const githubUrlRegex = /^https:\/\/github\.com\/[^\/]+\/[^\/]+\/?$/;
      if (!githubUrlRegex.test(repoUrl)) {
        return NextResponse.json(
          { error: "Invalid GitHub repository URL format" },
          { status: 400 }
        );
      }
    } else if (isGitLab) {
      const gitlabUrlRegex = /^https:\/\/gitlab\.com\/[^\/]+\/[^\/]+\/?$/;
      if (!gitlabUrlRegex.test(repoUrl)) {
        return NextResponse.json(
          { error: "Invalid GitLab repository URL format" },
          { status: 400 }
        );
      }
    }

    // Check accessibility and fetch metadata based on platform
    if (isGitHub) {
      const accessible = await isRepoAccessible(repoUrl);
      if (!accessible) {
        return NextResponse.json(
          { error: "Repository not found or is private" },
          { status: 404 }
        );
      }

      const metadata = await getRepoMetadata(repoUrl);
      if (!metadata) {
        return NextResponse.json(
          { error: "Failed to fetch repository metadata" },
          { status: 500 }
        );
      }

      const hasTopic = await hasFossradarTopic(repoUrl);

      return NextResponse.json({
        accessible: true,
        platform: "github",
        hasFossradarTopic: hasTopic,
        metadata: {
          name: metadata.description || "",
          description: metadata.description || "",
          stars: metadata.stars,
          language: metadata.language || "",
          license: metadata.license || "Unknown",
          homepage: metadata.homepage || "",
          topics: metadata.topics,
          archived: metadata.archived,
        },
      });
    } else {
      // GitLab
      const accessible = await isGitLabRepoAccessible(repoUrl);
      if (!accessible) {
        return NextResponse.json(
          { error: "Repository not found or is private" },
          { status: 404 }
        );
      }

      const metadata = await getGitLabRepoMetadata(repoUrl);
      if (!metadata) {
        return NextResponse.json(
          { error: "Failed to fetch repository metadata" },
          { status: 500 }
        );
      }

      return NextResponse.json({
        accessible: true,
        platform: "gitlab",
        hasFossradarTopic: false, // GitLab doesn't have topics in the same way
        metadata: {
          name: metadata.description || "",
          description: metadata.description || "",
          stars: metadata.stars,
          language: metadata.language || "",
          license: metadata.license || "Unknown",
          homepage: metadata.homepage || "",
          topics: metadata.topics,
          archived: metadata.archived,
        },
      });
    }
  } catch (error: any) {
    console.error("Validate repo error:", error);
    return NextResponse.json(
      { error: "Failed to validate repository" },
      { status: 500 }
    );
  }
}
