import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Share2, Copy } from "lucide-react";

interface ReferralCardProps {
  onShareLink: () => void;
}

export const ReferralCard = ({ onShareLink }: ReferralCardProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gift className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium text-sm">Referral Program</h3>
              <p className="text-xs text-muted-foreground">Invite friends & earn rewards</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <div className="bg-gray-100 px-2 py-1 rounded text-xs flex items-center">
                <span className="mr-1">{window.location.origin}/register</span>
                <Copy className="h-3 w-3 text-gray-500" />
              </div>
              <Button 
                variant="default" 
                size="sm" 
                className="h-8 text-xs flex items-center gap-2 text-black bg-[#8E9196] hover:bg-[#8E9196]/90"
                onClick={onShareLink}
              >
                <Share2 className="h-4 w-4" />
                Share Link
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">0 referrals</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};