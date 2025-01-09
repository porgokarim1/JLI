import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import LessonsList from "./LessonsList";
import ProgressOverview from "./ProgressOverview";
import DashboardHeader from "./DashboardHeader";
import { CheckCircle2 } from "lucide-react";

interface StudentDashboardProps {
  conversationCount: number;
}

const StudentDashboard = ({ conversationCount }: StudentDashboardProps) => {
  const { data: recentEngagements } = useQuery({
    queryKey: ['recent-engagements'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .eq('user_id', user.id)
        .order('conversation_date', { ascending: false })
        .limit(3);

      if (error) throw error;
      return data;
    },
  });

  const getComfortEmoji = (level: string) => {
    switch (level) {
      case 'very_comfortable': return '😊';
      case 'comfortable': return '🙂';
      case 'neutral': return '😐';
      case 'uncomfortable': return '😕';
      case 'very_uncomfortable': return '😟';
      default: return '😐';
    }
  };

  return (
    <div className="container mx-auto px-4 space-y-8 pb-20">
      <DashboardHeader conversationCount={conversationCount} />
      <ProgressOverview />
      <LessonsList />
      
      {recentEngagements && recentEngagements.length > 0 && (
        <div className="space-y-2">
          <div className="space-y-2">
            {recentEngagements.map((engagement) => (
              <div key={engagement.id} className="flex items-center gap-2 text-sm text-gray-600">
                <span>{getComfortEmoji(engagement.comfort_level)}</span>
                <span>{formatDistanceToNow(new Date(engagement.conversation_date), { addSuffix: true })}</span>
                <span>•</span>
                <span>{engagement.participant_count} peer{engagement.participant_count !== 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;