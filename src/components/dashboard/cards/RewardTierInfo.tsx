import { Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface RewardTierInfoProps {
  totalPeers: number;
}

export const RewardTierInfo = ({ totalPeers }: RewardTierInfoProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const tiers = [
    { count: 7, reward: "Get cool merch!" },
    { count: 15, reward: "Get the 'Skilled Communicator' Certificate from Jewish Learning Institute" },
    { count: 25, reward: "Participate in a grand raffle at the end of the semester." }
  ];

  const getProgress = (count: number) => {
    if (totalPeers >= count) return 100;
    const prevTier = tiers[tiers.findIndex(t => t.count === count) - 1]?.count || 0;
    const progress = ((totalPeers - prevTier) / (count - prevTier)) * 100;
    return Math.max(0, Math.min(100, progress));
  };

  return (
    <div className="border-t border-gray-200 pt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="font-medium">Reward Tiers</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {tiers.map((tier, index) => (
            <div key={tier.count} className="relative">
              <div className="flex items-center gap-3 mb-2">
                <span className={`font-medium ${totalPeers >= tier.count ? 'text-green-600' : 'text-gray-600'}`}>
                  Goal {index + 1}: {tier.count} peers
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${getProgress(tier.count)}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">{tier.reward}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};