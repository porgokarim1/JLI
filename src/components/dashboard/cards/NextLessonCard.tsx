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
  const { data: nextLesson } = useQuery({
    queryKey: ['next-lesson'],
    queryFn: async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from('lessons_schedule')
        .select(`
          *,
          lesson:lessons (
            title,
            description
          )
        `)
        .gte('lesson_date', today.toISOString())
        .order('lesson_date', { ascending: true })
        .order('start_time', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    }
  });

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <div className="space-y-1">
              <h3 className="font-medium text-sm">Next Lesson</h3>
              <p className="text-xs text-muted-foreground">
                {nextLesson?.lesson_date && format(new Date(nextLesson.lesson_date), 'MM/dd/yyyy')}
                {nextLesson?.start_time && ` @${format(new Date(`2000-01-01T${nextLesson.start_time}`), 'h:mm a')}`}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{nextLesson?.location || 'Location TBD'}</span>
              </div>
            </div>
          </div>
          <Button 
            variant="default"
            className="text-black h-8 text-xs"
            onClick={onAttendanceClick}
          >
            Confirm Attendance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};