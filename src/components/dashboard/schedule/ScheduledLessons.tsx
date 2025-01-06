import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { RefreshCw } from "lucide-react";

interface Lesson {
  title: string;
  description: string;
  duration: number;
  image_url: string;
}

interface Schedule {
  id: string;
  lesson_id: string;
  instructor_id: string;
  campus: string;
  lesson_date: string;
  start_time: string;
  end_time: string;
  location: string;
  attendance_code: string;
  lessons?: Lesson;
}

interface ScheduledLessonsProps {
  schedules: Schedule[];
  refetchSchedules: () => void;
}

export const ScheduledLessons = ({ schedules, refetchSchedules }: ScheduledLessonsProps) => {
  const [isRegenerating, setIsRegenerating] = useState<string | null>(null);

  const regenerateAttendanceCode = async (scheduleId: string) => {
    try {
      setIsRegenerating(scheduleId);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("You must be logged in to perform this action");
        return;
      }

      const { error } = await supabase.rpc('regenerate_attendance_code', {
        schedule_id: scheduleId
      });

      if (error) throw error;

      toast.success("Attendance code regenerated successfully");
      refetchSchedules();
    } catch (error: any) {
      console.error('Error regenerating attendance code:', error);
      toast.error(error.message || "Failed to regenerate attendance code");
    } finally {
      setIsRegenerating(null);
    }
  };

  if (!schedules.length) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">No scheduled lessons found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div>
              <h3 className="font-semibold">{schedule.lessons?.title}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(schedule.lesson_date).toLocaleDateString()} at{" "}
                {schedule.start_time}
              </p>
              <p className="text-sm text-muted-foreground">
                Location: {schedule.location}
              </p>
              <p className="text-sm font-medium mt-2">
                Attendance Code: {schedule.attendance_code}
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => regenerateAttendanceCode(schedule.id)}
              disabled={isRegenerating === schedule.id}
            >
              <RefreshCw className={`h-4 w-4 ${isRegenerating === schedule.id ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};