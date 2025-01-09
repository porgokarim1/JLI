import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface EngagementCardProps {
  onNewEngagement: () => void;
}

export const EngagementCard = ({ onNewEngagement }: EngagementCardProps) => {
  const { data: totalPeers = 0 } = useQuery({
    queryKey: ['total-peers'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return 0;

      const { data, error } = await supabase
        .from('conversations')
        .select('participant_count')
        .eq('user_id', user.id);

      if (error) throw error;
      return data.reduce((sum, conv) => sum + (conv.participant_count || 0), 0);
    }
  });

  const getNextTarget = (count: number) => {
    if (count < 7) return 7;
    if (count < 15) return 15;
    return 25;
  };

  const nextTarget = getNextTarget(totalPeers);

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Handshake className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium text-sm">Engagements</h3>
              <p className="text-xs text-muted-foreground">{totalPeers}/{nextTarget} peers</p>
            </div>
          </div>
          <Button 
            variant="default"
            className="text-black h-8 text-xs"
            onClick={onNewEngagement}
          >
            <Plus className="h-4 w-4 mr-1" /> New
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};