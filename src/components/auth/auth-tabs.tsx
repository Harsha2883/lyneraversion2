
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { useAuth } from "@/hooks/useAuth";

export function AuthTabs() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  
  // Default to "login" tab unless "register" is specified
  const defaultTab = tabParam === "register" ? "register" : "login";
  
  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (user && profile) {
      navigate("/dashboard");
    }
  }, [user, profile, navigate]);
  
  return (
    <Tabs defaultValue={defaultTab} className="w-full max-w-md mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="mt-6">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register" className="mt-6">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
}
