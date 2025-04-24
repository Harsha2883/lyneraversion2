
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

export function CarbonSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Carbon Calculation Settings</CardTitle>
          <CardDescription>
            Configure how carbon footprint is calculated and displayed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-md font-medium">General Settings</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-carbon-tracking" className="font-medium">
                  Enable Carbon Tracking
                </Label>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Track carbon footprint for all users
                </p>
              </div>
              <Switch id="enable-carbon-tracking" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-carbon-badges" className="font-medium">
                  Display Carbon Badges
                </Label>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Show carbon offset badges on user profiles
                </p>
              </div>
              <Switch id="show-carbon-badges" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-calculate" className="font-medium">
                  Automatic Calculation
                </Label>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Calculate carbon footprint automatically for users
                </p>
              </div>
              <Switch id="auto-calculate" defaultChecked />
            </div>
          </div>
          
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-md font-medium">Emission Factors</h3>
            <p className="text-sm text-muted-foreground">
              Configure the emission factors used in calculations
            </p>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="online-factor" className="text-sm">
                  Online Learning (kg CO₂/hour)
                </Label>
                <Input id="online-factor" type="number" defaultValue="0.08" step="0.01" min="0" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="video-factor" className="text-sm">
                  Video Streaming (kg CO₂/hour)
                </Label>
                <Input id="video-factor" type="number" defaultValue="0.12" step="0.01" min="0" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="data-factor" className="text-sm">
                  Data Transfer (kg CO₂/GB)
                </Label>
                <Input id="data-factor" type="number" defaultValue="0.06" step="0.01" min="0" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="device-factor" className="text-sm">
                  Device Usage (kg CO₂/hour)
                </Label>
                <Input id="device-factor" type="number" defaultValue="0.04" step="0.01" min="0" />
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-md font-medium">Offset Settings</h3>
            
            <div className="space-y-2">
              <Label htmlFor="token-offset-rate" className="text-sm">
                Token to Offset Conversion (kg CO₂/token)
              </Label>
              <Input id="token-offset-rate" type="number" defaultValue="0.5" step="0.1" min="0" />
              <p className="text-xs text-muted-foreground mt-1">
                How much carbon offset is generated per educational token earned
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enable-auto-offset" className="font-medium">
                  Enable Automatic Offsetting
                </Label>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Automatically convert tokens to carbon offsets
                </p>
              </div>
              <Switch id="enable-auto-offset" defaultChecked />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto gap-2">
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
