import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useLessons = () => {
  return useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data: profile } = await supabase
        .from('profiles')
        .select('campus, role')
        .eq('id', user.id)
        .single();

      console.log('User profile:', profile);

      let query = supabase
        .from('lessons_view_simple')
        .select()
        .order('lesson_order', { ascending: true })
        .eq(profile?.role !== 'administrator' ? 'university_name' : '', profile?.campus);

      const { data, error } = await query;
      console.log(data);
      if (error) {
        console.error('Error fetching lessons:', error);
        throw error;
      }

      const transformedData = data?.map(lesson => ({
        ...lesson,
        lesson_date: lesson.lesson_date
          ? new Date(lesson.lesson_date + "T00:00:00Z").toISOString()
          : null,
        created_at: new Date().toISOString(),
        lesson_media: [],
        progress: {
          status: "not_started",
          time_spent: 0,
          last_position: 0
        }
      }));
      
      console.log(transformedData);
      return transformedData;
    },
  });
};
