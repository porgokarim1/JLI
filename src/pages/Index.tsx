import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/landing/HeroSection";
import UserTypesSection from "@/components/landing/UserTypesSection";
import CallToAction from "@/components/landing/CallToAction";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressOverview from "@/components/dashboard/ProgressOverview";
import LessonsList from "@/components/dashboard/LessonsList";
import ResourcesSection from "@/components/dashboard/ResourcesSection";
import NavigationBar from "@/components/navigation/NavigationBar";
import { toast } from "sonner";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
      {isLoggedIn && <NavigationBar />}
      <div className={isLoggedIn ? "pt-16" : ""}>
        {!isLoggedIn ? (
          <>
            <HeroSection />
            <UserTypesSection />
            <CallToAction />
          </>
        ) : (
          <>
            <DashboardHeader />
            <ProgressOverview />
            <LessonsList />
            <ResourcesSection />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;