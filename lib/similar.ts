import { Project } from "./schema";

/**
 * Calculate similarity score between two projects
 * Weights: Category (5) > Tags (3 each) > Language (3) > Contributors (2) > Location (1-2)
 */
function calculateSimilarity(projectA: Project, projectB: Project): number {
  let score = 0;

  // Same category (highest weight - most relevant for discovery)
  if (projectA.category === projectB.category) {
    score += 5;
  }

  // Shared tags (high weight - core similarity indicator)
  const sharedTags = projectA.tags.filter((tag) => projectB.tags.includes(tag));
  score += sharedTags.length * 3;

  // Same primary language (important for developers)
  if (
    projectA.primary_lang &&
    projectB.primary_lang &&
    projectA.primary_lang !== "Unknown" &&
    projectB.primary_lang !== "Unknown" &&
    projectA.primary_lang === projectB.primary_lang
  ) {
    score += 3;
  }

  // Both looking for contributors (useful for contributors seeking projects)
  if (projectA.looking_for_contributors && projectB.looking_for_contributors) {
    score += 2;
  }

  // Same state (location proximity)
  if (
    projectA.location_indian_state &&
    projectB.location_indian_state &&
    projectA.location_indian_state === projectB.location_indian_state
  ) {
    score += 1;
  }

  // Same city (even closer proximity)
  if (
    projectA.location_city &&
    projectB.location_city &&
    projectA.location_city === projectB.location_city
  ) {
    score += 1;
  }

  // Similar star range (projects at similar maturity levels)
  const starsA = projectA.stars || 0;
  const starsB = projectB.stars || 0;
  if (starsA > 0 && starsB > 0) {
    const ratio = Math.min(starsA, starsB) / Math.max(starsA, starsB);
    if (ratio >= 0.5) {
      score += 1; // Within 2x range
    }
  }

  return score;
}

/**
 * Find similar projects based on category, tags, language, contributor status, and location
 * Returns projects sorted by similarity score, then by stars
 */
export function findSimilarProjects(
  currentProject: Project,
  allProjects: Project[],
  limit: number = 4
): Project[] {
  const scored = allProjects
    .filter((p) => p.slug !== currentProject.slug) // Exclude current project
    .map((project) => ({
      project,
      score: calculateSimilarity(currentProject, project),
    }))
    .filter((item) => item.score > 0) // Only include projects with some similarity
    .sort((a, b) => {
      // Sort by score (descending), then by stars (descending)
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return (b.project.stars || 0) - (a.project.stars || 0);
    })
    .slice(0, limit);

  return scored.map((item) => item.project);
}
