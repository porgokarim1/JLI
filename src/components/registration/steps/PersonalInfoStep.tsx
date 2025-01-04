import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PersonalInfoStepProps {
  formData: {
    firstName: string;
    lastName: string;
    middleName: string;
    gender: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PersonalInfoStep = ({ formData, onChange, onNext, onBack }: PersonalInfoStepProps) => {
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.gender) {
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Let's get to know you! 👋</h2>
        <p className="text-muted-foreground">Tell us about yourself</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="firstName">Your First Name</Label>
          <Input
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            className="border-primary focus:ring-primary"
          />
        </div>

        <div>
          <Label htmlFor="middleName">Your Middle Name (Optional)</Label>
          <Input
            id="middleName"
            value={formData.middleName}
            onChange={(e) => onChange("middleName", e.target.value)}
            className="border-primary focus:ring-primary"
          />
        </div>

        <div>
          <Label htmlFor="lastName">Your Last Name</Label>
          <Input
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            className="border-primary focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
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
          </RadioGroup>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <Button 
          onClick={handleNext}
          className="w-full"
          disabled={!formData.firstName.trim() || !formData.lastName.trim() || !formData.gender}
        >
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="w-full border-primary text-primary hover:bg-primary/10"
        >
          <Home className="mr-2 h-4 w-4" />
          Back to Main Page
        </Button>
      </div>
    </div>
  );
};