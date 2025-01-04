import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface FinalStepProps {
  form: UseFormReturn<any>;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

const FinalStep = ({ form, onSubmit, onBack, isSubmitting }: FinalStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Any final thoughts? 💭</h2>
      </div>

      <FormField
        control={form.control}
        name="comments"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Additional Comments (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Share your thoughts..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex flex-col space-y-2">
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Conversation"}
        </Button>
        <Button variant="outline" onClick={onBack}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default FinalStep;