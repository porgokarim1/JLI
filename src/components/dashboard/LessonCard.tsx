import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlayCircle, CheckCircle, Clock } from "lucide-react";
import { LessonWithProgress } from "./types";

interface LessonCardProps {
  lesson: LessonWithProgress;
  index: number;
}

export const LessonCard = ({ lesson, index }: LessonCardProps) => {
  const navigate = useNavigate();

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
        <div className="w-full h-48 mb-4 rounded-t-lg overflow-hidden">
          <img 
            src={lesson.image_url} 
            alt={lesson.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg">Lesson {index + 1}</CardTitle>
          <Badge 
            variant="secondary"
            className={`${getStatusColor(lesson.progress?.status || 'not_started')} text-white`}
          >
            {lesson.progress?.status.replace('_', ' ')}
          </Badge>
        </div>
        <CardDescription>{lesson.title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{lesson.description}</p>
        <Progress 
          value={getProgressPercentage(lesson.progress)} 
          className="mb-4"
        />
        <Button 
          className="w-full flex items-center justify-center gap-2"
          onClick={() => navigate(`/lesson/${lesson.id}`)}
        >
          {getStatusIcon(lesson.progress?.status || 'not_started')}
          {lesson.progress?.status === 'completed' ? 'Review Lesson' : 'Start Lesson'}
        </Button>
      </CardContent>
    </Card>
  );
};