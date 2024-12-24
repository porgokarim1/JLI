import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ConversationForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("conversations")
        .insert({
          user_id: user.id,
          first_name: firstName,
          last_name: lastName,
          conversation_date: date,
          notes,
        });

      if (error) throw error;

      toast.success("Conversation recorded successfully!");
      setFirstName("");
      setLastName("");
      setDate("");
      setNotes("");
      onSuccess?.();
    } catch (error) {
      console.error("Error recording conversation:", error);
      toast.error("Failed to record conversation");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="mb-2"
        />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="mb-2"
        />
      </div>
      <div>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="mb-2"
        />
      </div>
      <div>
        <Textarea
          placeholder="Notes about the conversation..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mb-2"
          rows={4}
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
      >
        {isSubmitting ? "Recording..." : "Record Conversation"}
      </Button>
    </form>
  );
};

export default ConversationForm;