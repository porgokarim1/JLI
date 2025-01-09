import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Share2 } from "lucide-react";

interface ReferralCardProps {
  onShareLink: () => void;
}

export const ReferralCard = ({ onShareLink }: ReferralCardProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-3">
            <Gift className="h-6 w-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-medium text-sm">Referral Program</h3>
              <p className="text-xs text-muted-foreground">Invite friends & earn rewards</p>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button 
              variant="default" 
              size="sm" 
              className="w-full text-xs flex items-center justify-center gap-2 text-black bg-[#8E9196] hover:bg-[#8E9196]/90"
              onClick={onShareLink}
            >
              <Share2 className="h-4 w-4" />
              Share Link
            </Button>
            <p className="text-xs text-muted-foreground text-center">0 referrals</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};