import { Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface RewardTierInfoProps {
  totalPeers: number;
}

export const RewardTierInfo = ({ totalPeers }: RewardTierInfoProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const tiers = [
    { count: 7, reward: "Get cool merch!", color: "bg-yellow-400" },
    { count: 15, reward: "Get the 'Skilled Communicator' Certificate from Jewish Learning Institute", color: "bg-orange-400" },
    { count: 25, reward: "Participate in a grand raffle at the end of the semester.", color: "bg-pink-500" }
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
        <div className="mt-6 space-y-12 relative">
          {/* SVG Path connecting milestones */}
          <svg className="absolute top-0 left-8 h-full w-4 -z-10" preserveAspectRatio="none">
            <path
              d="M 20,0 C 20,50 0,100 20,150 C 40,200 20,250 20,300"
              stroke="#E5E7EB"
              strokeWidth="2"
              fill="none"
              className="path-line"
            />
          </svg>

          {tiers.map((tier, index) => (
            <div key={tier.count} className="relative flex items-start gap-6">
              <div className={`relative flex-shrink-0 w-10 h-10 rounded-full ${tier.color} flex items-center justify-center shadow-lg ${
                totalPeers >= tier.count ? 'animate-pulse-soft' : 'opacity-50'
              }`}>
                <span className="text-white font-bold">{tier.count}</span>
                {totalPeers >= tier.count && (
                  <div className="absolute -right-1 -top-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};