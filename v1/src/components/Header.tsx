"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white z-50 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-[#1a1a1a]">
          AVANTI<span className="text-[#d35400]">TERRAFORM</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/services" className="text-[#4a4a4a] hover:text-[#2c3e50] font-medium transition-colors">
            Services
          </Link>
          <Link href="/blog" className="text-[#4a4a4a] hover:text-[#2c3e50] font-medium transition-colors">
            Insights
          </Link>
          <Link
            href="/contact"
            className="bg-[#d35400] hover:bg-[#e67e22] text-white px-5 py-2 rounded font-medium transition-colors"
          >
            Get Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            <Link
              href="/services"
              className="block text-[#4a4a4a] hover:text-[#2c3e50] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/blog"
              className="block text-[#4a4a4a] hover:text-[#2c3e50] font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Insights
            </Link>
            <Link
              href="/contact"
              className="block bg-[#d35400] text-white px-5 py-2 rounded font-medium text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
