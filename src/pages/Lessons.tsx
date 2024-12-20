import { useEffect, useState } from "react";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PlayCircle, CheckCircle, Clock } from "lucide-react";
import { useLessons } from "@/components/dashboard/useLessons";

const Lessons = () => {
  const navigate = useNavigate();
  const { data: lessons, isLoading } = useLessons();
  const [totalProgress, setTotalProgress] = useState(0);

  useEffect(() => {
    if (lessons) {
      const completedCount = lessons.filter((lesson) => lesson.progress?.status === 'completed').length;
      const totalProgress = (completedCount / lessons.length) * 100;
      setTotalProgress(totalProgress);
    }
  }, [lessons]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <PlayCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      default:
        return 'bg-slate-500';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <NavigationBar />
        <div className="pt-16 container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="pt-16 container mx-auto px-4 py-8">
        <Card className="mb-8 bg-white/90 backdrop-blur-sm border-indigo-100">
          <CardHeader>
            <CardTitle>Your Learning Journey</CardTitle>
            <CardDescription>Track your progress through all lessons</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium">{Math.round(totalProgress)}%</span>
              </div>
              <Progress value={totalProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons?.map((lesson, index) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
              <CardHeader>
                <div className="w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                  <img 
                    src={lesson.image_url} 
                    alt={lesson.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">Lesson {index + 1}</CardTitle>
                  <Badge 
                    variant="secondary"
                    className={`${getStatusColor(lesson.progress?.status || 'not_started')} text-white`}
                  >
                    {lesson.progress?.status.replace('_', ' ')}
                  </Badge>
                </div>
                <CardDescription>{lesson.duration} minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{lesson.description}</p>
                <Button 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => navigate(`/lesson/${lesson.id}`)}
                >
                  {getStatusIcon(lesson.progress?.status || 'not_started')}
                  {lesson.progress?.status === 'completed' ? 'Review Lesson' : 'Start Lesson'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;