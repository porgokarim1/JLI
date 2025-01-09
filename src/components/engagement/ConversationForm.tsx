import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import ParticipantCounter from "./conversation/ParticipantCounter";
import confetti from 'canvas-confetti';
import { X } from "lucide-react";

const formSchema = z.object({
  comfort_level: z.enum(["very_comfortable", "comfortable", "uncomfortable", "very_uncomfortable", "neutral"]),
  comments: z.string().optional(),
  conversation_date: z.string(),
  participant_count: z.number().min(1)
});

type FormData = z.infer<typeof formSchema>;

interface ConversationFormProps {
  initialData?: FormData & { id?: string };
  onSuccess?: () => void;
  onClose?: () => void;
}

const ComfortLevelSelector = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  const options = [
    { value: "very_comfortable", label: "Very Comfortable", emoji: "😄" },
    { value: "comfortable", label: "Comfortable", emoji: "🙂" },
    { value: "neutral", label: "Neutral", emoji: "😐" },
    { value: "uncomfortable", label: "Uncomfortable", emoji: "😕" },
    { value: "very_uncomfortable", label: "Very Uncomfortable", emoji: "😣" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
            value === option.value
              ? "border-primary bg-primary/10"
              : "border-gray-200 hover:border-primary/50"
          }`}
        >
          <span className="text-2xl sm:text-3xl mb-1 sm:mb-2">{option.emoji}</span>
          <span className="text-xs text-center">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

const ConversationForm = ({ initialData, onSuccess, onClose }: ConversationFormProps) => {
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md mx-auto px-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="conversation_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">When was it?</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel className="text-sm">How many involved?</FormLabel>
              <ParticipantCounter
                value={participantCount}
                onChange={(value) => {
                  setParticipantCount(value);
                  form.setValue("participant_count", value);
                }}
              />
            </div>

            <FormField
              control={form.control}
              name="comfort_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">How did it go?</FormLabel>
                  <FormControl>
                    <ComfortLevelSelector
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Any thoughts? (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Share your experience..." {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Recording..." : "Record Conversation"}
            </Button>
          </div>
        </form>
      </Form>

      <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
        <DialogContent className="text-center sm:max-w-[425px]">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={handleThankYouClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
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