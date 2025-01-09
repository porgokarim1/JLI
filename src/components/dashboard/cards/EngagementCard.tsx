import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface EngagementCardProps {
  onNewEngagement: () => void;
}

export const EngagementCard = ({ onNewEngagement }: EngagementCardProps) => {
  const { data: engagementStats } = useQuery({
    queryKey: ['engagement-stats'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('conversations')
        .select('participant_count')
        .eq('user_id', user.id);

      if (error) throw error;

      const totalPeers = data.reduce((sum, conv) => sum + (conv.participant_count || 0), 0);
      const totalConversations = data.length;

      return {
        totalPeers,
        totalConversations
      };
    },
  });

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium text-sm">Record Engagement</h3>
              <p className="text-xs text-muted-foreground">
                {engagementStats?.totalPeers || 0} peers engaged in {engagementStats?.totalConversations || 0} conversations
              </p>
            </div>
          </div>
          <Button
            variant="default"
            className="text-black h-8 text-xs"
            onClick={onNewEngagement}
          >
            New Engagement
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};