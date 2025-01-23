import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PersonalInfoStep } from "@/components/registration/steps/PersonalInfoStep";
import { GenderStep } from "@/components/registration/steps/GenderStep";
import { ContactInfoStep } from "@/components/registration/steps/ContactInfoStep";
import { CampusInfoStep } from "@/components/registration/steps/CampusInfoStep";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AuthError } from "@supabase/supabase-js";
import WelcomePopup from "@/components/welcome/WelcomePopup";

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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

      if (error) {
        if (error.message.includes('User already registered')) {
          toast.error("This email is already registered. Please try logging in instead.");
          navigate("/login");
          return;
        }
        throw error;
      }

      toast.success("Registration successful! Your password is: " + password + ". Please save it for future login.");
      localStorage.setItem("userRegistered", "true");
      navigate("/");
    } catch (error: any) {
      const errorMessage = error instanceof AuthError 
        ? error.message
        : "An unexpected error occurred during registration";
      toast.error("Error during registration: " + errorMessage);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="w-full max-w-md mx-auto py-6 px-4">
        <div className="bg-white shadow-xl rounded-lg">
          <CurrentStepComponent {...steps[currentStep].props} />
        </div>
      </div>
      <WelcomePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
};

export default Register;