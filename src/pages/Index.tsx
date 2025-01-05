import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/landing/HeroSection";
import CallToAction from "@/components/landing/CallToAction";
import NavigationBar from "@/components/navigation/NavigationBar";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import InstructorDashboard from "@/components/dashboard/InstructorDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

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
    console.log('Current user role:', userRole); // Debug log
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
      <div className="pt-12">
        {!isLoggedIn ? (
          <>
            <HeroSection />
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
