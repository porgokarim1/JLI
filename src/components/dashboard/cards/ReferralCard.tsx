import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, Mail } from "lucide-react";

interface ReferralCardProps {
  onShareLink: () => void;
  onEmailShare: () => void;
}

export const ReferralCard = ({ onShareLink, onEmailShare }: ReferralCardProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-3">
            <Megaphone className="h-6 w-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-medium text-sm">Referral</h3>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs flex items-center justify-center gap-2 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
              onClick={onShareLink}
            >
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs flex items-center justify-center gap-2 border-gray-200 hover:bg-gray-100 hover:text-gray-900"
              onClick={onEmailShare}
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};