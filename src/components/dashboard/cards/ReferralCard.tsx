import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Share2, Mail } from "lucide-react";
import { toast } from "sonner";

interface ReferralCardProps {
  onShareLink: () => void;
  onEmailShare: () => void;
}

const REFERRAL_URL = "https://preview--app-collaborate-hub.lovable.app/register";

export const ReferralCard = ({ onShareLink, onEmailShare }: ReferralCardProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-3">
            <Gift className="h-6 w-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-medium text-sm">Referral Program</h3>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex gap-2">
              <Button 
                variant="default" 
                size="sm" 
                className="flex-1 text-xs flex items-center justify-center gap-2 text-black bg-[#8E9196] hover:bg-[#8E9196]/90"
                onClick={onShareLink}
              >
                <Share2 className="h-4 w-4" />
                Share Link
              </Button>
              <Button
                variant="default"
                size="sm"
                className="flex-1 text-xs flex items-center justify-center gap-2 text-black bg-[#8E9196] hover:bg-[#8E9196]/90"
                onClick={onEmailShare}
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center">0 referrals</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};