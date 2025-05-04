
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [loginDebug, setLoginDebug] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Debug info display
  useEffect(() => {
    if (loginDebug) {
      console.log("Login debug info:", loginDebug);
    }
  }, [loginDebug]);

  // Get redirect path from location state, query param, or localStorage
  const getRedirectPath = () => {
    console.log("Getting redirect path");
    
    // Check URL parameters for redirect
    const searchParams = new URLSearchParams(location.search);
    const urlRedirect = searchParams.get("redirect");
    if (urlRedirect) {
      console.log("Found URL redirect:", urlRedirect);
      return urlRedirect;
    }
    
    // Check for stored redirect in localStorage
    const storedRedirect = localStorage.getItem("redirectAfterAuth");
    if (storedRedirect) {
      console.log("Found stored redirect:", storedRedirect);
      localStorage.removeItem("redirectAfterAuth");
      return storedRedirect;
    }
    
    // Default to dashboard if no redirect is specified
    console.log("No redirect specified, defaulting to /dashboard");
    return "/dashboard";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginDebug(null);

    try {
      console.log(`Attempting login with email: ${email} and user type: ${userType}`);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Authentication error:", error);
        setLoginDebug(`Auth error: ${error.message}`);
        throw error;
      }

      console.log("Authentication successful, fetching profile data");
      
      // Fetch the user's profile to confirm user type
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('user_type, first_name, last_name')
        .eq('id', data.user?.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        setLoginDebug(`Profile error: ${profileError.message}`);
        throw profileError;
      }

      console.log("Profile data:", profileData);

      // Check if the logged-in user type matches the selected type
      if (profileData.user_type !== userType) {
        setLoginDebug(`User type mismatch: Selected ${userType}, account is ${profileData.user_type}`);
        console.error(`User type mismatch: Selected ${userType}, account is ${profileData.user_type}`);
        
        await supabase.auth.signOut();
        toast.error(`Please log in as a ${profileData.user_type}`);
        setLoading(false);
        return;
      }

      // All checks passed, proceed with redirect
      const redirectPath = getRedirectPath();
      console.log("Login successful, redirecting to:", redirectPath);
      
      toast.success(`Welcome back${profileData.first_name ? ', ' + profileData.first_name : ''}!`);
      navigate(redirectPath);
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

          {loginDebug && (
            <div className="p-2 bg-amber-50 border border-amber-200 rounded text-amber-900 text-sm">
              Debug info: {loginDebug}
            </div>
          )}

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
