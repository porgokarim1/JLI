import { useLocation, useNavigate } from "react-router-dom";
import { Home, Handshake, BookOpen, MessageSquare, PieChart, User } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 md:hidden z-50">
        <div className="flex justify-around items-center">
          <button
            onClick={() => navigate("/")}
            className={`flex flex-col items-center ${
              isActive("/") ? "text-primary" : "text-gray-500"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => navigate("/engagement")}
            className={`flex flex-col items-center ${
              isActive("/engagement") ? "text-primary" : "text-gray-500"
            }`}
          >
            <Handshake className="h-5 w-5" />
            <span className="text-xs">Engage</span>
          </button>
          <button
            onClick={() => navigate("/lessons")}
            className={`flex flex-col items-center ${
              isActive("/lessons") ? "text-primary" : "text-gray-500"
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span className="text-xs">Lessons</span>
          </button>
          <button
            onClick={() => setIsAIChatOpen(true)}
            className={`flex flex-col items-center text-gray-500`}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs">AI Chat</span>
          </button>
          <button
            onClick={() => navigate("/about")}
            className={`flex flex-col items-center ${
              isActive("/about") ? "text-primary" : "text-gray-500"
            }`}
          >
            <PieChart className="h-5 w-5" />
            <span className="text-xs">Overview</span>
          </button>
          <button
            onClick={() => navigate("/profile")}
            className={`flex flex-col items-center ${
              isActive("/profile") ? "text-primary" : "text-gray-500"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </button>
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
    </>
  );
};

export default BottomNav;