import NavigationBar from "@/components/navigation/NavigationBar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLessons } from "@/components/dashboard/useLessons";
import { MapPin, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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

  // Sort lessons by lesson_order
  const sortedLessons = [...(lessons || [])].sort((a, b) => 
    (a.lesson_order || '').localeCompare(b.lesson_order || '')
  );

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="h-[calc(100vh-4rem)] pt-20 container mx-auto px-2 sm:px-4 flex flex-col">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-2 sm:mb-4">
          <Card className="bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg">
            <div className="p-2 sm:p-4">
              <h3 className="text-sm sm:text-lg font-semibold">Progress</h3>
              <div className="mt-2">
                <div className="flex justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm font-medium">{completedLessons}/{totalLessons} lessons</span>
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
            </div>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg">
            <div className="p-2 sm:p-4">
              <h3 className="text-sm sm:text-lg font-semibold">{nextLesson?.title || 'No upcoming lessons'}</h3>
              <div className="space-y-1 mt-2">
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
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:gap-4 pb-4 flex-1 overflow-y-auto">
          {sortedLessons?.map((lesson) => (
            <Card 
              key={lesson.id} 
              className="flex bg-white/90 backdrop-blur-sm border border-gray-900"
            >
              {/* Left section with lesson order */}
              <div className="w-1/5 bg-primary flex items-center justify-center p-4 border-r border-gray-900">
                <span className="text-4xl font-bold text-primary-foreground">
                  {lesson.lesson_order || '1'}
                </span>
              </div>

              {/* Right section with lesson details */}
              <div className="w-4/5 p-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{lesson.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{lesson.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>
                        {lesson.lesson_date 
                          ? format(new Date(lesson.lesson_date), 'PPP')
                          : 'TBD'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>
                        {lesson.lesson_time
                          ? format(new Date(`2000-01-01T${lesson.lesson_time}`), 'p')
                          : 'TBD'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="truncate">{lesson.location || 'TBD'}</span>
                    </div>
                  </div>

                  {lesson.progress?.status === 'completed' && (
                    <div className="mt-3 flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="font-medium">Completed</span>
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