import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, FilePenLine} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { RewardTierInfo } from "./RewardTierInfo";

interface EngagementCardProps {
  onNewEngagement: () => void;
  onEditEngagement: (engagement: any) => void;
  recentEngagements: any[];
}

export const EngagementCard = ({ onNewEngagement, onEditEngagement, recentEngagements }: EngagementCardProps) => {
  const { data: totalPeers = 0, isLoading } = useQuery({
    queryKey: ["total-peers"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return 0;

      const { data, error } = await supabase
        .from("conversations")
        .select("participant_count")
        .eq("user_id", user.id);

      if (error) throw error;

      const total = data.reduce((sum, conv) => sum + (conv.participant_count || 0), 0);
      return total;
    },
  });

  const getComfortEmoji = (comfort_level: string) => {
    switch (comfort_level) {
      case "very_comfortable":
        return "😄";
      case "comfortable":
        return "🙂";
      case "uncomfortable":
        return "😕";
      case "very_uncomfortable":
        return "😣";
      default:
        return "😐";
    }
  };

  const getPeersIcon = (count: number) => {
    if (count === 1) return "👤";
    if (count === 2) return "👥";
    if (count === 3) return "👤👥";
    return "👥👤+";
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Handshake className="h-6 w-6 text-primary" />
            <div className="flex-1">
              <Link to="/about">
                <p className="text-lg font-semibold text-black">Engage with Peers</p>
              </Link>
            </div>
          </div>
          <Button
            variant="default"
            className="text-black h-8 text-xs ml-4"
            onClick={onNewEngagement}
          >
            Log
          </Button>
        </div>

        {isLoading ? (
          <p className="text-lg font-semibold text-black">Loading...</p>
        ) : (
          <RewardTierInfo totalPeers={totalPeers} />
        )}

        <div className="pt-4">
          <p className="text-sm font-semibold text-black whitespace-pre-line mb-3">
            Conversations
          </p>
          <div className="space-y-2">
            {recentEngagements.length > 0 ? (
              recentEngagements.map((engagement) => (
                <div
                  key={engagement.id}
                  className="flex items-center justify-between py-2 border-t border-gray-200"
                >
                  <div className="grid grid-cols-4 gap-1 items-center min-w-0 flex-1 divide-x divide-gray-200">
                    <span className="text-sm text-gray-600 whitespace-nowrap px-1">
                      {format(new Date(engagement.conversation_date), "MMM d")}
                    </span>
                    <span className="text-lg px-1 text-center">
                      {getComfortEmoji(engagement.comfort_level || "")}
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
        </div>
      </CardContent>
    </Card>
  );
};
