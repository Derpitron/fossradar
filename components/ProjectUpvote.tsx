"use client";

import { useEffect, useState } from "react";
import { ThumbsUp } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface ProjectUpvoteProps {
  slug: string;
}

export function ProjectUpvote({ slug }: ProjectUpvoteProps) {
  const [count, setCount] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);

  // Get localStorage key for this project
  const getStorageKey = () => `upvote-${slug}`;

  useEffect(() => {
    const fetchUpvoteData = async () => {
      setLoading(true);
      try {
        // Check if user has already voted (from localStorage)
        const voted = localStorage.getItem(getStorageKey()) === 'true';
        setHasVoted(voted);

        // Fetch current upvote count
        const response = await fetch(`/api/upvote?slug=${encodeURIComponent(slug)}`);
        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        }
      } catch (err) {
        console.error("[ProjectUpvote] Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUpvoteData();
  }, [slug]);

  const handleVote = async () => {
    if (isVoting) return;

    setIsVoting(true);
    try {
      const action = hasVoted ? 'unvote' : 'upvote';

      const response = await fetch("/api/upvote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, action }),
      });

      if (response.ok) {
        const data = await response.json();
        setCount(data.count);

        // Update localStorage
        if (action === 'upvote') {
          localStorage.setItem(getStorageKey(), 'true');
          setHasVoted(true);
        } else {
          localStorage.removeItem(getStorageKey());
          setHasVoted(false);
        }
      }
    } catch (err) {
      console.error("[ProjectUpvote] Error voting:", err);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleVote}
        disabled={loading || isVoting}
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
          ${hasVoted
            ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }
          ${(loading || isVoting) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          border border-transparent
          ${hasVoted ? 'border-blue-600 dark:border-blue-500' : 'border-gray-200 dark:border-gray-700'}
        `}
        aria-label={hasVoted ? "Remove upvote" : "Upvote project"}
      >
        <ThumbsUp
          className={`h-4 w-4 transition-transform ${hasVoted ? 'fill-current' : ''}`}
        />
        <span className="text-sm">
          {hasVoted ? 'Upvoted' : 'Upvote'}
        </span>
      </button>

      <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
        {loading ? (
          <span className="text-lg font-bold animate-pulse text-gray-400">--</span>
        ) : (
          <span className="text-lg font-bold">{formatNumber(count)}</span>
        )}
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {count === 1 ? 'upvote' : 'upvotes'}
        </span>
      </div>
    </div>
  );
}
