import { NextRequest, NextResponse } from 'next/server';
import { incrementUpvoteCount, decrementUpvoteCount, getUpvoteCount } from '@/lib/upvote-tracking';

/**
 * GET /api/upvote?slug={slug}
 * Get the current upvote count for a project slug
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'slug parameter is required' },
        { status: 400 }
      );
    }

    // Validate slug format
    if (typeof slug !== 'string' || slug.length === 0 || slug.length > 100) {
      return NextResponse.json(
        { error: 'Invalid slug format' },
        { status: 400 }
      );
    }

    try {
      const count = await getUpvoteCount(slug);
      return NextResponse.json(
        {
          slug,
          count,
          success: true,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('CounterAPI error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch upvote count' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error fetching upvote count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch upvote count' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/upvote
 * Increment or decrement the upvote count for a project slug
 * Body: { slug: string, action: 'upvote' | 'unvote' }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, action } = body;

    if (!slug) {
      return NextResponse.json(
        { error: 'slug is required in request body' },
        { status: 400 }
      );
    }

    if (!action || !['upvote', 'unvote'].includes(action)) {
      return NextResponse.json(
        { error: 'action must be either "upvote" or "unvote"' },
        { status: 400 }
      );
    }

    // Validate slug format
    if (typeof slug !== 'string' || slug.length === 0 || slug.length > 100) {
      return NextResponse.json(
        { error: 'Invalid slug format' },
        { status: 400 }
      );
    }

    try {
      let count: number;

      if (action === 'upvote') {
        count = await incrementUpvoteCount(slug);
      } else {
        count = await decrementUpvoteCount(slug);
      }

      return NextResponse.json(
        {
          slug,
          count,
          action,
          success: true,
          message: `Successfully ${action}d`,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('CounterAPI error:', error);
      return NextResponse.json(
        { error: 'Failed to update upvote count' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process upvote' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/upvote
 * Handle CORS preflight requests
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { status: 200 });
}
