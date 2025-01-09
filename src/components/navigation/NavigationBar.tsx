import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Home, BookOpen, PieChart, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import AuthenticatedButtons from "./AuthenticatedButtons";
import MobileMenu from "./MobileMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const navigate = useNavigate();
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
            <span className="font-bold text-xl text-black">KNOW ISRAEL</span>
          </button>

          {isAuthenticated && (
            <div className="hidden md:flex md:items-center space-x-2 ml-auto">
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center h-16 px-2"
                onClick={() => navigate("/")}
              >
                <Home className="h-5 w-5 mb-1" />
                <span className="text-xs">Engagement</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center h-16 px-2"
                onClick={() => navigate("/lessons")}
              >
                <BookOpen className="h-5 w-5 mb-1" />
                <span className="text-xs">Lessons</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center h-16 px-2"
                onClick={() => navigate("/about")}
              >
                <PieChart className="h-5 w-5 mb-1" />
                <span className="text-xs">Overview</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center h-16 px-2"
                onClick={() => navigate("/profile")}
              >
                <User className="h-5 w-5 mb-1" />
                <span className="text-xs">Profile</span>
              </Button>
              <Button
                variant="ghost"
                className="flex flex-col items-center justify-center h-16 px-2"
                onClick={() => setIsAIChatOpen(true)}
              >
                <MessageSquare className="h-5 w-5 mb-1" />
                <span className="text-xs">AI Chat</span>
              </Button>
              <AuthenticatedButtons />
            </div>
          )}

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

      <Dialog open={isAIChatOpen} onOpenChange={setIsAIChatOpen}>
        <DialogContent className="w-[90vw] max-w-[380px] h-[90vh] max-h-[500px] p-4 md:p-6">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">AI Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAIChatOpen(false)}
              className="h-8 w-8 hover:bg-primary/10 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="h-[calc(100%-120px)] overflow-y-auto border rounded-xl p-3 md:p-4 mb-4 bg-soft-blue/30 shadow-inner">
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-center animate-pulse">
                AI chat assist coming soon!
              </p>
            </div>
          </div>

          <div className="absolute bottom-4 md:bottom-6 left-4 right-4 md:left-6 md:right-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-4 py-2 md:py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white/80 backdrop-blur-sm text-sm md:text-base"
                disabled
              />
              <Button 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-dark text-primary-foreground h-7 w-7 md:h-8 md:w-8 rounded-lg p-0"
                disabled
              >
                <MessageSquare className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default NavigationBar;
