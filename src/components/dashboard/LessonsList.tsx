import { LessonCard } from "./LessonCard";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { useLessons } from "./useLessons";

const LessonsList = () => {
  const { data: lessons, isLoading } = useLessons();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Sort lessons by lesson_order
  const sortedLessons = [...(lessons || [])].sort((a, b) => {
    return (a.lesson_order || '').localeCompare(b.lesson_order || '');
  });

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