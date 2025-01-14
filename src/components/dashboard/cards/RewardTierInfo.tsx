import { Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface RewardTierInfoProps {
  totalPeers: number;
}

export const RewardTierInfo = ({ totalPeers }: RewardTierInfoProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const tiers = [
    { count: 7, reward: "Get cool merch!", color: "bg-soft-orange" },
    { count: 15, reward: "Get the 'Skilled Communicator' Certificate from Jewish Learning Institute", color: "bg-soft-purple" },
    { count: 25, reward: "Participate in a grand raffle at the end of the semester.", color: "bg-soft-pink" }
  ];

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
        <div className="mt-8 space-y-16 relative px-4">
          {/* Decorative background path */}
          <svg 
            className="absolute top-0 left-12 h-full w-4 -z-10" 
            preserveAspectRatio="none"
            viewBox="0 0 50 400"
          >
            <path
              d="M25,0 C50,100 0,200 25,300 C50,400 25,500 25,600"
              stroke="#E5E7EB"
              strokeWidth="3"
              strokeDasharray="5,5"
              fill="none"
              className="path-line"
            />
          </svg>

          {tiers.map((tier, index) => (
            <div key={tier.count} className="relative flex items-start gap-6">
              {/* Connection line to next milestone */}
              {index < tiers.length - 1 && (
                <div className="absolute left-6 top-10 h-16 w-0.5 bg-gradient-to-b from-gray-200 to-transparent -z-10" />
              )}

              {/* Milestone circle */}
              <div 
                className={`relative flex-shrink-0 w-12 h-12 rounded-full ${tier.color} 
                  flex items-center justify-center shadow-lg 
                  ${totalPeers >= tier.count ? 'animate-float' : 'opacity-70'}
                  transition-all duration-300 ease-in-out`}
              >
                <span className="text-gray-700 font-bold">{tier.count}</span>
                {totalPeers >= tier.count && (
                  <div className="absolute -right-1 -top-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center animate-pulse-soft">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>

              {/* Reward content */}
              <div className="flex-1 pt-2">
                <span className={`font-medium ${totalPeers >= tier.count ? 'text-green-600' : 'text-gray-600'}`}>
                  {tier.reward}
                </span>
                {totalPeers >= tier.count && (
                  <span className="ml-2 text-sm text-green-500">Achieved!</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};