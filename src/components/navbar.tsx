
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { UserNav } from "./user-nav";

const routes = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "For Creators", path: "/creators" },
  { name: "For Learners", path: "/learners" },
  { name: "About", path: "/about" },
];

export function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {routes.map((route) => (
            <a
              key={route.path}
              href={route.path}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {route.name}
            </a>
          ))}
        </div>

        {/* Auth Buttons or User Nav */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuth ? (
            <UserNav />
          ) : (
            <>
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm">Sign Up</Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] sm:w-[350px] pt-10">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <Logo size="sm" />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setMenuOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-col space-y-6">
                  {routes.map((route) => (
                    <a
                      key={route.path}
                      href={route.path}
                      className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {route.name}
                    </a>
                  ))}
                </div>

                <div className="mt-auto pt-6 flex flex-col space-y-4">
                  <Button variant="outline" className="w-full" size="lg">
                    Sign In
                  </Button>
                  <Button className="w-full" size="lg">
                    Sign Up
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
