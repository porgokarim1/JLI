import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, BookOpen } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface NextLessonCardProps {
  onAttendanceClick: () => void;
  profile?: { campus?: string };
}

type NextLesson = {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  lesson_date: string | null;
  start_time: string | null;
  lesson_order: string | null;
  end_time: string | null;
  university_name: string | null;
  instructor: {
    first_name: string;
    last_name: string;
  } | null;
};

export const NextLessonCard = ({ onAttendanceClick, profile }: NextLessonCardProps) => {
  const { data: nextLesson, isLoading } = useQuery({
    queryKey: ["next-lesson", profile?.campus],
    queryFn: async () => {
      if (!profile?.campus) {
        const { data: user } = await supabase.auth.getUser();
        if (!user) throw new Error("Not authenticated");

        const { data: profileData } = await supabase
          .from("profiles")
          .select("campus")
          .eq("id", user.user.id)
          .single();
        if (!profileData?.campus) {
          throw new Error("User profile or campus not found.");
        }

        profile = profileData;
      }

      const now = new Date();

      // Fetch the next lesson
      const { data: lessons, error: lessonError } = await supabase
        .from("lessons_view_simple")
        .select("*")
        .eq("university_name", profile.campus)
        .order("lesson_date", { ascending: true })
        .order("start_time", { ascending: true });

      if (lessonError || !lessons || lessons.length === 0) {
        console.error("Error fetching lessons:", lessonError);
        throw new Error("No lessons found.");
      }

      // Filter lessons to find the next one in time
      const nextLesson = lessons.find((lesson) => {
        const [year, month, day] = lesson.lesson_date.split('-').map(Number);
        const lessonDate = new Date(year, month - 1, day);

        const [startHours, startMinutes] = lesson.start_time.split(':').map(Number);
        const lessonStartTime = new Date(year, month - 1, day, startHours, startMinutes);

        return (
          lessonDate > now ||
          (lessonDate.toDateString() === now.toDateString() && lessonStartTime > now)
        );
      });

      if (!nextLesson) {
        throw new Error("No upcoming lessons found.");
      }

      // Fetch the instructor details
      const { data: instructor, error: instructorError } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("id", nextLesson.instructor_id)
        .maybeSingle();

      if (instructorError) {
        console.error("Error fetching instructor:", instructorError);
        throw new Error("Instructor not found.");
      }

      return {
        ...nextLesson,
        instructor: instructor || null,
      } as NextLesson;
    },
  });

  if (isLoading) {
    return (
      <Card className="bg-[#FEF7CD] border-none shadow-none animate-pulse">
        <CardContent className="p-4">
          <div className="h-20 bg-gray-200/50 rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex items-start gap-4">
      <div className="relative">
        <BookOpen className="absolute -z-10 text-gray-100 h-12 w-12 -left-2 top-1/2 -translate-y-1/2" />
        <div className="relative">
          <span className="writing-mode-vertical transform rotate-180 text-sm font-bold uppercase text-black relative px-2 flex items-center">
            <span className="relative">
              <span className="relative z-10">YOUR NEXT LESSON</span>
              <span className="absolute left-1 top-1/2 -translate-y-1/2 w-[6px] h-[100%] bg-[#FFD700]"></span>
            </span>
          </span>
        </div>
      </div>
      <Card className="bg-[#FEF7CD] border-none shadow-none flex-1">
        <CardContent className="p-4">
          <div className="flex items-start gap-6">
          {nextLesson?.lesson_order && (
            <div className="text-4xl font-bold text-[#FFD700]">{nextLesson.lesson_order}</div>
          )}
            <div className="flex-1">
              {nextLesson?.title && (
                <h3 className="text-xl font-bold text-[#1A1F2C] mb-3">
                  {nextLesson.title}
                </h3>
              )}
              <div className="space-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-4">
                    <Calendar className="h-4 w-4 text-black" />
                  </div>
                  <span className="text-sm text-[#555555]"> {nextLesson?.lesson_date && (() => {
                    const [year, month, day] = nextLesson.lesson_date.split('-').map(Number);
                    return format(new Date(year, month - 1, day), "EEE. MM/dd/yyyy");
                  })()}
                  {!(nextLesson?.lesson_date) && "TBD"}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4">
                    <Clock className="h-4 w-4 text-black" />
                  </div>
                  <span className="text-sm text-[#555555]">
                  {nextLesson?.start_time ? (
                    format(new Date(`2000-01-01T${nextLesson.start_time}`),
                      "h:mm a"
                    )
                  ) : (
                    "TBD"
                  )}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4">
                    <MapPin className="h-4 w-4 text-black" />
                  </div>
                  <span className="text-sm text-[#555555]"> {nextLesson?.location || "Location TBD"}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};