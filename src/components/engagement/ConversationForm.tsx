import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import WelcomeStep from "./conversation/WelcomeStep";
import ParticipantsStep from "./conversation/ParticipantsStep";
import ComfortStep from "./conversation/ComfortStep";
import FinalStep from "./conversation/FinalStep";
import confetti from 'canvas-confetti';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  comfort_level: z.enum(["very_comfortable", "comfortable", "uncomfortable", "very_uncomfortable"]),
  comments: z.string().optional(),
  conversation_date: z.string(),
  participant_count: z.number().min(1)
});

type FormData = z.infer<typeof formSchema>;

interface ConversationFormProps {
  initialData?: FormData & { id?: string };
  onSuccess?: () => void;
}

const ConversationForm = ({ initialData, onSuccess }: ConversationFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [participantCount, setParticipantCount] = useState(initialData?.participant_count || 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [confettiInterval, setConfettiInterval] = useState<number | null>(null);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comfort_level: initialData?.comfort_level,
      comments: initialData?.comments || "",
      conversation_date: initialData?.conversation_date || new Date().toISOString().split("T")[0],
      participant_count: participantCount
    },
  });

  const startConfetti = () => {
    const interval = window.setInterval(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1500);
    setConfettiInterval(interval);
  };

  const stopConfetti = () => {
    if (confettiInterval) {
      clearInterval(confettiInterval);
      setConfettiInterval(null);
    }
  };

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      const formData = form.getValues();
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        toast.error("Authentication error. Please try logging in again.");
        return;
      }
      
      if (!user) {
        toast.error("You must be logged in to record a conversation");
        return;
      }

      const { error } = await supabase.from("conversations").upsert({
        comfort_level: formData.comfort_level,
        comments: formData.comments,
        conversation_date: formData.conversation_date,
        participant_count: participantCount,
        user_id: user.id,
        ...(initialData?.id ? { id: initialData.id } : {}),
      });

      if (error) throw error;

      setShowThankYou(true);
      startConfetti();
      form.reset();
    } catch (error: any) {
      toast.error("Error recording conversation: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
    stopConfetti();
    onSuccess?.();
  };

  const getCurrentStep = () => {
    const commonProps = { form };
    
    switch (currentStep) {
      case 0:
        return <WelcomeStep {...commonProps} onNext={() => setCurrentStep(1)} />;
      case 1:
        return (
          <ParticipantsStep
            {...commonProps}
            participantCount={participantCount}
            onParticipantCountChange={setParticipantCount}
            onNext={() => setCurrentStep(2)}
            onBack={() => setCurrentStep(0)}
          />
        );
      case 2:
        return (
          <ComfortStep
            {...commonProps}
            onNext={() => {
              const comfortLevel = form.getValues().comfort_level;
              if (!comfortLevel) {
                form.setError("comfort_level", {
                  type: "required",
                  message: "Please select your comfort level"
                });
                return;
              }
              setCurrentStep(3);
            }}
            onBack={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <FinalStep
            {...commonProps}
            onSubmit={onSubmit}
            onBack={() => setCurrentStep(2)}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-6">
          {getCurrentStep()}
        </form>
      </Form>

      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="text-center">
          <p className="py-4">Your conversation has been recorded successfully!</p>
          <Button onClick={handleThankYouClose} className="mt-4">
            OK
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConversationForm;