import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface CommentsFieldProps {
  form: UseFormReturn<any>;
}

const CommentsField = ({ form }: CommentsFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="comments"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Any comments? (Optional)</FormLabel>
          <FormControl>
            <Input placeholder="Add any comments here" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CommentsField;