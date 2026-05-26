"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <section id="waitlist" className="relative py-32 px-6">
      <div className="section-divider mb-32" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <AnimatedSection>
          <p className="text-sm font-medium text-accent mb-3 tracking-wider uppercase">
            Early Access
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Get on the <span className="text-gradient">waitlist</span>
          </h2>
          <p className="text-lg text-[#9ca3af] mb-10">
            Be among the first to try Palisade when we launch the hosted
            platform. Open-source self-hosted is available now.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-md flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="flex-1 px-5 py-3.5 rounded-full glass text-sm text-white placeholder:text-[#6b7280] outline-none focus:border-accent/40 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-8 py-3.5 rounded-full bg-accent text-sm font-semibold text-black hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === "loading" ? "Joining..." : "Join Waitlist"}
            </button>
          </form>

          <AnimatePresence>
            {(status === "success" || status === "error") && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-4 text-sm ${
                  status === "success" ? "text-accent" : "text-red-400"
                }`}
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>

          <p className="mt-6 text-xs text-[#4b5563]">
            No spam. Unsubscribe anytime. Open source at{" "}
            <a href="#" className="text-[#6b7280] hover:text-white transition-colors underline underline-offset-2">
              github.com/palisade
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
