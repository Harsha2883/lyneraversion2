
import React from 'react';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Chrome, Linkedin } from "lucide-react";

interface OAuthProviderProps {
  variant?: "login" | "signup";
}

export function OAuthProviders({ variant = "login" }: OAuthProviderProps) {
  const navigate = useNavigate();

  const handleOAuthLogin = async (provider: "google" | "linkedin_oidc") => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + "/dashboard",
          // Essential to pass query params to track provider and prevent redirect errors
          queryParams: provider === 'linkedin_oidc' ? {
            scope: 'openid profile email',
          } : undefined
        }
      });

      if (error) throw error;
    } catch (error: any) {
      toast.error(`OAuth ${provider} login failed: ${error.message}`);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <Button 
        variant="outline" 
        type="button" 
        onClick={() => handleOAuthLogin("google")}
        className="flex items-center gap-2"
      >
        <Chrome size={16} />
        {variant === "login" ? "Sign in" : "Sign up"} with Google
      </Button>
      <Button 
        variant="outline" 
        type="button" 
        onClick={() => handleOAuthLogin("linkedin_oidc")}
        className="flex items-center gap-2"
      >
        <Linkedin size={16} />
        {variant === "login" ? "Sign in" : "Sign up"} with LinkedIn
      </Button>
    </div>
  );
}
