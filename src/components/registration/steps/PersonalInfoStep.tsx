import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useRef } from 'react';

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
  const handleLastNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && formData.firstName.trim() && formData.lastName.trim()) {
      e.preventDefault();
      onNext();
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Let's get to know you! 👋</h2>
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
            onKeyDown={handleLastNameKeyDown}
          />
        </div>
      </div>

      <NavigationButtons
        showBack={false}
        showHome={true}
        onNext={onNext}
        isNextDisabled={!formData.firstName.trim() || !formData.lastName.trim()}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PersonalInfoStep;