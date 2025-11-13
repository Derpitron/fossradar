import { Counter } from 'counterapi';

/**
 * CounterAPI client configuration
 * Uses COUNTERAPI_COUNTER as the access token (configured in Vercel)
 */
const counter = new Counter({
  workspace: process.env.COUNTERAPI_WORKSPACE || 'fossradar',
  debug: process.env.NODE_ENV !== 'production',
  timeout: 5000,
  accessToken: process.env.COUNTERAPI_COUNTER || process.env.COUNTERAPI_ACCESS_TOKEN,
});

/**
 * Increment upvote count for a project slug
 * @param slug - The project slug
 * @returns The updated upvote count
 */
export async function incrementUpvoteCount(slug: string): Promise<number> {
  try {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Invalid slug provided');
    }

    // Use CounterAPI to increment the upvote counter
    const result = await counter.up(`upvote-${slug}`);
    return result.value;
  } catch (error) {
    console.error(`Error incrementing upvote count for slug "${slug}":`, error);
    throw error;
  }
}

/**
 * Get upvote count for a project slug
 * @param slug - The project slug
 * @returns The upvote count (0 if not found)
 */
export async function getUpvoteCount(slug: string): Promise<number> {
  try {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Invalid slug provided');
    }

    // Use CounterAPI to get the current upvote count
    const result = await counter.get(`upvote-${slug}`);
    return result.value;
  } catch (error) {
    console.error(`Error getting upvote count for slug "${slug}":`, error);
    // Return 0 if counter doesn't exist yet
    return 0;
  }
}

/**
 * Decrement upvote count for a project slug (for unvoting)
 * @param slug - The project slug
 * @returns The updated upvote count
 */
export async function decrementUpvoteCount(slug: string): Promise<number> {
  try {
    if (!slug || typeof slug !== 'string') {
      throw new Error('Invalid slug provided');
    }

    // Use CounterAPI to decrement the upvote counter
    const result = await counter.down(`upvote-${slug}`);
    return result.value;
  } catch (error) {
    console.error(`Error decrementing upvote count for slug "${slug}":`, error);
    throw error;
  }
}
