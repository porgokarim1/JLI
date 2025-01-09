import { Button } from "@/components/ui/button";
import { LogOut, User, BookOpen, MessageSquare, Home } from "lucide-react";
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
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        className="text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
        onClick={() => navigate("/")}
      >
        <Home className="h-5 w-5 mr-2" />
        Home
      </Button>
      <Button
        variant="ghost"
        className="text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
        onClick={() => navigate("/engagement")}
      >
        <MessageSquare className="h-5 w-5 mr-2" />
        Engagement
      </Button>
      <Button
        variant="ghost"
        className="text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
        onClick={() => navigate("/lessons")}
      >
        <BookOpen className="h-5 w-5 mr-2" />
        Lessons
      </Button>
      <Button
        variant="ghost"
        className="text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
        onClick={() => navigate("/profile")}
      >
        <User className="h-5 w-5 mr-2" />
        Profile
      </Button>
      <Button
        variant="outline"
        className="flex items-center text-black"
        onClick={handleSignOut}
      >
        <LogOut className="h-5 w-5 mr-2" />
        Sign Out
      </Button>
    </div>
  );
};

export default AuthenticatedButtons;