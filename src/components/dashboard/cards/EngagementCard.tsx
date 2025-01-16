import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, FilePenLine, ChevronDown, ChevronUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { useState } from "react";
import { RewardTierInfo } from "./RewardTierInfo";

interface EngagementCardProps {
  onNewEngagement: () => void;
  onEditEngagement: (engagement: any) => void;
  recentEngagements: any[];
}

export const EngagementCard = ({ onNewEngagement, onEditEngagement, recentEngagements }: EngagementCardProps) => {
  const [showEngagements, setShowEngagements] = useState(true);
  
  const { data: totalPeers = 0, isLoading } = useQuery({
    queryKey: ['total-peers'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return 0;

      const { data, error } = await supabase
        .from('conversations')
        .select('participant_count')
        .eq('user_id', user.id);

      if (error) throw error;
      
      const total = data.reduce((sum, conv) => sum + (conv.participant_count || 0), 0);
      return total;
    }
  });

  const getNextTarget = (count: number) => {
    if (count < 7) return 7;
    if (count < 15) return 15;
    return 25;
  };

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

  const getProgressMessage = (count: number) => {
    const nextTarget = getNextTarget(count);
    const remaining = nextTarget - count;
    return `Congrats, you've engaged ${count} ${count === 1 ? 'peer' : 'peers'}.\n${remaining} more to reach goal ${nextTarget === 7 ? '1' : nextTarget === 15 ? '2' : '3'}`;
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {isLoading ? (
              <p className="text-lg font-semibold text-black">Loading...</p>
            ) : totalPeers > 0 ? (
              <p className="text-lg font-semibold text-black whitespace-pre-line">
                {getProgressMessage(totalPeers)}
              </p>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 rounded-full p-2">
                  <Handshake className="h-5 w-5 text-yellow-600" />
                </div>
                <p className="text-lg font-semibold text-black">Engage with peers</p>
              </div>
            )}
          </div>
          <Button 
            variant="default"
            className="text-black h-8 text-xs ml-4"
            onClick={onNewEngagement}
          >
            Log
          </Button>
        </div>

        <RewardTierInfo totalPeers={totalPeers} />

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Conversations</span>
            {recentEngagements.length > 0 && (
              <button
                onClick={() => setShowEngagements(!showEngagements)}
                className="flex items-center"
              >
                {showEngagements ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
            )}
          </div>

          {showEngagements && (
            <div className="space-y-2">
              {recentEngagements.length > 0 ? (
                recentEngagements.map((engagement) => (
                  <div 
                    key={engagement.id}
                    className="flex items-center justify-between py-2 border-t border-gray-200"
                  >
                    <div className="grid grid-cols-4 gap-1 items-center min-w-0 flex-1 divide-x divide-gray-200">
                      <span className="text-sm text-gray-600 whitespace-nowrap px-1">
                        {format(new Date(engagement.conversation_date), 'MMM d')}
                      </span>
                      <span className="text-lg px-1 text-center">
                        {getComfortEmoji(engagement.comfort_level || '')}
                      </span>
                      <span className="text-sm whitespace-nowrap px-1 text-center">
                        {getPeersIcon(engagement.participant_count)}
                      </span>
                      <div className="px-1 min-w-0 pr-10 relative">
                        {engagement.comments && (
                          <span className="text-sm text-gray-600 block truncate">
                            {engagement.comments}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditEngagement(engagement)}
                      className="h-8 w-8 text-gray-400 hover:text-primary shrink-0 ml-1 absolute right-4"
                    >
                      <FilePenLine className="h-4 w-4" />
                      <span className="sr-only">Edit engagement</span>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No conversation logged yet
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};