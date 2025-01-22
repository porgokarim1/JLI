import { Button } from "@/components/ui/button";
import { LogOut, User, LogIn, UserPlus, Library, MessageSquare, BookOpen, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MobileMenuProps {
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({ setIsOpen }: MobileMenuProps) => {
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
      <>
        <Button
          variant="ghost"
          className="w-full text-left text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
          onClick={() => {
            navigate("/");
            setIsOpen(false);
          }}
        >
          <Home className="h-5 w-5 mr-2" />
          Engage
        </Button>
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
          Overview
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