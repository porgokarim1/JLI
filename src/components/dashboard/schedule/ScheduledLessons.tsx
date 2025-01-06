import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Student {
  first_name: string | null;
  last_name: string | null;
}

interface Attendance {
  student: Student;
}

interface Schedule {
  id: string;
  instructor_id: string;
  lesson_date: string;
  start_time: string;
  end_time: string;
  location: string | null;
  attendance_code: string | null;
  lesson: {
    title: string;
  } | null;
  attendance: Attendance[];
}

interface ScheduledLessonsProps {
  schedules: Schedule[] | undefined;
  refetchSchedules: () => void;
}

export const ScheduledLessons = ({ schedules, refetchSchedules }: ScheduledLessonsProps) => {
  const regenerateAttendanceCode = async (scheduleId: string) => {
    try {
      const { data, error } = await supabase.rpc('generate_attendance_code', {
        schedule_id: scheduleId
      }) as { data: string | null; error: Error | null };
      
      if (error) throw error;
      
      toast.success("New attendance code generated!");
      refetchSchedules();
    } catch (error) {
      toast.error("Failed to generate new code");
    }
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Scheduled Lessons</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedules?.map((schedule) => (
            <div key={schedule.id} className="p-4 border rounded-lg bg-white/50 backdrop-blur-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{schedule.lesson?.title}</h3>
                  <p className="text-sm text-gray-600">
                    {format(new Date(`2000-01-01T${schedule.start_time}`), 'h:mm a')} - 
                    {format(new Date(`2000-01-01T${schedule.end_time}`), 'h:mm a')}
                  </p>
                  <p className="text-sm text-gray-600">{schedule.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">Attendance Code:</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-mono">{schedule.attendance_code}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => regenerateAttendanceCode(schedule.id)}
                      className="h-8 w-8"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {!schedules?.length && (
            <p className="text-center text-gray-600">No lessons scheduled for this date</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};