
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

export function CarbonFootprint() {
  // Mocked data for demonstration
  const data = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 35 },
    { name: "Mar", value: 30 },
    { name: "Apr", value: 25 },
    { name: "May", value: 20 },
    { name: "Jun", value: 18 },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
        <Leaf className="h-4 w-4 text-green-500" />
      </CardHeader>
      <CardContent>
        <div>
          <div className="text-2xl font-bold">-22%</div>
          <div className="text-xs text-muted-foreground mb-3">
            Reduced from last month
          </div>
        </div>
        <div className="h-[90px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <XAxis 
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10 }}
                tickMargin={5}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 10 }}
                tickMargin={5}
                hide
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#4ade80"
                fill="#4ade8050"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
