import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import ConversationForm from "./ConversationForm";
import ConversationTableRow from "./conversations/ConversationTableRow";
import ConversationMobileCard from "./conversations/ConversationMobileCard";
import { Link } from "react-router-dom";

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
              Start engaging with people and record your conversations{" "}
              <Link 
                to="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsNewConversationOpen(true);
                }}
                className="text-primary hover:underline font-medium"
              >
                here
              </Link>
              .
            </p>
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
    </>
  );
};

export default ConversationsList;