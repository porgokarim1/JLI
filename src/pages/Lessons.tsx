import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import NavigationBar from "@/components/navigation/NavigationBar";
import { useLessons } from "@/components/dashboard/useLessons";
import LessonsList from "@/components/dashboard/LessonsList";
import { LoadingSkeleton } from "@/components/dashboard/LoadingSkeleton";

const Lessons = () => {
  const navigate = useNavigate();
  const { data: lessons, isLoading } = useLessons();

  const handleLessonClick = (lessonId: string) => {
    navigate(`/lessons/${lessonId}`);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lessons?.map((lesson: any) => (
            <Card
              key={lesson.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleLessonClick(lesson.id)}
            >
              <CardHeader className="p-2 sm:p-4 pb-0">
                <CardTitle className="text-sm sm:text-lg">
                  {lesson.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 sm:p-4 pt-2 space-y-1">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  <span className="text-xs sm:text-sm">
                    {lesson.lesson_date
                      ? format(new Date(lesson.lesson_date), "MMM dd")
                      : "TBD"}
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  <span className="text-xs sm:text-sm">
                    {lesson.lesson_time
                      ? format(new Date(`2000-01-01T${lesson.lesson_time}`), "h:mm a")
                      : "TBD"}
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  <span className="text-xs sm:text-sm truncate">
                    {lesson.location || "Location TBD"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;