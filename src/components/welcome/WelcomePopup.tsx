import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.1, y: 0.5 }
    });

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.9, y: 0.5 }
    });
  };

  const handleSubmit = async () => {
    if (!formData.agreeToTerms || !formData.agreeToDisclaimer) {
      toast.error("Please agree to both the terms and disclaimer");
      return;
    }

    setIsSubmitting(true);

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

      onClose();
      triggerConfetti();
      toast.success("Welcome to the program! 🎉");
      
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile: " + error.message);
    } finally {
      setIsSubmitting(false);
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
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Thank you for joining the Know Israel program. We're excited to have you on board!
            </p>
          </div>

          <div className="bg-secondary/5 rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-3">What to Expect</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Participate in 4 interactive learning sessions</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Engage in meaningful conversations with peers</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span>Track your progress and earn rewards</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Terms & Agreement</h2>
            
            <div className="space-y-4">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleFieldChange('agreeToTerms', e.target.checked)}
                  className="mt-1"
                />
                <div className="text-sm">
                  <p className="font-medium">I agree to the program conditions</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    By agreeing to the program conditions, I acknowledge that I will participate in educational sessions, engage respectfully with others, and maintain the confidentiality of sensitive discussions.
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToDisclaimer}
                  onChange={(e) => handleFieldChange('agreeToDisclaimer', e.target.checked)}
                  className="mt-1"
                />
                <div className="text-sm">
                  <p className="font-medium">I agree to the program disclaimer</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    I understand this program is partially funded by third-party foundations including Mosaic United. Any data on this webapp may be submitted to them in order to receive funding. They may use that information to contact me for verification purposes.
                  </p>
                </div>
              </label>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!formData.agreeToTerms || !formData.agreeToDisclaimer || isSubmitting}
            className="w-full py-4 sm:py-6 text-base sm:text-lg bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? "Processing..." : "Continue to Dashboard"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;