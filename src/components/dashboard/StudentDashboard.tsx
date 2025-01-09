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

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showEngagementForm, setShowEngagementForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [recentEngagements, setRecentEngagements] = useState<any[]>([]);
  const [totalPeers, setTotalPeers] = useState(0);

  useEffect(() => {
    const fetchRecentEngagements = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: totalData, error: totalError } = await supabase
        .from('conversations')
        .select('participant_count')
        .eq('user_id', user.id);

      if (!totalError && totalData) {
        const total = totalData.reduce((sum, conv) => sum + (conv.participant_count || 0), 0);
        setTotalPeers(total);
      }

      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('conversation_date', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching recent engagements:', error);
        return;
      }

      setRecentEngagements(data);
    };

    fetchRecentEngagements();
  }, []);

  const handleCopyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + '/register');
      toast.success('Referral link copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy referral link');
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] p-4 max-w-7xl mx-auto">
      <DashboardHeader />
      
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        {/* Left side - Main content */}
        <div className="flex-1 space-y-4">
          <NextLessonCard onAttendanceClick={() => setShowAttendanceForm(true)} />
          <EngagementCard onNewEngagement={() => setShowEngagementForm(true)} />
          <ReferralCard onShareLink={handleCopyReferralLink} />
        </div>

        {/* Right side - Recent Engagements */}
        <div className="w-full md:w-64 space-y-2">
          <h3 className="font-medium text-sm mb-2">Recent Engagements</h3>
          <div className="space-y-2">
            {recentEngagements.map((engagement) => (
              <div key={engagement.id} className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span role="img" aria-label="mood">
                    {engagement.comfort_level === 'very_comfortable' ? '😊' : 
                     engagement.comfort_level === 'comfortable' ? '🙂' : 
                     engagement.comfort_level === 'neutral' ? '😐' : 
                     engagement.comfort_level === 'uncomfortable' ? '😕' : '😔'}
                  </span>
                  <span className="text-sm text-gray-600">
                    {formatDistanceToNow(new Date(engagement.conversation_date), { addSuffix: true })}
                  </span>
                </div>
                <span className="text-sm text-gray-600">{engagement.participant_count} peers</span>
              </div>
            ))}
            {recentEngagements.length >= 3 && (
              <Button 
                variant="default"
                className="w-full text-xs text-muted-foreground bg-gray-100 hover:bg-gray-200"
                onClick={() => navigate('/engagement')}
              >
                More
              </Button>
            )}
          </div>
        </div>
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