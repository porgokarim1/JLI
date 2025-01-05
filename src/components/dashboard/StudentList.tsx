import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Search, UserCircle2 } from "lucide-react";

export const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: students, isLoading } = useQuery({
    queryKey: ['student-progress'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('student_progress_overview')
        .select('*');
      if (error) throw error;
      return data;
    }
  });

  const filteredStudents = students?.filter(student => 
    student.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents?.map((student) => (
          <Card key={student.student_id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <UserCircle2 className="h-12 w-12 text-primary" />
              <div>
                <CardTitle className="text-lg">
                  {student.first_name} {student.last_name}
                </CardTitle>
                <p className="text-sm text-gray-500">{student.email}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Lessons Completed</span>
                    <span>{student.completed_lessons}</span>
                  </div>
                  <Progress value={student.completed_lessons * 10} />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Conversations</span>
                    <span>{student.total_conversations}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};