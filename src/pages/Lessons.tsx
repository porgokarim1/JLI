import NavigationBar from "@/components/navigation/NavigationBar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLessons } from "@/components/dashboard/useLessons";
import { useState } from "react";
import { CompletionCodeDialog } from "@/components/lesson/CompletionCodeDialog";
import { LessonCard } from "@/components/dashboard/LessonCard";
import { NextLessonCard } from "@/components/dashboard/cards/NextLessonCard";
import BottomNav from "@/components/navigation/BottomNav";
import { useIsMobile } from "@/hooks/use-mobile";

const Lessons = () => {
  const { data: lessons, isLoading } = useLessons();
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const isMobile = useIsMobile();

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
        {isMobile && <BottomNav />}
      </div>
    );
  }

  const completedLessons = lessons?.filter(lesson => lesson.progress?.status === 'completed').length || 0;
  const totalLessons = lessons?.length || 0;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  // Sort lessons by lesson_order
  const sortedLessons = [...(lessons || [])].sort((a, b) => 
    (a.lesson_order || '').localeCompare(b.lesson_order || '')
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="h-full pt-20 pb-24 md:pb-8 container mx-auto px-2 sm:px-4 flex flex-col">
        {/* Progress and Next Lesson cards - stack on mobile, side by side on desktop */}
        <div className="flex flex-col md:flex-row gap-2 sm:gap-4 mb-2 sm:mb-4">
          <Card className="flex-1 bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg">
            <div className="p-2 sm:p-4">
              <h3 className="text-sm sm:text-lg font-semibold">Progress</h3>
              <div className="mt-2">
                <div className="flex justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm font-medium">{completedLessons}/{totalLessons} lessons</span>
                  <span className="text-xs sm:text-sm font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-1.5 sm:h-2" />
              </div>
            </div>
          </Card>

          <div className="flex-1">
            <NextLessonCard onAttendanceClick={() => setShowAttendanceForm(true)} />
          </div>
        </div>

        {/* Lessons grid - single column on mobile, 4 columns on desktop */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 p-2 md:p-4">
            {sortedLessons.map((lesson, index) => (
              <div key={lesson.id} className="w-full">
                <LessonCard 
                  lesson={{
                    ...lesson,
                    media: [],
                    progress: {
                      status: lesson.progress?.status || 'not_started',
                      time_spent: lesson.progress?.time_spent || 0,
                      last_position: lesson.progress?.last_position || 0
                    }
                  }}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        <CompletionCodeDialog
          lessonId={lessons?.[0]?.id || ''}
          onSuccess={() => setShowAttendanceForm(false)}
          open={showAttendanceForm}
          onOpenChange={setShowAttendanceForm}
        />
      </div>
      {isMobile && <BottomNav />}
    </div>
  );
};

export default Lessons;