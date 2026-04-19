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
import { SectionConnector } from "@/components/shared/SectionConnector";
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
        <SectionConnector />
        <WhyNexus />
        <SectionConnector />
        <Ecosystem />
        <SectionConnector />
        <EnglishCourses />
        <SectionConnector />
        <Opportunities />
        <SectionConnector />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  );
}
