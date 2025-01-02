import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import AuthenticatedButtons from "./AuthenticatedButtons";
import UnauthenticatedButtons from "./UnauthenticatedButtons";
import MobileMenu from "./MobileMenu";

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

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <button 
            onClick={() => navigate("/")}
            className="flex-shrink-0 flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src="https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/lesson_images/logo.png?t=2025-01-02T06%3A41%3A20.422Z"
              alt="Logo"
              className="h-8"
            />
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <span className="font-bold text-xl text-primary">K</span>
                <span className="text-primary text-sm" style={{ marginTop: '-12px' }}>'</span>
                <span className="font-bold text-xl text-primary">NOW</span>
              </div>
              <span className="font-bold text-xl text-black">ISRAEL</span>
            </div>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? <AuthenticatedButtons /> : <UnauthenticatedButtons />}
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
          <MobileMenu isAuthenticated={isAuthenticated} setIsOpen={setIsOpen} />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;