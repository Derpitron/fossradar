"use client";

import Link from "next/link";
import { Radar, MessageSquare, Plus } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <Radar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                FOSS<span className="text-orange-400">Radar</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/radar"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Radar
              </Link>
              <Link
                href="/about"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/wbfoss/fossradar/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Feedback
            </Link>
            <Link
              href="/submit"
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Submit</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
