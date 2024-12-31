import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/landing/HeroSection";
import CallToAction from "@/components/landing/CallToAction";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LessonsList from "@/components/dashboard/LessonsList";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, Minimize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ConversationForm from "@/components/engagement/ConversationForm";
import ConversationsList from "@/components/engagement/ConversationsList";
import EngagementMetrics from "@/components/engagement/EngagementMetrics";

const ProgramGoals = () => {
  const goals = [
    {
      title: "Educate",
      description: "Provide students with a solid understanding of Jewish perspectives on key issues relating to Israel."
    },
    {
      title: "Empower",
      description: "Equip students with the communication skills and confidence to engage in thoughtful conversations about Israel with non-Jewish peers."
    },
    {
      title: "Advocate",
      description: "Encourage students to share their knowledge and advocate for Israel using a Torah-based approach."
    },
    {
      title: "Shift Focus",
      description: "Move beyond traditional hasbara (public diplomacy) methods and inspire students to justify Israel's actions through the lens of timeless Jewish values."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Our Program Goals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {goals.map((goal, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
            <CardHeader>
              <CardTitle className="text-slate-800">{goal.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">{goal.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProgressMinimized, setIsProgressMinimized] = useState(false);
  const [isConversationDialogOpen, setIsConversationDialogOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setIsLoggedIn(!!session);
      } catch (error) {
        console.error('Error checking auth status:', error);
        toast.error('Error checking authentication status');
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="pt-16">
        {!isLoggedIn ? (
          <>
            <HeroSection />
            <ProgramGoals />
            <CallToAction />
          </>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <DashboardHeader />
            
            <div className="mb-8">
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Progress Dashboard</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsProgressMinimized(!isProgressMinimized)}
                    >
                      <Minimize2 className="h-5 w-5" />
                    </Button>
                  </div>
                  {!isProgressMinimized && (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <EngagementMetrics />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Learning Journey</h2>
              <Dialog open={isConversationDialogOpen} onOpenChange={setIsConversationDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                    <MessageSquarePlus className="h-5 w-5 mr-2" />
                    New Conversation
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>New Conversation</DialogTitle>
                  </DialogHeader>
                  <ConversationForm onSuccess={() => setIsConversationDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>

            <LessonsList />

            <div className="mt-8">
              <ConversationsList />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;