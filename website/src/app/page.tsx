import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Comparison } from "@/components/Comparison";
import { Metrics } from "@/components/Metrics";
import { Docs } from "@/components/Docs";
import { Waitlist } from "@/components/Waitlist";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Features />
      <Comparison />
      <Metrics />
      <Docs />
      <Waitlist />
      <Contact />
      <Footer />
    </main>
  );
}
