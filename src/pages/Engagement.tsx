import { useEffect } from "react";
import NavigationBar from "@/components/navigation/NavigationBar";
import ConversationForm from "@/components/engagement/ConversationForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Engagement = () => {
  useEffect(() => {
    document.title = "Engagement | Know Israel";
  }, []);

  return (
    <div className="min-h-screen bg-[#FEF7CD]">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <h1 className="text-3xl font-bold text-center mb-8">Record Your Conversations</h1>
        <div className="max-w-md mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>New Conversation</CardTitle>
            </CardHeader>
            <CardContent>
              <ConversationForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Engagement;