import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { UserNav } from "@/components/user-nav";
import { Logo } from "@/components/ui/logo";

export function Navbar() {
  const { profile, loading } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link to="/" className="flex items-center">
            <Logo size="md" variant="full" />
          </Link>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-between">
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Home
            </Link>
            <Link to="/marketplace" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Explore Courses
            </Link>
            <Link to="/pricing" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Pricing
            </Link>
            {profile && <Link to="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Dashboard
              </Link>}
          </nav>
          <div className="flex items-center gap-2">
            {!loading && !profile ? <>
                <Link to="/auth">
                  <Button variant="ghost" className="mr-2">Log in</Button>
                </Link>
                <Link to="/auth?tab=register">
                  <Button>Sign up</Button>
                </Link>
              </> : <UserNav />}
          </div>
        </div>
        <div className="flex md:hidden flex-1 justify-end">
          {mobileNavOpen ? <Button variant="ghost" onClick={() => setMobileNavOpen(false)}>
              <X className="h-6 w-6" />
            </Button> : <Button variant="ghost" onClick={() => setMobileNavOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>}
        </div>
      </div>
      {mobileNavOpen && <div className="md:hidden border-t p-4">
          <nav className="space-y-4">
            <Link to="/" className="block py-2" onClick={() => setMobileNavOpen(false)}>
              Home
            </Link>
            <Link to="/marketplace" className="block py-2" onClick={() => setMobileNavOpen(false)}>
              Explore Courses
            </Link>
            <Link to="/pricing" className="block py-2" onClick={() => setMobileNavOpen(false)}>
              Pricing
            </Link>
            {profile && <Link to="/dashboard" className="block py-2" onClick={() => setMobileNavOpen(false)}>
                Dashboard
              </Link>}
            {!loading && !profile ? <div className="flex flex-col gap-2 mt-4">
                <Link to="/auth" onClick={() => setMobileNavOpen(false)}>
                  <Button variant="outline" className="w-full">Log in</Button>
                </Link>
                <Link to="/auth?tab=register" onClick={() => setMobileNavOpen(false)}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div> : null}
          </nav>
        </div>}
    </header>
  );
}
