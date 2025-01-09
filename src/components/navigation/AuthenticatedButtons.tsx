import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthenticatedButtons = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
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