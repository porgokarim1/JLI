import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { TermsSection } from "@/components/registration/TermsSection";

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomePopup = ({ isOpen, onClose }: WelcomePopupProps) => {
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
      onClose();
    } catch (error: any) {
      toast.error("Error updating profile: " + error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl shadow-[0_0_50px_rgba(0,0,0,0.3)]">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2 text-secondary">
              Welcome! <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            </h1>
            <p className="text-base text-muted-foreground mb-6 leading-relaxed">
              Thank you for joining our program. We're excited to have you on board!
            </p>
          </div>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl text-secondary">What to Expect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-none space-y-3 text-muted-foreground">
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

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl text-secondary">Terms & Agreement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            Continue to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;