import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface EngagementMetricsProps {
  type: "conversation" | "learning";
}

const EngagementMetrics = ({ type }: EngagementMetricsProps) => {
  const [dialogPosition, setDialogPosition] = useState({ top: 0, left: 0 });
  const [isOpen, setIsOpen] = useState(false);

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
    if (count >= 25) return "Level 3";
    if (count >= 15) return "Level 2";
    if (count >= 7) return "Level 1";
    return null;
  };

  const getNextRewardThreshold = (count: number) => {
    if (count < 7) return 7;
    if (count < 15) return 15;
    if (count < 25) return 25;
    return null;
  };

  const handleInfoClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setDialogPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setIsOpen(true);
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
    const nextTier = getRewardTier(nextThreshold || 0);

    return (
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium">Total: {conversationCount}</p>
            {nextTier && remainingConversations > 0 && (
              <p className="text-sm text-gray-600">
                {remainingConversations} more until {nextTier}
              </p>
            )}
          </div>
          <div className="text-sm space-y-1">
            <p>🎯 Level 1: 7 peers</p>
            <p>🎯 Level 2: 15 peers</p>
            <p>🎯 Level 3: 25 peers</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {type === "conversation" && (
        <div className="flex-1">
          <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-lg">
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
      
      <Card className="flex-1 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Progress</span>
              <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
                <DialogTrigger asChild>
                  <Info 
                    className="h-4 w-4 text-gray-500 cursor-pointer hover:text-gray-700" 
                    onClick={handleInfoClick}
                  />
                </DialogTrigger>
                <DialogContent 
                  className="rounded-lg w-[300px] absolute bg-white shadow-lg border"
                  style={{
                    top: `${dialogPosition.top}px`,
                    left: `${dialogPosition.left}px`,
                    transform: 'none'
                  }}
                  onPointerDownOutside={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                  }}
                >
                  <MetricsContent />
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">
                  {type === "learning"
                    ? lessonProgress?.filter((p) => p.status === "completed").length || 0
                    : conversations?.length || 0}
                </span>
                <Progress
                  value={
                    type === "learning"
                      ? Math.min(
                          ((lessonProgress?.filter((p) => p.status === "completed").length || 0) / 4) *
                            100,
                          100
                        )
                      : Math.min(((conversations?.length || 0) / 25) * 100, 100)
                  }
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EngagementMetrics;
