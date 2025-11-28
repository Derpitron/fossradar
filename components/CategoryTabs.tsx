"use client";

import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  categories: { id: string; label: string }[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}

export function CategoryTabs({ categories, selectedCategory, onSelect }: CategoryTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
          selectedCategory === null
            ? "bg-orange-500 text-white"
            : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800"
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
            selectedCategory === category.id
              ? "bg-orange-500 text-white"
              : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
