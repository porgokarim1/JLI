import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import confetti from 'canvas-confetti';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { PersonalInfoStep } from "@/components/registration/steps/PersonalInfoStep";
import { ContactInfoStep } from "@/components/registration/steps/ContactInfoStep";
import { CampusInfoStep } from "@/components/registration/steps/CampusInfoStep";
import { FinalStep } from "@/components/registration/steps/FinalStep";

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
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
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePassword = (firstName: string, lastName: string, phone: string) => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    const lastFourDigits = phone.replace(/\D/g, '').slice(-4);
    return `${firstInitial}${lastInitial}${lastFourDigits}`;
  };

  const handleSubmit = async () => {
    if (!formData.agreeToTerms || !formData.agreeToDisclaimer) {
      toast.error("Please accept the terms and disclaimer");
      return;
    }

    if (!formData.phone || formData.phone.length < 4) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!formData.campus) {
      toast.error("Please select your campus");
      return;
    }

    if (!formData.organization) {
      toast.error("Please select your organization");
      return;
    }

    setIsLoading(true);

    const password = generatePassword(formData.firstName, formData.lastName, formData.phone);
    setGeneratedPassword(password);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
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
          }
        }
      });

      if (authError) {
        toast.error(authError.message);
        throw authError;
      }

      if (authData.user) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        setShowWelcomeDialog(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
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
        onBack: () => navigate("/")
      }
    },
    {
      component: ContactInfoStep,
      props: {
        formData,
        onChange: handleFieldChange,
        onNext: () => setCurrentStep(2),
        onBack: () => setCurrentStep(0)
      }
    },
    {
      component: CampusInfoStep,
      props: {
        formData,
        onChange: handleFieldChange,
        onNext: () => setCurrentStep(3),
        onBack: () => setCurrentStep(1)
      }
    },
    {
      component: FinalStep,
      props: {
        formData,
        onChange: handleFieldChange,
        onSubmit: handleSubmit,
        onBack: () => setCurrentStep(2),
        isLoading
      }
    }
  ] as const;

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="container max-w-md mx-auto">
        <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
          <CardContent className="pt-6">
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 flex-1 mx-1 rounded ${
                      index <= currentStep ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </p>
            </div>

            <CurrentStepComponent {...steps[currentStep].props} />
          </CardContent>
        </Card>
      </div>

      <Dialog open={showWelcomeDialog} onOpenChange={(open) => {
        setShowWelcomeDialog(open);
        if (!open) navigate("/");
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to Know Israel! 🎉</DialogTitle>
            <DialogDescription className="pt-4 space-y-4">
              <p>Thank you for joining our community! Your account has been created successfully.</p>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="font-semibold">Your auto-generated password is:</p>
                <p className="text-lg font-mono mt-2">{generatedPassword}</p>
                <p className="text-sm text-gray-600 mt-2">Please make sure to save this password. You'll need it to log in.</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Register;