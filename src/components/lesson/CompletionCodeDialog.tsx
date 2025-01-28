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
import { X } from "lucide-react";

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
      // Get user's profile
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data: userProfile } = await supabase
        .from('profiles')
        .select('campus')
        .eq('id', user.id)
        .single();

      if (!userProfile?.campus) {
        setError("Could not determine your campus. Please update your profile.");
        return;
      }

      // Find the lesson with matching completion code
      const { data: lessons } = await supabase
        .from('lessons')
        .select('*')
        .eq('completion_code', code.toUpperCase());

      if (!lessons || lessons.length === 0) {
        setError("Invalid attendance code. Please try again.");
        return;
      }

      const lesson = lessons[0];

      // Update user's lesson progress
      const { error: progressError } = await supabase
        .from('user_lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lesson.id,
          status: 'completed',
          completed_at: new Date().toISOString(),
        });

      if (progressError) throw progressError;

      toast.success("Attendance verified successfully!");
      triggerConfetti();
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error('Error verifying attendance code:', error);
      toast.error("Failed to verify attendance code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="mx-auto w-full max-w-[90%] sm:max-w-lg px-4">
      <DialogHeader>
        <DialogTitle>Enter Attendance Code</DialogTitle>
        <DialogDescription>
          Please enter the attendance code provided by your instructor to confirm your presence at this lesson.
        </DialogDescription>
      </DialogHeader>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        onClick={() => onOpenChange(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Enter attendance code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full"
            required
            autoFocus
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