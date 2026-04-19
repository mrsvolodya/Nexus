import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyNexus } from "@/components/sections/WhyNexus";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Opportunities } from "@/components/sections/Opportunities";
import { ApplicationForm } from "@/components/sections/ApplicationForm";
import { MouseGlow } from "@/components/effects/MouseGlow";

export default function HomePage() {
  return (
    <>
      <MouseGlow />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <Services />
        <WhyNexus />
        <Ecosystem />
        <Opportunities />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  );
}
