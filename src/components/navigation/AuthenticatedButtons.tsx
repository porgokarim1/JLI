import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthenticatedButtons = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    console.log("Starting sign out process...");
    try {
      localStorage.clear();
      console.log("Local storage cleared");
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error during sign out:", error);
        navigate("/login");
        toast({
          title: "Sign Out Error",
          description: "There was an error signing out, but you've been logged out locally.",
          variant: "destructive",
        });
      } else {
        console.log("Sign out successful");
        toast({
          title: "Signed Out",
          description: "You have been successfully signed out.",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
      localStorage.clear();
      navigate("/login");
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try logging in again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="flex flex-col items-center justify-center h-16 px-2"
      onClick={handleSignOut}
    >
      <LogOut className="h-5 w-5 mb-1" />
      <span className="text-xs">Sign Out</span>
    </Button>
  );
};

export default AuthenticatedButtons;