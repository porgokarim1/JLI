import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ScheduledLessonsProps {
  schedules?: Array<{
    id: string;
    attendance_code: string;
    lesson?: {
      title: string;
    };
  }>;
  refetchSchedules?: () => void;
}

const ScheduledLessons = ({ schedules, refetchSchedules }: ScheduledLessonsProps) => {
  const { refetch } = useQuery({
    queryKey: ['scheduled-lessons'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lessons_schedule')
        .select('*, lesson:lessons(*)');

      if (error) throw error;
      return data;
    },
  });

  const handleRegenerateCode = async (scheduleId: string) => {
    try {
      const { error } = await supabase
        .rpc('generate_attendance_code', { 
          schedule_id: scheduleId 
        });

      if (error) throw error;
      
      toast.success('Attendance code regenerated successfully');
      refetch();
      if (refetchSchedules) refetchSchedules();
    } catch (error: any) {
      console.error('Error regenerating attendance code:', error);
      toast.error(error.message || 'Failed to regenerate attendance code');
    }
  };

  return (
    <div className="col-span-2 space-y-4">
      <h2 className="text-xl font-semibold">Scheduled Lessons</h2>
      <div className="space-y-4">
        {schedules?.map((schedule) => (
          <div key={schedule.id} className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-medium">{schedule.lesson?.title}</h3>
            <div className="mt-2 text-sm text-gray-600">
              <p>Attendance Code: {schedule.attendance_code}</p>
              <button 
                onClick={() => handleRegenerateCode(schedule.id)}
                className="mt-2 text-primary hover:text-primary/80"
              >
                Regenerate Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduledLessons;