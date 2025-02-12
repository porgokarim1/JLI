import { Button } from "@/components/ui/button";
import { Share2, Mail, Share } from "lucide-react";

interface ReferralCardProps {
  onShareLink: () => void;
  onEmailShare: () => void;
}

export const ReferralCard = ({ onShareLink, onEmailShare }: ReferralCardProps) => {
  return (
    <div className="space-y-4">
      <div className="relative flex justify-center mb-6">
        <Share className="absolute text-gray-100 h-12 w-12 -z-10" />
        <div className="relative">
          <span className="font-bold text-lg text-center">
            <span className="relative">
              <span className="relative z-10">REFER A FRIEND</span>
              <span className="absolute bottom-0 left-0 w-full h-[10px] bg-[#FFD700] -z-0"></span>
            </span>
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="default"
          className="flex-1 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold rounded-md"
          onClick={onShareLink}
        >
          <Share2 className="h-4 w-4" />
          Share Text
        </Button>
        <Button
          variant="default"
          className="flex-1 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black font-bold rounded-md"
          onClick={onEmailShare}
        >
          <Mail className="h-4 w-4" />
          Send Email
        </Button>
      </div>
    </div>
  );
};