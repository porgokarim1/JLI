import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const LessonsList = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('*')
          .order('created_at');

        if (error) throw error;
        setLessons(data || []);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        toast.error('Failed to load lessons');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

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
        {lessons.map((lesson: any, index) => (
          <Card key={lesson.id} className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
            <CardHeader>
              <div className="w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                <img 
                  src={lesson.image_url} 
                  alt={lesson.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-slate-800">Lesson {index + 1}</CardTitle>
              <CardDescription className="text-slate-600">{lesson.duration}-minute session</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">{lesson.description}</p>
              <Button 
                className="w-full mt-4"
                onClick={() => navigate(`/lesson/${lesson.id}`)}
              >
                Start Lesson
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LessonsList;