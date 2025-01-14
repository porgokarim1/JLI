import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trophy, ChevronDown } from "lucide-react";

interface RewardTier {
  peers: number;
  reward: string;
}

const rewardTiers: RewardTier[] = [
  { peers: 7, reward: "Get first reward!" },
  { peers: 15, reward: "Get the 'Skilled Communicator' Certificate from Jewish Learning Institute" },
  { peers: 25, reward: "Participate in a grand raffle at the end of the semester" },
];

interface RewardTierInfoProps {
  currentPeers: number;
}

const RewardTierInfo = ({ currentPeers }: RewardTierInfoProps) => {
  const getNextTier = () => {
    return rewardTiers.find(tier => tier.peers > currentPeers) || rewardTiers[rewardTiers.length - 1];
  };

  const nextTier = getNextTier();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between bg-white hover:bg-gray-50 border-primary"
        >
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-primary" />
            <span className="text-sm">
              {currentPeers}/{nextTier.peers} peers needed for next reward
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-[calc(100vw-2rem)] sm:w-[400px] bg-white p-4 shadow-lg"
        align="start"
      >
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Reward Tiers</h4>
          <div className="space-y-3">
            {rewardTiers.map((tier, index) => (
              <div 
                key={index}
                className={`flex items-start gap-3 p-2 rounded-lg ${
                  currentPeers >= tier.peers ? 'bg-soft-green' : 'bg-gray-50'
                }`}
              >
                <Trophy 
                  className={`h-5 w-5 mt-0.5 ${
                    currentPeers >= tier.peers ? 'text-green-600' : 'text-gray-400'
                  }`} 
                />
                <div>
                  <p className="font-medium text-sm">Goal {index + 1}: {tier.peers} peers</p>
                  <p className="text-sm text-gray-600">{tier.reward}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RewardTierInfo;