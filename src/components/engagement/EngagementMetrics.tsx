import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";

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
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">{completedLessons}</div>
              <div className="text-xs text-muted-foreground">
                Completed Lessons
              </div>
            </div>
            <div className="w-32">
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{
                    width: `${Math.min((completedLessons / 10) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
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
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Progress</span>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Info className="h-4 w-4 cursor-help text-gray-500" />
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Reward Tiers</h4>
                    <div className="text-sm">
                      <p>🥉 Bronze: 7 conversations</p>
                      <p>🥈 Silver: 16 conversations</p>
                      <p>🥇 Gold: 25 conversations</p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <div className="text-lg font-semibold">{conversationCount}</div>
            <div className="text-xs text-muted-foreground">
              {currentTier ? (
                <span>Current Tier: {currentTier} 🎉</span>
              ) : nextThreshold ? (
                <span>{nextThreshold - conversationCount} until {getRewardTier(nextThreshold)}!</span>
              ) : (
                <span>Keep it up!</span>
              )}
            </div>
          </div>
          <div className="w-32">
            <div className="h-2 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-primary transition-all"
                style={{
                  width: `${Math.min((conversationCount / 25) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementMetrics;