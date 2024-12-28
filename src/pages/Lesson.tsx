import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { LessonWithProgress } from "@/components/dashboard/types";
import LessonContent from "@/components/lesson/LessonContent";
import LessonSkeleton from "@/components/lesson/LessonSkeleton";

const Lesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<LessonWithProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select(`
            *,
            lesson_media (
              id,
              lesson_id,
              url,
              type,
              created_at,
              updated_at
            )
          `)
          .eq('id', id)
          .single();

        if (lessonError) throw lessonError;

        const { data: progressData, error: progressError } = await supabase
          .from('user_lesson_progress')
          .select('*')
          .eq('lesson_id', id)
          .eq('user_id', user.id)
          .maybeSingle();

        if (progressError && progressError.code !== 'PGRST116') {
          throw progressError;
        }

        const lessonWithProgress: LessonWithProgress = {
          ...lessonData,
          lesson_media: lessonData.lesson_media,
          media: lessonData.lesson_media,
          progress: progressData ? {
            status: progressData.status,
            time_spent: progressData.time_spent,
            last_position: progressData.last_position,
          } : {
            status: 'not_started' as const,
            time_spent: 0,
            last_position: 0,
          }
        };

        setLesson(lessonWithProgress);
      } catch (error) {
        console.error('Error fetching lesson:', error);
        toast.error('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <NavigationBar />
        <div className="container mx-auto px-4 py-8 pt-24">
          <LessonSkeleton />
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <NavigationBar />
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
            <Button onClick={() => navigate('/lessons')}>
              <ArrowLeft className="mr-2" /> Back to Lessons
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <Button 
          variant="outline" 
          onClick={() => navigate('/lessons')}
          className="mb-6 z-10 relative"
        >
          <ArrowLeft className="mr-2" /> Back to Lessons
        </Button>

        <LessonContent lesson={lesson} />
      </div>
    </div>
  );
};

export default Lesson;