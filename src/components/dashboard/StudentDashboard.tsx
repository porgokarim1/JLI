import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, BookOpen, Target, Trophy, Sparkles } from "lucide-react";
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
        {/* Progress Dashboard */}
        <Card className="bg-soft-blue border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2">
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Conversation count
            </CardTitle>
            <Dialog open={isConversationDialogOpen} onOpenChange={setIsConversationDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
                  <MessageSquarePlus className="h-5 w-5 mr-2" />
                  New
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
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
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Your learning journey
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        </h2>
        <LessonsList />
      </div>

      <div className="mt-8">
        <ConversationsList />
      </div>
    </div>
  );
};

export default StudentDashboard;