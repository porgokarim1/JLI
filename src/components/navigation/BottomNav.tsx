import { useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, MessageSquare, PieChart, User } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
            <span className="text-xs">Engagement</span>
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
            className={`flex flex-col items-center ${
              isAIChatOpen ? "text-primary" : "text-gray-500"
            }`}
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
          
          <div className="h-[calc(100%-80px)] overflow-hidden rounded-xl">
            <iframe
              src="https://beta.pickaxeproject.com/axe?id=JLI_KI_L1_OMWIM&chat=STTCHG4KBZAI6PCD1TLJ"
              className="w-full h-full border-0"
              allow="microphone"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BottomNav;