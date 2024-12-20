import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LessonProgress {
  status: 'not_started' | 'in_progress' | 'completed';
  time_spent?: number;
  last_position?: number;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  image_url: string;
  progress?: LessonProgress;
}

const LESSON_IMAGES = [
  "https://images.jpost.com/image/upload/q_auto/c_fill,g_faces:center,h_537,w_822/632729",
  "https://i.ytimg.com/vi/b9kj-h1w2tA/sddefault.jpg",
  "https://c8.alamy.com/comp/T496JM/social-concept-group-senior-jewish-people-standing-together-in-different-traditional-national-clothes-on-background-with-israel-flag-in-flat-style-T496JM.jpg",
  "https://media.istockphoto.com/id/1161968873/photo/tel-aviv-israel-under-an-epic-sky.jpg?s=612x612&w=0&k=20&c=01lh9quVxC64mE44YzowS-xR8RWJcqX9UBxoU0aUoXk="
];

const LessonsList = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessonsWithProgress = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Fetch lessons and their progress
        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('*')
          .order('created_at');

        if (lessonsError) throw lessonsError;

        // Fetch progress for all lessons
        const { data: progressData, error: progressError } = await supabase
          .from('user_lesson_progress')
          .select('*')
          .eq('user_id', user.id);

        if (progressError) throw progressError;

        // Combine lessons with their progress and assign new images
        const lessonsWithProgress = lessonsData.map((lesson: Lesson, index: number) => {
          const progress = progressData.find((p: any) => p.lesson_id === lesson.id);
          return {
            ...lesson,
            image_url: LESSON_IMAGES[index % LESSON_IMAGES.length], // Cycle through the new images
            progress: progress ? {
              status: progress.status,
              time_spent: progress.time_spent,
              last_position: progress.last_position,
            } : {
              status: 'not_started' as const,
              time_spent: 0,
              last_position: 0,
            }
          };
        });

        setLessons(lessonsWithProgress);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        toast.error('Failed to load lessons');
      } finally {
        setLoading(false);
      }
    };

    fetchLessonsWithProgress();
  }, []);

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

  const getProgressPercentage = (progress?: LessonProgress) => {
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
              <CardHeader>
                <div className="w-full h-48 mb-4 rounded-t-lg bg-gray-200 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Learning Path</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {lessons.map((lesson: Lesson, index) => (
          <Card key={lesson.id} className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
            <CardHeader>
              <div className="w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                <img 
                  src={lesson.image_url} 
                  alt={lesson.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-slate-800">Lesson {index + 1}</CardTitle>
                <Badge 
                  variant="secondary"
                  className={`${getStatusColor(lesson.progress?.status || 'not_started')} text-white`}
                >
                  {lesson.progress?.status.replace('_', ' ')}
                </Badge>
              </div>
              <CardDescription className="text-slate-600">{lesson.duration}-minute session</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-4">{lesson.description}</p>
              <Progress 
                value={getProgressPercentage(lesson.progress)} 
                className="mb-4"
              />
              <Button 
                className="w-full"
                onClick={() => navigate(`/lesson/${lesson.id}`)}
              >
                {lesson.progress?.status === 'completed' ? 'Review Lesson' : 'Start Lesson'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LessonsList;