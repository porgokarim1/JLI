import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, MapPin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface NextLessonCardProps {
  onAttendanceClick: () => void;
}

export const NextLessonCard = ({ onAttendanceClick }: NextLessonCardProps) => {
  const { data: nextLesson, isLoading } = useQuery({
    queryKey: ['next-lesson'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const today = new Date();
      const { data, error } = await supabase
        .from('lessons_schedule')
        .select(`
          *,
          lessons (
            title,
            description
          )
        `)
        .gte('lesson_date', today.toISOString().split('T')[0])
        .order('lesson_date', { ascending: true })
        .order('start_time', { ascending: true })
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formattedDate = nextLesson?.lesson_date 
    ? format(new Date(nextLesson.lesson_date), 'MM/dd/yyyy')
    : 'No upcoming lessons';
  
  const formattedTime = nextLesson?.start_time 
    ? format(new Date(`2000-01-01T${nextLesson.start_time}`), 'h:mm a')
    : '';

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <div className="space-y-1">
              <h3 className="font-medium text-sm">
                {nextLesson?.lessons?.title || 'Next Lesson'}
              </h3>
              <p className="text-xs text-muted-foreground">
                {formattedDate} {formattedTime && `@${formattedTime}`}
              </p>
              {nextLesson?.location && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{nextLesson.location}</span>
                </div>
              )}
            </div>
          </div>
          <Button 
            variant="default"
            className="text-black h-8 text-xs"
            onClick={onAttendanceClick}
            disabled={!nextLesson}
          >
            Confirm Attendance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};