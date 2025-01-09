import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface EngagementMetricsProps {
  type: "conversation" | "learning";
}

const EngagementMetrics = ({ type }: EngagementMetricsProps) => {
  const { data: conversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      return data;
    },
    enabled: type === "conversation",
  });

  const { data: lessonProgress } = useQuery({
    queryKey: ["lesson-progress"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("user_lesson_progress")
        .select("*")
        .eq("user_id", user.id);

      if (error) throw error;
      return data;
    },
    enabled: type === "learning",
  });

  const getNextRewardThreshold = (count: number) => {
    if (count < 7) return 7;
    if (count < 15) return 15;
    if (count < 25) return 25;
    return null;
  };

  const MetricsContent = () => {
    if (type === "learning") {
      const completedLessons = lessonProgress?.filter(
        (progress) => progress.status === "completed"
      ).length || 0;

      return (
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <p>Completed Lessons: {completedLessons}</p>
            <p className="text-sm text-gray-600">Target: 4 lessons</p>
          </div>
        </div>
      );
    }

    const conversationCount = conversations?.length || 0;
    const nextThreshold = getNextRewardThreshold(conversationCount);
    const remainingConversations = nextThreshold ? nextThreshold - conversationCount : 0;

    return (
      <div className="p-4">
        <div className="flex flex-col gap-2">
          <p className="font-medium">Total Conversations: {conversationCount}</p>
          {nextThreshold && (
            <p className="text-sm text-gray-600">
              {remainingConversations} more until Level {nextThreshold === 7 ? '1' : nextThreshold === 15 ? '2' : '3'}
            </p>
          )}
          <div className="text-sm space-y-1 mt-2">
            <p>🎯 Level 1: 7 peers</p>
            <p>🎯 Level 2: 15 peers</p>
            <p>🎯 Level 3: 25 peers</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {type === "conversation" && (
        <div className="w-full">
          <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-lg h-full">
            <div className="flex items-center gap-4">
              <Users className="h-12 w-12 text-primary animate-pulse" />
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  {conversations?.length || 0}
                </div>
                <div className="text-sm text-gray-600">Peers engaged</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Card className="w-full bg-white/90 backdrop-blur-sm">
        <CardContent className="p-4">
          <MetricsContent />
        </CardContent>
      </Card>
    </div>
  );
};

export default EngagementMetrics;