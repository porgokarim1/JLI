import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, Sparkles } from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import LessonsList from "./LessonsList";
import EngagementMetrics from "@/components/engagement/EngagementMetrics";

const StudentDashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <DashboardHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
        {/* Progress Dashboard */}
        <Card className="bg-soft-blue border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-primary" />
              Learning progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <EngagementMetrics type="learning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          Your learning journey
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
        </h2>
        <LessonsList />
      </div>
    </div>
  );
};

export default StudentDashboard;