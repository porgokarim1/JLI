import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StudentList } from "./StudentList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BookOpen } from "lucide-react";
import LessonsList from "./LessonsList";
import { Card, CardContent } from "@/components/ui/card";
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

      <div className="flex flex-wrap items-start gap-4 mb-6">
        <Tabs defaultValue="students" className="flex-grow">
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
        </Tabs>

        {nextLesson && (
          <Card className="flex-grow lg:flex-grow-0 lg:w-[400px] bg-white/90 backdrop-blur-sm border-indigo-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium truncate">{nextLesson.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {nextLesson.lesson_time ? format(new Date(`2000-01-01T${nextLesson.lesson_time}`), 'p') : 'TBD'}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {nextLesson.location || 'TBD'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <TabsContent value="students">
        <StudentList />
      </TabsContent>

      <TabsContent value="lessons">
        <LessonsList />
      </TabsContent>
    </div>
  );
};

export default InstructorDashboard;