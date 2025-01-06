import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";

interface ComfortStepProps {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
}

const ComfortStep = ({ form, onNext, onBack }: ComfortStepProps) => {
  const comfortLevel = form.watch("comfort_level");
  
  const comfortOptions = [
    { value: "very_comfortable", label: "Very Comfortable", emoji: "😄" },
    { value: "comfortable", label: "Comfortable", emoji: "🙂" },
    { value: "uncomfortable", label: "Uncomfortable", emoji: "😕" },
    { value: "very_uncomfortable", label: "Very Uncomfortable", emoji: "😣" }
  ];
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">How comfortable were you?</h2>
        <p className="text-sm text-muted-foreground">This field is required</p>
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
                className="flex flex-col space-y-3"
              >
                {comfortOptions.map((option) => (
                  <motion.div
                    key={option.value}
                    animate={field.value === option.value ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={option.value} />
                      </FormControl>
                      <FormLabel className="font-normal text-lg flex items-center space-x-2">
                        <span className="text-2xl">{option.emoji}</span>
                        <span>{option.label}</span>
                      </FormLabel>
                    </FormItem>
                  </motion.div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex flex-col space-y-2">
        <Button 
          onClick={onNext}
          disabled={!comfortLevel}
          className="bg-[#8B4513] hover:bg-[#723A0F] text-white"
        >
          Next Step
        </Button>
        <Button variant="outline" onClick={onBack}>Go Back</Button>
      </div>
    </div>
  );
};

export default ComfortStep;