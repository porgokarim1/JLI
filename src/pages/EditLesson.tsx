import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";
import { LessonWithProgress } from "@/components/dashboard/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const EditLesson = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<LessonWithProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast.error('You must be logged in to edit lessons');
          navigate('/login');
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile?.role !== 'instructor' && profile?.role !== 'administrator') {
          toast.error('You do not have permission to edit lessons');
          navigate('/lessons');
          return;
        }

        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select(`
            *,
            lesson_media (
              id,
              lesson_id,
              url,
              type,
              created_at,
              updated_at
            )
          `)
          .eq('id', id)
          .single();

        if (lessonError) throw lessonError;

        setLesson(lessonData);
      } catch (error) {
        console.error('Error fetching lesson:', error);
        toast.error('Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lesson) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('lessons')
        .update({
          title: lesson.title,
          description: lesson.description,
          duration: lesson.duration,
          location: lesson.location,
          lesson_date: lesson.lesson_date,
          lesson_time: lesson.lesson_time,
          instructor_name: lesson.instructor_name,
        })
        .eq('id', lesson.id);

      if (error) throw error;

      toast.success('Lesson updated successfully');
      navigate(`/lesson/${lesson.id}`);
    } catch (error) {
      console.error('Error updating lesson:', error);
      toast.error('Failed to update lesson');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <NavigationBar />
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
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
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/lessons')}
          >
            <ArrowLeft className="mr-2" /> Back to Lessons
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={saving}
          >
            <Save className="mr-2" /> Save Changes
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Edit Lesson</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={lesson.title}
                  onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={lesson.description}
                  onChange={(e) => setLesson({ ...lesson, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={lesson.location || ''}
                    onChange={(e) => setLesson({ ...lesson, location: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor Name</Label>
                  <Input
                    id="instructor"
                    value={lesson.instructor_name || ''}
                    onChange={(e) => setLesson({ ...lesson, instructor_name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={lesson.lesson_date || ''}
                    onChange={(e) => setLesson({ ...lesson, lesson_date: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={lesson.lesson_time || ''}
                    onChange={(e) => setLesson({ ...lesson, lesson_time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={lesson.duration}
                    onChange={(e) => setLesson({ ...lesson, duration: parseInt(e.target.value) })}
                    required
                    min="1"
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditLesson;