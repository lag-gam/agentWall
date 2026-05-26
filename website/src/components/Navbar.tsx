"use client";

import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Metrics", href: "#metrics" },
  { label: "Docs", href: "#docs" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-6 pt-4">
        <div className="glass flex items-center justify-between px-6 py-3">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Palisade
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-[#9ca3af] hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#waitlist"
            className="rounded-full bg-accent/10 border border-accent/20 px-5 py-2 text-sm font-medium text-accent hover:bg-accent/20 transition-all"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
