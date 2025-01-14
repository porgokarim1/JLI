import NavigationBar from "@/components/navigation/NavigationBar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLessons } from "@/components/dashboard/useLessons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CompletionCodeDialog } from "@/components/lesson/CompletionCodeDialog";
import { LessonCard } from "@/components/dashboard/LessonCard";

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
              <h3 className="text-sm sm:text-lg font-semibold">Next Lesson</h3>
              <div className="mt-2 text-xs sm:text-sm">
                {nextLesson ? (
                  <>
                    <p className="font-medium">{nextLesson.title}</p>
                    <p className="text-gray-600 mt-1">
                      {nextLesson.lesson_date 
                        ? new Date(nextLesson.lesson_date).toLocaleDateString()
                        : 'Date TBD'}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-600">No upcoming lessons scheduled</p>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:gap-4 pb-4 flex-1 overflow-y-auto">
          {sortedLessons.map((lesson, index) => (
            <LessonCard 
              key={lesson.id} 
              lesson={lesson}
              index={index}
            />
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