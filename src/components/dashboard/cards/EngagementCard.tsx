import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, Plus } from "lucide-react";

interface EngagementCardProps {
  totalPeers: number;
  onNewEngagement: () => void;
}

export const EngagementCard = ({ totalPeers, onNewEngagement }: EngagementCardProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Handshake className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium text-sm">Engagements</h3>
              <p className="text-xs text-muted-foreground">{totalPeers}/7 peers</p>
            </div>
          </div>
          <Button 
            variant="default"
            className="text-black h-8 text-xs"
            onClick={onNewEngagement}
          >
            <Plus className="h-4 w-4 mr-1" /> New
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};