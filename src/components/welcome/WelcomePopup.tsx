import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
import { TermsSection } from "@/components/registration/TermsSection";
import confetti from "canvas-confetti";

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

  const triggerConfetti = () => {
    // Fire confetti from the left edge
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.1, y: 0.5 }
    });

    // Fire confetti from the right edge
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.9, y: 0.5 }
    });
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

      triggerConfetti(); // Trigger confetti before closing
      
      // Add a small delay before closing to let users see the confetti
      setTimeout(() => {
        toast.success("Welcome to the program! 🎉");
        onClose();
      }, 1000);
      
    } catch (error: any) {
      toast.error("Error updating profile: " + error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-[95vw] w-full sm:max-w-2xl mx-auto p-4 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.3)] max-h-[90vh] overflow-y-auto">
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 flex items-center justify-center gap-2 text-secondary">
              Welcome! <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary animate-pulse" />
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed px-2">
              Thank you for joining our program. We're excited to have you on board!
            </p>
          </div>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-secondary">What to Expect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <ul className="list-none space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
                {[
                  "Engage in meaningful conversations with peers",
                  "Participate in interactive learning sessions",
                  "Access valuable educational resources",
                  "Track your progress and earn rewards"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 group">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                    <span className="group-hover:text-secondary transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl text-secondary">Terms & Agreement</CardTitle>
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
            className="w-full py-4 sm:py-6 text-base sm:text-lg bg-primary hover:bg-primary/90"
          >
            Continue to Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;