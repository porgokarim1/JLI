import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import DashboardHeader from "./DashboardHeader";
import ConversationForm from "../engagement/ConversationForm";
import { CompletionCodeDialog } from "../lesson/CompletionCodeDialog";
import { NextLessonCard } from "./cards/NextLessonCard";
import { ReferralCard } from "./cards/ReferralCard";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showEngagementForm, setShowEngagementForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);

  const handleCopyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + '/register');
      toast.success('Referral link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy referral link');
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("Join K'NOW ISRAEL");
    const body = encodeURIComponent("Hey! I thought you might be interested in joining K'NOW ISRAEL. You can register here: " + window.location.origin + '/register');
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 max-w-7xl mx-auto space-y-4 pb-20">
      <DashboardHeader />
      
      <div className="space-y-4 max-w-md mx-auto w-full px-2">
        <NextLessonCard onAttendanceClick={() => setShowAttendanceForm(true)} />
        <ReferralCard onShareLink={handleCopyReferralLink} onEmailShare={handleEmailShare} />
      </div>

      <Dialog open={showEngagementForm} onOpenChange={setShowEngagementForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Record New Engagement</DialogTitle>
          </DialogHeader>
          <ConversationForm onSuccess={() => setShowEngagementForm(false)} />
        </DialogContent>
      </Dialog>

      <CompletionCodeDialog
        lessonId="placeholder-id"
        onSuccess={() => setShowAttendanceForm(false)}
        open={showAttendanceForm}
        onOpenChange={setShowAttendanceForm}
      />
    </div>
  );
};

export default StudentDashboard;