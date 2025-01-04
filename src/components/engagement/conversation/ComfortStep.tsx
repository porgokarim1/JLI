import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ComfortStepProps {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
}

const ComfortStep = ({ form, onNext, onBack }: ComfortStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">How comfortable were you? 😊</h2>
      </div>

      <FormField
        control={form.control}
        name="comfort_level"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col space-y-2"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="very_comfortable" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Very Comfortable 😄
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="comfortable" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Comfortable 🙂
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="uncomfortable" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Uncomfortable 😕
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="very_uncomfortable" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Very Uncomfortable 😣
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex flex-col space-y-2">
        <Button onClick={onNext}>Next Step</Button>
        <Button variant="outline" onClick={onBack}>Go Back</Button>
      </div>
    </div>
  );
};

export default ComfortStep;