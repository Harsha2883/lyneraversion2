
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export function LoginForm() {
  const [userType, setUserType] = useState<"learner" | "creator" | "admin">("learner");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in to Lynera.ai</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <RadioGroup 
            defaultValue="learner" 
            className="flex space-x-2"
            onValueChange={(value) => setUserType(value as "learner" | "creator" | "admin")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="learner" id="learner" />
              <Label htmlFor="learner">Learner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="creator" id="creator" />
              <Label htmlFor="creator">Creator</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="admin" id="admin" />
              <Label htmlFor="admin">Admin</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="your@email.com" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-xs text-primary hover:underline">
              Forgot password?
            </a>
          </div>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sign In</Button>
      </CardFooter>
    </Card>
  );
}
