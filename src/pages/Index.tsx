
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { CoursesSection } from "@/components/courses-section";
import { PublicLayout } from "@/components/layouts/PublicLayout";

export default function Index() {
  return (
    <PublicLayout>
      <main>
        <HeroSection />
        <FeaturesSection />
        <CoursesSection />
      </main>
    </PublicLayout>
  );
}
