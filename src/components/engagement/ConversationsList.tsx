import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit, Users } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ConversationForm from "./ConversationForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
            <p className="text-gray-600 mb-4">
              Start engaging with people and record your conversations here.
            </p>
            <Button
              onClick={() => setEditingConversation({})}
              className="bg-[#8B4513] hover:bg-[#723A0F] text-white"
            >
              Record New Conversation
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

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

        <div className="md:hidden">
          <Accordion type="single" collapsible className="w-full">
            {conversations.map((conversation) => (
              <AccordionItem key={conversation.id} value={conversation.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-col items-start">
                    <div className="flex items-center text-primary">
                      <Users className="h-4 w-4 mr-2" />
                      {conversation.participant_count} {conversation.participant_count === 1 ? 'person' : 'people'}
                    </div>
                    <span className="text-sm text-gray-500">
                      {format(new Date(conversation.conversation_date), "PPP")}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2 bg-soft-purple/20 p-4 rounded-lg">
                    <div>
                      <span className="font-medium">Comments:</span>{" "}
                      {conversation.comments}
                    </div>
                    <div>
                      <span className="font-medium">Comfort Level:</span>{" "}
                      <span className="capitalize">
                        {conversation.comfort_level?.replace("_", " ")}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingConversation(conversation)}
                      className="w-full mt-2"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Conversation
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

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