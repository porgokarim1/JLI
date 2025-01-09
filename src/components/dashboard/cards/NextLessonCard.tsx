import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, MapPin } from "lucide-react";

interface NextLessonCardProps {
  onAttendanceClick: () => void;
}

export const NextLessonCard = ({ onAttendanceClick }: NextLessonCardProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-medium text-sm">Next Lesson</h3>
              <p className="text-xs text-muted-foreground">02/15/2025 @4PM</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button 
              variant="default"
              className="text-black h-8 text-xs"
              onClick={onAttendanceClick}
            >
              Confirm Attendance
            </Button>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Location</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};