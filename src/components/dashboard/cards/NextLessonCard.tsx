import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, MapPin, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface NextLessonCardProps {
  onAttendanceClick: () => void;
}

type NextLesson = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  lesson_date: string | null;
  start_time: string | null;
  end_time: string | null;
  university_name: string | null;
  instructor: {
    first_name: string;
    last_name: string;
  } | null;
};

export const NextLessonCard = ({ onAttendanceClick }: NextLessonCardProps) => {
  const { data: nextLesson, isLoading } = useQuery({
    queryKey: ["next-lesson"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Fetch the user's campus
      const { data: profile } = await supabase
        .from("profiles")
        .select("campus")
        .eq("id", user.id)
        .single();

      if (!profile?.campus) {
        throw new Error("User profile or campus not found.");
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Fetch the next lesson
      const { data: lesson, error: lessonError } = await supabase
        .from("lessons_view_simple")
        .select("*")
        .eq("university_name", profile.campus)
        .gte("lesson_date", today.toISOString())
        .order("lesson_date", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (lessonError || !lesson) {
        console.error("Error fetching lesson:", lessonError);
        throw new Error("No lessons found.");
      }

      // Fetch the instructor details
      const { data: instructor, error: instructorError } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("id", lesson.instructor_id)
        .maybeSingle();

      if (instructorError) {
        console.error("Error fetching instructor:", instructorError);
        throw new Error("Instructor not found.");
      }

      return {
        ...lesson,
        instructor: instructor || null, // Attach instructor data to the lesson
      } as NextLesson;
    },
  });

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg animate-pulse">
        <CardContent className="p-4">
          <div className="h-20 bg-gray-200 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
      <CardContent className="p-4">
        <div className="space-y-3">
          {nextLesson?.university_name && (
            <p className="text-xs text-muted-foreground font-medium">
              {nextLesson.university_name}
            </p>
          )}
          {nextLesson?.instructor && (
            <p className="text-xs text-muted-foreground border-b pb-2">
              Instructor: {nextLesson.instructor.first_name} {nextLesson.instructor.last_name}
            </p>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <div className="space-y-0.5">
                <h3 className="font-medium text-sm">Next Lesson</h3>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>
                      {nextLesson?.lesson_date &&
                        format(
                          new Date(nextLesson.lesson_date),
                          "EEE. MM/dd/yyyy"
                        )}
                      {nextLesson?.start_time
                        ? ` ⏰ ${format(
                            new Date(`2000-01-01T${nextLesson.start_time}`),
                            "h:mm a"
                          )}`
                        : " ⏰ TBD"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">
                      {nextLesson?.location || "Location TBD"}
                    </span>
                  </div>
                  {nextLesson?.title && (
                    <p className="text-sm font-semibold leading-relaxed">
                      {nextLesson.title}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="default"
              className="text-black h-8 text-xs whitespace-nowrap"
              onClick={onAttendanceClick}
            >
              Attend
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
