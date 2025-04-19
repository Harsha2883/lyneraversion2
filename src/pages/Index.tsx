
import { AISection } from "@/components/ai-section";
import { CourseCategories } from "@/components/course-categories";
import { CoursesSection } from "@/components/courses-section";
import { FeaturesSection } from "@/components/features-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { Navbar } from "@/components/navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CourseCategories />
        <CoursesSection />
        <AISection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
