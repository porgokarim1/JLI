import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import ConversationForm from "./ConversationForm";
import ConversationTableRow from "./conversations/ConversationTableRow";
import ConversationMobileCard from "./conversations/ConversationMobileCard";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";

const ConversationsList = () => {
  const [editingConversation, setEditingConversation] = useState<any>(null);
  const [isConversationDialogOpen, setIsConversationDialogOpen] = useState(false);
  
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
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="bg-primary/10 rounded-full p-4 mb-6">
              <MessageSquarePlus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">No conversations yet</h3>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              Start engaging with people and record your meaningful conversations
            </p>
            <Button 
              onClick={() => setIsConversationDialogOpen(true)}
              className="bg-primary hover:bg-primary-dark text-primary-foreground font-medium px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
            >
              Record Your First Conversation
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
                  <ConversationTableRow
                    key={conversation.id}
                    conversation={conversation}
                    onEdit={setEditingConversation}
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
                onEdit={setEditingConversation}
              />
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
        open={isConversationDialogOpen} 
        onOpenChange={setIsConversationDialogOpen}
      >
        <DialogContent className="w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Conversation</DialogTitle>
          </DialogHeader>
          <ConversationForm 
            onSuccess={() => {
              setIsConversationDialogOpen(false);
              refetch();
            }} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConversationsList;