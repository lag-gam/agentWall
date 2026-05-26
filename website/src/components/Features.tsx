"use client";

import { AnimatedSection, AnimatedScale } from "./AnimatedSection";

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
      </svg>
    ),
    title: "Composite Risk Scoring",
    description:
      "Every tool call is evaluated against 6+ policy rules. Each contributes a weighted risk score (0-100) that drives decisions: ALLOW, BLOCK, or REQUIRE_APPROVAL.",
    color: "#22c55e",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Exfiltration Detection",
    description:
      "Automatically detects when sensitive data (PII, medical, financial) is about to be sent to external systems. Blocks data exfiltration patterns before they execute.",
    color: "#ef4444",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
      </svg>
    ),
    title: "3-Panel Dashboard",
    description:
      "Real-time tool call stream, per-decision risk breakdowns, and one-click approval flow. See every decision your agent makes as it happens.",
    color: "#3b82f6",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Session Memory",
    description:
      "Tracks sensitive files accessed across an entire session. If your agent reads medical records, Palisade remembers and blocks subsequent external sends.",
    color: "#a855f7",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
      </svg>
    ),
    title: "Agent-Agnostic",
    description:
      "Universal HTTP API works with any agent. OpenClaw plugin for zero-config setup. Hermes, AutoGPT, or custom agents integrate with a single POST request.",
    color: "#f59e0b",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" x2="3" y1="12" y2="12" />
      </svg>
    ),
    title: "Human-in-the-Loop",
    description:
      "REQUIRE_APPROVAL decisions pause the agent and surface in the dashboard. One click to approve or deny. The agent resumes automatically.",
    color: "#06b6d4",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-dots opacity-30" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <AnimatedSection className="text-center mb-20">
          <p className="text-sm font-medium text-accent mb-3 tracking-wider uppercase">
            Capabilities
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Not a lock on a door.
            <br />
            <span className="text-gradient">A security operations center.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#9ca3af]">
            ClawBands tells agents no. Palisade tells you <em>why</em>.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <AnimatedScale key={f.title} delay={i * 0.08}>
              <div className="glass-card p-8 h-full group">
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-all group-hover:scale-110"
                  style={{
                    background: `${f.color}10`,
                    border: `1px solid ${f.color}25`,
                    color: f.color,
                  }}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-white">
                  {f.title}
                </h3>
                <p className="text-sm text-[#9ca3af] leading-relaxed">
                  {f.description}
                </p>
              </div>
            </AnimatedScale>
          ))}
        </div>
      </div>
    </section>
  );
}
