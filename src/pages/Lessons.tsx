import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLessons } from "@/components/dashboard/useLessons";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

const Lessons = () => {
  const { data: lessons, isLoading } = useLessons();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <NavigationBar />
        <div className="pt-20 container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
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
      <div className="pt-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Progress</CardTitle>
              <CardDescription>Your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{completedLessons}/{totalLessons} lessons</span>
                  <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Next Lesson</CardTitle>
              <CardDescription>Upcoming session</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm">
                  {nextLesson?.lesson_date 
                    ? format(new Date(nextLesson.lesson_date), 'MMM d')
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
                <span className="text-sm truncate">{nextLesson?.location || 'TBD'}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {lessons?.map((lesson, index) => (
            <Card 
              key={lesson.id} 
              className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
              onClick={() => navigate(`/lesson/${lesson.id}`)}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {lesson.image_url && (
                  <img 
                    src={lesson.image_url} 
                    alt={lesson.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <span className="text-white font-medium">
                    {index + 1}. {lesson.title}
                  </span>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{lesson.description}</p>
                {lesson.progress?.status === 'completed' && (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-xs">Completed</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;