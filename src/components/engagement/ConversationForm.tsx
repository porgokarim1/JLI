import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type ComfortLevel = "very_comfortable" | "comfortable" | "uncomfortable" | "very_uncomfortable";

const ConversationForm = () => {
  const [comfortLevel, setComfortLevel] = useState<ComfortLevel | null>(null);
  const [comments, setComments] = useState("");

  const handleSubmit = async () => {
    if (!comfortLevel) {
      toast.error("Please select your comfort level.");
      return;
    }

    try {
      const { error } = await supabase.from("conversations").insert([
        {
          comfort_level: comfortLevel,
          comments,
          conversation_date: new Date().toISOString(),
          user_id: supabase.auth.user()?.id,
        },
      ]);

      if (error) {
        throw error;
      }

      toast.success("Conversation recorded successfully!");
      setComfortLevel(null);
      setComments("");
    } catch (error) {
      toast.error("Error recording conversation: " + error.message);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>How comfortable do you feel discussing this topic?</Label>
        <RadioGroup value={comfortLevel} onValueChange={setComfortLevel} className="flex flex-col space-y-2">
          <RadioGroupItem value="very_comfortable" id="very_comfortable" />
          <Label htmlFor="very_comfortable">Very Comfortable</Label>
          <RadioGroupItem value="comfortable" id="comfortable" />
          <Label htmlFor="comfortable">Comfortable</Label>
          <RadioGroupItem value="uncomfortable" id="uncomfortable" />
          <Label htmlFor="uncomfortable">Uncomfortable</Label>
          <RadioGroupItem value="very_uncomfortable" id="very_uncomfortable" />
          <Label htmlFor="very_uncomfortable">Very Uncomfortable</Label>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="comments">Additional Comments</Label>
        <Textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Share your thoughts..."
        />
      </div>

      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
};

export default ConversationForm;
