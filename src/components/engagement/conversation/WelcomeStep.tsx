import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface WelcomeStepProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeStep = ({ isOpen, onClose }: WelcomeStepProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl">Yay! Tell us about your conversation! 🎉</DialogTitle>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            We're excited to hear about your meaningful conversations! Please share your experience with us.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};