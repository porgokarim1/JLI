import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DashboardHeader from "./DashboardHeader";
import LessonsList from "./LessonsList";
import ConversationForm from "@/components/engagement/ConversationForm";
import ConversationsList from "@/components/engagement/ConversationsList";
import EngagementMetrics from "@/components/engagement/EngagementMetrics";
import RewardTierNotification from "@/components/engagement/RewardTierNotification";

interface StudentDashboardProps {
  conversationCount: number | undefined;
}

const StudentDashboard = ({ conversationCount }: StudentDashboardProps) => {
  const [isConversationDialogOpen, setIsConversationDialogOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Progress Dashboard - Minimized */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Learning progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <EngagementMetrics type="learning" />
            </div>
          </CardContent>
        </Card>

        {/* Conversation Progress */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Conversation count</CardTitle>
            <Dialog open={isConversationDialogOpen} onOpenChange={setIsConversationDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                  <MessageSquarePlus className="h-5 w-5 mr-2" />
                  New
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
{/*                 <DialogHeader>
                  <DialogTitle>New Conversation</DialogTitle>
                </DialogHeader> */}
                <ConversationForm onSuccess={() => setIsConversationDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <EngagementMetrics type="conversation" />
              {conversationCount !== undefined && (
                <RewardTierNotification conversationCount={conversationCount} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Your learning journey</h2>
        <LessonsList />
      </div>

      <div className="mt-8">
        <ConversationsList />
      </div>
    </div>
  );
};

export default StudentDashboard;
