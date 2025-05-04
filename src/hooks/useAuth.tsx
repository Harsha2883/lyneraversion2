
import { useEffect, useState, createContext, useContext, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface Profile {
  id: string;
  user_type: "learner" | "creator" | "admin";
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  gender: string | null;
  birthdate: string | null;
  profession: string | null;
  education: string | null;
  aspiration: string | null;
  social_media: any;
  created_at?: string;
  updated_at?: string;
  average_rating?: number;
  total_reviews?: number;
}

export interface SubscriptionInfo {
  subscribed: boolean;
  subscription_tier?: string;
  subscription_end?: string;
  subscription_id?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  subscription: SubscriptionInfo | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<Profile | null>;
  checkSubscription: () => Promise<SubscriptionInfo | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async (userId: string) => {
    try {
      if (!userId) {
        console.error("Invalid user ID provided to fetchProfile");
        return null;
      }
      
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      
      if (error) {
        console.error("Error in fetchProfile:", error);
        throw error;
      }
      
      if (profile) {
        setProfile(profile);
        return profile;
      } else {
        console.warn("No profile found for user:", userId);
        return null;
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load user profile");
      return null;
    }
  };

  const checkSubscription = async (): Promise<SubscriptionInfo | null> => {
    if (!user || !session) {
      console.warn("Cannot check subscription: No authenticated user");
      return null;
    }

    try {
      console.log("Checking subscription status for user:", user.id);
      
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
        body: {
          email: user.email,
          userId: user.id
        }
      });
      
      if (error) {
        console.error("Error checking subscription:", error);
        throw new Error(error.message);
      }
      
      setSubscription(data);
      return data;
    } catch (error) {
      console.error("Error checking subscription:", error);
      return null;
    }
  };

  const refreshProfile = async () => {
    if (user) {
      console.log("Refreshing profile for user:", user.id);
      return await fetchProfile(user.id);
    } else {
      console.warn("Cannot refresh profile: No user is signed in");
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;
    let authListener: any;

    const setupAuthListener = () => {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, currentSession) => {
          console.log("Auth state changed:", event, currentSession?.user?.id);
          
          if (!mounted) return;

          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          if (initialized) {
            if (currentSession?.user) {
              setTimeout(() => {
                if (mounted) {
                  fetchProfile(currentSession.user.id);
                  checkSubscription();
                }
              }, 0);
            } else {
              setProfile(null);
              setSubscription(null);
            }

            if (event === 'SIGNED_IN') {
              toast.success("Successfully signed in!");
              const redirectPath = localStorage.getItem("redirectAfterAuth");
              if (redirectPath) {
                localStorage.removeItem("redirectAfterAuth");
                navigate(redirectPath);
              } else {
                navigate("/dashboard");
              }
            } else if (event === 'SIGNED_OUT') {
              toast.success("Successfully signed out!");
              navigate("/auth");
            }
          }
        }
      );

      return subscription;
    };

    const initializeAuth = async () => {
      try {
        authListener = setupAuthListener();
        
        const { data } = await supabase.auth.getSession();
        const initialSession = data.session;
        
        console.log("Initial auth session:", initialSession?.user?.id ? "User signed in" : "No user");
        
        if (mounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          
          if (initialSession?.user) {
            await fetchProfile(initialSession.user.id);
            await checkSubscription();
          } else {
            console.log("No active session found during initialization");
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

    initializeAuth();

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
      setProfile(null);
      setSubscription(null);
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      profile, 
      subscription,
      loading, 
      signOut, 
      refreshProfile,
      checkSubscription
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
