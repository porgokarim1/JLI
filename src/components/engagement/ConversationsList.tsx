import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ConversationForm from "./ConversationForm";

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
    return (
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
            <p className="text-gray-600">
              Start engaging with people and record your conversations here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Recent Conversations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="hover:bg-transparent">Name</TableHead>
              <TableHead className="hover:bg-transparent">Date</TableHead>
              <TableHead className="hover:bg-transparent">Notes</TableHead>
              <TableHead className="hover:bg-transparent">Comfort Level</TableHead>
              <TableHead className="hover:bg-transparent">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conversations.map((conversation) => (
              <TableRow key={conversation.id}>
                <TableCell>
                  {conversation.first_name} {conversation.middle_name && `${conversation.middle_name} `}{conversation.last_name}
                </TableCell>
                <TableCell>
                  {format(new Date(conversation.conversation_date), "PPP")}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {conversation.notes}
                </TableCell>
                <TableCell className="capitalize">
                  {conversation.comfort_level?.replace("_", " ")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingConversation(conversation)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
      </CardContent>
    </Card>
  );
};

export default ConversationsList;