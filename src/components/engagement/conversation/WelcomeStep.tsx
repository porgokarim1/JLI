import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface WelcomeStepProps {
  form: UseFormReturn<any>;
  onNext: () => void;
}

const WelcomeStep = ({ form, onNext }: WelcomeStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl">Yay! Tell us about your conversation! 🎉</DialogTitle>
            <button className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>
        <p className="text-muted-foreground">
          We're excited to hear about your meaningful conversations! Please share your experience with us.
        </p>
      </div>

      <button 
        onClick={onNext}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md transition-colors"
      >
        Next Step
      </button>
    </div>
  );
};

export default WelcomeStep;