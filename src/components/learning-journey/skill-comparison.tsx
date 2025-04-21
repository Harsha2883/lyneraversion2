
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillComparisonData } from "@/components/learning-journey/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface SkillComparisonProps {
  data: SkillComparisonData;
}

export function SkillComparison({ data }: SkillComparisonProps) {
  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>International Skill Comparison</CardTitle>
          <CardDescription>
            Your skills compared to others with similar professional backgrounds in the international market
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <p className="text-sm">
              This skill chart is developed based on comparative analysis of others with similar professional background, 
              age, and industry sector. It helps you understand your capabilities in the international market.
            </p>
          </div>
          
          <Tabs defaultValue="radar" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="radar">Radar View</TabsTrigger>
              <TabsTrigger value="bar">Bar Comparison</TabsTrigger>
            </TabsList>
            
            <TabsContent value="radar" className="pt-4">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={150} data={data.skills}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Your Skills"
                      dataKey="userScore"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.5}
                    />
                    <Radar
                      name="Industry Average"
                      dataKey="industryAverage"
                      stroke="#4ade80"
                      fill="#4ade80"
                      fillOpacity={0.3}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="bar" className="pt-4">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.skills}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar name="Your Skills" dataKey="userScore" fill="#8b5cf6" />
                    <Bar name="Industry Average" dataKey="industryAverage" fill="#4ade80" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">Your Strengths</h3>
              <ul className="space-y-2">
                {data.strengths.map((strength, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">Areas to Improve</h3>
              <ul className="space-y-2">
                {data.areasToImprove.map((area, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
