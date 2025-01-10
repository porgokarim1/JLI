import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, CheckCircle2, FilePenLine } from "lucide-react";
import { LessonWithProgress } from "./types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface LessonCardProps {
  lesson: LessonWithProgress;
  index: number;
}

export const LessonCard = ({ lesson }: LessonCardProps) => {
  const navigate = useNavigate();
  const [isInstructor, setIsInstructor] = useState(false);
  
  useEffect(() => {
    const checkRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      setIsInstructor(profile?.role === 'instructor' || profile?.role === 'administrator');
    };

    checkRole();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      default:
        return 'bg-slate-500';
    }
  };

  const shouldShowStatus = () => {
    if (!lesson.progress) return false;
    return lesson.progress.status === 'completed';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100 flex flex-col h-full">
      <CardHeader className="flex-grow p-2 sm:p-6">
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <CardTitle className="text-sm sm:text-lg line-clamp-1">{lesson.title}</CardTitle>
          <div className="flex items-center gap-2">
            {shouldShowStatus() && (
              <Badge 
                variant="secondary"
                className={`${getStatusColor(lesson.progress?.status || '')} text-white text-xs`}
              >
                {lesson.progress?.status === 'completed' ? 'completed' : 'in progress'}
              </Badge>
            )}
            <div className="flex gap-2">
              {isInstructor && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => navigate(`/lesson/${lesson.id}/edit`)}
                >
                  <FilePenLine className="h-4 w-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => navigate(`/lesson/${lesson.id}`)}
              >
                <FilePenLine className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <CardDescription className="text-xs sm:text-sm line-clamp-2">{lesson.description}</CardDescription>
        
        <div className="mt-2 sm:mt-4 space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-1 sm:gap-2">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            <span className="truncate">{lesson.location || 'TBD'}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            <span>{lesson.lesson_date ? format(new Date(lesson.lesson_date), 'PPP') : 'TBD'}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            <span>{lesson.lesson_time ? format(new Date(`2000-01-01T${lesson.lesson_time}`), 'p') : 'TBD'}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto p-2 sm:p-6 pt-0 sm:pt-0">
        {lesson.progress?.status === 'completed' && (
          <div className="flex items-center justify-center gap-1 sm:gap-2 py-1 sm:py-2 text-green-600 text-xs sm:text-sm">
            <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="font-medium">Lesson Completed</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};