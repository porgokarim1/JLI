import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UserCheck, MapPin, Calendar, Clock } from "lucide-react";
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
      case 'in_progress':
        return 'bg-blue-500';
      default:
        return 'bg-slate-500';
    }
  };

  const getProgressPercentage = (progress?: LessonWithProgress['progress']) => {
    if (!progress) return 0;
    switch (progress.status) {
      case 'completed':
        return 100;
      case 'in_progress':
        return Math.min(Math.round((progress.time_spent || 0) / 60), 100);
      default:
        return 0;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
      <CardHeader>
        <div className="w-full h-48 mb-4 rounded-t-lg overflow-hidden relative bg-gray-100">
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
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg">{lesson.title}</CardTitle>
          <Badge 
            variant="secondary"
            className={`${getStatusColor(lesson.progress?.status || 'not_started')} text-white`}
          >
            {lesson.progress?.status.replace('_', ' ')}
          </Badge>
        </div>
        <CardDescription>{lesson.description}</CardDescription>
        
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          {lesson.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{lesson.location}</span>
            </div>
          )}
          {lesson.lesson_date && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{format(new Date(lesson.lesson_date), 'PPP')}</span>
            </div>
          )}
          {lesson.lesson_time && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{format(new Date(`2000-01-01T${lesson.lesson_time}`), 'p')}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Progress 
          value={getProgressPercentage(lesson.progress)} 
          className="mb-4"
        />
        <Button 
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-primary-foreground"
          onClick={() => setIsDialogOpen(true)}
          disabled={lesson.progress?.status === 'completed'}
        >
          <UserCheck className="h-5 w-5" />
          {lesson.progress?.status === 'completed' ? 'Attendance Confirmed' : 'Confirm Attendance'}
        </Button>
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