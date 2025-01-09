import NavigationBar from "@/components/navigation/NavigationBar";
import { Card } from "@/components/ui/card";

const AIChat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-primary/20 bg-white/80 backdrop-blur-sm">
            <div className="p-4 border-b border-primary/10">
              <h2 className="text-xl font-semibold text-center">Chat with K'NOW AI</h2>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Ask questions about Israel and Jewish wisdom
              </p>
            </div>
            <div className="h-[600px]">
              <iframe
                src="https://beta.pickaxeproject.com/axe?id=JLI_KI_L1_OMWIM&chat=STTCHG4KBZAI6PCD1TLJ"
                className="w-full h-full border-0"
                allow="microphone"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIChat;