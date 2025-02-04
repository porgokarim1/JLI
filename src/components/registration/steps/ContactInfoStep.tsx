import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface ContactInfoStepProps {
  formData: {
    email: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
}

export const ContactInfoStep = ({ formData, onChange, onNext, onBack, isLoading }: ContactInfoStepProps) => {
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const phoneInputRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus email input when component mounts
    emailInputRef.current?.focus();
  }, []);

  const handlePhoneChange = (value: string | undefined) => {
    if (value && !isValidPhoneNumber(value)) {
      setPhoneError("Invalid phone number. Please enter a valid one.");
    } else {
      setPhoneError(null);
    }
    onChange("phone", value || "");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && !e.shiftKey && validateEmail(formData.email)) {
      e.preventDefault();
      const phoneInput = phoneInputRef.current?.querySelector("input");
      if (phoneInput) {
        phoneInput.focus();
      }
    }
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && formData.phone && !phoneError) {
      e.preventDefault();
      onNext();
    }
  };

  const isEmailValid = validateEmail(formData.email);
  const isFormValid = isEmailValid && formData.phone && !phoneError;

  return (
    <div className="space-y-6 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">How can we reach you? 📱</h2>
      </div>

      <div className="space-y-4 px-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            required
            ref={emailInputRef}
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            onKeyDown={handleEmailKeyDown}
            className={!isEmailValid && formData.email ? "border-red-500" : ""}
          />
          {!isEmailValid && formData.email && (
            <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <div className="phone-input-container" ref={phoneInputRef}>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="US"
              value={formData.phone || ""}
              onChange={handlePhoneChange}
              onKeyDown={handlePhoneKeyDown}
            />
          </div>
          {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
        </div>
      </div>

      <div className="px-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-center space-x-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
            <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
            <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
            <Circle className="w-5 h-5 text-muted" />
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={onBack} className="flex-1" disabled={isLoading}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={onNext} className="flex-1" disabled={isLoading || !isFormValid}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};