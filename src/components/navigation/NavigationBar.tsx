import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Home, MessageSquare, BookOpen, PieChart, User, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import AuthenticatedButtons from "./AuthenticatedButtons";
import UnauthenticatedButtons from "./UnauthenticatedButtons";
import MobileMenu from "./MobileMenu";
import { useIsMobile } from "@/hooks/use-mobile";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isMobile) {
    return null;
  }

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
            <span className="font-bold text-xl text-black relative">
              K
              <span className="absolute -top-1 left-[0.45em]">'</span>
              NOW ISRAEL
            </span>
          </button>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
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
                  <Handshake className="h-5 w-5 mr-2" />
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
                  onClick={() => setShowAIChat(true)}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  AI Chat
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
                  onClick={() => navigate("/about")}
                >
                  <PieChart className="h-5 w-5 mr-2" />
                  Overview
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-primary hover:bg-gray-50 flex items-center"
                  onClick={() => navigate("/profile")}
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </Button>
              </div>
            ) : (
              <UnauthenticatedButtons />
            )}
          </div>

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

      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <MobileMenu isAuthenticated={isAuthenticated} setIsOpen={setIsOpen} />
        </div>
      </div>

      <Dialog open={showAIChat} onOpenChange={setShowAIChat}>
        <DialogContent className="w-[90vw] max-w-[380px] h-[90vh] max-h-[500px] p-4 md:p-6">
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-center animate-pulse">
              AI chat assist coming soon!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default NavigationBar;