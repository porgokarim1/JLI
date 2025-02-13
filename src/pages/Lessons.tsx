import NavigationBar from "@/components/navigation/NavigationBar";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLessons } from "@/components/dashboard/useLessons";
import { useEffect, useState } from "react";
import { CompletionCodeDialog } from "@/components/lesson/CompletionCodeDialog";
import { LessonCard } from "@/components/dashboard/LessonCard";
import { NextLessonCard } from "@/components/dashboard/cards/NextLessonCard";
import BottomNav from "@/components/navigation/BottomNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const Lessons = () => {
  const { data: lessons, isLoading: lessonsLoading } = useLessons();
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [progressLoading, setProgressLoading] = useState(true); // Controla la carga del progreso
  const isMobile = useIsMobile();

  const fetchProgress = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error getting user:', userError);
        toast.error('Failed to authenticate user');
        return;
      }

      if (!user) {
        toast.error('User not found');
        return;
      }

      const { data: completedData, error: completedError } = await supabase
        .from('user_lesson_progress')
        .select('count')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .maybeSingle();

      if (completedError) {
        console.error('Error fetching completed lessons:', completedError);
        toast.error('Failed to load progress data');
        return;
      }

      setCompletedLessons(completedData?.count || 0);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setProgressLoading(false); // Cambia el estado de carga del progreso
    }
  };

  // Fetch progress once lessons are loaded
  useEffect(() => {
    if (!lessonsLoading && completedLessons === 0) {
      fetchProgress();
    }
  }, [lessonsLoading, completedLessons]);

  if (lessonsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col">
        <NavigationBar />
        <LoadingSpinner />
        {isMobile && <BottomNav />}
      </div>
    );
  }

  const totalLessons = lessons?.length || 0;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  // Sort lessons by lesson_order
  const sortedLessons = [...(lessons || [])].sort((a, b) =>
    (a.lesson_order || '').localeCompare(b.lesson_order || '')
  ).map(lesson => ({
    ...lesson,
    media: lesson.lesson_media || [],
    progress: {
      status: (lesson.progress?.status || 'not_started') as 'not_started' | 'in_progress' | 'completed',
      time_spent: lesson.progress?.time_spent || 0,
      last_position: lesson.progress?.last_position || 0
    }
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="h-full pt-20 pb-24 md:pb-8 container mx-auto px-2 sm:px-4 flex flex-col">
        {/* Progress and Next Lesson cards */}
        <div className="flex flex-col md:flex-row gap-2 sm:gap-4 mb-2 sm:mb-4">
          <Card className="flex-1 bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg">
            <div className="p-2 sm:p-4">
              <h3 className="text-sm sm:text-lg font-semibold">Progress</h3>
              <div className="mt-2 relative">
                {progressLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between mb-1 sm:mb-2">
                      <span className="text-xs sm:text-sm font-medium">{completedLessons}/{totalLessons} lessons</span>
                      <span className="text-xs sm:text-sm font-medium">{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-1.5 sm:h-2" />
                  </>
                )}
              </div>
            </div>
          </Card>

          <div className="flex-1">
            <NextLessonCard onAttendanceClick={() => setShowAttendanceForm(true)} />
          </div>
        </div>

        {/* Lessons grid */}
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
      </div>
      {isMobile && <BottomNav />}
    </div>
  );
};

export default Lessons;