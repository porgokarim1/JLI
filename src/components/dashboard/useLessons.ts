import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lesson, LessonWithProgress } from "./types";

const LESSON_IMAGES = [
  "https://images.jpost.com/image/upload/q_auto/c_fill,g_faces:center,h_537,w_822/632729",
  "https://i.ytimg.com/vi/b9kj-h1w2tA/sddefault.jpg",
  "https://c8.alamy.com/comp/T496JM/social-concept-group-senior-jewish-people-standing-together-in-different-traditional-national-clothes-on-background-with-israel-flag-in-flat-style-T496JM.jpg",
  "https://media.istockphoto.com/id/1161968873/photo/tel-aviv-israel-under-an-epic-sky.jpg?s=612x612&w=0&k=20&c=01lh9quVxC64mE44YzowS-xR8RWJcqX9UBxoU0aUoXk="
];

export const useLessons = () => {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Fetch lessons and their progress
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .order('created_at');

        if (lessonsError) throw lessonsError;

        // Fetch progress for all lessons
        const { data: progressData, error: progressError } = await supabase
          .from('user_lesson_progress')
          .select('*')
          .eq('user_id', user.id);

        if (progressError) throw progressError;

        // Combine lessons with their progress and assign new images
        const lessonsWithProgress = lessonsData.map((lesson: Lesson, index: number) => {
          const progress = progressData.find((p: any) => p.lesson_id === lesson.id);
          return {
            ...lesson,
            image_url: LESSON_IMAGES[index % LESSON_IMAGES.length],
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