
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
  const [initialized, setInitialized] = useState(false);
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
      // Setup auth listener FIRST before checking current session
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, currentSession) => {
          console.log("Auth state changed:", event, currentSession?.user?.id);
          
          if (!mounted) return;

          // Always update the session state
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          // Only handle profile fetching and navigation after initialization
          if (initialized) {
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
        }
      );

      return subscription;
    };

    // Initialize auth state
    const initializeAuth = async () => {
      try {
        // Setup auth listener first
        authListener = setupAuthListener();
        
        // Then get the initial session
        const { data } = await supabase.auth.getSession();
        const initialSession = data.session;
        
        if (mounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          
          if (initialSession?.user) {
            await fetchProfile(initialSession.user.id);
          }
          
          setLoading(false);
          setInitialized(true);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          setLoading(false);
          setInitialized(true);
          toast.error("Failed to initialize authentication");
        }
      }
    };

    // Set up auth
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
      // Let the auth listener handle state updates and navigation
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  return { user, profile, session, loading, signOut };
}
