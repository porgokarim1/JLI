import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { NavigationButtons } from "../NavigationButtons";

interface GenderStepProps {
  formData: {
    gender: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export const GenderStep = ({ formData, onChange, onNext, onBack, isLoading }: GenderStepProps) => {
  const handleNext = () => {
    if (!formData.gender) {
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-24 md:pb-0">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">One more thing...</h2>
        <p className="text-muted-foreground">Help us understand our community better</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Select Your Gender</Label>
          <RadioGroup
            value={formData.gender}
            onValueChange={(value) => onChange("gender", value)}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="prefer_not_to_say" id="prefer_not_to_say" />
              <Label htmlFor="prefer_not_to_say">Prefer not to say</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <NavigationButtons
        onNext={handleNext}
        onBack={onBack}
        isNextDisabled={!formData.gender}
        isLoading={isLoading}
      />
    </div>
  );
};