import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentList } from "./StudentList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BookOpen } from "lucide-react";
import LessonsList from "./LessonsList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Clock } from "lucide-react";

const InstructorDashboard = () => {
  const { data: nextLesson } = useQuery({
    queryKey: ['next-lesson'],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .gte('lesson_date', today.toISOString())
        .order('lesson_date', { ascending: true })
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
        Instructor Dashboard
      </h1>

      {nextLesson && (
        <Card className="mb-6 bg-white/90 backdrop-blur-sm border-indigo-100">
          <CardHeader>
            <CardTitle className="text-lg">Next Upcoming Lesson</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <h3 className="font-medium">{nextLesson.title}</h3>
            <div className="text-sm space-y-1 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{nextLesson.lesson_date ? format(new Date(nextLesson.lesson_date), 'PPP') : 'TBD'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{nextLesson.lesson_time ? format(new Date(`2000-01-01T${nextLesson.lesson_time}`), 'p') : 'TBD'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{nextLesson.location || 'TBD'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="students" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Students
          </TabsTrigger>
          <TabsTrigger value="lessons" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Lessons
          </TabsTrigger>
        </TabsList>

        <TabsContent value="students">
          <StudentList />
        </TabsContent>

        <TabsContent value="lessons">
          <LessonsList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstructorDashboard;