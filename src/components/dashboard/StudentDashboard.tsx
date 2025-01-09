import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Gift, Share2 } from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import ConversationForm from "../engagement/ConversationForm";
import { CompletionCodeDialog } from "../lesson/CompletionCodeDialog";

interface StudentDashboardProps {
  conversationCount?: number;
}

const StudentDashboard = ({ conversationCount = 0 }: StudentDashboardProps) => {
  const navigate = useNavigate();
  const [showEngagementForm, setShowEngagementForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col gap-3 p-4 max-w-lg mx-auto overflow-hidden">
      <DashboardHeader />
      
      {/* Next Lesson Card */}
      <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium text-sm">Next Lesson</h3>
                <p className="text-xs text-muted-foreground">02/15/2025 @4PM</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white text-xs h-8"
              onClick={() => setShowAttendanceForm(true)}
            >
              Confirm Attendance
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Engagements Card */}
      <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🤝</span>
              <div>
                <h3 className="font-medium text-sm">Engagements</h3>
                <p className="text-xs text-muted-foreground">{conversationCount}/7 peers</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 text-xs h-8"
              onClick={() => setShowEngagementForm(true)}
            >
              <Plus className="h-4 w-4" />
              New
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Referral Card */}
      <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gift className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-medium text-sm">Referral Program</h3>
                <p className="text-xs text-muted-foreground">Invite friends & earn rewards</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Button variant="ghost" size="sm" className="h-8 text-xs flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share Link
              </Button>
              <p className="text-xs text-muted-foreground">0 referrals</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Form Dialog */}
      <Dialog open={showEngagementForm} onOpenChange={setShowEngagementForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Record New Engagement</DialogTitle>
          </DialogHeader>
          <ConversationForm onSuccess={() => setShowEngagementForm(false)} />
        </DialogContent>
      </Dialog>

      {/* Attendance Form Dialog */}
      <CompletionCodeDialog
        lessonId="placeholder-id" // This should be dynamically set based on the next lesson
        onSuccess={() => setShowAttendanceForm(false)}
        open={showAttendanceForm}
        onOpenChange={setShowAttendanceForm}
      />
    </div>
  );
};

export default StudentDashboard;