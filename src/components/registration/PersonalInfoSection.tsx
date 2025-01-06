import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { toast } from "sonner";

interface PersonalInfoSectionProps {
  formData: {
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
}

export const PersonalInfoSection = ({ formData, onChange }: PersonalInfoSectionProps) => {
  const handlePhoneChange = (value: string | undefined) => {
    if (value && !isValidPhoneNumber(value)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    onChange("phone", value || "");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="middleName">Middle Name (Optional)</Label>
          <Input
            id="middleName"
            value={formData.middleName || ''}
            onChange={(e) => onChange("middleName", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label>Gender</Label>
        <RadioGroup
          value={formData.gender}
          onValueChange={(value) => onChange("gender", value)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="undisclosed" id="undisclosed" />
            <Label htmlFor="undisclosed">Prefer not to say</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
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
            onChange={handlePhoneChange}
          />
        </div>
      </div>
    </div>
  );
};