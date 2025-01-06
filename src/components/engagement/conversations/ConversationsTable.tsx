import { Card, CardContent } from "@/components/ui/card";
import ConversationTableRow from "./ConversationTableRow";
import ConversationMobileCard from "./ConversationMobileCard";

interface ConversationsTableProps {
  conversations: any[];
  onEdit: (conversation: any) => void;
}

const ConversationsTable = ({ conversations, onEdit }: ConversationsTableProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardContent>
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="pb-4">Participants</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Comments</th>
                <th className="pb-4">Comfort Level</th>
                <th className="pb-4">Edit</th>
              </tr>
            </thead>
            <tbody>
              {conversations.map((conversation) => (
                <ConversationTableRow
                  key={conversation.id}
                  conversation={conversation}
                  onEdit={onEdit}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
          {conversations.map((conversation) => (
            <ConversationMobileCard
              key={conversation.id}
              conversation={conversation}
              onEdit={onEdit}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationsTable;