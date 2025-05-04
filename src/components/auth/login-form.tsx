
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { OAuthProviders } from "./oauth-providers";

export function LoginForm() {
  const [userType, setUserType] = useState<"learner" | "creator">("learner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Fetch the user's profile to confirm user type
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', data.user?.id)
        .single();

      if (profileError) throw profileError;

      // Check if the logged-in user type matches the selected type
      if (profileData.user_type !== userType) {
        await supabase.auth.signOut();
        toast.error(`Please log in as a ${profileData.user_type}`);
        return;
      }

      console.log("Login successful, redirecting to pricing page");
      navigate("/pricing");
      toast.success("Successfully logged in!");
    } catch (error: any) {
      toast.error(error.message);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Sign in to Lynera.ai</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <RadioGroup 
              value={userType}
              className="flex space-x-2"
              onValueChange={(value) => setUserType(value as "learner" | "creator")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="learner" id="learner" />
                <Label htmlFor="learner">Learner</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="creator" id="creator" />
                <Label htmlFor="creator">Creator</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-xs text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <OAuthProviders variant="login" />
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
