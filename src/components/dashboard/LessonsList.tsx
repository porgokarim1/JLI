import { LessonCard } from "./LessonCard";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { useLessons } from "./useLessons";

const LessonsList = () => {
  const { data: lessons, isLoading } = useLessons();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {lessons?.map((lesson, index) => (
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