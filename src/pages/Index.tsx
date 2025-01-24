import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import HeroSection from "@/components/landing/HeroSection";
import NavigationBar from "@/components/navigation/NavigationBar";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import InstructorDashboard from "@/components/dashboard/InstructorDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import WelcomePopup from "@/components/welcome/WelcomePopup";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session error:', error);
          setIsLoggedIn(false);
          setIsLoading(false);
          return;
        }

        if (!session) {
          setIsLoggedIn(false);
          setIsLoading(false);
          return;
        }

        setIsLoggedIn(true);

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role, terms_agreed')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error('Profile error:', profileError);
          toast.error('Error loading user profile');
          return;
        }

        setUserRole(profile?.role || null);

        // Show welcome popup if terms haven't been agreed to
        if (profile && !profile.terms_agreed) {
          setShowWelcomePopup(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        toast.error('Error checking authentication status');
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setUserRole(null);
        navigate('/login');
        return;
      }

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setIsLoggedIn(!!session);

        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role, terms_agreed')
            .eq('id', session.user.id)
            .single();

          setUserRole(profile?.role || null);

          // Show welcome popup if terms haven't been agreed to
          if (profile && !profile.terms_agreed) {
            setShowWelcomePopup(true);
          }
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const { data: conversationCount } = useQuery({
    queryKey: ['conversation-count'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return 0;

      const { count } = await supabase
        .from('conversations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id);

      return count || 0;
    },
    enabled: isLoggedIn,
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
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <nav className="h-14 sm:h-16 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center h-full">
            <div className="flex items-center">
              <img
                src="https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/lesson_images/logo.png?t=2025-01-02T06%3A41%3A20.422Z"
                alt="Know Israel"
                className="h-6 sm:h-8 w-auto"
              />
              <span className="font-bold text-lg sm:text-xl text-black ml-2">KNOW ISRAEL</span>
            </div>
          </div>
        </div>
      </nav>
      <div className="pt-4">
        {!isLoggedIn ? (
          <HeroSection />
        ) : (
          renderDashboard()
        )}
      </div>
      <WelcomePopup
        isOpen={showWelcomePopup}
        onClose={() => setShowWelcomePopup(false)}
      />
    </div>
  );
};

export default Index;
