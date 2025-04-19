
import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface Profile {
  id: string;
  user_type: "learner" | "creator" | "admin";
  first_name: string | null;
  last_name: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      
      if (error) throw error;
      if (profile) {
        setProfile(profile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load user profile");
    }
  };

  useEffect(() => {
    let mounted = true;
    let authListener: any;

    const setupAuthListener = () => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, currentSession) => {
          console.log("Auth state changed:", event, currentSession?.user?.id);
          
          if (!mounted) return;

          if (event === 'TOKEN_REFRESHED') {
            // Just update the session without any redirects
            setSession(currentSession);
            setUser(currentSession?.user ?? null);
            return;
          }

          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          if (currentSession?.user) {
            // Use setTimeout to prevent Supabase deadlocks
            setTimeout(() => {
              if (mounted) fetchProfile(currentSession.user.id);
            }, 0);
          } else {
            setProfile(null);
          }

          // Only navigate on explicit sign in/out events
          if (event === 'SIGNED_IN') {
            toast.success("Successfully signed in!");
            navigate("/dashboard");
          } else if (event === 'SIGNED_OUT') {
            toast.success("Successfully signed out!");
            navigate("/auth");
          }
        }
      );

      return subscription;
    };

    // Initialize auth state
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (mounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          
          if (initialSession?.user) {
            await fetchProfile(initialSession.user.id);
          }
          
          setLoading(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          setLoading(false);
          toast.error("Failed to initialize authentication");
        }
      }
    };

    // Set up auth
    authListener = setupAuthListener();
    initializeAuth();

    // Cleanup
    return () => {
      mounted = false;
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, [navigate]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  return { user, profile, session, loading, signOut };
}
