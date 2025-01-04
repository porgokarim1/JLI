import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ComfortLevelField from "./conversation/ComfortLevelField";
import CommentsField from "./conversation/CommentsField";
import ConversationDateField from "./conversation/ConversationDateField";
import ParticipantCounter from "./conversation/ParticipantCounter";

const formSchema = z.object({
  comfort_level: z.enum(["very_comfortable", "comfortable", "uncomfortable", "very_uncomfortable"]),
  comments: z.string().optional(),
  conversation_date: z.string(),
  participant_count: z.number().min(1).max(10),
});

type FormData = z.infer<typeof formSchema>;

interface ConversationFormProps {
  initialData?: FormData & { id?: string };
  onSuccess?: () => void;
}

const ConversationForm = ({ initialData, onSuccess }: ConversationFormProps) => {
  const [participantCount, setParticipantCount] = useState(initialData?.participant_count || 1);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      comfort_level: undefined,
      comments: "",
      conversation_date: new Date().toISOString().split("T")[0],
      participant_count: 1,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const user = await supabase.auth.getUser();
      if (!user.data.user) {
        toast.error("You must be logged in to record a conversation");
        return;
      }

      const { error } = await supabase.from("conversations").upsert({
        ...data,
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
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ComfortLevelField form={form} />
        <CommentsField form={form} />
        <ConversationDateField form={form} />
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Number of Participants</label>
          <ParticipantCounter 
            value={participantCount} 
            onChange={setParticipantCount} 
          />
        </div>

        <Button type="submit" className="w-full">
          {initialData ? "Update" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ConversationForm;