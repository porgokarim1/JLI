import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Search, UserCircle2, Phone, Mail, BookOpen, MessageCircle } from "lucide-react";
import type { StudentProgressOverview } from "@/types/database";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentProgressOverview | null>(null);

  const { data: students, isLoading } = useQuery({
    queryKey: ['student-progress'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('student_progress_overview')
        .select('*');
      
      if (error) {
        console.error('Error fetching student progress:', error);
        throw error;
      }
      return data as StudentProgressOverview[];
    }
  });

  const filteredStudents = students?.filter(student => 
    student.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          <Card 
            key={student.student_id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedStudent(student)}
          >
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
                  <Progress value={student.completed_lessons ? student.completed_lessons * 10 : 0} />
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

      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <UserCircle2 className="h-16 w-16 text-primary" />
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedStudent.first_name} {selectedStudent.last_name}
                  </h3>
                  <p className="text-gray-500">{selectedStudent.campus}</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span>{selectedStudent.email}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Lesson Progress</span>
                  </div>
                  <div className="pl-7">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completed Lessons</span>
                      <span>{selectedStudent.completed_lessons}</span>
                    </div>
                    <Progress 
                      value={selectedStudent.completed_lessons ? selectedStudent.completed_lessons * 10 : 0} 
                      className="h-2"
                    />
                    {selectedStudent.last_lesson_completed && (
                      <p className="text-sm text-gray-500 mt-1">
                        Last completed: {format(new Date(selectedStudent.last_lesson_completed), 'PPP')}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Conversations</span>
                  </div>
                  <div className="pl-7">
                    <p>Total conversations: {selectedStudent.total_conversations}</p>
                    {selectedStudent.last_conversation_date && (
                      <p className="text-sm text-gray-500">
                        Last conversation: {format(new Date(selectedStudent.last_conversation_date), 'PPP')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};