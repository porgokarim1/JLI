import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLessons } from "@/components/dashboard/useLessons";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

const Lessons = () => {
  const { data: lessons, isLoading } = useLessons();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <NavigationBar />
        <div className="pt-16 container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const completedLessons = lessons?.filter(lesson => lesson.progress?.status === 'completed').length || 0;
  const totalLessons = lessons?.length || 0;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  // Find the next lesson (closest future date)
  const getNextLesson = () => {
    if (!lessons?.length) return null;
    const today = new Date();
    const futureLessons = lessons
      .filter(lesson => lesson.lesson_date && new Date(lesson.lesson_date) >= today)
      .sort((a, b) => new Date(a.lesson_date!).getTime() - new Date(b.lesson_date!).getTime());
    return futureLessons[0];
  };

  const nextLesson = getNextLesson();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="pt-16 container mx-auto px-4 h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Progress Card */}
          <Card className="bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader className="py-2">
              <CardTitle className="text-lg">Your Learning Journey</CardTitle>
              <CardDescription className="text-sm">Track your progress through all lessons</CardDescription>
            </CardHeader>
            <CardContent className="py-2">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm font-medium">{completedLessons}/{totalLessons} lessons</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Next Lesson Card */}
          <Card className="bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader className="py-2">
              <CardTitle className="text-lg">Next Lesson</CardTitle>
              <CardDescription className="text-sm">Your upcoming lesson details</CardDescription>
            </CardHeader>
            <CardContent className="py-2 space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm">
                  {nextLesson?.lesson_date 
                    ? format(new Date(nextLesson.lesson_date), 'PPP')
                    : 'TBD'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm">
                  {nextLesson?.lesson_time
                    ? format(new Date(`2000-01-01T${nextLesson.lesson_time}`), 'p')
                    : 'TBD'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">{nextLesson?.location || 'TBD'}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {lessons?.slice(0, 4).map((lesson) => (
            <Card 
              key={lesson.id} 
              className="flex flex-row md:flex-col hover:shadow-lg transition-shadow h-40 md:h-[360px] overflow-hidden"
            >
              <div className="w-1/3 md:w-full h-full md:h-48">
                {lesson.image_url && (
                  <img 
                    src={lesson.image_url} 
                    alt={lesson.title}
                    className="w-full h-full object-cover rounded-l-lg md:rounded-t-lg md:rounded-b-none md:rounded-l-none"
                  />
                )}
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-base md:text-lg mb-2 line-clamp-2">{lesson.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">{lesson.description}</p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-gray-500">
                    {lesson.progress?.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => navigate(`/lesson/${lesson.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;