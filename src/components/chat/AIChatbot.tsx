import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MessageCircle } from "lucide-react";

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-20 right-4 md:bottom-4 rounded-full w-12 h-12 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[90vw] sm:w-[600px] p-0">
        <SheetHeader className="px-4 py-2 border-b">
          <SheetTitle>AI Assistant</SheetTitle>
        </SheetHeader>
        <div className="h-[calc(100vh-80px)]">
          <iframe
            src="https://beta.pickaxeproject.com/axe?id=JLI_KI_L1_OMWIM&chat=STTCHG4KBZAI6PCD1TLJ"
            className="w-full h-full border-0"
            allow="microphone"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};