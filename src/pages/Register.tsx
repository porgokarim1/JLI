import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PersonalInfoStep } from "@/components/registration/steps/PersonalInfoStep";
import { ContactInfoStep } from "@/components/registration/steps/ContactInfoStep";
import { CampusInfoStep } from "@/components/registration/steps/CampusInfoStep";
import { FinalStep } from "@/components/registration/steps/FinalStep";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    campus: "",
    organization: "",
    agreeToTerms: false,
    agreeToDisclaimer: false,
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: "temporary-password",
        options: {
          data: {
            first_name: formData.firstName,
            middle_name: formData.middleName,
            last_name: formData.lastName,
            gender: formData.gender,
            phone: formData.phone,
            campus: formData.campus,
            organization: formData.organization,
          },
        },
      });

      if (error) throw error;

      toast.success("Registration successful! Please check your email to verify your account.");
      navigate("/login");
    } catch (error: any) {
      toast.error("Error during registration: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    {
      component: PersonalInfoStep,
      props: {
        formData,
        onChange: handleFieldChange,
        onNext: () => setCurrentStep(1),
        onBack: () => null, // Added for type consistency
      },
    },
    {
      component: ContactInfoStep,
      props: {
        formData,
        onChange: handleFieldChange,
        onNext: () => setCurrentStep(2),
        onBack: () => setCurrentStep(0),
      },
    },
    {
      component: CampusInfoStep,
      props: {
        formData,
        onChange: handleFieldChange,
        onNext: () => setCurrentStep(3),
        onBack: () => setCurrentStep(1),
      },
    },
    {
      component: FinalStep,
      props: {
        formData,
        onChange: handleFieldChange,
        onSubmit: handleSubmit,
        onBack: () => setCurrentStep(2),
        isLoading,
      },
    },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <CurrentStepComponent {...steps[currentStep].props} />
        </div>
      </div>
    </div>
  );
};

export default Register;