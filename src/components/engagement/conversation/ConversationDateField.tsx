import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface ConversationDateFieldProps {
  form: UseFormReturn<any>;
}

const ConversationDateField = ({ form }: ConversationDateFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="conversation_date"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Date of Conversation</FormLabel>
          <FormControl>
            <Input type="date" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ConversationDateField;