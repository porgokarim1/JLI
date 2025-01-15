import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lesson, LessonWithProgress } from "./types";

export const useLessons = () => {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // First get the user's campus
        const { data: userProfile, error: profileError } = await supabase
          .from('profiles')
          .select('campus, role')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        console.log('User profile:', userProfile);

        // Fetch lessons from the view, filtered by campus if user is not an instructor/admin
        const query = supabase
          .from('lessons_view_simple')
          .select(`
            *,
            lesson_media:lesson_media (
              id,
              url,
              type,
              created_at,
              updated_at
            )
          `)
          .order('lesson_order', { ascending: true });

        // Only filter by campus if the user is a student
        if (userProfile.role === 'student' && userProfile.campus) {
          query.eq('university_name', userProfile.campus);
        }

        const { data: lessonsData, error: lessonsError } = await query;

        if (lessonsError) throw lessonsError;

        console.log('Lessons data:', lessonsData);

        // Fetch progress for all lessons
        const { data: progressData, error: progressError } = await supabase
          .from('user_lesson_progress')
          .select('*')
          .eq('user_id', user.id);

        if (progressError) throw progressError;

        console.log('Progress data:', progressData);

        // Combine lessons with their progress
        const lessonsWithProgress = lessonsData.map((lesson: any) => {
          const progress = progressData?.find((p: any) => p.lesson_id === lesson.id);
          const result = {
            ...lesson,
            media: lesson.lesson_media || [],
            progress: progress ? {
              status: progress.status,
              time_spent: progress.time_spent,
              last_position: progress.last_position,
            } : {
              status: 'not_started' as const,
              time_spent: 0,
              last_position: 0,
            }
          };
          console.log('Lesson with progress:', result);
          return result;
        });

        return lessonsWithProgress;
      } catch (error) {
        console.error('Error fetching lessons:', error);
        toast.error('Failed to load lessons');
        throw error;
      }
    }
  });
};