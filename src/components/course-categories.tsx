
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BookOpen, Briefcase, Building, Factory, Leaf, Recycle, ShieldCheck, Globe } from "lucide-react";

interface CategoryCardProps {
  name: string;
  icon: React.ReactNode;
  count: number;
  className?: string;
}

function CategoryCard({ name, icon, count, className }: CategoryCardProps) {
  return (
    <Card className={cn("hover:shadow-md transition-all cursor-pointer overflow-hidden group relative", className)}>
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <h3 className="font-medium mb-1">{name}</h3>
        <p className="text-xs text-muted-foreground">{count} courses</p>
        
        <div className="absolute inset-0 flex items-center justify-center bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="sm">
            Explore
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function CourseCategories() {
  const categories = [
    {
      name: "ESG Compliance",
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      count: 42,
      className: "bg-gradient-to-br from-background to-primary/5",
    },
    {
      name: "Sustainable Business",
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      count: 38,
      className: "bg-gradient-to-br from-background to-accent/5",
    },
    {
      name: "Climate Regulations",
      icon: <Globe className="h-6 w-6 text-primary" />,
      count: 29,
      className: "bg-gradient-to-br from-background to-primary/5",
    },
    {
      name: "Carbon Management",
      icon: <Leaf className="h-6 w-6 text-primary" />,
      count: 31,
      className: "bg-gradient-to-br from-background to-accent/5",
    },
    {
      name: "CSR Practices",
      icon: <Building className="h-6 w-6 text-primary" />,
      count: 24,
      className: "bg-gradient-to-br from-background to-primary/5",
    },
    {
      name: "Circular Economy",
      icon: <Recycle className="h-6 w-6 text-primary" />,
      count: 27,
      className: "bg-gradient-to-br from-background to-accent/5",
    },
    {
      name: "Green Manufacturing",
      icon: <Factory className="h-6 w-6 text-primary" />,
      count: 18,
      className: "bg-gradient-to-br from-background to-primary/5",
    },
    {
      name: "Sustainability Basics",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      count: 45,
      className: "bg-gradient-to-br from-background to-accent/5",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 bg-secondary/50">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">Explore Course Categories</h2>
        <p className="text-muted-foreground">
          Browse our diverse collection of sustainability topics and find the perfect courses to enhance your knowledge.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            name={category.name}
            icon={category.icon}
            count={category.count}
            className={category.className}
          />
        ))}
      </div>
    </section>
  );
}
