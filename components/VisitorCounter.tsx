"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface VisitorCounterProps {
  slug: string;
}

export function VisitorCounter({ slug }: VisitorCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackVisitor = async () => {
      setLoading(true);
      try {
        // Increment visitor count (lifetime hit tracking)
        const response = await fetch("/api/visitors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`[VisitorCounter] Incremented count for "${slug}": ${data.count}`);
          setCount(data.count);
          setError(null);
        } else {
          const errorData = await response.json();
          console.error(`[VisitorCounter] Error incrementing for "${slug}":`, errorData.error);
          // Fallback: try to get current count without incrementing
          await fetchCurrentCount();
        }
      } catch (err) {
        console.error(`[VisitorCounter] Exception for "${slug}":`, err);
        // Fallback: try to get current count without incrementing
        await fetchCurrentCount();
      } finally {
        setLoading(false);
      }
    };

    trackVisitor();
  }, [slug]);

  const fetchCurrentCount = async () => {
    try {
      const response = await fetch(`/api/visitors?slug=${encodeURIComponent(slug)}`);
      if (response.ok) {
        const data = await response.json();
        console.log(`[VisitorCounter] Fetched current count for "${slug}": ${data.count}`);
        setCount(data.count);
        setError(null);
      } else {
        console.error(`[VisitorCounter] Failed to fetch count for "${slug}"`);
        setError("Unable to load visitor count");
      }
    } catch (err) {
      console.error(`[VisitorCounter] Exception fetching count for "${slug}":`, err);
      setError("Unable to load visitor count");
    }
  };

  // Show loading skeleton while fetching
  if (loading && count === null) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-400 dark:text-gray-500 animate-pulse">
        <Eye className="h-4 w-4" />
        <span className="font-medium">---</span>
        <span>visits</span>
      </div>
    );
  }

  // Don't render if count is not loaded or there's an error
  if (count === null) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
      <Eye className="h-4 w-4" />
      <span className="font-medium">{count.toLocaleString()}</span>
      <span className="text-gray-500 dark:text-gray-400">
        {count === 1 ? "visit" : "visits"}
      </span>
    </div>
  );
}
