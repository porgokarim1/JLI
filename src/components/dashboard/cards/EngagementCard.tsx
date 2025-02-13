
import { Button } from "@/components/ui/button";
import { FilePenLine, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { RewardTierInfo } from "./RewardTierInfo";
import { Link } from "react-router-dom";

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

  const formatDisplayDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return format(date, "MM/dd/yyyy");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="relative flex flex-col">
          <Link to="/about" className="font-bold text-lg text-center">
            <span className="relative">
              <span className="relative z-10">ENGAGE WITH PEERS</span>
              <span className="absolute bottom-0 left-0 w-full h-[10px] bg-[#FFD700] -z-0"></span>
            </span>
          </Link>
        </div>
        <div>
          <Link to="/about" className="block">
            <h3 className="text-base font-bold text-black">CONGRATS, YOU'VE ENGAGED</h3>
          </Link>
          <div className="flex justify-between items-center mt-2">
            <div className="relative">
              <Link to="/about" className="text-base font-bold">
                <span className="relative">
                  <span className="relative z-10">{totalPeers} PEERS</span>
                  <span className="absolute bottom-0 left-0 w-full h-[8px] bg-[#FFD700] -z-0"></span>
                </span>
              </Link>
            </div>
            <Button
              variant="default"
              onClick={onNewEngagement}
              className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold rounded px-6"
            >
              Log
            </Button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <p className="text-lg font-semibold text-[#1A1F2C]">Loading...</p>
      ) : (
        <RewardTierInfo totalPeers={totalPeers} />
      )}

      <div className="space-y-4">
        <div className="flex justify-center">
          <span className="text-base font-bold text-black relative inline-block">
            <span className="relative">
              <span className="relative z-10">CONVERSATIONS</span>
              <span className="absolute bottom-0 left-0 w-full h-[8px] bg-[#FFD700] -z-0"></span>
            </span>
          </span>
        </div>
        <div className="space-y-2">
          {recentEngagements.map((engagement) => (
            <div
              key={engagement.id}
              onClick={() => onEditEngagement(engagement)}
              className="bg-gray-100 rounded-lg p-4 cursor-pointer hover:bg-gray-200 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {formatDisplayDate(engagement.conversation_date)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {engagement.comments}
                  </p>
                </div>

                <div className="flex items-center gap-4 pl-4 border-l border-gray-300">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">{engagement.participant_count}</span>
                  </div>
                  <span className="text-xl">
                    {getComfortEmoji(engagement.comfort_level || "")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
