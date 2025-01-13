import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FilePenLine, MessageSquare, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface EngagementCardProps {
  onNewEngagement: () => void;
  onEditEngagement: (engagement: any) => void;
  recentEngagements: any[];
}

export const EngagementCard = ({ onNewEngagement, onEditEngagement, recentEngagements }: EngagementCardProps) => {
  const { data: totalPeers = 0, isLoading } = useQuery({
    queryKey: ['total-peers'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return 0;

      const { data, error } = await supabase
        .from('conversations')
        .select('participant_count')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching conversations:', error);
        throw error;
      }
      
      const total = data.reduce((sum, conv) => sum + (conv.participant_count || 0), 0);
      return total;
    }
  });

  const getNextTarget = (count: number) => {
    if (count < 7) return 7;
    if (count < 15) return 15;
    return 25;
  };

  const nextTarget = getNextTarget(totalPeers);

  const getComfortEmoji = (comfort_level: string) => {
    switch (comfort_level) {
      case 'very_comfortable':
        return '😄';
      case 'comfortable':
        return '🙂';
      case 'uncomfortable':
        return '😕';
      case 'very_uncomfortable':
        return '😣';
      default:
        return '😐';
    }
  };

  const getPeersIcon = (count: number) => {
    if (count === 1) return '👤';
    if (count === 2) return '👥';
    if (count === 3) return '👤👥';
    return '👥👤+';
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium text-sm">Engagements</h3>
              <p className="text-xs text-muted-foreground">
                {isLoading ? "Loading..." : `${totalPeers}/${nextTarget} peers`}
              </p>
            </div>
          </div>
          <Button 
            variant="default"
            className="text-black h-8 text-xs"
            onClick={onNewEngagement}
          >
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {recentEngagements.length > 0 ? (
            recentEngagements.map((engagement) => (
              <div 
                key={engagement.id}
                className="flex items-center justify-between py-2 border-t border-gray-200"
              >
                <div className="grid grid-cols-4 gap-2 items-center min-w-0 flex-1 divide-x divide-gray-200">
                  <span className="text-sm text-gray-600 whitespace-nowrap px-2">
                    {format(new Date(engagement.conversation_date), 'MMM d')}
                  </span>
                  <span className="text-lg px-2 text-center">
                    {getComfortEmoji(engagement.comfort_level || '')}
                  </span>
                  <span className="text-sm whitespace-nowrap px-2 text-center">
                    {getPeersIcon(engagement.participant_count)}
                  </span>
                  <div className="px-2 min-w-0">
                    {engagement.comments && (
                      <span className="text-sm text-gray-600 truncate">
                        {engagement.comments}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditEngagement(engagement)}
                  className="h-8 w-8 text-gray-400 hover:text-primary shrink-0 ml-2"
                >
                  <FilePenLine className="h-4 w-4" />
                  <span className="sr-only">Edit engagement</span>
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 text-sm">
              No engagement recorded. Start <button onClick={onNewEngagement} className="text-primary hover:underline">here</button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
