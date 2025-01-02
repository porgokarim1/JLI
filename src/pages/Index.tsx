import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/landing/HeroSection";
import CallToAction from "@/components/landing/CallToAction";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import LessonsList from "@/components/dashboard/LessonsList";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
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
import RewardTierNotification from "@/components/engagement/RewardTierNotification";
import { useQuery } from "@tanstack/react-query";

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

const StudentDashboard = ({ conversationCount }: { conversationCount: number | undefined }) => {
  const [isConversationDialogOpen, setIsConversationDialogOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Progress Dashboard - Minimized */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <EngagementMetrics type="learning" />
            </div>
          </CardContent>
        </Card>

        {/* Conversation Progress */}
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Conversation Progress</CardTitle>
            <Dialog open={isConversationDialogOpen} onOpenChange={setIsConversationDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                  <MessageSquarePlus className="h-5 w-5 mr-2" />
                  New
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>New Conversation</DialogTitle>
                </DialogHeader>
                <ConversationForm onSuccess={() => setIsConversationDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <EngagementMetrics type="conversation" />
              {conversationCount !== undefined && (
                <RewardTierNotification conversationCount={conversationCount} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Your Learning Journey</h2>
        <LessonsList />
      </div>

      <div className="mt-8">
        <ConversationsList />
      </div>
    </div>
  );
};

const InstructorDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Instructor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Course Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Instructor dashboard coming soon...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Student tracking features coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Administrator Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Program Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Admin dashboard coming soon...</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">User management features coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setIsLoggedIn(!!session);
        
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          setUserRole(profile?.role || null);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        toast.error('Error checking authentication status');
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsLoggedIn(!!session);
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
          
        setUserRole(profile?.role || null);
      } else {
        setUserRole(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const { data: conversationCount } = useQuery({
    queryKey: ['conversation-count'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return 0;

      const { count } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      return count || 0;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (userRole) {
      case 'instructor':
        return <InstructorDashboard />;
      case 'administrator':
        return <AdminDashboard />;
      default:
        return <StudentDashboard conversationCount={conversationCount} />;
    }
  };

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
          renderDashboard()
        )}
      </div>
    </div>
  );
};

export default Index;
