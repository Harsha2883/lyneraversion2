
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function AuthDebug() {
  const [expanded, setExpanded] = useState(false);
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkSession = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.auth.getSession();
      setSessionInfo(data);
    } catch (error) {
      console.error("Error checking session:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  if (!expanded) {
    return (
      <div className="mt-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setExpanded(true)}
          className="flex items-center text-xs"
        >
          <ChevronDown className="w-3 h-3 mr-1" />
          Show Debug Tools
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-4 border rounded-md p-4 bg-muted/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Authentication Debug Tools</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setExpanded(false)}
          className="flex items-center text-xs"
        >
          <ChevronUp className="w-3 h-3 mr-1" />
          Hide
        </Button>
      </div>

      <div className="space-y-4">
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Authentication Issues?</AlertTitle>
          <AlertDescription className="text-xs">
            - Check if Supabase Site URL and Redirect URLs are configured correctly<br />
            - Ensure your user type matches the account type<br />
            - Try clearing browser storage if you're stuck
          </AlertDescription>
        </Alert>

        <div className="flex flex-wrap gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={checkSession}
            disabled={loading}
          >
            Check Current Session
          </Button>
          
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={clearLocalStorage}
            className="flex items-center"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Clear Browser Storage
          </Button>
        </div>

        {sessionInfo && (
          <div className="mt-2 p-2 bg-muted text-xs overflow-auto max-h-40 rounded border">
            <pre>{JSON.stringify(sessionInfo, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
