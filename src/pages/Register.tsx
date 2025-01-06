import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PersonalInfoStep } from "@/components/registration/steps/PersonalInfoStep";
import { GenderStep } from "@/components/registration/steps/GenderStep";
import { ContactInfoStep } from "@/components/registration/steps/ContactInfoStep";
import { CampusInfoStep } from "@/components/registration/steps/CampusInfoStep";
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
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generatePassword = (firstName: string, lastName: string, phone: string) => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    const cleanPhone = phone.replace(/\D/g, '');
    const last4Digits = cleanPhone.slice(-4);
    return `${firstInitial}${lastInitial}${last4Digits}`;
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const password = generatePassword(formData.firstName, formData.lastName, formData.phone);
      
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: password,
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

      toast.success("Registration successful! Your password is: " + password + ". Please save it for future login.");
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
        onBack: () => null,
        isLoading,
      }
    },
    {
      component: GenderStep,
      props: {
        formData,
        onChange: handleFieldChange,
        onNext: () => setCurrentStep(2),
        onBack: () => setCurrentStep(0),
        isLoading,
      }
    },
    {
      component: ContactInfoStep,
      props: {
        formData,
        onChange: handleFieldChange,
        onNext: () => setCurrentStep(3),
        onBack: () => setCurrentStep(1),
        isLoading,
      }
    },
    {
      component: CampusInfoStep,
      props: {
        formData,
        onChange: handleFieldChange,
        onNext: handleSubmit,
        onBack: () => setCurrentStep(2),
        isLoading,
      }
    }
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