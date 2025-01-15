import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useLessons = () => {
  return useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get user's profile to determine campus
      const { data: profile } = await supabase
        .from('profiles')
        .select('campus, role')
        .eq('id', user.id)
        .single();

      console.log('User profile:', profile);

      // Base query for lessons
      let query = supabase
        .from('lessons_view_simple')
        .select(`
          *,
          media:lesson_media!lesson_id(
            id,
            url,
            type,
            created_at,
            updated_at
          )
        `)
        .order('lesson_order', { ascending: true });

      // Filter by campus for students and instructors
      if (profile?.role !== 'administrator') {
        query = query.eq('university_name', profile?.campus);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching lessons:', error);
        throw error;
      }

      // Transform the data to match the expected LessonWithProgress type
      const transformedData = data?.map(lesson => ({
        ...lesson,
        created_at: new Date().toISOString(), // Since view doesn't include this field
        lesson_media: lesson.media || [],
        progress: {
          status: "not_started",
          time_spent: 0,
          last_position: 0
        }
      }));

      return transformedData;
    },
  });
};