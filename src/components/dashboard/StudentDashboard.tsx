import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "./DashboardHeader";
import LessonsList from "./LessonsList";
import ProgressOverview from "./ProgressOverview";
import ResourcesSection from "./ResourcesSection";
import ScheduledLessons from "./schedule/ScheduledLessons";

interface StudentDashboardProps {
  conversationCount?: number;
}

const StudentDashboard = ({ conversationCount = 0 }: StudentDashboardProps) => {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <DashboardHeader />
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Progress Overview</h3>
              <ProgressOverview />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="lessons">
          <LessonsList />
        </TabsContent>

        <TabsContent value="schedule">
          <ScheduledLessons />
        </TabsContent>

        <TabsContent value="resources">
          <ResourcesSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;