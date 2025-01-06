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
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2 text-secondary animate-float">
            Welcome! <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Thank you for joining our program. We're excited to have you on board!
          </p>
        </div>

        <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-soft-purple/30 to-soft-blue/30">
            <CardTitle className="text-2xl text-secondary">What to Expect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <p className="text-muted-foreground font-medium">
              During this program, you'll have the opportunity to:
            </p>
            <ul className="list-none space-y-3 text-muted-foreground ml-4">
              {[
                "Engage in meaningful conversations with peers",
                "Participate in interactive learning sessions",
                "Access valuable educational resources",
                "Track your progress and earn rewards"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 group">
                  <span className="h-2 w-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                  <span className="group-hover:text-secondary transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-primary/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-soft-pink/30 to-soft-peach/30">
            <CardTitle className="text-2xl text-secondary">Terms & Agreement</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <TermsSection
              formData={formData}
              onChange={handleFieldChange}
            />
          </CardContent>
        </Card>

        <Button
          onClick={handleSubmit}
          disabled={!formData.agreeToTerms || !formData.agreeToDisclaimer}
          className="w-full py-6 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;