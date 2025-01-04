import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import type { ComfortLevel } from "@/integrations/supabase/types";
import ConversationDateField from "./conversation/ConversationDateField";
import ComfortLevelField from "./conversation/ComfortLevelField";
import CommentsField from "./conversation/CommentsField";
import ParticipantCounter from "./conversation/ParticipantCounter";

const formSchema = z.object({
  conversation_date: z.string().min(1, "Date is required"),
  comfort_level: z.enum(['very_comfortable', 'comfortable', 'uncomfortable', 'very_uncomfortable'] as const),
  comments: z.string().optional(),
  participant_count: z.number().min(1).max(10),
});

interface ConversationFormProps {
  onSuccess?: () => void;
  initialData?: any;
}

const ConversationForm = ({ onSuccess, initialData }: ConversationFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      conversation_date: initialData?.conversation_date || new Date().toISOString().split('T')[0],
      comfort_level: (initialData?.comfort_level as ComfortLevel) || "comfortable",
      comments: initialData?.comments || "",
      participant_count: initialData?.participant_count || 1,
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      if (initialData) {
        const { error } = await supabase
          .from('conversations')
          .update({
            conversation_date: values.conversation_date,
            comfort_level: values.comfort_level,
            comments: values.comments,
            participant_count: values.participant_count,
          })
          .eq('id', initialData.id);

        if (error) throw error;
        toast.success('Conversation updated successfully');
      } else {
        const { error } = await supabase
          .from('conversations')
          .insert({
            conversation_date: values.conversation_date,
            comfort_level: values.comfort_level,
            comments: values.comments,
            participant_count: values.participant_count,
            user_id: user.id,
          });

        if (error) throw error;
        toast.success('Conversation saved successfully');
      }
      
      onSuccess?.();
    } catch (error) {
      console.error('Error saving conversation:', error);
      toast.error('Failed to save conversation');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ConversationDateField form={form} />
        
        <FormField
          control={form.control}
          name="participant_count"
          render={({ field }) => (
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Number of Participants
              </label>
              <ParticipantCounter
                value={field.value}
                onChange={field.onChange}
              />
            </div>
          )}
        />
        
        <ComfortLevelField form={form} />
        <CommentsField form={form} />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Conversation"}
        </Button>
      </form>
    </Form>
  );
};

export default ConversationForm;