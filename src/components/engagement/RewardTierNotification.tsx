import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Award, Gift } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import confetti from 'canvas-confetti';
import RewardClaimForm from "./RewardClaimForm";

interface RewardTierNotificationProps {
  conversationCount: number;
}

const RewardTierNotification = ({ conversationCount }: RewardTierNotificationProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const getTierLevel = (count: number) => {
    if (count >= 25) return 3;
    if (count >= 12) return 2;
    if (count >= 7) return 1;
    return 0;
  };

  const getTierMessage = (tier: number) => {
    switch (tier) {
      case 3:
        return "Gold Tier (25+ conversations)";
      case 2:
        return "Silver Tier (12+ conversations)";
      case 1:
        return "Bronze Tier (7+ conversations)";
      default:
        return "";
    }
  };

  useEffect(() => {
    const checkRewardStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('reward_claimed, reward_tier_form_submitted')
        .eq('id', user.id)
        .single();

      if (profile) {
        setRewardClaimed(profile.reward_claimed || false);
        setFormSubmitted(profile.reward_tier_form_submitted || false);
      }
    };

    checkRewardStatus();
  }, []);

  useEffect(() => {
    const tier = getTierLevel(conversationCount);
    const shouldShowDialog = (
      (tier === 1 && conversationCount === 7) ||
      (tier === 2 && conversationCount === 12) ||
      (tier === 3 && conversationCount === 25)
    ) && !rewardClaimed;

    if (shouldShowDialog) {
      setShowDialog(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [conversationCount, rewardClaimed]);

  const handleClaimLater = async () => {
    setShowDialog(false);
    toast.success("You can claim your reward later from the dashboard");
  };

  if (!getTierLevel(conversationCount)) return null;

  return (
    <>
      {!rewardClaimed && !formSubmitted && (
        <Button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black"
        >
          <Gift className="h-5 w-5" />
          Claim Your Reward
        </Button>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-yellow-400" />
              Congratulations!
            </DialogTitle>
            <DialogDescription>
              You've reached {getTierMessage(getTierLevel(conversationCount))}!
              You're eligible for a special reward. Would you like to claim it now?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => {
                setShowDialog(false);
                setShowForm(true);
              }}
              className="bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              Claim Now
            </Button>
            <Button
              variant="outline"
              onClick={handleClaimLater}
            >
              Claim Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <RewardClaimForm
        open={showForm}
        onOpenChange={setShowForm}
        onSuccess={() => {
          setShowForm(false);
          setRewardClaimed(true);
          setFormSubmitted(true);
        }}
      />
    </>
  );
};

export default RewardTierNotification;