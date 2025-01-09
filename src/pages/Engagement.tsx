import NavigationBar from "@/components/navigation/NavigationBar";
import ConversationForm from "@/components/engagement/ConversationForm";
import ConversationsList from "@/components/engagement/ConversationsList";
import EngagementMetrics from "@/components/engagement/EngagementMetrics";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Engagement = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-base font-medium">Number of peers you talked to</h1>
          
          <div className="w-full">
            <EngagementMetrics type="conversation" />
          </div>

          <div className="flex justify-end">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black whitespace-nowrap">
                  <Plus className="h-5 w-5 mr-2" />
                  New Conversation
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Record a New Conversation</DialogTitle>
                </DialogHeader>
                <ConversationForm onSuccess={() => setOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          <ConversationsList />
        </div>
      </div>
    </div>
  );
};

export default Engagement;