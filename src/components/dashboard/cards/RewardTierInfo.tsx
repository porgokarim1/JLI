
import { Shirt, Scroll, Gift } from "lucide-react";
interface RewardTierInfoProps {
  totalPeers: number;
}

export const RewardTierInfo = ({ totalPeers }: RewardTierInfoProps) => {
  const tiers = [
    {
      count: 7,
      title: "GOAL 1",
      subtitle: "7 Peers",
      reward: "Score cool merch!",
      achieved: totalPeers >= 7,
      remaining: Math.max(0, 7 - totalPeers),
      icon: Shirt,
    },
    {
      count: 15,
      title: "GOAL 2",
      subtitle: "15 Peers",
      reward: "Receive the Skilled Communicator Certificate",
      achieved: totalPeers >= 15,
      remaining: Math.max(0, 15 - totalPeers),
      icon: Scroll,
    },
    {
      count: 25,
      title: "GOAL 3",
      subtitle: "25 Peers",
      reward: "Participate in our grand raffle at the end of the semester (drawing on June 1st).",
      achieved: totalPeers >= 25,
      remaining: Math.max(0, 25 - totalPeers),
      icon: Gift,
    },
  ];

  return (
    <div className="relative space-y-4 py-4">
      <div className="space-y-6">
        {tiers.map((tier, index) => {
          const Icon = tier.icon;
          return (
            <div
              key={tier.title}
              className={`relative flex items-start gap-4 p-4 rounded-xl transition-all ${
                tier.achieved 
                  ? 'bg-soft-yellow border-2 border-black' 
                  : 'bg-gray-100'
              }`}
            >
              <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                tier.achieved ? 'bg-primary text-black' : 'bg-gray-300 text-gray-600'
              }`}>
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h5 className="font-bold text-sm">{tier.title}</h5>
                    <p className="text-sm text-gray-600 font-medium">{tier.subtitle}</p>
                  </div>
                  {tier.achieved && (
                    <span className="bg-primary px-2 py-0.5 rounded-md text-xs font-bold">
                      ACHIEVED!
                    </span>
                  )}
                  {!tier.achieved && tier.remaining > 0 && (
                    <span className="bg-gray-200 px-2 py-0.5 rounded-md text-xs font-medium">
                      {tier.remaining} PEERS TO GOAL
                    </span>
                  )}
                </div>
                <p className="text-sm mt-1">{tier.reward}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
