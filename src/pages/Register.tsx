import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { RegistrationForm } from "@/components/registration/RegistrationForm";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    campus: "",
    organization: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    agreeToTerms: false,
    agreeToDisclaimer: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const generatePassword = (firstName: string, lastName: string, phone: string) => {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    const lastFourDigits = phone.slice(-4);
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

    setIsLoading(true);

    const generatedPassword = generatePassword(formData.firstName, formData.lastName, formData.phone);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: generatedPassword,
        options: {
          data: {
            first_name: formData.firstName,
            middle_name: formData.middleName,
            last_name: formData.lastName,
            campus: formData.campus,
            organization: formData.organization,
            gender: formData.gender,
            phone: formData.phone,
          }
        }
      });

      if (authError) {
        toast.error(authError.message);
        throw authError;
      }

      if (authData.user) {
        toast.success(`Welcome ${formData.firstName}! Your password is: ${generatedPassword}`);
        navigate("/");
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
    </div>
  );
};

export default Register;