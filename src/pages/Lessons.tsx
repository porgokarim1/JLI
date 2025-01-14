import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { useLessons } from "@/components/dashboard/useLessons";
import LessonsList from "@/components/dashboard/LessonsList";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";

const Lessons = () => {
  const navigate = useNavigate();
  const { data: lessons, isLoading } = useLessons();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const nextLesson = lessons?.find(lesson => {
    if (!lesson.lesson_date) return false;
    const lessonDate = new Date(lesson.lesson_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return lessonDate >= today;
  });

  const handleLessonClick = (lessonId: string) => {
    navigate(`/lessons/${lessonId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-center">Lessons</h1>
        <p className="text-center text-muted-foreground">
          Track your progress through the program
        </p>
      </div>

      <div className="grid gap-4">
        {nextLesson && (
          <Card className="bg-white/90 backdrop-blur-sm border-primary/20 shadow-lg">
            <CardHeader className="p-2 sm:p-4 space-y-1">
              <CardTitle className="text-sm sm:text-lg">Next Lesson</CardTitle>
              <CardDescription className="text-xs sm:text-sm">{nextLesson.title}</CardDescription>
            </CardHeader>
            <CardContent className="p-2 sm:p-4 pt-0 space-y-1">
              <div className="flex items-center gap-1 sm:gap-2">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm">
                  {nextLesson.lesson_date && format(new Date(nextLesson.lesson_date), 'EEE. MM/dd/yyyy')}
                  {nextLesson.lesson_time && ` @ ${format(new Date(`2000-01-01T${nextLesson.lesson_time}`), 'h:mm a')}`}
                </span>
              </div>
              {nextLesson.location && (
                <div className="flex items-center gap-1 sm:gap-2">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">{nextLesson.location}</span>
                </div>
              )}
              <div className="pt-2">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => handleLessonClick(nextLesson.id)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <LessonsList lessons={lessons || []} onLessonClick={handleLessonClick} />
      </div>
    </div>
  );
};

export default Lessons;