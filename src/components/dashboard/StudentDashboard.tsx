import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, BookOpen, Target, Trophy, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
    <div className="container mx-auto p-4">
      <DashboardHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Progress Dashboard */}
        <Card className="bg-soft-blue border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-primary" />
              Learning progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <EngagementMetrics type="learning" />
            </div>
          </CardContent>
        </Card>

        {/* Conversation Progress */}
        <Card className="bg-soft-yellow border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trophy className="h-5 w-5 text-primary" />
              Conversation count
            </CardTitle>
            <Button 
              className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
              onClick={() => setIsConversationDialogOpen(true)}
            >
              <MessageSquarePlus className="h-5 w-5 mr-2" />
              New
            </Button>
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

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Your learning journey
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        </h2>
        <LessonsList />
      </div>

      <div className="mt-6">
        <Card className="bg-soft-purple border-2 border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquarePlus className="h-5 w-5 text-primary" />
              Recent Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ConversationsList />
          </CardContent>
        </Card>
      </div>

      <Dialog open={isConversationDialogOpen} onOpenChange={setIsConversationDialogOpen}>
        <DialogContent className="w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Conversation</DialogTitle>
          </DialogHeader>
          <ConversationForm onSuccess={() => setIsConversationDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentDashboard;