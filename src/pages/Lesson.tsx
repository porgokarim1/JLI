import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Lesson = () => {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
          <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate('/')}
        className="mb-6"
      >
        ← Back to Dashboard
      </Button>
      
      <div className="max-w-4xl mx-auto">
        <div className="aspect-video mb-6 rounded-lg overflow-hidden">
          <img 
            src={lesson.image_url} 
            alt={lesson.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
        <p className="text-gray-600 mb-6">{lesson.description}</p>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-600">Duration: {lesson.duration} minutes</p>
        </div>
        
        {/* Placeholder for future lesson content */}
        <div className="prose max-w-none">
          <p>Lesson content will be added here...</p>
        </div>
      </div>
    </div>
  );
};

export default Lesson;