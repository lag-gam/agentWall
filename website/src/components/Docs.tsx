"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";

const TABS = [
  {
    id: "quickstart",
    label: "Quick Start",
    content: `# Quick Start

## 1. Install the OpenClaw plugin

\`\`\`bash
npm install palisade-openclaw
\`\`\`

## 2. Add to your openclaw.json

\`\`\`json
{
  "plugins": ["palisade-openclaw"]
}
\`\`\`

## 3. Start the Palisade worker + dashboard

\`\`\`bash
cd palisade && npm run dev:no-agent
\`\`\`

## 4. Run OpenClaw — Palisade intercepts every tool call

\`\`\`bash
PALISADE_URL=http://localhost:8787 openclaw run
\`\`\`

That's it. Open the dashboard at localhost:5173
and watch decisions stream in.`,
  },
  {
    id: "http-api",
    label: "HTTP API",
    content: `# Universal HTTP API

Any agent that can make HTTP calls can integrate.

## Create a session

\`\`\`bash
curl -X POST http://localhost:8787/api/sessions \\
  -H "Content-Type: application/json" \\
  -d '{"source": "my-agent"}'
# → { "id": "abc-123", ... }
\`\`\`

## Evaluate a tool call

\`\`\`bash
curl -X POST http://localhost:8787/api/sessions/abc-123/evaluate \\
  -H "Content-Type: application/json" \\
  -d '{
    "toolName": "send_email",
    "toolArgs": {"to": "x@y.com", "body": "data"},
    "agentReasoning": "sending report",
    "stepIndex": 0
  }'
# → { "decision": "BLOCK", "riskScore": 60, ... }
\`\`\`

## Poll for approval

\`\`\`bash
curl http://localhost:8787/api/sessions/abc-123/approval-status/tc-xyz
# → { "status": "pending" | "approved" | "denied" }
\`\`\`

## Report tool result

\`\`\`bash
curl -X POST http://localhost:8787/api/sessions/abc-123/tool-result \\
  -d '{"toolCallId": "tc-xyz", "result": "done"}'
\`\`\`

## Mark session complete

\`\`\`bash
curl -X POST http://localhost:8787/api/sessions/abc-123/agent-done
\`\`\``,
  },
  {
    id: "policy",
    label: "Policy Rules",
    content: `# Policy Engine

Six rules fire on every tool call, each contributing a
weighted risk score. The composite score drives the decision.

## Risk Score Thresholds

| Score   | Decision          |
|---------|-------------------|
| < 30    | ALLOW             |
| 30 – 59 | REQUIRE_APPROVAL |
| >= 60   | BLOCK             |

## Rules

### isDestructive (risk: 40)
Detects delete, rm, drop, destroy, truncate, and dangerous
shell patterns like \`rm -rf\`, \`dd if=\`, \`mkfs\`.

### isBulkAction (risk: 25)
Catches _bulk/_all/batch tools, count > 10, SELECT *,
and large ID lists (> 10 items).

### touchesSensitiveData (risk: 30)
PII (SSN, credit cards), medical (HIPAA keywords),
financial (account numbers, wire transfers),
and sensitive file names.

### affectsExternalSystem (risk: 15-30)
send_email (30), post_webhook (25), upload_file (20),
post_slack (20), publish (25), external URLs (15).

### lacksRecentApproval (risk: 0)
Modifier flag — notes when no approvals exist in session.

### stopCommandActive (risk: 100)
User issued stop — instant max risk, blocks everything.

## Priority Overrides

1. Stop command → BLOCK (regardless of score)
2. Read-only + no sensitive data → ALLOW (cap score to 10)
3. Destructive + bulk → BLOCK (pattern match)
4. Sensitive + external → BLOCK (exfiltration)
5. Fall through to score thresholds`,
  },
];

function CodeBlock({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="space-y-1 text-sm font-mono leading-relaxed">
      {lines.map((line, i) => {
        if (line.startsWith("# ")) {
          return (
            <h2 key={i} className="text-xl font-sans font-bold text-white mt-6 mb-3 first:mt-0">
              {line.replace("# ", "")}
            </h2>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h3 key={i} className="text-base font-sans font-semibold text-[#d1d5db] mt-5 mb-2">
              {line.replace("## ", "")}
            </h3>
          );
        }
        if (line.startsWith("### ")) {
          return (
            <h4 key={i} className="text-sm font-sans font-semibold text-accent mt-4 mb-1">
              {line.replace("### ", "")}
            </h4>
          );
        }
        if (line.startsWith("```")) {
          return null;
        }
        if (line.startsWith("|")) {
          const cells = line.split("|").filter(Boolean).map((c) => c.trim());
          if (cells.every((c) => c.match(/^[-]+$/))) return null;
          return (
            <div key={i} className="flex gap-4 text-xs py-1">
              {cells.map((cell, j) => (
                <span
                  key={j}
                  className={j === 0 ? "w-20 text-[#fbbf24]" : "flex-1 text-[#9ca3af]"}
                >
                  {cell}
                </span>
              ))}
            </div>
          );
        }
        if (line.trim() === "") {
          return <div key={i} className="h-2" />;
        }
        // Inline code
        const parts = line.split(/(`[^`]+`)/);
        return (
          <div key={i} className="text-[#9ca3af] font-sans text-sm leading-relaxed">
            {parts.map((part, j) =>
              part.startsWith("`") && part.endsWith("`") ? (
                <code
                  key={j}
                  className="text-accent bg-accent/10 px-1.5 py-0.5 rounded text-xs font-mono"
                >
                  {part.slice(1, -1)}
                </code>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Docs() {
  const [activeTab, setActiveTab] = useState("quickstart");
  const activeContent = TABS.find((t) => t.id === activeTab)!;

  return (
    <section id="docs" className="relative py-32 px-6">
      <div className="section-divider mb-32" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm font-medium text-accent mb-3 tracking-wider uppercase">
            Documentation
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Integrate in <span className="text-gradient">30 seconds</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-[#9ca3af]">
            Zero runtime dependencies. Just HTTP calls to the Palisade worker.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="glass-card overflow-hidden">
            {/* macOS title bar */}
            <div className="flex items-center gap-2 px-5 py-3 bg-black/30 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="ml-3 text-xs text-[#6b7280] font-mono">
                docs &mdash; palisade
              </span>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/5">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 text-sm font-medium transition-all relative ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-[#6b7280] hover:text-[#9ca3af]"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="docs-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-8 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <CodeBlock content={activeContent.content} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
