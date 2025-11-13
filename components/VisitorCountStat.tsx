"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface VisitorCountStatProps {
  slug: string;
}

export function VisitorCountStat({ slug }: VisitorCountStatProps) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackAndFetch = async () => {
      setLoading(true);
      try {
        // Increment visitor count on page load
        const response = await fetch("/api/visitors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        } else {
          // Fallback: try to get current count without incrementing
          const fallbackResponse = await fetch(`/api/visitors?slug=${encodeURIComponent(slug)}`);
          if (fallbackResponse.ok) {
            const data = await fallbackResponse.json();
            setCount(data.count);
          }
        }
      } catch (err) {
        console.error("[VisitorCountStat] Error:", err);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    trackAndFetch();
  }, [slug]);

  return (
    <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
        <Eye className="h-3.5 w-3.5" />
        Total Visits
      </div>
      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
        {loading ? (
          <span className="animate-pulse text-gray-400">---</span>
        ) : (
          formatNumber(count || 0)
        )}
      </div>
    </div>
  );
}
