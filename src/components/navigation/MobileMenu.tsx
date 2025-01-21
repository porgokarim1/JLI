import { Button } from "@/components/ui/button";
import { LogOut, User, LogIn, UserPlus, Library, MessageSquare, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MobileMenuProps {
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({ setIsOpen }: MobileMenuProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
      setIsOpen(false);
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
          className="w-full text-left text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
          onClick={() => {
            navigate("/lessons");
            setIsOpen(false);
          }}
        >
          <BookOpen className="h-5 w-5 mr-2" />
          Lessons
        </Button>
        <Button
          variant="ghost"
          className="w-full text-left text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
          onClick={() => {
            navigate("/");
            setIsOpen(false);
          }}
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Engage
        </Button>
        <Button
          variant="ghost"
          className="w-full text-left text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
          onClick={() => {
            navigate("/ai-chat");
            setIsOpen(false);
          }}
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          AI Chat
        </Button>
        <Button
          variant="ghost"
          className="w-full text-left text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
          onClick={() => {
            navigate("/about");
            setIsOpen(false);
          }}
        >
          <Library className="h-5 w-5 mr-2" />
          Program Overview
        </Button>
        <Button
          variant="ghost"
          className="w-full text-left text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
          onClick={() => {
            navigate("/profile");
            setIsOpen(false);
          }}
        >
          <User className="h-5 w-5 mr-2" />
          Profile
        </Button>
        <Button
          variant="outline"
          className="w-full flex items-center text-black"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </Button>
      </>
    );
  }

export default MobileMenu;