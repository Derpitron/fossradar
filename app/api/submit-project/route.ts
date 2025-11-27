import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { ProjectSubmissionSchema } from "@/lib/schema";
import { generateTOML } from "@/lib/toml-generator";
import { createProjectPR } from "@/lib/github";
import { getProjectFiles } from "@/lib/projects";
import { z } from "zod";

// Extended schema to include optional logo
const SubmissionWithLogoSchema = ProjectSubmissionSchema.extend({
  logoFile: z
    .object({
      content: z.string(), // base64
      filename: z.string(),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Check Clerk authentication
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to continue." },
        { status: 401 }
      );
    }

    // Ensure we have a GitHub token for creating PRs
    const githubToken = process.env.GITHUB_TOKEN;
    if (!githubToken) {
      return NextResponse.json(
        { error: "Server configuration error. GitHub token not available." },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = SubmissionWithLogoSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check for duplicate slug
    const existingProjects = getProjectFiles();
    const slugExists = existingProjects.some(
      (file) => file.replace(".toml", "") === data.slug
    );

    if (slugExists) {
      return NextResponse.json(
        {
          error: `A project with slug "${data.slug}" already exists. Please choose a different slug.`,
        },
        { status: 409 }
      );
    }

    // Generate TOML content
    const tomlContent = generateTOML(data);

    // Prepare logo data if provided
    let logoData;
    if (data.logoFile) {
      logoData = {
        content: data.logoFile.content,
        filename: data.logoFile.filename,
      };
    }

    // Create PR using server's GitHub token
    const pr = await createProjectPR({
      slug: data.slug,
      content: tomlContent,
      submitterName: `User ${userId}`,
      userToken: githubToken,
      logo: logoData,
    });

    return NextResponse.json({
      success: true,
      prUrl: pr.url,
      prNumber: pr.number,
      message: "Pull request created successfully!",
    });
  } catch (error: any) {
    console.error("Submit project error:", error);

    // Handle specific errors
    if (error.message?.includes("branch")) {
      return NextResponse.json(
        { error: "Failed to create branch. Please try again." },
        { status: 500 }
      );
    }

    if (error.status === 401 || error.status === 403) {
      return NextResponse.json(
        {
          error: "GitHub API error. Please try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to create pull request" },
      { status: 500 }
    );
  }
}
