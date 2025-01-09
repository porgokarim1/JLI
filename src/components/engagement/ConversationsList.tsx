import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import ConversationForm from "./ConversationForm";
import EmptyConversationState from "./conversations/EmptyConversationState";
import ConversationsTable from "./conversations/ConversationsTable";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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

      <Dialog 
        open={!!editingConversation} 
        onOpenChange={(open) => !open && setEditingConversation(null)}
      >
        <DialogContent className="w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editing Conversation</DialogTitle>
          </DialogHeader>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={() => setEditingConversation(null)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
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