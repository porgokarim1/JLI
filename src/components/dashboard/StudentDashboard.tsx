import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Gift, Share2, Handshake } from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import ConversationForm from "../engagement/ConversationForm";
import { CompletionCodeDialog } from "../lesson/CompletionCodeDialog";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showEngagementForm, setShowEngagementForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [recentEngagements, setRecentEngagements] = useState<any[]>([]);
  const [totalPeers, setTotalPeers] = useState(0);
  const [nextLesson, setNextLesson] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch next lesson
      const today = new Date().toISOString();
      const { data: lessonData } = await supabase
        .from('lessons')
        .select('*')
        .gte('lesson_date', today)
        .order('lesson_date', { ascending: true })
        .limit(1)
        .single();

      setNextLesson(lessonData);

      // Fetch engagement data
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

    fetchData();
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-medium text-sm">Next Lesson</h3>
                      <p className="text-xs text-muted-foreground">
                        {nextLesson?.lesson_date ? new Date(nextLesson.lesson_date).toLocaleDateString() : 'TBD'} 
                        {nextLesson?.lesson_time ? ` @${nextLesson.lesson_time}` : ''}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="default"
                    className="text-black h-8 text-xs"
                    onClick={() => setShowAttendanceForm(true)}
                  >
                    Confirm Attendance
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Handshake className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-medium text-sm">Engagements</h3>
                      <p className="text-xs text-muted-foreground">{totalPeers}/7 peers</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      variant="default"
                      className="text-black h-8 text-xs"
                      onClick={() => setShowEngagementForm(true)}
                    >
                      <Plus className="h-4 w-4 mr-1" /> New
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      {nextLesson?.location || 'TBD'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="h-8 text-xs flex items-center gap-2"
                      onClick={handleCopyReferralLink}
                    >
                      <Share2 className="h-4 w-4" />
                      Share Link
                    </Button>
                    <p className="text-xs text-muted-foreground">0 referrals</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
                variant="secondary"
                className="w-full text-xs"
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