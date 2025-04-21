
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LearningCurveData } from "@/components/learning-journey/types";

interface LearningCurveProps {
  data: LearningCurveData[];
}

export function LearningCurve({ data }: LearningCurveProps) {
  // Calculate average score for the summary
  const averageScore = data.reduce((sum, item) => sum + item.score, 0) / data.length;
  
  // Find improvement trend
  const firstScore = data[0]?.score || 0;
  const lastScore = data[data.length - 1]?.score || 0;
  const improvement = lastScore - firstScore;
  
  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Learning Performance</CardTitle>
          <CardDescription>Your progress over time across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-primary/10 rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Average Score</div>
              <div className="text-2xl font-bold mt-1">{averageScore.toFixed(1)}%</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Improvement</div>
              <div className="text-2xl font-bold mt-1" style={{ color: improvement >= 0 ? '#22c55e' : '#ef4444' }}>
                {improvement > 0 ? '+' : ''}{improvement.toFixed(1)}%
              </div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Courses Tracked</div>
              <div className="text-2xl font-bold mt-1">{data.length}</div>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: 'none' }}
                  formatter={(value) => [`${value}%`, 'Score']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Your learning curve shows your performance scores over time. Higher scores indicate better understanding and retention of course materials.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
