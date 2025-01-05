import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentList } from "./StudentList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Users, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";

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

  const regenerateAttendanceCode = async (scheduleId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('regenerate_attendance_code', { schedule_id: scheduleId });
      
      if (error) throw error;
      
      toast.success("New attendance code generated!");
      refetchSchedules();
    } catch (error) {
      toast.error("Failed to generate new code");
    }
  };

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
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Schedule Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

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