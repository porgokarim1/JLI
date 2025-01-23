import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Check } from "lucide-react";
import { TermsSection } from "../TermsSection";

interface FinalStepProps {
  formData: {
    agreeToTerms: boolean;
    agreeToDisclaimer: boolean;
  };
  onChange: (field: string, value: boolean) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const FinalStep = ({ formData, onChange, onSubmit, onBack, isLoading }: FinalStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Welcome!🎉</h2>
        <p className="text-muted-foreground">Thank you for joining the Know Israel program. We're excited to have you on board!</p>
      </div>

      <TermsSection
        formData={formData}
        onChange={onChange}
      />

      <div className="flex flex-col space-y-4">
        <div className="flex justify-center space-x-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
          <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
          <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
          <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
        </div>

        <div className="flex gap-4">
          <Button 
            variant="outline"
            onClick={onBack}
            className="flex-1"
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button 
            onClick={onSubmit}
            className="flex-1"
            disabled={isLoading || !formData.agreeToTerms || !formData.agreeToDisclaimer}
          >
            {isLoading ? (
              "Registering..."
            ) : (
              <>
                Complete Registration
                <Check className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};