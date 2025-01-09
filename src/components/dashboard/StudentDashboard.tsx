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
import { User, MessageCircle, X, Pencil } from "lucide-react";

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
    <div className="min-h-[calc(100vh-4rem)] p-4 max-w-7xl mx-auto space-y-4 pb-20">
      <DashboardHeader />
      
      <div className="space-y-4 max-w-md mx-auto w-full px-2">
        <NextLessonCard onAttendanceClick={() => setShowAttendanceForm(true)} />
        <ReferralCard onShareLink={handleCopyReferralLink} onEmailShare={handleEmailShare} />
        <EngagementCard onNewEngagement={() => setShowEngagementForm(true)} />
      </div>

      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm p-4">
        <div className="space-y-3">
          {recentEngagements.length > 0 ? (
            recentEngagements.map((engagement) => (
              <div 
                key={engagement.id}
                className="flex items-center justify-between py-2 border-t border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {engagement.participant_count} {engagement.participant_count === 1 ? 'peer' : 'peers'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(engagement.conversation_date), { addSuffix: true })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {getComfortEmoji(engagement.comfort_level || '')}
                  </span>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{engagement.comments || '-'}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditEngagement(engagement)}
                    className="h-8 w-8 text-gray-400 hover:text-primary"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit engagement</span>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 text-sm">
              No engagements recorded yet
            </div>
          )}
        </div>
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