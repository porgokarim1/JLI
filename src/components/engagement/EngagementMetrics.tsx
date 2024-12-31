import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface EngagementMetricsProps {
  type: 'learning' | 'conversation';
}

const EngagementMetrics = ({ type }: EngagementMetricsProps) => {
  const { data: metrics } = useQuery({
    queryKey: [type === 'learning' ? "learning-metrics" : "engagement-metrics"],
    queryFn: async () => {
      if (type === 'learning') {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { count: totalLessons } = await supabase
          .from("lessons")
          .select("*", { count: "exact", head: true });

        const { count: completedLessons } = await supabase
          .from("user_lesson_progress")
          .select("*", { count: "exact", head: true })
          .eq('user_id', user.id)
          .eq('status', 'completed');

        return {
          total: totalLessons || 0,
          completed: completedLessons || 0,
          progressPercentage: totalLessons ? ((completedLessons || 0) / totalLessons) * 100 : 0,
        };
      } else {
        const { count } = await supabase
          .from("conversations")
          .select("*", { count: "exact", head: true });

        return {
          total: 10, // Next tier threshold
          completed: count || 0,
          progressPercentage: Math.min(((count || 0) / 10) * 100, 100),
        };
      }
    },
  });

  return (
    <>
      <Card className={`${type === 'learning' ? 'border-primary' : 'border-secondary'} bg-white/90 backdrop-blur-sm`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {type === 'learning' ? 'Completed Lessons' : 'Total Conversations'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics?.completed} / {metrics?.total}
          </div>
        </CardContent>
      </Card>

      <Card className={`${type === 'learning' ? 'border-primary' : 'border-secondary'} bg-white/90 backdrop-blur-sm`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {type === 'learning' ? 'Learning Progress' : 'Next Reward Tier Progress'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress
            value={metrics?.progressPercentage}
            className={`h-2 mb-2 ${type === 'learning' ? 'bg-primary/20' : 'bg-secondary/20'}`}
          />
          <p className="text-xs text-gray-600">
            {metrics?.completed} / {metrics?.total} {type === 'learning' ? 'lessons' : 'conversations'}
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default EngagementMetrics;