import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, Mail, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ReferralCardProps {
  onShareLink: () => void;
  onEmailShare: () => void;
}

export const ReferralCard = ({ onShareLink, onEmailShare }: ReferralCardProps) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join me in the Know Israel Program",
          text: "Hey! Want to learn how to communicate about Israel? Join here",
          url: 'https://knowisrael.app'
        });
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText('https://knowisrael.app');
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      toast.error('Failed to share');
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-3">
            <Megaphone className="h-6 w-6 text-primary flex-shrink-0" />
            <div>
              <h3 className="font-medium text-sm">Refer a Friend</h3>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs flex items-center justify-center gap-2 border-[#878787] text-[#878787] hover:bg-[#878787]/10 hover:text-[#878787] hover:border-[#878787]"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs flex items-center justify-center gap-2 border-[#878787] text-[#878787] hover:bg-[#878787]/10 hover:text-[#878787] hover:border-[#878787]"
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