import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import confetti from 'canvas-confetti';
import ParticipantCounter from "./conversation/ParticipantCounter";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const today = new Date();
today.setHours(0, 0, 0, 0);

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
          className={`flex items-center justify-center p-2 rounded-lg border transition-all ${value === option.value
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
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
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

  const formatDisplayDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return format(date, "EEEE, MMMM d, yyyy");
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
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm font-medium text-center">When?</FormLabel>
              <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                    type="button"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? formatDisplayDate(field.value) : "Pick a date"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-auto p-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <button
                    onClick={() => setIsCalendarOpen(false)}
                    className="absolute right-2 top-2 p-1 hover:bg-gray-100 rounded-full"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                    >
                      <path
                        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <Calendar
                    mode="single"
                    selected={(() => {
                      if (field.value) {
                        console.log("field.value:", field.value);
                        const [year, month, day] = field.value.split('-').map(Number);
                        const date = new Date(year, month - 1, day);
                        console.log("Fecha creada desde field.value:", date);
                        return date;
                      }
                      return undefined;
                    })()}
                    onSelect={(newDate) => {
                      if (newDate) {
                        console.log("Fecha antes de modificarse:", newDate);
                        const year = newDate.getFullYear();
                        const month = String(newDate.getMonth() + 1).padStart(2, '0');
                        const day = String(newDate.getDate()).padStart(2, '0');
                        const dateString = `${year}-${month}-${day}`;
                        console.log("Fecha string final:", dateString);
                        field.onChange(dateString);
                        setIsCalendarOpen(false);
                      }
                    }}
                    disabled={(date) => date > today}
                    modifiers={{ today: new Date() }}
                    modifiersStyles={{
                      today: {
                        backgroundColor: 'rgba(255, 215, 0, 0.2)',
                        fontWeight: 'bold'
                      }
                    }}
                    initialFocus
                  />
                </DialogContent>
              </Dialog>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2 flex flex-col">
          <FormLabel className="text-sm font-medium text-center">How many peers involved?</FormLabel>
          <ParticipantCounter
            value={form.watch("participant_count")}
            onChange={(value) => form.setValue("participant_count", value)}
          />
        </div>

        <FormField
          control={form.control}
          name="comfort_level"
          render={({ field }) => (
            <FormItem className="space-y-2 flex flex-col">
              <FormLabel className="text-sm font-medium text-center">How did it go?</FormLabel>
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
            <FormItem className="space-y-2 flex flex-col">
              <FormLabel className="text-sm font-medium text-center">Any thoughts? (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your experience..."
                  {...field}
                  className="min-h-[60px] text-sm resize-none w-full border border-gray-300 rounded-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-2">
          <Button
            type="submit"
            className="w-full h-10 bg-yellow-400 text-black font-bold rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Submit"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-gray-500 hover:underline"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ConversationForm;
