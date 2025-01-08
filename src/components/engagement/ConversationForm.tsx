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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ParticipantCounter from "./conversation/ParticipantCounter";
import confetti from 'canvas-confetti';

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="conversation_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>When was it?</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>How many involved?</FormLabel>
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
                  <FormLabel>How did it feel?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select comfort level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="very_comfortable">Very Comfortable 😊</SelectItem>
                      <SelectItem value="comfortable">Comfortable 🙂</SelectItem>
                      <SelectItem value="uncomfortable">Uncomfortable 😕</SelectItem>
                      <SelectItem value="very_uncomfortable">Very Uncomfortable 😣</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comments"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Any thoughts? (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Share your experience..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Recording..." : "Record Conversation"}
            </Button>
          </div>
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