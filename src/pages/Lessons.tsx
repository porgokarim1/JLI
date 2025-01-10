import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLessons } from "@/components/dashboard/useLessons";
import { MapPin, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

const Lessons = () => {
  const { data: lessons, isLoading } = useLessons();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <NavigationBar />
        <div className="pt-20 container mx-auto px-4">
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
    <div className="h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="h-[calc(100vh-4rem)] pt-20 container mx-auto px-2 sm:px-4 flex flex-col">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-2 sm:mb-4">
          <Card className="bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader className="p-2 sm:p-4">
              <CardTitle className="text-sm sm:text-lg">Progress</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 pt-0">
              <div>
                <div className="flex justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm font-medium">{completedLessons}/{totalLessons} lessons</span>
                  <span className="text-xs sm:text-sm font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-1.5 sm:h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader className="p-2 sm:p-4">
              <CardTitle className="text-sm sm:text-lg">Next Lesson</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Upcoming session</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 pt-0 space-y-1">
              <div className="flex items-center gap-1 sm:gap-2">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm">
                  {nextLesson?.lesson_date 
                    ? format(new Date(nextLesson.lesson_date), 'MMM d')
                    : 'TBD'}
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm">
                  {nextLesson?.lesson_time
                    ? format(new Date(`2000-01-01T${nextLesson.lesson_time}`), 'p')
                    : 'TBD'}
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm truncate">{nextLesson?.location || 'TBD'}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 pb-4 flex-1 overflow-y-auto">
          {lessons?.map((lesson) => (
            <Card 
              key={lesson.id} 
              className="flex flex-col relative bg-white/90 backdrop-blur-sm"
            >
              <div className="p-2 sm:p-4 flex flex-col justify-between h-full">
                <div>
                  <h3 className="font-medium text-xs sm:text-base md:text-lg mb-1 sm:mb-2">{lesson.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-1 sm:mb-2">{lesson.description}</p>
                  
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-primary" />
                      <span className="whitespace-nowrap">
                        {lesson.lesson_date 
                          ? format(new Date(lesson.lesson_date), 'MMM d')
                          : 'TBD'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-primary" />
                      <span className="whitespace-nowrap">
                        {lesson.lesson_time
                          ? format(new Date(`2000-01-01T${lesson.lesson_time}`), 'p')
                          : 'TBD'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 flex-1 min-w-0">
                      <MapPin className="h-3 w-3 text-primary flex-shrink-0" />
                      <span className="truncate">{lesson.location || 'TBD'}</span>
                    </div>
                  </div>
                </div>
                
                {lesson.progress?.status === 'completed' && (
                  <div className="mt-2 flex items-center gap-1 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-xs">Completed</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;