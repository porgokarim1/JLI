import NavigationBar from "@/components/navigation/NavigationBar";
import { Card } from "@/components/ui/card";

const AIChat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-50 w-full max-w-[380px]">
        <Card className="overflow-hidden border-primary/20 bg-white/80 backdrop-blur-sm shadow-lg">
          <div className="p-3 border-b border-primary/10 bg-primary/5">
            <h2 className="text-lg font-semibold text-center">Chat with K'NOW AI</h2>
            <p className="text-xs text-muted-foreground text-center mt-0.5">
              Ask questions about Israel and Jewish wisdom
            </p>
          </div>
          <div className="h-[500px]">
            <iframe
              src="https://beta.pickaxeproject.com/axe?id=JLI_KI_L1_OMWIM&chat=STTCHG4KBZAI6PCD1TLJ"
              className="w-full h-full border-0"
              allow="microphone"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIChat;