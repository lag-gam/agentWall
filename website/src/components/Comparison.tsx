"use client";

import { AnimatedSection, AnimatedFadeIn } from "./AnimatedSection";

const ROWS = [
  {
    label: "Policy Model",
    clawbands: "Static rules: ALLOW / ASK / DENY per tool category",
    palisade:
      "Composite risk scoring (0-100) with 6+ rules, exfiltration pattern detection, session memory",
  },
  {
    label: "Interface",
    clawbands: "Terminal prompts (TTY), JSONL audit logs",
    palisade:
      "Real-time 3-panel dashboard: live tool stream, risk breakdowns, approval flow",
  },
  {
    label: "Scope",
    clawbands: "OpenClaw only",
    palisade:
      "Agent-agnostic: OpenClaw plugin, HTTP API for any agent, SDK adapters",
  },
  {
    label: "Memory",
    clawbands: "None \u2014 each tool call evaluated in isolation",
    palisade:
      "Cross-action session memory \u2014 tracks sensitive file access across the full run",
  },
  {
    label: "Decisions",
    clawbands: "Binary: allow or deny",
    palisade:
      "Three-tier: ALLOW, REQUIRE_APPROVAL (human-in-the-loop), BLOCK \u2014 with risk scores",
  },
];

export function Comparison() {
  return (
    <section className="relative py-32 px-6">
      <div className="section-divider mb-32" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-medium text-accent mb-3 tracking-wider uppercase">
            How we compare
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            ClawBands vs <span className="text-gradient">Palisade</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-[#9ca3af]">
            Different product category entirely: CLI tool vs. platform.
          </p>
        </AnimatedSection>

        <AnimatedFadeIn delay={0.1}>
          <div className="glass-card overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-white/5">
              <div className="p-5 text-sm font-medium text-[#6b7280]" />
              <div className="p-5 text-sm font-semibold text-[#9ca3af] border-l border-white/5">
                ClawBands
              </div>
              <div className="p-5 text-sm font-semibold text-accent border-l border-white/5">
                Palisade
              </div>
            </div>

            {/* Rows */}
            {ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_1fr_1fr] ${
                  i < ROWS.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                <div className="p-5 text-sm font-medium text-white">
                  {row.label}
                </div>
                <div className="p-5 text-sm text-[#6b7280] border-l border-white/5 leading-relaxed">
                  {row.clawbands}
                </div>
                <div className="p-5 text-sm text-[#d1d5db] border-l border-white/5 leading-relaxed bg-accent/[0.02]">
                  {row.palisade}
                </div>
              </div>
            ))}
          </div>
        </AnimatedFadeIn>
      </div>
    </section>
  );
}
