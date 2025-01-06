import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit, Users } from "lucide-react";

interface ConversationMobileCardProps {
  conversation: any;
  onEdit: (conversation: any) => void;
}

const ConversationMobileCard = ({ conversation, onEdit }: ConversationMobileCardProps) => {
  const getComfortEmoji = (comfort_level: string) => {
    switch (comfort_level) {
      case 'very_comfortable':
        return '😄';
      case 'comfortable':
        return '🙂';
      case 'uncomfortable':
        return '😕';
      case 'very_uncomfortable':
        return '😣';
      default:
        return '😐';
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span>{conversation.participant_count} {conversation.participant_count === 1 ? 'person' : 'people'}</span>
          </div>
          <div>
            {getComfortEmoji(conversation.comfort_level || '')} {conversation.comfort_level?.replace("_", " ")}
          </div>
          <div>{format(new Date(conversation.conversation_date), "PPP")}</div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(conversation)}
          className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
      {conversation.comments && (
        <p className="text-sm text-gray-600 mt-2">{conversation.comments}</p>
      )}
    </div>
  );
};

export default ConversationMobileCard;