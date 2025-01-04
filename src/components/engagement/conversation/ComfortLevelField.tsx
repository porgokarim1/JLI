import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface ComfortLevelFieldProps {
  form: UseFormReturn<any>;
}

const ComfortLevelField = ({ form }: ComfortLevelFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="comfort_level"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Comfort Level</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select comfort level" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="very_comfortable">Very Comfortable</SelectItem>
              <SelectItem value="comfortable">Comfortable</SelectItem>
              <SelectItem value="uncomfortable">Uncomfortable</SelectItem>
              <SelectItem value="very_uncomfortable">Very Uncomfortable</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ComfortLevelField;