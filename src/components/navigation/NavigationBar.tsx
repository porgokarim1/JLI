import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, BookOpen, GraduationCap, Users, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand section */}
          <div className="flex-shrink-0 flex items-center">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-gray-900">EduPortal</span>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
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
              onClick={() => navigate("/resources")}
            >
              <BookMarked className="h-5 w-5 mr-2" />
              Resources
            </Button>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-primary hover:bg-gray-50 inline-flex items-center"
              onClick={() => navigate("/community")}
            >
              <Users className="h-5 w-5 mr-2" />
              Community
            </Button>
            <Button
              variant="outline"
              className="ml-4"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              className="inline-flex items-center justify-center p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
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
              navigate("/resources");
              setIsOpen(false);
            }}
          >
            <BookMarked className="h-5 w-5 mr-2" />
            Resources
          </Button>
          <Button
            variant="ghost"
            className="w-full text-left text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
            onClick={() => {
              navigate("/community");
              setIsOpen(false);
            }}
          >
            <Users className="h-5 w-5 mr-2" />
            Community
          </Button>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;