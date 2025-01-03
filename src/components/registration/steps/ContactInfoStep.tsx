import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface ContactInfoStepProps {
  formData: {
    email: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ContactInfoStep = ({ formData, onChange, onNext, onBack }: ContactInfoStepProps) => {
  const handleNext = () => {
    if (!formData.email || !formData.phone) {
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
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <div className="phone-input-container">
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="US"
              value={formData.phone}
              onChange={(value) => onChange("phone", value || "")}
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
          disabled={!formData.email || !formData.phone}
        >
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};