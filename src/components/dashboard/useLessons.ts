import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lesson, LessonWithProgress } from "./types";

const LESSON_IMAGES = [
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
  "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86"
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
          .order('created_at');

        if (lessonsError) throw lessonsError;

        // Fetch progress for all lessons
        const { data: progressData, error: progressError } = await supabase
          .from('user_lesson_progress')
          .select('*')
          .eq('user_id', user.id);

        if (progressError) throw progressError;

        // Combine lessons with their progress and assign images
        const lessonsWithProgress = lessonsData.map((lesson: any, index: number) => {
          const progress = progressData.find((p: any) => p.lesson_id === lesson.id);
          return {
            ...lesson,
            image_url: LESSON_IMAGES[index % LESSON_IMAGES.length], // Cycle through images
            media: lesson.lesson_media,
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