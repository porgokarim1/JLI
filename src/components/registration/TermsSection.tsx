import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TermsSectionProps {
  formData: {
    agreeToTerms: boolean;
    agreeToDisclaimer: boolean;
  };
  onChange: (field: string, value: boolean) => void;
}

export const TermsSection = ({ formData, onChange }: TermsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          required
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => 
            onChange("agreeToTerms", checked as boolean)
          }
        />
        <Label htmlFor="terms">I agree to the program conditions</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="disclaimer" 
          required
          checked={formData.agreeToDisclaimer}
          onCheckedChange={(checked) => 
            onChange("agreeToDisclaimer", checked as boolean)
          }
        />
        <Label htmlFor="disclaimer">I agree to the program disclaimer</Label>
      </div>
    </div>
  );
};