import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { LessonWithProgress } from "@/components/dashboard/types";

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

        // Fetch the specific lesson with its media
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select(`
            *,
            lesson_media (
              id,
              url,
              type,
              created_at,
              updated_at
            )
          `)
          .eq('id', id)
          .single();

        if (lessonError) throw lessonError;

        // Fetch progress for this lesson
        const { data: progressData, error: progressError } = await supabase
          .from('user_lesson_progress')
          .select('*')
          .eq('lesson_id', id)
          .eq('user_id', user.id)
          .maybeSingle();  // Changed from .single() to .maybeSingle()

        if (progressError && progressError.code !== 'PGRST116') {
          throw progressError;
        }

        // Combine lesson with its progress
        const lessonWithProgress = {
          ...lessonData,
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
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <NavigationBar />
        <div className="container mx-auto px-4 py-8">
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
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/lessons')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" /> Back to Lessons
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
            <p className="text-gray-600">{lesson.description}</p>
          </div>

          <div className="space-y-4">
            {lesson.media?.map((media, index) => (
              <div key={media.id} className="rounded-lg overflow-hidden">
                {media.type === 'video' ? (
                  <video 
                    controls 
                    className="w-full aspect-video"
                    src={media.url}
                  />
                ) : (
                  <img 
                    src={media.url} 
                    alt={`${lesson.title} - Media ${index + 1}`}
                    className="w-full h-auto"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <div>
              <span className="text-sm text-gray-500">Duration: {lesson.duration} minutes</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">
                Status: {lesson.progress?.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;