import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import HeroSection from "@/components/landing/HeroSection";
import CallToAction from "@/components/landing/CallToAction";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressOverview from "@/components/dashboard/ProgressOverview";
import LessonsList from "@/components/dashboard/LessonsList";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

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
      <NavigationBar />
      <div className="pt-16">
        {!isLoggedIn ? (
          <>
            <HeroSection />
            <ProgramGoals />
            <CallToAction />
          </>
        ) : (
          <>
            <DashboardHeader />
            <ProgressOverview />
            <LessonsList />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;