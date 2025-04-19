
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export function RegisterForm() {
  const [userType, setUserType] = useState<"learner" | "creator">("learner");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Join Lynera.ai to access sustainable learning resources
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <RadioGroup 
            defaultValue="learner" 
            className="flex space-x-4"
            onValueChange={(value) => setUserType(value as "learner" | "creator")}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="learner" id="r-learner" />
              <Label htmlFor="r-learner">Join as Learner</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="creator" id="r-creator" />
              <Label htmlFor="r-creator">Join as Creator</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="your@email.com" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" />
        </div>

        {userType === "creator" && (
          <div className="space-y-2">
            <Label htmlFor="expertise">Area of Expertise</Label>
            <Input id="expertise" placeholder="e.g., ESG Reporting, Carbon Management" />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm">
            I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create Account</Button>
      </CardFooter>
    </Card>
  );
}
