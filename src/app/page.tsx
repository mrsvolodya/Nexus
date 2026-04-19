import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Services } from "@/components/sections/Services";
import { WhyNexus } from "@/components/sections/WhyNexus";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { EnglishCourses } from "@/components/sections/EnglishCourses";
import { Opportunities } from "@/components/sections/Opportunities";
import { ApplicationForm } from "@/components/sections/ApplicationForm";
import { CursorGlow } from "@/components/shared/CursorGlow";
import { ScrollProgress } from "@/components/motion";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <TechMarquee />
        <Services />
        <WhyNexus />
        <Ecosystem />
        <EnglishCourses />
        <Opportunities />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  );
}
