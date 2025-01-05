import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { toast } from "sonner";

interface ContactInfoStepProps {
  formData: {
    email: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const ContactInfoStep = ({ formData, onChange, onNext, onBack, onSubmit, isLoading }: ContactInfoStepProps) => {
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePhoneChange = (value: string | undefined) => {
    if (value && !isValidPhoneNumber(value)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    onChange("phone", value || "");
  };

  const handleNext = () => {
    if (!validateEmail(formData.email)) {
      return;
    }
    if (!formData.phone || !isValidPhoneNumber(formData.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Great! 🌟</h2>
        <p className="text-muted-foreground">How can we reach you?</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="border-primary focus:ring-primary"
          />
          {formData.email && !validateEmail(formData.email) && (
            <p className="text-sm text-red-500 mt-1">Please enter a valid email address</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <div className="phone-input-container">
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="US"
              value={formData.phone}
              onChange={handlePhoneChange}
            />
          </div>
        </div>
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
          onClick={handleNext}
          className="flex-1"
          disabled={!validateEmail(formData.email) || !isValidPhoneNumber(formData.phone || "")}
        >
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};