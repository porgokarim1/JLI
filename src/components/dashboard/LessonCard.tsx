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
import { useIsMobile } from "@/hooks/use-mobile";

interface LessonCardProps {
  lesson: LessonWithProgress;
  index: number;
}

export const LessonCard = ({ lesson }: LessonCardProps) => {
  const navigate = useNavigate();
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

  if (isMobile) {
    return (
      <>
        <Card className="flex h-32 hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-gray-900">
          {/* Left section (20%) with lesson order */}
          <div className="w-[20%] bg-primary flex items-center justify-center border-r border-gray-900">
            <span className="text-4xl font-bold text-primary-foreground">
              {lesson.lesson_order || '1'}
            </span>
          </div>

          {/* Right section (80%) with lesson details */}
          <div className="w-[80%] p-3 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold mb-1">{lesson.title}</h3>
              <p className="text-xs text-gray-600 line-clamp-2">{lesson.description}</p>
            </div>

            <div className="flex justify-between items-end">
              {/* Icons and details in a row */}
              <div className="flex space-x-3 text-xs text-gray-600">
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

              {/* View button */}
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto"
                onClick={() => navigate(`/lessons/${lesson.id}`)}
              >
                <Eye className="h-3 w-3" />
              </Button>
            </div>

            {lesson.progress?.status === 'completed' && (
              <div className="absolute top-2 right-2 flex items-center gap-1 text-green-600">
                <CheckCircle2 className="h-3 w-3" />
                <span className="text-xs font-medium">Completed</span>
              </div>
            )}
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
  }

  // Desktop view
  return (
    <>
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-gray-900">
        {/* Top section with lesson order */}
        <div className="bg-primary p-4 border-b border-gray-900">
          <span className="text-4xl font-bold text-primary-foreground leading-none flex items-center justify-center w-full">
            {lesson.lesson_order || '1'}
          </span>
        </div>

        {/* Bottom section with lesson details */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex-1">
            <h3 className="text-sm font-semibold mb-2">{lesson.title}</h3>
            <p className="text-xs text-gray-600 mb-4 line-clamp-2">{lesson.description}</p>
          </div>

          {/* Date, Time, and Location in a row */}
          <div className="flex space-x-3 text-xs text-gray-600">
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

          {/* Action buttons */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            {isInstructor && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEditDialog(true)}
                className="text-xs border-yellow-500 hover:bg-yellow-500/10"
              >
                Edit
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto"
              onClick={() => navigate(`/lessons/${lesson.id}`)}
            >
              <Eye className="h-3 w-3 mr-1" />
              <span>View</span>
            </Button>
          </div>

          {lesson.progress?.status === 'completed' && (
            <div className="mt-2 flex items-center gap-1 text-green-600">
              <CheckCircle2 className="h-3 w-3" />
              <span className="text-xs font-medium">Completed</span>
            </div>
          )}
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
