import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CampusSection } from "./CampusSection";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { ProgramGoalsSection } from "./ProgramGoalsSection";
import { TermsSection } from "./TermsSection";

interface RegistrationFormProps {
  formData: {
    campus: string;
    organization: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
    password: string;
    agreeToTerms: boolean;
    agreeToDisclaimer: boolean;
    rewardTier: string;
  };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const RegistrationForm = ({ formData, setFormData, onSubmit, isLoading }: RegistrationFormProps) => {
  const navigate = useNavigate();
  
  const handleFieldChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-lg text-gray-600">
          Welcome! Join us to learn about Israel through an authentic Torah perspective and gain the tools to engage in meaningful conversations.
        </p>
      </div>

      <div className="space-y-6">
        <CampusSection 
          formData={formData} 
          onChange={handleFieldChange}
        />

        <PersonalInfoSection 
          formData={formData}
          onChange={handleFieldChange}
        />

        <ProgramGoalsSection 
          value={formData.rewardTier}
          onChange={(value) => handleFieldChange("rewardTier", value)}
        />

        <TermsSection 
          formData={formData}
          onChange={handleFieldChange}
        />

        <div className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            type="button" 
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
};