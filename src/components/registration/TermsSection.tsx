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
    <div className="space-y-6">
      <div className="space-y-2">
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
        <p className="text-sm text-gray-500 ml-6">
          By agreeing to the program conditions, you acknowledge that you will participate in educational sessions, 
          engage respectfully with others, and maintain the confidentiality of sensitive discussions.
        </p>
      </div>

      <div className="space-y-2">
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
        <p className="text-sm text-gray-500 ml-6">
          This disclaimer covers your understanding that the program content may include sensitive topics, 
          and you agree to approach these discussions with maturity and respect for diverse perspectives.
        </p>
      </div>
    </div>
  );
};