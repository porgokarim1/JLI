import { Card } from "@/components/ui/card";
import { MapPin, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { LessonWithProgress } from "./types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface LessonCardProps {
  lesson: LessonWithProgress;
  index: number;
}

export const LessonCard = ({ lesson }: LessonCardProps) => {
  const isMobile = useIsMobile();
  const [isInstructor, setIsInstructor] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedLesson, setEditedLesson] = useState({
    title: lesson.title,
    description: lesson.description,
    location: lesson.location || '',
    lesson_date: lesson.lesson_date || '',
    lesson_time: lesson.lesson_time || ''
  });
  console.log(lesson)

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

  const formatLessonDate = (date: string | null) => {
  
    if (date) {
      const dateOnly = date.split('T')[0]; 
  
      const [year, month, day] = dateOnly.split('-').map(Number);
  

      const lessonDate = new Date(year, month - 1, day);
  

      if (lessonDate.getTime()) {
        const formattedDate = format(lessonDate, 'MMM d');
        return formattedDate;
      }
    }
    return 'TBD';
  };
  
  
  
  const formatLessonTime = (time: string | null) => {
    if (time) {
      const parsedTime = new Date(`2000-01-01T${time}`);
      if (!isNaN(parsedTime.getTime())) {
        return format(parsedTime, 'p');
      }
    }
    return 'TBD'; // Fallback if invalid
  };

  if (isMobile) {
    return (
      <>
        <Card className="flex h-36 hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-gray-900">
          <div className="w-[20%] bg-primary flex items-center justify-center border-r border-gray-900">
            <span className="text-4xl font-bold text-primary-foreground">
              {lesson.lesson_order || '1'}
            </span>
          </div>

          <div className="w-[80%] p-3 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold mb-1">{lesson.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-2">{lesson.description}</p>
            </div>

            <div className="flex justify-between items-end">
              <div className="flex space-x-2 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-primary" />
                  <span>{formatLessonDate(lesson.lesson_date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-primary" />
                  <span>{formatLessonTime(lesson.lesson_time)}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex space-x-1 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-primary" />
                  <span className="truncate">{lesson.location || 'TBD'}</span>
                </div>
              </div>
            </div>

            {lesson.progress?.status === 'completed' && (
              <div className="absolute top-2 right-2 flex items-center gap-1 text-green-600">
                <CheckCircle2 className="h-3 w-3" />
                <span className="text-xs font-medium">Completed</span>
              </div>
            )}
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
                  onChange={(e) => setEditedLesson(prev => ({ ...prev, title: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <Textarea
                  id="description"
                  value={editedLesson.description}
                  onChange={(e) => setEditedLesson(prev => ({ ...prev, description: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <label htmlFor="location" className="text-sm font-medium">Location</label>
                <Input
                  id="location"
                  value={editedLesson.location}
                  onChange={(e) => setEditedLesson(prev => ({ ...prev, location: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <label htmlFor="date" className="text-sm font-medium">Date</label>
                <Input
                  id="date"
                  type="date"
                  value={editedLesson.lesson_date}
                  onChange={(e) => setEditedLesson(prev => ({ ...prev, lesson_date: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <label htmlFor="time" className="text-sm font-medium">Time</label>
                <Input
                  id="time"
                  type="time"
                  value={editedLesson.lesson_time}
                  onChange={(e) => setEditedLesson(prev => ({ ...prev, lesson_time: e.target.value }))} />
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
  }

  return (
    <>
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-gray-900">
        <div className="bg-primary p-4 border-b border-gray-900">
          <span className="text-4xl font-bold text-primary-foreground leading-none flex items-center justify-center w-full">
            {lesson.lesson_order || '1'}
          </span>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-1">
            <h3 className="text-sm font-semibold mb-2">{lesson.title}</h3>
            <p className="text-xs text-gray-600 mb-4 line-clamp-2">{lesson.description}</p>
          </div>

          <div className="flex space-x-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 text-primary" />
              <span>
                {(() => {
                  console.log("desde main" + lesson.lesson_date);
                  return formatLessonDate(lesson.lesson_date);
                })()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-primary" />
              <span>{formatLessonTime(lesson.lesson_time)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-primary" />
              <span className="truncate">{lesson.location || 'TBD'}</span>
            </div>
          </div>

          {isInstructor && (
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEditDialog(true)}
                className="text-xs border-yellow-500 hover:bg-yellow-500/10"
              >
                Edit
              </Button>
            </div>
          )}

          {lesson.progress?.status === 'completed' && (
            <div className="mt-2 flex items-center gap-1 text-green-600">
              <CheckCircle2 className="h-3 w-3" />
              <span className="text-xs font-medium">Completed</span>
            </div>
          )}
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
                onChange={(e) => setEditedLesson(prev => ({ ...prev, title: e.target.value }))} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Textarea
                id="description"
                value={editedLesson.description}
                onChange={(e) => setEditedLesson(prev => ({ ...prev, description: e.target.value }))} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="location" className="text-sm font-medium">Location</label>
              <Input
                id="location"
                value={editedLesson.location}
                onChange={(e) => setEditedLesson(prev => ({ ...prev, location: e.target.value }))} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="date" className="text-sm font-medium">Date</label>
              <Input
                id="date"
                type="date"
                value={editedLesson.lesson_date}
                onChange={(e) => setEditedLesson(prev => ({ ...prev, lesson_date: e.target.value }))} />
            </div>
            <div className="grid gap-2">
              <label htmlFor="time" className="text-sm font-medium">Time</label>
              <Input
                id="time"
                type="time"
                value={editedLesson.lesson_time}
                onChange={(e) => setEditedLesson(prev => ({ ...prev, lesson_time: e.target.value }))} />
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
