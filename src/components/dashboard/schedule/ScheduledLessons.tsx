import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LoadingSkeleton } from "../LoadingSkeleton";

interface ScheduledLesson {
  id: string;
  lesson: {
    title: string;
    description: string;
  };
  lesson_date: string;
  start_time: string;
  end_time: string;
  location: string;
  attendance_code: string;
}

interface ScheduledLessonsProps {
  schedules?: ScheduledLesson[];
  refetchSchedules?: () => void;
}

const ScheduledLessons = ({ schedules, refetchSchedules }: ScheduledLessonsProps) => {
  const { data: scheduledLessons, isLoading } = useQuery({
    queryKey: ["scheduled-lessons"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("lessons_schedule")
        .select(`
          id,
          lesson_date,
          start_time,
          end_time,
          location,
          attendance_code,
          lesson:lessons(title, description)
        `)
        .eq("instructor_id", user.id)
        .order("lesson_date", { ascending: true });

      if (error) {
        toast.error("Error fetching scheduled lessons");
        throw error;
      }

      // Transform the data to match ScheduledLesson type
      return (data as any[]).map(schedule => ({
        ...schedule,
        lesson: {
          title: schedule.lesson?.title || 'Untitled Lesson',
          description: schedule.lesson?.description || 'No description available'
        }
      })) as ScheduledLesson[];
    },
    enabled: !schedules,
  });

  if (isLoading) return <LoadingSkeleton />;

  const displaySchedules = schedules || scheduledLessons;

  return (
    <div className="space-y-4">
      {displaySchedules?.map((schedule) => (
        <div
          key={schedule.id}
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold">{schedule.lesson.title}</h3>
          <p className="text-gray-600">{schedule.lesson.description}</p>
          <div className="mt-2 text-sm text-gray-500">
            <p>Date: {new Date(schedule.lesson_date).toLocaleDateString()}</p>
            <p>
              Time: {schedule.start_time} - {schedule.end_time}
            </p>
            <p>Location: {schedule.location}</p>
            <p>Attendance Code: {schedule.attendance_code}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduledLessons;