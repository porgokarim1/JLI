import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const InstructorDashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { data: lessons } = useQuery({
    queryKey: ['lessons'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('*');
      if (error) throw error;
      return data;
    },
  });

  const { data: schedules } = useQuery({
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
      <h1 className="text-3xl font-bold mb-6">Instructor Dashboard</h1>
      
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
                <div key={schedule.id} className="p-4 border rounded-lg">
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
                      <p className="text-lg font-mono">{schedule.attendance_code}</p>
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

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Student tracking features coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstructorDashboard;