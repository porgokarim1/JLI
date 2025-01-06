import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentList } from "./StudentList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar as CalendarIcon } from "lucide-react";
import { ScheduleCalendar } from "./schedule/ScheduleCalendar";
import ScheduledLessons from "./schedule/ScheduledLessons";

const InstructorDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { data: schedules, refetch: refetchSchedules } = useQuery({
    queryKey: ['lessons-schedule', selectedDate],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('lessons_schedule')
        .select(`
          *,
          lesson:lessons(title),
          attendance:lesson_attendance(
            student:profiles(first_name, last_name)
          )
        `)
        .eq('instructor_id', user.id)
        .eq('lesson_date', selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null);
      
      if (error) throw error;
      return data;
    },
    enabled: !!selectedDate,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
        Instructor Dashboard
      </h1>
      
      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="schedule" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Students
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ScheduleCalendar 
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <ScheduledLessons 
              schedules={schedules}
              refetchSchedules={refetchSchedules}
            />
          </div>
        </TabsContent>

        <TabsContent value="students">
          <StudentList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstructorDashboard;