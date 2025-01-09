import { MessageSquarePlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import ConversationForm from "../ConversationForm";

interface EmptyConversationStateProps {
  onConversationAdded: () => void;
}

const EmptyConversationState = ({ onConversationAdded }: EmptyConversationStateProps) => {
  const [isConversationDialogOpen, setIsConversationDialogOpen] = useState(false);

  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="bg-primary/10 rounded-full p-4 mb-6">
            <MessageSquarePlus className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">No conversations yet</h3>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            Start engaging with people and record your meaningful conversations{" "}
            <button 
              onClick={() => setIsConversationDialogOpen(true)}
              className="text-primary hover:text-primary-dark underline font-medium transition-colors"
            >
              here
            </button>
          </p>
          <Dialog open={isConversationDialogOpen} onOpenChange={setIsConversationDialogOpen}>
            <DialogContent className="w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Record Your First Conversation</DialogTitle>
              </DialogHeader>
              <ConversationForm 
                onSuccess={() => {
                  setIsConversationDialogOpen(false);
                  onConversationAdded();
                }}
                onClose={() => setIsConversationDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyConversationState;