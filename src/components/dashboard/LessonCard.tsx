import { Card } from "@/components/ui/card";
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

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-gray-900">
        <div className="flex flex-row lg:flex-col h-full">
          {/* Left/Top section with lesson order */}
          <div className="w-1/5 lg:w-full bg-primary flex items-center justify-center p-4 lg:p-8 border-r lg:border-r-0 lg:border-b border-gray-900">
            <span className="text-[4rem] lg:text-[6rem] font-bold text-primary-foreground leading-none flex items-center justify-center w-full h-full">
              {lesson.lesson_order || '1'}
            </span>
          </div>

          {/* Right/Bottom section with lesson details */}
          <div className="w-4/5 lg:w-full p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-sm font-semibold mb-1">{lesson.title}</h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{lesson.description}</p>
                
                {/* Date, Time, and Location on one line */}
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-primary" />
                    <span>{lesson.lesson_date ? format(new Date(lesson.lesson_date), 'MMM d') : 'TBD'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-primary" />
                    <span>{lesson.lesson_time ? format(new Date(`2000-01-01T${lesson.lesson_time}`), 'p') : 'TBD'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span className="truncate">{lesson.location || 'TBD'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 ml-2">
                {isInstructor && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEditDialog(true)}
                    className="text-xs border-yellow-500 hover:bg-yellow-500/10 h-7"
                  >
                    Edit
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => navigate(`/lessons/${lesson.id}`)}
                >
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {lesson.progress?.status === 'completed' && (
              <div className="mt-1 flex items-center gap-1 text-green-600">
                <CheckCircle2 className="h-3 w-3" />
                <span className="text-xs font-medium">Completed</span>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Edit Dialog */}
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