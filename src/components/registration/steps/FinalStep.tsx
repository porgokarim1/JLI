import { NavigationButtons } from "../NavigationButtons";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FinalStepProps {
  formData: {
    termsAgreed: boolean;
  };
  onChange: (field: string, value: boolean) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export const FinalStep = ({ formData, onChange, onSubmit, onBack, isLoading }: FinalStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in pb-24 md:pb-0">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Almost there! 🎉</h2>
        <p className="text-muted-foreground">Please review and accept our terms</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={formData.termsAgreed}
            onCheckedChange={(checked) => onChange("termsAgreed", checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm">
            I agree to the Terms of Service and Privacy Policy
          </Label>
        </div>
      </div>

      <NavigationButtons
        onNext={onSubmit}
        onBack={onBack}
        nextLabel="Complete Registration"
        isNextDisabled={!formData.termsAgreed}
        isLoading={isLoading}
      />
    </div>
  );
};