import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TermsSection } from "@/components/registration/TermsSection";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    agreeToTerms: false,
    agreeToDisclaimer: false,
  });

  const handleFieldChange = (field: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("User not found");
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          terms_agreed: true,
          terms_agreed_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success("Welcome to the program! 🎉");
      navigate("/");
    } catch (error: any) {
      toast.error("Error updating profile: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            Welcome! <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for joining our program. We're excited to have you on board!
          </p>
        </div>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>What to Expect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              During this program, you'll have the opportunity to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              <li>Engage in meaningful conversations with peers</li>
              <li>Participate in interactive learning sessions</li>
              <li>Access valuable educational resources</li>
              <li>Track your progress and earn rewards</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>Terms & Agreement</CardTitle>
          </CardHeader>
          <CardContent>
            <TermsSection
              formData={formData}
              onChange={handleFieldChange}
            />
          </CardContent>
        </Card>

        <Button
          onClick={handleSubmit}
          disabled={!formData.agreeToTerms || !formData.agreeToDisclaimer}
          className="w-full py-6 text-lg bg-primary hover:bg-primary/90"
        >
          I Agree & Continue to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;