import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentList } from "./StudentList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, GraduationCap, CalendarDays, BarChart3 } from "lucide-react";
import { format } from "date-fns";

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [
        { count: studentsCount } = { count: 0 },
        { count: instructorsCount } = { count: 0 },
        { count: conversationsCount } = { count: 0 }
      ] = await Promise.all([
        supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'student'),
        supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('role', 'instructor'),
        supabase
          .from('conversations')
          .select('*', { count: 'exact', head: true })
      ]);

      return {
        students: studentsCount,
        instructors: instructorsCount,
        conversations: conversationsCount
      };
    }
  });

  const { data: instructors } = useQuery({
    queryKey: ['instructors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'instructor');
      if (error) throw error;
      return data;
    }
  });

  const { data: recentSchedules } = useQuery({
    queryKey: ['recent-schedules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lessons_schedule')
        .select(`
          *,
          lesson:lessons!inner(title),
          instructor:profiles!instructor_id(first_name, last_name)
        `)
        .order('lesson_date', { ascending: true })
        .limit(5);
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
        Administrator Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">{stats?.students || 0}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-purple-600" />
              Total Instructors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-purple-600">{stats?.instructors || 0}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Total Conversations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">{stats?.conversations || 0}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="instructors">Instructors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Upcoming Lessons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSchedules?.map((schedule) => (
                    <div key={schedule.id} className="p-4 border rounded-lg bg-white/50">
                      <h3 className="font-semibold">{schedule.lesson?.title}</h3>
                      <p className="text-sm text-gray-600">
                        {format(new Date(schedule.lesson_date), 'PPP')} at{' '}
                        {format(new Date(`2000-01-01T${schedule.start_time}`), 'h:mm a')}
                      </p>
                      <p className="text-sm text-gray-600">
                        Instructor: {schedule.instructor?.first_name} {schedule.instructor?.last_name}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Instructor Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {instructors?.map((instructor) => (
                    <div key={instructor.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {instructor.first_name} {instructor.last_name}
                        </h3>
                        <p className="text-sm text-gray-600">{instructor.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="students">
          <StudentList />
        </TabsContent>

        <TabsContent value="instructors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors?.map((instructor) => (
              <Card key={instructor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {instructor.first_name} {instructor.last_name}
                      </h3>
                      <p className="text-sm text-gray-600">{instructor.email}</p>
                      <p className="text-sm text-gray-600">{instructor.campus}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;