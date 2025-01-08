import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Mars, Venus, CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface GenderStepProps {
  formData: {
    gender: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const GenderStep = ({ formData, onChange, onNext, onBack }: GenderStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Tell us about yourself! 💫</h2>
        <p className="text-muted-foreground">Choose your gender</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className={`p-6 cursor-pointer transition-all hover:scale-105 ${
            formData.gender === "male"
              ? "border-primary bg-primary/10"
              : "hover:border-primary"
          }`}
          onClick={() => onChange("gender", "male")}
        >
          <div className="flex flex-col items-center space-y-4">
            <Mars className="w-16 h-16 text-primary" />
            <span className="text-lg font-semibold">Male</span>
          </div>
        </Card>

        <Card
          className={`p-6 cursor-pointer transition-all hover:scale-105 ${
            formData.gender === "female"
              ? "border-primary bg-primary/10"
              : "hover:border-primary"
          }`}
          onClick={() => onChange("gender", "female")}
        >
          <div className="flex flex-col items-center space-y-4">
            <Venus className="w-16 h-16 text-primary" />
            <span className="text-lg font-semibold">Female</span>
          </div>
        </Card>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex justify-center space-x-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
          <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
          <Circle className="w-5 h-5 text-muted" />
          <Circle className="w-5 h-5 text-muted" />
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
            onClick={onNext}
            className="flex-1"
            disabled={!formData.gender}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};