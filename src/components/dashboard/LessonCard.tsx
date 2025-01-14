import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Clock, CheckCircle2, Eye } from "lucide-react";
import { LessonWithProgress } from "./types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface LessonCardProps {
  lesson: LessonWithProgress;
  index: number;
}

export const LessonCard = ({ lesson }: LessonCardProps) => {
  const navigate = useNavigate();
  const [isInstructor, setIsInstructor] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedLesson, setEditedLesson] = useState({
    title: lesson.title,
    description: lesson.description,
    location: lesson.location || '',
    lesson_date: lesson.lesson_date || '',
    lesson_time: lesson.lesson_time || ''
  });
  
  useEffect(() => {
    const checkRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      setIsInstructor(profile?.role === 'instructor' || profile?.role === 'administrator');
    };

    checkRole();
  }, []);

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('lessons')
        .update({
          title: editedLesson.title,
          description: editedLesson.description,
          location: editedLesson.location,
          lesson_date: editedLesson.lesson_date,
          lesson_time: editedLesson.lesson_time
        })
        .eq('id', lesson.id);

      if (error) throw error;
      
      toast.success('Lesson updated successfully');
      setShowEditDialog(false);
    } catch (error) {
      console.error('Error updating lesson:', error);
      toast.error('Failed to update lesson');
    }
  };

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
    <>
      <Card className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100 h-[280px] overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Image Section */}
          <div className="h-32 overflow-hidden">
            {lesson.image_url && (
              <img 
                src={lesson.image_url} 
                alt={lesson.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          {/* Content Section */}
          <div className="flex-1 flex flex-col p-3">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-medium line-clamp-1">{lesson.title}</h3>
              <div className="flex items-center gap-1">
                {shouldShowStatus() && (
                  <Badge 
                    variant="secondary"
                    className={`${getStatusColor(lesson.progress?.status || '')} text-white text-[10px] px-1.5 py-0.5`}
                  >
                    {lesson.progress?.status === 'completed' ? 'completed' : 'in progress'}
                  </Badge>
                )}
                <div className="flex gap-1">
                  {isInstructor && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowEditDialog(true)}
                      className="h-6 text-[10px] px-2 border-yellow-500 hover:bg-yellow-500/10"
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => navigate(`/lessons/${lesson.id}`)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-600 line-clamp-2 mb-2">{lesson.description}</p>
            
            <div className="mt-auto space-y-1">
              <div className="flex items-center gap-1 text-[10px] text-gray-600">
                <MapPin className="h-2.5 w-2.5 text-primary" />
                <span className="truncate">{lesson.location || 'TBD'}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-600">
                <Calendar className="h-2.5 w-2.5 text-primary" />
                <span>{lesson.lesson_date ? format(new Date(lesson.lesson_date), 'PPP') : 'TBD'}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-gray-600">
                <Clock className="h-2.5 w-2.5 text-primary" />
                <span>{lesson.lesson_time ? format(new Date(`2000-01-01T${lesson.lesson_time}`), 'p') : 'TBD'}</span>
              </div>
            </div>

            {lesson.progress?.status === 'completed' && (
              <div className="flex items-center justify-center gap-1 py-1 text-green-600 text-[10px] mt-1">
                <CheckCircle2 className="h-2.5 w-2.5" />
                <span className="font-medium">Lesson Completed</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Lesson</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input
                id="title"
                value={editedLesson.title}
                onChange={(e) => setEditedLesson(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                value={editedLesson.description}
                onChange={(e) => setEditedLesson(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="location" className="text-sm font-medium">Location</label>
              <Input
                id="location"
                value={editedLesson.location}
                onChange={(e) => setEditedLesson(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="date" className="text-sm font-medium">Date</label>
              <Input
                id="date"
                type="date"
                value={editedLesson.lesson_date}
                onChange={(e) => setEditedLesson(prev => ({ ...prev, lesson_date: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="time" className="text-sm font-medium">Time</label>
              <Input
                id="time"
                type="time"
                value={editedLesson.lesson_time}
                onChange={(e) => setEditedLesson(prev => ({ ...prev, lesson_time: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};