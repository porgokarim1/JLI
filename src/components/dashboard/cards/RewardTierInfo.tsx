import { ChevronDown, ChevronUp, Shirt, Scroll, Gift } from "lucide-react";
import { useState } from "react";

interface RewardTierInfoProps {
  totalPeers: number;
}

export const RewardTierInfo = ({ totalPeers }: RewardTierInfoProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const tiers = [
    { 
      count: 7, 
      title: "Goal 1",
      subtitle: "7 peers",
      reward: "Score cool merch!", 
      color: "bg-soft-orange",
      icon: Shirt
    },
    { 
      count: 15, 
      title: "Goal 2",
      subtitle: "15 peers",
      reward: "Receive the Skilled Communicator Certificate", 
      color: "bg-soft-purple",
      icon: Scroll
    },
    { 
      count: 25, 
      title: "Goal 3",
      subtitle: "25 peers",
      reward: "Participate in our grand raffle at the end of the semester (Draw on June 1st 2025)", 
      color: "bg-soft-pink",
      icon: Gift
    }
  ];

  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-end w-full text-left text-gray-500 hover:text-gray-700 transition-colors"
      >
        {isExpanded ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>

      {isExpanded && (
        <div className="space-y-16 relative px-4">
          <div className="absolute top-6 left-[23px] w-0.5 h-[calc(100%-50px)] bg-gradient-to-b from-primary/30 to-primary/10 -z-10" />

          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <div key={tier.count} className="relative flex items-start gap-6">
                {index < tiers.length - 1 && (
                  <div className="absolute left-6 top-10 h-16 w-0.5 bg-primary/20" />
                )}

                <div 
                  className={`relative flex-shrink-0 w-12 h-12 rounded-full ${tier.color} 
                    flex items-center justify-center shadow-lg 
                    ${totalPeers >= tier.count ? 'transition-transform duration-700 hover:scale-110' : 'opacity-70'}
                    transition-all duration-300 ease-in-out`}
                >
                  <Icon className="h-6 w-6 text-gray-700" />
                  {totalPeers >= tier.count && (
                    <div className="absolute -right-1 -top-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">{tier.title}</span>
                    <span className="text-sm text-gray-600 font-medium">{tier.subtitle}</span>
                  </div>
                  <span className={`text-sm mt-1 block ${totalPeers >= tier.count ? 'text-green-600' : 'text-gray-600'}`}>
                    {tier.reward}
                  </span>
                  {totalPeers >= tier.count && (
                    <span className="ml-2 text-sm text-green-500">Achieved!</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};