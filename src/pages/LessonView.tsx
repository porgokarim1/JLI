import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

const LessonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setLesson(data);
      } catch (error) {
        console.error('Error fetching lesson:', error);
        toast.error('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <NavigationBar />
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <NavigationBar />
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
            <Button onClick={() => navigate('/lessons')}>
              <ArrowLeft className="mr-2" /> Back to Lessons
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <Button 
          variant="outline" 
          onClick={() => navigate('/lessons')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" /> Back to Lessons
        </Button>

        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">{lesson.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose max-w-none">
              <p>{lesson.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Date</h3>
                <p>{lesson.lesson_date ? format(new Date(lesson.lesson_date), 'PPP') : 'TBD'}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Time</h3>
                <p>{lesson.lesson_time ? format(new Date(`2000-01-01T${lesson.lesson_time}`), 'p') : 'TBD'}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Location</h3>
                <p>{lesson.location || 'TBD'}</p>
              </div>
            </div>

            {lesson.instructor_name && (
              <div className="space-y-2">
                <h3 className="font-medium">Instructor</h3>
                <p>{lesson.instructor_name}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LessonView;