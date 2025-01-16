import { LessonCard } from "./LessonCard";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { useLessons } from "./useLessons";
import { LessonProgress } from "./types";

const LessonsList = () => {
  const { data: lessons, isLoading } = useLessons();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Sort lessons by lesson_order
  const sortedLessons = [...(lessons || [])].sort((a, b) => {
    return (a.lesson_order || '').localeCompare(b.lesson_order || '');
  }).map(lesson => ({
    ...lesson,
    media: lesson.lesson_media || [], // Map lesson_media to media property
    progress: {
      status: (lesson.progress?.status || 'not_started') as LessonProgress['status'],
      time_spent: lesson.progress?.time_spent || 0,
      last_position: lesson.progress?.last_position || 0
    }
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
        {sortedLessons?.map((lesson, index) => (
          <LessonCard 
            key={lesson.id} 
            lesson={lesson} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default LessonsList;