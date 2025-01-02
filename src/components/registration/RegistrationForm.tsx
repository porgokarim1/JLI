import { useNavigate } from "react-router-dom";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { TermsSection } from "./TermsSection";

interface RegistrationFormProps {
  formData: {
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
    agreeToTerms: boolean;
    agreeToDisclaimer: boolean;
  };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const RegistrationForm = ({
  formData,
  setFormData,
  onSubmit,
  isLoading
}: RegistrationFormProps) => {
  const navigate = useNavigate();

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <PersonalInfoSection
        formData={formData}
        onChange={handleFieldChange}
      />

      <TermsSection 
        formData={formData}
        onChange={handleFieldChange}
      />

      <div className="flex flex-col space-y-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full py-2 px-4 bg-secondary text-secondary-foreground rounded hover:bg-secondary/90"
        >
          Already have an account? Login
        </button>
      </div>
    </form>
  );
};