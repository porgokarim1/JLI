import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavigationButtons } from "../NavigationButtons";
import PhoneInput from "react-phone-number-input";

interface ContactInfoStepProps {
  formData: {
    email: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean;
}

export const ContactInfoStep = ({ formData, onChange, onNext, onBack, isLoading }: ContactInfoStepProps) => {
  const handleNext = () => {
    if (!formData.email.trim() || !formData.phone.trim()) {
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in pb-24 md:pb-0">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">How can we reach you? 📱</h2>
        <p className="text-muted-foreground">We'll use this to keep you updated</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <PhoneInput
            international
            defaultCountry="US"
            value={formData.phone}
            onChange={(value) => onChange("phone", value || "")}
          />
        </div>
      </div>

      <NavigationButtons
        onNext={handleNext}
        onBack={onBack}
        isNextDisabled={!formData.email.trim() || !formData.phone.trim()}
        isLoading={isLoading}
      />
    </div>
  );
};