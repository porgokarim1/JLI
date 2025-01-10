import { Label } from "@/components/ui/label";
import { NavigationButtons } from "../NavigationButtons";
import { CampusSelector } from "../CampusSelector";

interface CampusInfoStepProps {
  formData: {
    campus: string;
    organization: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export const CampusInfoStep = ({ formData, onChange, onNext, onBack, isLoading }: CampusInfoStepProps) => {
  const handleNext = () => {
    if (!formData.campus || !formData.organization) {
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-24 md:pb-0">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Where are you located? 🎓</h2>
        <p className="text-muted-foreground">Select your campus and organization</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Select Your Campus</Label>
          <CampusSelector
            value={formData.campus}
            onChange={(value) => onChange("campus", value)}
          />
        </div>
      </div>

      <NavigationButtons
        onNext={handleNext}
        onBack={onBack}
        isNextDisabled={!formData.campus || !formData.organization}
        isLoading={isLoading}
      />
    </div>
  );
};