"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AnimatedSection, AnimatedScale } from "./AnimatedSection";

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(count, target, { duration, ease: "easeOut" });
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

const METRICS = [
  {
    label: "Tool calls evaluated",
    value: 12847,
    suffix: "",
    prefix: "",
    description: "Total policy evaluations during OpenClaw testing",
    color: "#22c55e",
  },
  {
    label: "Threats blocked",
    value: 342,
    suffix: "",
    prefix: "",
    description: "Dangerous operations caught before execution",
    color: "#ef4444",
  },
  {
    label: "Avg. risk score (blocked)",
    value: 72,
    suffix: "",
    prefix: "",
    description: "Mean composite risk score of blocked actions",
    color: "#f59e0b",
  },
  {
    label: "Exfiltration attempts",
    value: 89,
    suffix: "",
    prefix: "",
    description: "Sensitive data + external system combos detected",
    color: "#a855f7",
  },
  {
    label: "Approval latency",
    value: 3,
    suffix: "s",
    prefix: "<",
    description: "Median human-in-the-loop response time",
    color: "#3b82f6",
  },
  {
    label: "False positive rate",
    value: 4,
    suffix: "%",
    prefix: "",
    description: "Legitimate actions incorrectly flagged",
    color: "#06b6d4",
  },
];

const TIMELINE = [
  {
    tool: "read_file",
    args: "medical_records.csv",
    decision: "ALLOW",
    risk: 12,
    color: "#22c55e",
  },
  {
    tool: "query_database",
    args: "SELECT * FROM patients",
    decision: "REQUIRE_APPROVAL",
    risk: 35,
    color: "#f59e0b",
  },
  {
    tool: "send_email",
    args: "to: external@corp.com",
    decision: "BLOCK",
    risk: 60,
    color: "#ef4444",
  },
  {
    tool: "delete_bulk",
    args: "ids: [1..500]",
    decision: "BLOCK",
    risk: 65,
    color: "#ef4444",
  },
  {
    tool: "read_file",
    args: "quarterly_report.pdf",
    decision: "ALLOW",
    risk: 5,
    color: "#22c55e",
  },
];

export function Metrics() {
  return (
    <section id="metrics" className="relative py-32 px-6">
      <div className="section-divider mb-32" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/3 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <AnimatedSection className="text-center mb-20">
          <p className="text-sm font-medium text-accent mb-3 tracking-wider uppercase">
            Testing Results
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Tested against{" "}
            <span className="text-gradient">OpenClaw in YOLO mode</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#9ca3af]">
            Placeholder metrics from integration testing. OpenClaw with all
            safety rails off, Palisade as the only guardrail.
          </p>
        </AnimatedSection>

        {/* Metric cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {METRICS.map((m, i) => (
            <AnimatedScale key={m.label} delay={i * 0.06}>
              <div className="glass-card p-6 text-center group">
                <div
                  className="text-3xl sm:text-4xl font-bold mb-2 transition-all group-hover:scale-105"
                  style={{ color: m.color }}
                >
                  <AnimatedCounter
                    target={m.value}
                    suffix={m.suffix}
                    prefix={m.prefix}
                  />
                </div>
                <div className="text-sm font-medium text-white mb-1">
                  {m.label}
                </div>
                <div className="text-xs text-[#6b7280]">{m.description}</div>
              </div>
            </AnimatedScale>
          ))}
        </div>

        {/* Timeline visualization */}
        <AnimatedSection delay={0.2}>
          <div className="glass-card p-8">
            <h3 className="text-lg font-semibold mb-6 text-white">
              Sample Decision Timeline
            </h3>
            <div className="space-y-3">
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                >
                  {/* Risk bar */}
                  <div className="w-12 text-right">
                    <span
                      className="text-sm font-mono font-semibold"
                      style={{ color: t.color }}
                    >
                      {t.risk}
                    </span>
                  </div>

                  {/* Risk gauge */}
                  <div className="w-20 h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.risk}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.5, duration: 0.6 }}
                      className="h-full rounded-full"
                      style={{ background: t.color }}
                    />
                  </div>

                  {/* Tool info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-mono text-white">
                      {t.tool}
                    </span>
                    <span className="text-xs text-[#6b7280] ml-2 truncate">
                      {t.args}
                    </span>
                  </div>

                  {/* Decision badge */}
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full shrink-0"
                    style={{
                      background: `${t.color}15`,
                      color: t.color,
                      border: `1px solid ${t.color}30`,
                    }}
                  >
                    {t.decision}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
