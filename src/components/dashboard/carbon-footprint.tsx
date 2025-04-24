
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Car, Plane, Smartphone, Lightbulb, DownloadCloud, MonitorSmartphone } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";

export function CarbonFootprint() {
  const data = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 35 },
    { name: "Mar", value: 30 },
    { name: "Apr", value: 25 },
    { name: "May", value: 20 },
    { name: "Jun", value: 18 },
  ];

  const offsetProjects = [
    {
      id: 1,
      title: "Amazonia Reforestation Initiative",
      description: "Reforestation project in the Amazon rainforest, focusing on native species and biodiversity preservation.",
      price: "$15/ton",
      rating: 4.8,
      tag: "reforestation",
      imageUrl: "placeholder.svg"
    },
    {
      id: 2,
      title: "Solar Energy for Rural Communities",
      description: "Provides solar panels to rural communities, replacing fossil fuel generators and kerosene lamps.",
      price: "$18/ton",
      rating: 4.6,
      tag: "renewable",
      imageUrl: "placeholder.svg"
    },
    {
      id: 3,
      title: "Coral Reef Conservation Program",
      description: "Protection and restoration of coral reefs, which are vital carbon sinks and marine habitats.",
      price: "$22/ton",
      rating: 4.7,
      tag: "conservation",
      imageUrl: "placeholder.svg"
    }
  ];

  const tips = [
    {
      title: "Lower screen brightness",
      description: "Reducing screen brightness by 30% can save significant energy during long learning sessions.",
      icon: MonitorSmartphone
    },
    {
      title: "Download content for offline use",
      description: "Streaming uses more energy than viewing downloaded content, especially on mobile networks.",
      icon: DownloadCloud
    },
    {
      title: "Use low-power mode",
      description: "Enable your device's power-saving features during long study sessions to reduce energy consumption.",
      icon: Lightbulb
    }
  ];

  return (
    <div className="space-y-6">
      <section className="bg-green-50/50 rounded-lg p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-2">
          <Leaf className="h-5 w-5 text-green-500" />
          Your Sustainability Impact
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Summary of your environmental impact through sustainable learning
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Total CO2 Saved</div>
              <div className="text-2xl font-bold text-green-600">45.35kg</div>
              <div className="text-xs text-muted-foreground">Compared to traditional in-person learning</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Water Saved</div>
              <div className="text-2xl font-bold text-blue-600">285 L</div>
              <div className="text-xs text-muted-foreground">By not traveling to physical classrooms</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Your CO2 Footprint</div>
              <div className="text-2xl font-bold text-amber-600">1.35kg</div>
              <div className="text-xs text-muted-foreground">Total from your online learning activities</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Efficiency Ratio</div>
              <div className="text-2xl font-bold text-purple-600">97%</div>
              <div className="text-xs text-muted-foreground">CO2 reduction compared to in-person learning</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
            <Car className="h-5 w-5 text-gray-500" />
            <div>
              <div className="text-sm font-medium">378 km</div>
              <div className="text-xs text-muted-foreground">Car travel avoided</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
            <Plane className="h-5 w-5 text-gray-500" />
            <div>
              <div className="text-sm font-medium">504 km</div>
              <div className="text-xs text-muted-foreground">Flight distance equivalent</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
            <Smartphone className="h-5 w-5 text-gray-500" />
            <div>
              <div className="text-sm font-medium">3023 charges</div>
              <div className="text-xs text-muted-foreground">Smartphone charges equivalent</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-lg p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Leaf className="h-5 w-5 text-green-500" />
          Carbon Footprint by Course
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Detailed analysis of your environmental impact for each course
        </p>

        {/* Course impact cards would go here */}
      </section>

      <section className="bg-white rounded-lg p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-2">
          <Leaf className="h-5 w-5 text-green-500" />
          Offset Your Carbon Footprint
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Contribute to environmental projects to neutralize your remaining carbon impact
        </p>

        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium mb-1">Lynera.ai is already carbon-efficient</h3>
          <p className="text-sm text-muted-foreground">
            While your online learning has a minimal carbon footprint compared to traditional methods, you can offset your remaining impact by supporting these verified projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offsetProjects.map((project) => (
            <Card key={project.id}>
              <div className="aspect-video relative">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm">
                  {project.price}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    {/* Star rating */}
                    <span className="text-sm font-medium ml-1">{project.rating}</span>
                  </div>
                  <span className="text-sm text-green-600">{project.tag}</span>
                </div>
                <Button className="w-full" variant="default">
                  Contribute
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-green-50/50 rounded-lg p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Leaf className="h-5 w-5 text-green-500" />
          Sustainability Learning Tips
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-lg p-4">
              <div className="flex items-start gap-3">
                <tip.icon className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h3 className="font-medium mb-1">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
