import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit, Users } from "lucide-react";

interface ConversationTableRowProps {
  conversation: any;
  onEdit: (conversation: any) => void;
}

const ConversationTableRow = ({ conversation, onEdit }: ConversationTableRowProps) => {
  return (
    <tr className="border-t">
      <td className="py-4">
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-2 text-primary" />
          {conversation.participant_count} {conversation.participant_count === 1 ? 'person' : 'people'}
        </div>
      </td>
      <td className="py-4">
        {format(new Date(conversation.conversation_date), "PPP")}
      </td>
      <td className="py-4 max-w-xs truncate">
        {conversation.comments}
      </td>
      <td className="py-4 capitalize">
        {conversation.comfort_level?.replace("_", " ")}
      </td>
      <td className="py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(conversation)}
        >
          <Edit className="h-4 w-4 text-primary" />
        </Button>
      </td>
    </tr>
  );
};

export default ConversationTableRow;