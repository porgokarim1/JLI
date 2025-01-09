import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, CheckCircle2, UserCheck } from "lucide-react";
import { LessonWithProgress } from "./types";
import { CompletionCodeDialog } from "../lesson/CompletionCodeDialog";
import { useState } from "react";
import { format } from "date-fns";

interface LessonCardProps {
  lesson: LessonWithProgress;
  index: number;
}

export const LessonCard = ({ lesson }: LessonCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        <div className="w-full h-20 sm:h-48 mb-2 sm:mb-4 rounded-t-lg overflow-hidden relative bg-gray-100">
          {lesson.image_url ? (
            <img 
              src={lesson.image_url} 
              alt={lesson.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-400">Loading image...</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <CardTitle className="text-sm sm:text-lg line-clamp-1">{lesson.title}</CardTitle>
          {shouldShowStatus() && (
            <Badge 
              variant="secondary"
              className={`${getStatusColor(lesson.progress?.status || '')} text-white text-xs`}
            >
              {lesson.progress?.status === 'completed' ? 'completed' : 'in progress'}
            </Badge>
          )}
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
        {lesson.progress?.status === 'completed' ? (
          <div className="flex items-center justify-center gap-1 sm:gap-2 py-1 sm:py-2 text-green-600 text-xs sm:text-sm">
            <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="font-medium">Lesson Completed</span>
          </div>
        ) : (
          <Button 
            className="w-full flex items-center justify-center gap-1 sm:gap-2 text-black mb-1 sm:mb-2 text-xs sm:text-sm h-6 sm:h-10"
            onClick={() => setIsDialogOpen(true)}
          >
            <UserCheck className="h-3 w-3 sm:h-4 sm:w-4" />
            Confirm Attendance
          </Button>
        )}

        <CompletionCodeDialog 
          lessonId={lesson.id}
          onSuccess={() => setIsDialogOpen(false)}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </CardContent>
    </Card>
  );
};
