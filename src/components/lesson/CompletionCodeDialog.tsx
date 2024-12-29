import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

interface CompletionCodeDialogProps {
  lessonId: string;
  onSuccess: () => void;
}

export const CompletionCodeDialog = ({ lessonId, onSuccess }: CompletionCodeDialogProps) => {
  const [code, setCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Verify the completion code
      const { data: lesson, error: lessonError } = await supabase
        .from('lessons')
        .select('completion_code')
        .eq('id', lessonId)
        .single();

      if (lessonError) throw lessonError;

      if (lesson.completion_code !== code.toUpperCase()) {
        toast.error("Invalid completion code. Please try again.");
        return;
      }

      // Update lesson progress
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error: progressError } = await supabase
        .from('user_lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          status: 'completed',
          completed_at: new Date().toISOString(),
        });

      if (progressError) throw progressError;

      toast.success("Course completion verified successfully!");
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      console.error('Error verifying completion code:', error);
      toast.error("Failed to verify completion code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full mt-4">
          Mark Course as Completed
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Completion Code</DialogTitle>
          <DialogDescription>
            Please enter the completion code provided by your instructor to mark this course as completed.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Enter completion code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full"
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};