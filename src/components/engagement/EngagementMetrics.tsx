import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const EngagementMetrics = () => {
  const { data: metrics } = useQuery({
    queryKey: ["engagement-metrics"],
    queryFn: async () => {
      const { count } = await supabase
        .from("conversations")
        .select("*", { count: "exact", head: true });

      return {
        totalConversations: count || 0,
        nextTierThreshold: 10, // This could be dynamic based on user's current tier
        progressPercentage: Math.min(((count || 0) / 10) * 100, 100),
      };
    },
  });

  return (
    <>
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Conversations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics?.totalConversations}</div>
        </CardContent>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Next Reward Tier Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress
            value={metrics?.progressPercentage}
            className="h-2 mb-2"
          />
          <p className="text-xs text-gray-600">
            {metrics?.totalConversations} / {metrics?.nextTierThreshold} conversations
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default EngagementMetrics;