import { Shirt, Scroll, Gift } from "lucide-react";

interface RewardTierInfoProps {
  totalPeers: number;
}

export const RewardTierInfo = ({ totalPeers }: RewardTierInfoProps) => {
  const tiers = [
    {
      count: 7,
      title: "Cool Merch",
      subtitle: "7 peers",
      reward: "Score cool merch!",
      color: "bg-soft-orange",
      icon: Shirt,
    },
    {
      count: 15,
      title: "Communicator Certificate",
      subtitle: "15 peers",
      reward: "Receive the Skilled Communicator Certificate",
      color: "bg-soft-purple",
      icon: Scroll,
    },
    {
      count: 25,
      title: "Grand Raffle",
      subtitle: "25 peers",
      reward: "Participate in our grand raffle at the end of the semester (drawing on June 1st).",
      color: "bg-soft-pink",
      icon: Gift,
    },
  ];

  const getNextTarget = (count: number) => {
    if (count < 7) return 7;
    if (count < 15) return 15;
    return 25;
  };

  const getProgressMessage = (count: number) => {
    const nextTarget = getNextTarget(count);
    const remaining = nextTarget - count;

    if (count === 0) {
      return `No peers engaged yet. ${remaining} more needed to reach the first goal!`;
    }

    const goalNumber = nextTarget === 7 ? 1 : nextTarget === 15 ? 2 : 3;

    return `Congrats, you've engaged ${count} ${count === 1 ? "peer" : "peers"}.\n${remaining} more to reach goal ${goalNumber}`;
  };

  return (
    <div className="border-t border-gray-200 space-y-6">
      <p className="text-sm text-grey whitespace-pre-line mt-2">
        {getProgressMessage(totalPeers)}
      </p>
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
                  ${totalPeers >= tier.count ? "transition-transform duration-700 hover:scale-110" : "opacity-70"}
                  transition-all duration-300 ease-in-out`}
              >
                {/* Círculo verde alrededor del ícono solo si se alcanzó el objetivo */}
                {totalPeers >= tier.count && (
                  <div className="absolute inset-0 rounded-full border-4 border-green-500 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-gray-700" />
                  </div>
                )}
                {totalPeers < tier.count && (
                  <Icon className="h-6 w-6 text-gray-700" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{tier.title}</span>
                  <span
                    className={`text-sm text-gray-600 font-medium ${totalPeers >= tier.count ? 'text-green-600' : ''}`}
                  >
                    {tier.subtitle}
                  </span>
                </div>
                <span
                  className={`text-sm mt-1 block text-gray-600`}
                >
                  {tier.reward}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};