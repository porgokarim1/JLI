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
    <div className="min-h-screen bg-[#FEF7CD]">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">Engagement Dashboard</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black whitespace-nowrap">
                <Plus className="h-5 w-5 mr-2" />
                New Conversation
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>New Conversation</DialogTitle>
              </DialogHeader>
              <ConversationForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <EngagementMetrics />
        </div>

        <ConversationsList />
      </div>
    </div>
  );
};

export default Engagement;