import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Copy } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ReferralCardProps {
  onShareLink: () => void;
}

export const ReferralCard = ({ onShareLink }: ReferralCardProps) => {
  const { data: profile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Share2 className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium text-sm">Share with Friends</h3>
              <p className="text-xs text-muted-foreground">
                {profile?.campus || 'Your Campus'} needs more students like you
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="text-gray-500 h-8 text-xs"
            onClick={onShareLink}
          >
            <Copy className="h-4 w-4 mr-2" />
            Share Link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};