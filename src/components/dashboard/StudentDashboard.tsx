import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import DashboardHeader from "./DashboardHeader";
import ConversationForm from "../engagement/ConversationForm";
import { CompletionCodeDialog } from "../lesson/CompletionCodeDialog";
import { NextLessonCard } from "./cards/NextLessonCard";
import { EngagementCard } from "./cards/EngagementCard";
import { ReferralCard } from "./cards/ReferralCard";
import { Button } from "@/components/ui/button";
import { X, FilePenLine } from "lucide-react";
import { format } from "date-fns";

const REFERRAL_URL = "https://preview--app-collaborate-hub.lovable.app/register";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showEngagementForm, setShowEngagementForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [recentEngagements, setRecentEngagements] = useState<any[]>([]);
  const [selectedEngagement, setSelectedEngagement] = useState<any>(null);

  const getComfortEmoji = (comfort_level: string) => {
    switch (comfort_level) {
      case 'very_comfortable':
        return '😄';
      case 'comfortable':
        return '🙂';
      case 'uncomfortable':
        return '😕';
      case 'very_uncomfortable':
        return '😣';
      default:
        return '😐';
    }
  };

  useEffect(() => {
    const fetchRecentEngagements = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('conversation_date', { ascending: false });

      if (error) {
        console.error('Error fetching recent engagements:', error);
        return;
      }

      setRecentEngagements(data);
    };

    fetchRecentEngagements();
  }, [showEngagementForm]); // Refetch when form closes

  const handleCopyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_URL);
      toast.success('Referral link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy referral link');
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent("Join K'NOW ISRAEL");
    const body = encodeURIComponent(`Hey! I thought you might be interested in joining K'NOW ISRAEL. Check it out here: ${REFERRAL_URL}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleEditEngagement = (engagement: any) => {
    setSelectedEngagement(engagement);
    setShowEngagementForm(true);
  };

  const handleFormClose = () => {
    setShowEngagementForm(false);
    setSelectedEngagement(null);
  };

  return (
    <div className="min-h-[100dvh] p-4 max-w-7xl mx-auto space-y-4 pb-20">
      <DashboardHeader />
      
      <div className="space-y-4 max-w-md mx-auto w-full px-2">
        <NextLessonCard onAttendanceClick={() => setShowAttendanceForm(true)} />
        <ReferralCard onShareLink={handleCopyReferralLink} onEmailShare={handleEmailShare} />
        <EngagementCard 
          onNewEngagement={() => setShowEngagementForm(true)} 
          onEditEngagement={handleEditEngagement}
          recentEngagements={recentEngagements}
        />
      </div>

      <Dialog open={showEngagementForm} onOpenChange={handleFormClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedEngagement ? 'Edit Engagement' : 'Record New Engagement'}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={handleFormClose}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>
          <ConversationForm 
            initialData={selectedEngagement}
            onSuccess={handleFormClose}
            onClose={handleFormClose}
          />
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
