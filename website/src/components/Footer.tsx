"use client";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
            <svg
              width="14"
              height="14"
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
          <span className="text-sm font-semibold text-[#9ca3af]">Palisade</span>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#4b5563]">
          <a href="#features" className="hover:text-[#9ca3af] transition-colors">Features</a>
          <a href="#docs" className="hover:text-[#9ca3af] transition-colors">Docs</a>
          <a href="#contact" className="hover:text-[#9ca3af] transition-colors">Contact</a>
          <span className="text-[#374151]">|</span>
          <span>Built for CS153 at Harvard</span>
        </div>

        <div className="text-xs text-[#374151]">
          &copy; {new Date().getFullYear()} Palisade
        </div>
      </div>
    </footer>
  );
}
