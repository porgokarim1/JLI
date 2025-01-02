import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import confetti from 'canvas-confetti';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Register = () => {
  const navigate = useNavigate();
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

  const generatePassword = (firstName: string, lastName: string, phone: string) => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    const lastFourDigits = phone.replace(/\D/g, '').slice(-4);
    return `${firstInitial}${lastInitial}${lastFourDigits}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms || !formData.agreeToDisclaimer) {
      toast.error("Sorry, you can't register without accepting the terms and disclaimer");
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Registration</CardTitle>
            <p className="text-center text-gray-600 mt-2">
              Hi There! Thank you for your interest in participating in the Know Israel program. Let's get to know you a bit.
            </p>
          </CardHeader>
          <CardContent>
            <RegistrationForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
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