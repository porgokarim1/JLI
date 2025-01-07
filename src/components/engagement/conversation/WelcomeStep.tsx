import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { MessageCircle, PartyPopper } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface WelcomeStepProps {
  form: UseFormReturn<any>;
  onNext: () => void;
}

const WelcomeStep = ({ form, onNext }: WelcomeStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-2">
          <PartyPopper className="h-8 w-8 text-primary animate-bounce" />
          <MessageCircle className="h-8 w-8 text-primary animate-pulse" />
        </div>
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
              <input 
                type="date" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <button 
        onClick={onNext}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default WelcomeStep;
