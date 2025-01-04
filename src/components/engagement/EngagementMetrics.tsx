import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const getRewardTier = (count: number) => {
    if (count >= 25) return "Gold";
    if (count >= 16) return "Silver";
    if (count >= 7) return "Bronze";
    return null;
  };

  const getNextRewardThreshold = (count: number) => {
    if (count < 7) return 7;
    if (count < 16) return 16;
    if (count < 25) return 25;
    return null;
  };

  if (type === "learning") {
    const completedLessons = lessonProgress?.filter(
      (progress) => progress.status === "completed"
    ).length || 0;

    return (
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Completed</span>
              <span className="text-lg font-bold">{completedLessons}</span>
            </div>
            <Progress value={Math.min((completedLessons / 10) * 100, 100)} className="w-20" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const conversationCount = conversations?.length || 0;
  const currentTier = getRewardTier(conversationCount);
  const nextThreshold = getNextRewardThreshold(conversationCount);

  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Progress</span>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1 text-xs">
                  <p>🥉 Bronze: 7 conversations</p>
                  <p>🥈 Silver: 16 conversations</p>
                  <p>🥇 Gold: 25 conversations</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">{conversationCount}</span>
              <Progress value={Math.min((conversationCount / 25) * 100, 100)} className="w-20" />
            </div>
            <span className="text-xs text-muted-foreground">
              {currentTier ? (
                <span>{currentTier} 🎉</span>
              ) : nextThreshold ? (
                <span>{nextThreshold - conversationCount} until {getRewardTier(nextThreshold)}</span>
              ) : (
                <span>Keep it up!</span>
              )}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementMetrics;