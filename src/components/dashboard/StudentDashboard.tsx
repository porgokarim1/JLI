import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Gift, Share2 } from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import ConversationForm from "../engagement/ConversationForm";
import { CompletionCodeDialog } from "../lesson/CompletionCodeDialog";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

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

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col gap-3 p-4 max-w-lg mx-auto">
      <DashboardHeader />
      
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

      <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🤝</span>
              <div>
                <h3 className="font-medium text-sm">Engagements</h3>
                <p className="text-xs text-muted-foreground">{recentEngagements.length}/7 peers</p>
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

      {recentEngagements.length > 0 && (
        <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-sm">Recent Engagements</h3>
              {recentEngagements.length >= 3 && (
                <Button 
                  variant="ghost" 
                  className="text-xs"
                  onClick={() => navigate('/engagement')}
                >
                  More
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {recentEngagements.map((engagement) => (
                <div key={engagement.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span role="img" aria-label="mood">
                      {engagement.comfort_level === 'very_comfortable' ? '😊' : 
                       engagement.comfort_level === 'comfortable' ? '🙂' : 
                       engagement.comfort_level === 'neutral' ? '😐' : 
                       engagement.comfort_level === 'uncomfortable' ? '😕' : '😔'}
                    </span>
                    <span className="text-gray-500">
                      {formatDistanceToNow(new Date(engagement.conversation_date), { addSuffix: true })}
                    </span>
                  </div>
                  <span className="text-gray-500">{engagement.participant_count} peers</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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