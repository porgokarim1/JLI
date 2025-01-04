import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface WelcomeStepProps {
  form: UseFormReturn<any>;
  onNext: () => void;
}

const WelcomeStep = ({ form, onNext }: WelcomeStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <MessageCircle className="mx-auto h-12 w-12 text-yellow-500" />
        <h2 className="text-2xl font-bold">Yay! Tell us about your conversation! 🎉</h2>
        <p className="text-muted-foreground">We're excited to hear about your experience</p>
      </div>
      
      <FormField
        control={form.control}
        name="conversation_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>When did this conversation happen?</FormLabel>
            <FormControl>
              <input type="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button onClick={onNext} className="w-full">
        Next Step
      </Button>
    </div>
  );
};

export default WelcomeStep;