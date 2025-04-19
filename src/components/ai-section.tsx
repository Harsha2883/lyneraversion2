
import { AIChat } from "@/components/ai-chat";
import { Button } from "@/components/ui/button";
import { Brain, MessageSquare, Sparkles } from "lucide-react";

export function AISection() {
  const aiFeatures = [
    {
      title: "Interactive Learning",
      description: "Engage in natural conversations about sustainability topics with our AI assistant.",
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
    },
    {
      title: "Knowledge On Demand",
      description: "Get instant answers to your questions about ESG, climate regulations, and sustainability.",
      icon: <Brain className="h-5 w-5 text-primary" />,
    },
    {
      title: "Personalized Education",
      description: "The AI adapts to your knowledge level and learning pace for a customized experience.",
      icon: <Sparkles className="h-5 w-5 text-primary" />,
    },
  ];

  return (
    <section className="bg-secondary/30 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6">Learn Sustainability with AI</h2>
            <p className="text-muted-foreground mb-8 max-w-lg">
              Our conversational AI learning assistant helps you master sustainability concepts 
              through interactive dialogue. Ask questions, get explanations, and deepen your 
              understanding of ESG, carbon management, and climate regulations.
            </p>

            <div className="space-y-6 mb-8">
              {aiFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button className="rounded-full">Start AI Conversation</Button>
          </div>

          <div className="flex-1 w-full max-w-xl">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <AIChat />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
