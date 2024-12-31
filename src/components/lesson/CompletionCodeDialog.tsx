import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import confetti from 'canvas-confetti';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

interface CompletionCodeDialogProps {
  lessonId: string;
  onSuccess: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CompletionCodeDialog = ({ lessonId, onSuccess, open, onOpenChange }: CompletionCodeDialogProps) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data: lesson, error: lessonError } = await supabase
        .from('lessons')
        .select('completion_code')
        .eq('id', lessonId)
        .single();

      if (lessonError) throw lessonError;

      if (lesson.completion_code !== code.toUpperCase()) {
        setError("Invalid completion code. Please try again.");
        return;
      }

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
      triggerConfetti();
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error('Error verifying completion code:', error);
      toast.error("Failed to verify completion code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Completion Code</DialogTitle>
          <DialogDescription>
            Please enter the completion code provided by your instructor to mark this course as completed.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Enter completion code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full"
              required
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};