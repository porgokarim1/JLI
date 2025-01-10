import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, CheckCircle2, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PersonalInfoStepProps {
  formData: {
    firstName: string;
    lastName: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const PersonalInfoStep = ({ formData, onChange, onNext, isLoading }: PersonalInfoStepProps) => {
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
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
            autoFocus
            value={formData.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="lastName">Your Last Name</Label>
          <Input
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex justify-center space-x-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
          <Circle className="w-5 h-5 text-muted" />
          <Circle className="w-5 h-5 text-muted" />
          <Circle className="w-5 h-5 text-muted" />
        </div>

        <Button 
          onClick={handleNext}
          className="w-full"
          disabled={!formData.firstName.trim() || !formData.lastName.trim() || isLoading}
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="w-full"
          disabled={isLoading}
        >
          <Home className="mr-2 h-4 w-4" />
          Back to Main Page
        </Button>
      </div>
    </div>
  );
};