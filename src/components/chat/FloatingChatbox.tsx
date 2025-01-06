import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { Card } from "@/components/ui/card";

const FloatingChatbox = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-[380px] h-[500px] p-6 shadow-2xl bg-white relative animate-scale-in rounded-2xl border-2 border-primary/20">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">AI Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 hover:bg-primary/10 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="h-[380px] overflow-y-auto border rounded-xl p-4 mb-4 bg-soft-blue/30 shadow-inner">
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-center animate-pulse">
                AI chat assist coming soon!
              </p>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-4 py-3 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white/80 backdrop-blur-sm"
                disabled
              />
              <Button 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-dark text-primary-foreground h-8 w-8 rounded-lg p-0"
                disabled
              >
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary-dark transition-all duration-300 hover:scale-110 animate-float"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      )}
    </div>
  );
};

export default FloatingChatbox;