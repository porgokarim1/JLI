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

const formSchema = z.object({
  comfort_level: z.enum(["very_comfortable", "comfortable", "uncomfortable", "very_uncomfortable"]),
  comments: z.string().optional(),
  conversation_date: z.string(),
  participant_count: z.number().min(1),
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
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      comfort_level: undefined,
      comments: "",
      conversation_date: new Date().toISOString().split("T")[0],
      participant_count: 1,
    },
  });

  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      const formData = form.getValues();
      
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        toast.error("You must be logged in to record a conversation");
        return;
      }

      const { error } = await supabase.from("conversations").upsert({
        ...formData,
        participant_count: participantCount,
        user_id: user.data.user.id,
        ...(initialData?.id ? { id: initialData.id } : {}),
      });

      if (error) throw error;

      toast.success(initialData ? "Conversation updated successfully!" : "Conversation recorded successfully!");
      form.reset();
      onSuccess?.();
    } catch (error: any) {
      toast.error("Error recording conversation: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      component: WelcomeStep,
      props: {
        form,
        onNext: () => setCurrentStep(1),
      }
    },
    {
      component: ParticipantsStep,
      props: {
        form,
        participantCount,
        onParticipantCountChange: setParticipantCount,
        onNext: () => setCurrentStep(2),
        onBack: () => setCurrentStep(0),
      }
    },
    {
      component: ComfortStep,
      props: {
        form,
        onNext: () => setCurrentStep(3),
        onBack: () => setCurrentStep(1),
      }
    },
    {
      component: FinalStep,
      props: {
        form,
        onSubmit,
        onBack: () => setCurrentStep(2),
        isSubmitting,
      }
    }
  ];

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Form {...form}>
      <form className="space-y-6">
        <CurrentStepComponent {...steps[currentStep].props} />
      </form>
    </Form>
  );
};

export default ConversationForm;