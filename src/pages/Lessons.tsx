import { useState } from "react";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLessons } from "@/components/dashboard/useLessons";
import { MapPin, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CompletionCodeDialog } from "@/components/lesson/CompletionCodeDialog";

const Lessons = () => {
  const { data: lessons, isLoading } = useLessons();
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);

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
        {/* Progress and Next Lesson Cards */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-2 sm:mb-4">
          <Card className="bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader className="p-2 sm:p-4">
              <CardTitle className="text-sm sm:text-lg">Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 pt-0">
              <div>
                <div className="flex justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm font-medium">{completedLessons}/4 lessons</span>
                  <span className="text-xs sm:text-sm font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-1.5 sm:h-2" />
                <Button 
                  variant="default"
                  className="w-full mt-4 text-black h-8 text-xs"
                  onClick={() => setShowAttendanceForm(true)}
                >
                  Attend
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader className="p-2 sm:p-4 pb-0">
              <CardTitle className="text-sm sm:text-lg">{nextLesson?.title || 'No upcoming lessons'}</CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 space-y-1">
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

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 pb-4 flex-1 overflow-y-auto">
          {lessons?.map((lesson) => (
            <Card 
              key={lesson.id} 
              className="flex flex-col relative bg-white/90 backdrop-blur-sm overflow-hidden"
            >
              <div className="flex flex-row md:flex-col w-full">
                {lesson.image_url && (
                  <div className="w-1/4 md:w-full h-20 md:h-28 relative overflow-hidden">
                    <img 
                      src={lesson.image_url} 
                      alt={lesson.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 p-1.5 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-[11px] md:text-sm mb-0.5 line-clamp-1">{lesson.title}</h3>
                    <p className="text-[9px] md:text-xs text-gray-600 mb-0.5 line-clamp-2">{lesson.description}</p>
                    
                    <div className="flex flex-col gap-0.5 text-[8px] md:text-[11px]">
                      <div className="flex items-center gap-0.5">
                        <Calendar className="h-2 w-2 md:h-3 md:w-3 text-primary flex-shrink-0" />
                        <span className="whitespace-nowrap">
                          {lesson.lesson_date 
                            ? format(new Date(lesson.lesson_date), 'MMM d')
                            : 'TBD'}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Clock className="h-2 w-2 md:h-3 md:w-3 text-primary flex-shrink-0" />
                        <span className="whitespace-nowrap">
                          {lesson.lesson_time
                            ? format(new Date(`2000-01-01T${lesson.lesson_time}`), 'p')
                            : 'TBD'}
                        </span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <MapPin className="h-2 w-2 md:h-3 md:w-3 text-primary flex-shrink-0" />
                        <span className="truncate">{lesson.location || 'TBD'}</span>
                      </div>
                    </div>
                  </div>
                  
                  {lesson.progress?.status === 'completed' && (
                    <div className="mt-0.5 flex items-center gap-0.5 text-green-600">
                      <CheckCircle2 className="h-2 w-2 md:h-3 md:w-3" />
                      <span className="text-[8px] md:text-[11px]">Completed</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <CompletionCodeDialog
          lessonId={nextLesson?.id || ''}
          onSuccess={() => setShowAttendanceForm(false)}
          open={showAttendanceForm}
          onOpenChange={setShowAttendanceForm}
        />
      </div>
    </div>
  );
};

export default Lessons;