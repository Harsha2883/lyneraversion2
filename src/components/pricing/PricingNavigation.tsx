
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Laptop, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export function PricingNavigation() {
  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container flex h-16 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-9">
                <Laptop className="w-4 h-4 mr-2" />
                Learner Plans
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li className="row-span-3">
                    <a
                      href="#learner-plans"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Start Learning Today
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Choose from our flexible learning plans designed to fit your needs
                      </p>
                    </a>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="h-9">
                <Users className="w-4 h-4 mr-2" />
                Creator Plans
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li className="row-span-3">
                    <a
                      href="#creator-plans"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Start Creating Today
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Choose from our creator plans to start sharing your knowledge
                      </p>
                    </a>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-4">
          <Link 
            to="#billing-toggle" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Switch Billing
          </Link>
          <Link 
            to="#faq" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            FAQ
          </Link>
        </div>
      </nav>
    </div>
  );
}
