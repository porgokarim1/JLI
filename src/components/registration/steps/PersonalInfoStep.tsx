import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PersonalInfoStepProps {
  formData: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
}

export const PersonalInfoStep = ({ formData, onChange, onNext }: PersonalInfoStepProps) => {
  const handleNext = () => {
    if (!formData.firstName || !formData.lastName) {
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Hey there! 👋</h2>
        <p className="text-muted-foreground">Let's start with your name</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            className="border-primary focus:ring-primary"
          />
        </div>

        <div>
          <Label htmlFor="middleName">Middle Name (Optional)</Label>
          <Input
            id="middleName"
            value={formData.middleName}
            onChange={(e) => onChange("middleName", e.target.value)}
            className="border-primary focus:ring-primary"
          />
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            className="border-primary focus:ring-primary"
          />
        </div>
      </div>

      <Button 
        onClick={handleNext}
        className="w-full"
        disabled={!formData.firstName || !formData.lastName}
      >
        Next Step
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};