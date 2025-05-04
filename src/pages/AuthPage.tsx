
import { AuthTabs } from "@/components/auth/auth-tabs";
import { Logo } from "@/components/ui/logo";
import { Earth, Leaf, Recycle } from "lucide-react";

const AuthPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side - Auth Form */}
      <div className="flex flex-col justify-center items-center p-8 md:p-12">
        <div className="w-full max-w-md mb-8">
          <div className="mb-8 text-center">
            <div className="mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Welcome to Lynera.ai</h1>
            <p className="text-muted-foreground">
              Your learning companion for a sustainable life
            </p>
          </div>
          
          <AuthTabs />
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden md:flex bg-gradient-to-br from-primary/10 to-accent/10 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 opacity-5">
            <Leaf className="h-96 w-96 text-primary" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 opacity-5">
            <Earth className="h-72 w-72 text-primary" />
          </div>
          <div className="absolute top-3/4 left-1/2 opacity-5">
            <Recycle className="h-48 w-48 text-primary" />
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Learn Sustainability On The Go</h2>
          <p className="text-lg max-w-md mb-8">
            Join thousands of learners and creators focused on building a more sustainable future through education.
          </p>
          
          <div className="grid grid-cols-3 gap-8 max-w-md">
            <div className="text-center">
              <div className="font-bold text-3xl text-primary mb-2">250+</div>
              <div className="text-sm text-muted-foreground">Sustainability Courses</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-3xl text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Expert Creators</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-3xl text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Active Learners</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
