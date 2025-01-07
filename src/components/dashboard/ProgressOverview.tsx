import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BookOpen, Clock, Calendar } from "lucide-react";

const ProgressOverview = () => {
  const [completedLessons, setCompletedLessons] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.error('Error getting user:', userError);
          toast.error('Failed to authenticate user');
          return;
        }
        
        if (!user) {
          toast.error('User not found');
          return;
        }

        const { data: lessonsData, error: lessonsError } = await supabase
          .from('lessons')
          .select('count')
          .maybeSingle();
        
        if (lessonsError) {
          console.error('Error fetching lessons:', lessonsError);
          toast.error('Failed to load lessons data');
          return;
        }

        setTotalLessons(lessonsData?.count || 0);

        const { data: completedData, error: completedError } = await supabase
          .from('user_lesson_progress')
          .select('count')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .maybeSingle();
        
        if (completedError) {
          console.error('Error fetching completed lessons:', completedError);
          toast.error('Failed to load progress data');
          return;
        }

        setCompletedLessons(completedData?.count || 0);

        const { data: timeData, error: timeError } = await supabase
          .from('user_lesson_progress')
          .select('time_spent')
          .eq('user_id', user.id);

        if (timeError) {
          console.error('Error fetching time data:', timeError);
          toast.error('Failed to load time data');
          return;
        }

        const totalSeconds = timeData?.reduce((acc, curr) => acc + (curr.time_spent || 0), 0) || 0;
        const hours = Math.round(totalSeconds / 3600);
        setTotalHours(hours);

      } catch (error) {
        console.error('Error fetching progress:', error);
        toast.error('Failed to load progress data');
      }
    };

    fetchProgress();
  }, []);

  const progressPercentage = (completedLessons / 4) * 100;

  return (
    <div className="container mx-auto px-4">
      <Card className="bg-white/90 backdrop-blur-sm border-primary shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-slate-800">Your Progress</CardTitle>
          <CardDescription className="text-sm">Track your journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg">
              <BookOpen className="h-4 w-4 text-primary" />
              <div>
                <div className="text-sm font-medium">
                  {completedLessons}/4
                  <div className="text-xs text-muted-foreground">
                    {progressPercentage}% complete
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">Lessons</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <div className="text-sm font-medium">{totalHours}</div>
                <div className="text-xs text-muted-foreground">Hours</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-4 w-4 text-primary" />
              <div>
                <div className="text-sm font-medium">Today</div>
                <div className="text-xs text-muted-foreground">Next</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressOverview;