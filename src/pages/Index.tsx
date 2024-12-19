import HeroSection from "@/components/landing/HeroSection";
import UserTypesSection from "@/components/landing/UserTypesSection";
import CallToAction from "@/components/landing/CallToAction";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressOverview from "@/components/dashboard/ProgressOverview";
import LessonsList from "@/components/dashboard/LessonsList";
import ResourcesSection from "@/components/dashboard/ResourcesSection";

const Index = () => {
  // For now, we'll use a simple boolean. Later when auth is implemented, this will come from the auth context
  const isLoggedIn = false; // Changed back to false to show landing page by default

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
  );
};

export default Index;