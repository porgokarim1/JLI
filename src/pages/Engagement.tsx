import { useEffect } from "react";
import NavigationBar from "@/components/navigation/NavigationBar";
import { ConversationForm } from "@/components/engagement/ConversationForm";
import ConversationsList from "@/components/engagement/ConversationsList";
import EngagementMetrics from "@/components/engagement/EngagementMetrics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";

const Engagement = () => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.title = "Engagement | Know Israel";
  }, []);

  return (
    <div className="min-h-screen bg-[#FEF7CD]">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Engagement Dashboard</h1>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Conversation
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <EngagementMetrics />
        </div>

        {showForm ? (
          <Card className="bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle>New Conversation</CardTitle>
            </CardHeader>
            <CardContent>
              <ConversationForm onSuccess={() => setShowForm(false)} />
            </CardContent>
          </Card>
        ) : null}

        <ConversationsList />
      </div>
    </div>
  );
};

export default Engagement;