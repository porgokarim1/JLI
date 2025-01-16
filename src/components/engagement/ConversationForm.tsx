import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import confetti from 'canvas-confetti';
import ParticipantCounter from "./conversation/ParticipantCounter";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";

const today = new Date().toISOString().split('T')[0];

const formSchema = z.object({
  comfort_level: z.enum(["very_comfortable", "comfortable", "uncomfortable", "very_uncomfortable", "neutral"]),
  comments: z.string().optional(),
  conversation_date: z.string().refine((date) => {
    const selectedDate = new Date(date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return selectedDate <= currentDate;
  }, "Future dates are not allowed"),
  participant_count: z.number().min(1).max(99)
});

type FormData = z.infer<typeof formSchema>;

interface ConversationFormProps {
  initialData?: FormData & { id?: string };
  onSuccess?: () => void;
  onClose?: () => void;
}

const ComfortLevelSelector = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  const options = [
    { value: "very_comfortable", emoji: "😄" },
    { value: "comfortable", emoji: "🙂" },
    { value: "neutral", emoji: "😐" },
    { value: "uncomfortable", emoji: "😕" },
    { value: "very_uncomfortable", emoji: "😣" }
  ];

  return (
    <div className="grid grid-cols-5 gap-1 w-full">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`flex items-center justify-center p-2 rounded-lg border transition-all ${
            value === option.value
              ? "border-primary bg-primary/10"
              : "border-gray-200 hover:border-primary/50"
          }`}
        >
          <span className="text-2xl">{option.emoji}</span>
        </button>
      ))}
    </div>
  );
};

const ConversationForm = ({ initialData, onSuccess, onClose }: ConversationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comfort_level: initialData?.comfort_level,
      comments: initialData?.comments || "",
      conversation_date: initialData?.conversation_date || new Date().toISOString().split("T")[0],
      participant_count: initialData?.participant_count || 1
    },
  });

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 }
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
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

      if (onClose) onClose();
      triggerConfetti();

      const { error } = await supabase.from("conversations").upsert({
        comfort_level: formData.comfort_level,
        comments: formData.comments,
        conversation_date: formData.conversation_date,
        participant_count: formData.participant_count,
        user_id: user.id,
        ...(initialData?.id ? { id: initialData.id } : {}),
      });

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['total-peers'] });
      
    } catch (error: any) {
      toast.error("Error recording conversation: " + error.message);
      if (onClose) onSuccess?.();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-4 w-full max-w-md mx-auto px-2 sm:px-4"
      >
        <FormField
          control={form.control}
          name="conversation_date"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="text-sm whitespace-nowrap">When? 📆</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    max={today}
                    className="h-8 text-sm w-[120px] border border-gray-300" 
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel className="text-sm">How many peers involved?</FormLabel>
          <ParticipantCounter 
            value={form.watch("participant_count")} 
            onChange={(value) => form.setValue("participant_count", value)} 
          />
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="participant_count"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="1"
                      max="99"
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                      className={`h-8 text-sm w-[70px] border ${fieldState.invalid ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <span className="text-sm text-muted-foreground">participants</span>
          </div>
        </div>

        <FormField
          control={form.control}
          name="comfort_level"
          render={({ field }) => (
            <FormItem className="space-y-1">
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
            <FormItem className="space-y-1">
              <FormLabel className="text-sm">Any thoughts? (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Share your experience..." 
                  {...field} 
                  className="min-h-[60px] text-sm resize-none w-full border border-gray-300"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button 
            type="submit" 
            className="w-full h-10 text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Log Peer Engagement"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ConversationForm;