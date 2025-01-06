import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ScheduledLessons = () => {
  const { data: lessons, refetch } = useQuery({
    queryKey: ['scheduled-lessons'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*');

      if (error) throw error;
      return data;
    },
  });

  const handleRegenerateCode = async (scheduleId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('generate_attendance_code')
        .select('attendance_code')
        .eq('id', scheduleId)
        .single();

      if (error) throw error;
      
      toast.success('Attendance code regenerated successfully');
      refetch();
    } catch (error: any) {
      console.error('Error regenerating attendance code:', error);
      toast.error(error.message || 'Failed to regenerate attendance code');
    }
  };

  useEffect(() => {
    // Fetch lessons on mount
    refetch();
  }, [refetch]);

  return (
    <div>
      <h1>Scheduled Lessons</h1>
      {lessons?.map((lesson) => (
        <div key={lesson.id}>
          <h2>{lesson.title}</h2>
          <button onClick={() => handleRegenerateCode(lesson.id)}>Regenerate Code</button>
        </div>
      ))}
    </div>
  );
};

export default ScheduledLessons;
