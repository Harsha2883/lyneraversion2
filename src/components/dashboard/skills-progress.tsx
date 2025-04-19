
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LightbulbIcon } from "lucide-react";

export function SkillsProgress() {
  // Mocked data for demonstration
  const skills = [
    { 
      name: "ESG Knowledge", 
      value: 75,
      color: "#8b5cf6" // Purple
    },
    { 
      name: "Carbon Management", 
      value: 65,
      color: "#4ade80" // Green
    },
    { 
      name: "Sustainable Business", 
      value: 82,
      color: "#0ea5e9" // Blue
    },
    { 
      name: "Climate Regulations", 
      value: 58,
      color: "#f97316" // Orange
    },
  ];

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Your Skills</CardTitle>
        <LightbulbIcon className="h-4 w-4 text-yellow-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{skill.name}</div>
                <div className="text-sm text-muted-foreground">{skill.value}%</div>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div 
                  className="h-full rounded-full" 
                  style={{ 
                    width: `${skill.value}%`, 
                    backgroundColor: skill.color 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
