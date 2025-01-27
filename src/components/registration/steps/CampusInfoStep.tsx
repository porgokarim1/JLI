import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { CampusSelector } from "../CampusSelector";

interface CampusInfoStepProps {
  formData: {
    campus: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const CampusInfoStep = ({ formData, onChange, onNext, onBack, isLoading }: CampusInfoStepProps) => {
  return (
    <div className="space-y-6 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Almost there! 🎓</h2>
      </div>

      <div className="space-y-4 px-4">
        <div>
          <Label htmlFor="campus">Your Campus</Label>
          <CampusSelector
            value={
              formData.campus
                ? { value: formData.campus, label: formData.campus }
                : null
            }
            onChange={(selectedOption) =>
              onChange("campus", selectedOption?.value || "")
            }
          />
        </div>
      </div>

      <div className="px-4">
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
              onClick={onNext}
              className="flex-1"
              disabled={isLoading || !formData.campus}
            >
              {isLoading ? "Registering..." : "Done ✔️"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};