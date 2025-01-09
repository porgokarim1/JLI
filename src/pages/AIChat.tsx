import { useState } from "react";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-50">
        {!isOpen ? (
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full w-12 h-12 bg-primary shadow-lg hover:shadow-xl transition-all"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        ) : (
          <Card className="w-[380px] overflow-hidden border-primary/20 bg-white/80 backdrop-blur-sm shadow-lg animate-in slide-in-from-bottom-5">
            <div className="p-3 border-b border-primary/10 bg-primary/5 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">Chat with K'NOW AI</h2>
                <p className="text-xs text-muted-foreground">
                  Ask questions about Israel and Jewish wisdom
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-[500px]">
              <iframe
                src="https://beta.pickaxeproject.com/axe?id=JLI_KI_L1_OMWIM&chat=STTCHG4KBZAI6PCD1TLJ"
                className="w-full h-full border-0"
                allow="microphone"
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AIChat;