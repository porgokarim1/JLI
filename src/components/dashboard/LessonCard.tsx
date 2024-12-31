import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, CheckCircle, Clock, UserCheck } from "lucide-react";
import { LessonWithProgress } from "./types";
import { CompletionCodeDialog } from "../lesson/CompletionCodeDialog";
import { useState } from "react";

interface LessonCardProps {
  lesson: LessonWithProgress;
  index: number;
}

export const LessonCard = ({ lesson }: LessonCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <PlayCircle className="h-5 w-5 text-gray-500" />;
    }
  };

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
      </CardHeader>
      <CardContent>
        <Progress 
          value={getProgressPercentage(lesson.progress)} 
          className="mb-4"
        />
        <Button 
          className="w-full flex items-center justify-center gap-2"
          onClick={() => setIsDialogOpen(true)}
        >
          <UserCheck className="h-5 w-5" />
          {lesson.progress?.status === 'completed' ? 'Already Confirmed' : 'Confirm Attendance'}
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