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
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    agreeToTerms: false,
    agreeToDisclaimer: false,
    rewardTier: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms || !formData.agreeToDisclaimer) {
      toast.error("Sorry, you can't register without accepting the terms and disclaimer");
      return;
    }

    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            campus: formData.campus,
            organization: formData.organization,
            gender: formData.gender,
            phone: formData.phone,
            reward_tier: formData.rewardTier
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        toast.success(`${formData.firstName}, welcome to the Know Israel Program!`);
        navigate("/");
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration failed. Please try again.');
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