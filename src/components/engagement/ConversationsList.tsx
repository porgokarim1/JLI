import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import ConversationForm from "./ConversationForm";
import EmptyConversationState from "./conversations/EmptyConversationState";
import ConversationsTable from "./conversations/ConversationsTable";

const ConversationsList = () => {
  const [editingConversation, setEditingConversation] = useState<any>(null);
  
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
    return <EmptyConversationState onConversationAdded={refetch} />;
  }

  return (
    <>
      <ConversationsTable 
        conversations={conversations} 
        onEdit={setEditingConversation} 
      />

      {/* Edit Conversation Dialog */}
      <Dialog 
        open={!!editingConversation} 
        onOpenChange={(open) => !open && setEditingConversation(null)}
      >
        <DialogContent className="w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editing Conversation</DialogTitle>
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
    </>
  );
};

export default ConversationsList;
