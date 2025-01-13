import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavigationButtons } from "../NavigationButtons";

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
  const handleNext = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-24 md:pb-0 px-8 py-8">
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
          />
        </div>
      </div>

      <NavigationButtons
        showBack={false}
        showHome={true}
        onNext={handleNext}
        isNextDisabled={!formData.firstName.trim() || !formData.lastName.trim()}
        isLoading={isLoading}
        homeButtonClassName="text-gray-500 border-gray-500 hover:bg-gray-100"
      />
    </div>
  );
};

export default PersonalInfoStep;