import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Comparison } from "@/components/Comparison";
import { Metrics } from "@/components/Metrics";
import { Docs } from "@/components/Docs";
import { Waitlist } from "@/components/Waitlist";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AnimatedDivider } from "@/components/AnimatedSection";

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <AnimatedDivider className="py-2" />
      <Features />
      <AnimatedDivider className="py-2" />
      <Comparison />
      <AnimatedDivider className="py-2" />
      <Metrics />
      <AnimatedDivider className="py-2" />
      <Docs />
      <AnimatedDivider className="py-2" />
      <Waitlist />
      <AnimatedDivider className="py-2" />
      <Contact />
      <Footer />
    </main>
  );
}
