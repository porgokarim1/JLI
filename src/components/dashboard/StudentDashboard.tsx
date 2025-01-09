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
import { Handshake, User, Plus, MessageCircle, PenLine } from "lucide-react";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showEngagementForm, setShowEngagementForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [recentEngagements, setRecentEngagements] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecentEngagements = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

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
    <div className="min-h-[calc(100vh-4rem)] p-4 max-w-7xl mx-auto space-y-4 pb-20">
      <DashboardHeader />
      
      {/* Main Dashboard Cards - Centered with max-width */}
      <div className="space-y-4 max-w-md mx-auto w-full px-2">
        <NextLessonCard onAttendanceClick={() => setShowAttendanceForm(true)} />
        <ReferralCard onShareLink={handleCopyReferralLink} />
        <EngagementCard onNewEngagement={() => setShowEngagementForm(true)} />
      </div>

      {/* Recent Engagements Section - New Design */}
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Handshake className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Engagements</h3>
            <span className="text-sm text-gray-500">0/7</span>
          </div>
          <Button 
            size="sm"
            variant="ghost"
            className="h-8 px-2"
            onClick={() => setShowEngagementForm(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {recentEngagements.length > 0 ? (
            recentEngagements.map((engagement) => (
              <div 
                key={engagement.id}
                className="flex items-center justify-between py-2 border-t border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {formatDistanceToNow(new Date(engagement.conversation_date), { addSuffix: true })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{engagement.comments || '-'}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => navigate('/engagement')}
                  >
                    <PenLine className="h-4 w-4 text-gray-400" />
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