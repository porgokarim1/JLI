import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Library, LogOut, User } from "lucide-react";
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
    <>
      <Button
        variant="ghost"
        className="text-gray-700 hover:text-primary hover:bg-gray-50 inline-flex items-center"
        onClick={() => navigate("/lessons")}
      >
        <BookOpen className="h-5 w-5 mr-2" />
        Lessons
      </Button>
      <Button
        variant="ghost"
        className="text-gray-700 hover:text-primary hover:bg-gray-50 inline-flex items-center"
        onClick={() => navigate("/engagement")}
      >
        <Users className="h-5 w-5 mr-2" />
        Engagement
      </Button>
      <Button
        variant="ghost"
        className="text-gray-700 hover:text-primary hover:bg-gray-50 inline-flex items-center"
        onClick={() => navigate("/study-materials")}
      >
        <Library className="h-5 w-5 mr-2" />
        Resources
      </Button>
      <Button
        variant="ghost"
        className="text-gray-700 hover:text-primary hover:bg-gray-50 inline-flex items-center"
        onClick={() => navigate("/profile")}
      >
        <User className="h-5 w-5 mr-2" />
        Profile
      </Button>
      <Button
        variant="outline"
        className="inline-flex items-center"
        onClick={handleSignOut}
      >
        <LogOut className="h-5 w-5 mr-2" />
        Sign Out
      </Button>
    </>
  );
};

export default AuthenticatedButtons;