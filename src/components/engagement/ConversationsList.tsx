import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit, Users, MessageSquarePlus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ConversationForm from "./ConversationForm";

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

const ConversationsList = () => {
  const [editingConversation, setEditingConversation] = useState<any>(null);
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);
  
  const { data: conversations, isLoading, refetch } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .order("conversation_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (!conversations?.length) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
            <p className="text-gray-600 mb-4">
              Start engaging with people and record your conversations here.
            </p>
            <Button
              onClick={() => setIsNewConversationOpen(true)}
              className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black flex items-center gap-2"
            >
              <MessageSquarePlus className="h-5 w-5" />
              Record New Conversation
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
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
                  <tr key={conversation.id} className="border-t">
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
                        onClick={() => setEditingConversation(conversation)}
                      >
                        <Edit className="h-4 w-4 text-primary" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {conversations.map((conversation) => (
              <div key={conversation.id} className="p-4 bg-gray-50 rounded-lg">
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
                    onClick={() => setEditingConversation(conversation)}
                    className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                {conversation.comments && (
                  <p className="text-sm text-gray-600 mt-2">{conversation.comments}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Conversation Dialog */}
      <Dialog 
        open={!!editingConversation} 
        onOpenChange={(open) => !open && setEditingConversation(null)}
      >
        <DialogContent className="w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Conversation</DialogTitle>
          </DialogHeader>
          <ConversationForm 
            initialData={editingConversation}
            onSuccess={() => {
              setEditingConversation(null);
              refetch();
            }} 
          />
        </DialogContent>
      </Dialog>

      {/* New Conversation Dialog */}
      <Dialog 
        open={isNewConversationOpen} 
        onOpenChange={setIsNewConversationOpen}
      >
        <DialogContent className="w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Conversation</DialogTitle>
          </DialogHeader>
          <ConversationForm 
            onSuccess={() => {
              setIsNewConversationOpen(false);
              refetch();
            }} 
          />
        </DialogContent>
      </Dialog>

      {/* Floating Action Button for New Conversation */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => setIsNewConversationOpen(true)}
          className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black rounded-full shadow-lg flex items-center gap-2"
          size="lg"
        >
          <MessageSquarePlus className="h-5 w-5" />
          New Conversation
        </Button>
      </div>
    </>
  );
};

export default ConversationsList;