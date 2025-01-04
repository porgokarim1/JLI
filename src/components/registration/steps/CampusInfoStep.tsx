import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CampusSelector } from "../CampusSelector";

interface CampusInfoStepProps {
  formData: {
    campus: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CampusInfoStep = ({ formData, onChange, onNext, onBack }: CampusInfoStepProps) => {
  const handleNext = () => {
    if (!formData.campus) {
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Almost there! 🎓</h2>
        <p className="text-muted-foreground">Tell us about your campus</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="campus">Your Campus</Label>
          <CampusSelector
            value={formData.campus}
            onChange={(value) => onChange("campus", value)}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="flex-1"
          disabled={!formData.campus}
        >
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};