
import { Button } from "@/components/ui/button";
import { GraduationCap, Leaf, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-secondary to-background">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-2 -right-14 w-36 h-36 rounded-full bg-accent/10 blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-40 h-40 rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="inline-block bg-accent/20 text-accent-foreground rounded-full px-4 py-1 text-sm font-medium mb-4">
              Learn on the go
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Your Learning Companion for a
              <span className="text-primary block">Sustainable Life</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Connect with expert creators and learn sustainable practices, ESG compliance, 
              and climate regulations through our energy-efficient, AI-powered platform.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button size="lg" className="rounded-full">
                Start Learning
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                For Creators
              </Button>
            </div>

            <div className="flex items-center gap-8 justify-center lg:justify-start pt-6">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Sustainable Approach</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Expert Content</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">AI Powered</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="aspect-square max-w-lg mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-xl"></div>
              <img 
                src="/placeholder.svg" 
                alt="Lynera.ai Learning Platform" 
                className="relative z-10 rounded-xl object-cover shadow-xl"
              />
              <div className="absolute -right-6 -bottom-6 bg-background rounded-lg shadow-lg p-4 z-20">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">AI-Powered</p>
                    <p className="text-xs text-muted-foreground">Conversational Learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
