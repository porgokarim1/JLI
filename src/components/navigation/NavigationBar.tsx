import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, GraduationCap, LogIn, UserPlus, BookOpen, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
          <button 
            onClick={() => navigate("/")}
            className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity"
          >
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-gray-900">Know Israel</span>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
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
                  variant="outline"
                  className="inline-flex items-center"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-primary hover:bg-gray-50 inline-flex items-center"
                  onClick={() => navigate("/login")}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </Button>
                <Button
                  variant="default"
                  className="inline-flex items-center"
                  onClick={() => navigate("/register")}
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Register
                </Button>
              </>
            )}
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
          {isAuthenticated ? (
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
                variant="outline"
                className="w-full flex items-center"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                className="w-full text-left text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
              >
                <LogIn className="h-5 w-5 mr-2" />
                Login
              </Button>
              <Button
                variant="default"
                className="w-full flex items-center"
                onClick={() => {
                  navigate("/register");
                  setIsOpen(false);
                }}
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;