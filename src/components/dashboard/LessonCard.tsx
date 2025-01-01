import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, ChevronDown, ChevronUp, CheckCircle2, UserCheck } from "lucide-react";
import { LessonWithProgress } from "./types";
import { CompletionCodeDialog } from "../lesson/CompletionCodeDialog";
import { useState } from "react";
import { format } from "date-fns";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface LessonCardProps {
  lesson: LessonWithProgress;
  index: number;
}

export const LessonCard = ({ lesson }: LessonCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{lesson.location || 'TBD'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{lesson.lesson_date ? format(new Date(lesson.lesson_date), 'PPP') : 'TBD'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{lesson.lesson_time ? format(new Date(`2000-01-01T${lesson.lesson_time}`), 'p') : 'TBD'}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {lesson.progress?.status === 'completed' ? (
          <div className="flex items-center justify-center gap-2 py-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-medium">Lesson Completed</span>
          </div>
        ) : (
          <Button 
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-primary-foreground mb-2"
            onClick={() => setIsDialogOpen(true)}
          >
            <UserCheck className="h-5 w-5" />
            Confirm Attendance
          </Button>
        )}

        <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full text-sm text-gray-500 hover:bg-transparent flex items-center justify-center gap-2"
            >
              {isDetailsOpen ? (
                <>
                  Hide Attendance Details
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show Attendance Details
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-2">
            {lesson.progress?.completed_at ? (
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Attended on: {format(new Date(lesson.progress.completed_at), 'PPP')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Time: {format(new Date(lesson.progress.completed_at), 'p')}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No attendance record yet</p>
            )}
          </CollapsibleContent>
        </Collapsible>

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