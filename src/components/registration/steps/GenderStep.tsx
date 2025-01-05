import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Male, Female } from "lucide-react";
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
            <Male className="w-16 h-16 text-primary" />
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
            <Female className="w-16 h-16 text-primary" />
            <span className="text-lg font-semibold">Female</span>
          </div>
        </Card>
      </div>

      <div className="flex flex-col space-y-4">
        <Button
          onClick={onNext}
          className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
          disabled={!formData.gender}
        >
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          onClick={onBack}
          className="w-full border-primary text-primary hover:bg-primary/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
    </div>
  );
};