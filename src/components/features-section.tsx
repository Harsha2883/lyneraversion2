
import { FeatureCard } from "@/components/feature-card";
import { Brain, Earth, GraduationCap, Leaf, Recycle, ShieldCheck, Users, Globe } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Sustainability Focused",
      description: "Learn about environmental sustainability, ESG practices, and climate regulations from experts.",
      icon: Earth,
    },
    {
      title: "AI Learning Assistant",
      description: "Get personalized learning with our conversational AI that adapts to your knowledge level.",
      icon: Brain,
    },
    {
      title: "Expert Creators",
      description: "Connect with verified sustainability experts who curate high-quality educational content.",
      icon: GraduationCap,
    },
    {
      title: "Community Driven",
      description: "Join a community of learners and creators passionate about building a sustainable future.",
      icon: Users,
    },
    {
      title: "Carbon Conscious",
      description: "Our platform is designed to be energy-efficient, minimizing digital carbon footprint.",
      icon: Leaf,
    },
    {
      title: "ESG Compliance",
      description: "Stay up-to-date with the latest ESG requirements and compliance guidelines.",
      icon: ShieldCheck,
    },
    {
      title: "Global Perspective",
      description: "Access knowledge from around the world on sustainable development practices.",
      icon: Globe,
    },
    {
      title: "Practical Application",
      description: "Learn skills you can apply immediately to make your life and work more sustainable.",
      icon: Recycle,
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Choose Lynera.ai</h2>
        <p className="text-muted-foreground">
          Our platform is designed from the ground up to make sustainability learning accessible, 
          effective, and environmentally conscious.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  );
}
