import { useState } from "react";
import { LessonWithProgress } from "../dashboard/types";
import { CompletionCodeDialog } from "./CompletionCodeDialog";
import { Button } from "../ui/button";
import { UserCheck } from "lucide-react";

const LessonContent = ({ lesson }: { lesson: LessonWithProgress }) => {
  const [isCompletionDialogOpen, setIsCompletionDialogOpen] = useState(false);
  
  const handleCompletionSuccess = () => {
    // Refresh the page to show updated status
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-gray-600">{lesson.description}</p>
      </div>

      <div className="space-y-4">
        {lesson.media?.map((media, index) => (
          <div key={media.id} className="rounded-lg overflow-hidden">
            {media.type === 'video' ? (
              <video 
                controls 
                className="w-full aspect-video"
                src={media.url}
              />
            ) : (
              <img 
                src={media.url} 
                alt={`${lesson.title} - Media ${index + 1}`}
                className="w-full h-auto"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <div>
          <span className="text-sm text-gray-500">Duration: {lesson.duration} minutes</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Status: {lesson.progress?.status.replace('_', ' ')}
          </span>
          {lesson.progress?.status !== 'completed' && (
            <Button 
              onClick={() => setIsCompletionDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <UserCheck className="h-4 w-4" />
              Confirm Attendance
            </Button>
          )}
        </div>
      </div>

      <CompletionCodeDialog 
        lessonId={lesson.id} 
        onSuccess={handleCompletionSuccess}
        open={isCompletionDialogOpen}
        onOpenChange={setIsCompletionDialogOpen}
      />
    </div>
  );
};

export default LessonContent;