import { useState, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import confetti from "canvas-confetti";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { Key, X } from "lucide-react";

interface CompletionCodeDialogProps {
  lessonId: string;
  onSuccess: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CompletionCodeDialog = ({
  lessonId,
  onSuccess,
  open,
  onOpenChange,
}: CompletionCodeDialogProps) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    new Array(4).fill(null)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; 

    const newCode = [...code];
    newCode[index] = value.toUpperCase();
    setCode(newCode);


    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {

      inputRefs.current[index - 1]?.focus();
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const fullCode = code.join("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data: userProfile } = await supabase
        .from("profiles")
        .select("campus")
        .eq("id", user.id)
        .single();

      if (!userProfile?.campus) {
        setError("Could not determine your campus. Please update your profile.");
        return;
      }

      const { data: lessons } = await supabase
        .from("lessons_schedule")
        .select("*")
        .eq("attendance_code", fullCode)
        .eq("campus", userProfile.campus);

      if (!lessons || lessons.length === 0) {
        setError("Invalid attendance code. Please try again.");
        return;
      }

      const lesson = lessons[0];

      const { error: progressError } = await supabase.from("user_lesson_progress").upsert({
        user_id: user.id,
        lesson_id: lesson.lesson_id,
        status: "completed",
        completed_at: new Date().toISOString(),
      });

      if (progressError) throw progressError;

      toast.success("Attendance verified successfully!");
      triggerConfetti();
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error("Error verifying attendance code:", error);
      toast.error("Failed to verify attendance code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="mx-auto w-full max-w-[90%] sm:max-w-md px-6 py-8 rounded-lg bg-white shadow-lg">

        <div className="flex justify-center">
          <div className="p-3 bg-yellow-400 rounded-full">
            <Key className="w-8 h-8 text-black" />
          </div>
        </div>

        <DialogHeader className="text-center">
          <DialogTitle className="text-lg font-bold text-black">
            ENTER ATTENDANCE CODE
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Please enter the attendance code provided by your instructor to confirm your presence at this lesson.
          </DialogDescription>
        </DialogHeader>


        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 opacity-70 transition-opacity hover:opacity-100"
          onClick={() => onOpenChange(false)}
        >
          <X className="h-4 w-4 text-gray-500" />
        </Button>


        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <Input
                key={index}
                type="text"
                value={digit}
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
                required
              />
            ))}
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}


          <Button type="submit" className="w-full bg-yellow-400 text-black font-bold py-2 rounded-md" disabled={isLoading || code.includes("")}>
            {isLoading ? "Verifying..." : "Submit"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full text-gray-500 hover:underline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};