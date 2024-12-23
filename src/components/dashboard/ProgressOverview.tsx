import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ProgressOverview = () => {
  const [completedLessons, setCompletedLessons] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Get total number of lessons
        const { data: lessonsData } = await supabase
          .from('lessons')
          .select('count')
          .single();
        
        setTotalLessons(lessonsData?.count || 0);

        // Get completed lessons count
        const { data: completedData } = await supabase
          .from('user_lesson_progress')
          .select('count')
          .eq('user_id', user.id)
          .eq('status', 'completed')
          .single();
        
        setCompletedLessons(completedData?.count || 0);

        // Calculate total hours from time_spent (which is in seconds)
        const { data: timeData } = await supabase
          .from('user_lesson_progress')
          .select('time_spent')
          .eq('user_id', user.id);

        const totalSeconds = timeData?.reduce((acc, curr) => acc + (curr.time_spent || 0), 0) || 0;
        const hours = Math.round(totalSeconds / 3600); // Convert seconds to hours and round
        setTotalHours(hours);

      } catch (error) {
        console.error('Error fetching progress:', error);
        toast.error('Failed to load progress data');
      }
    };

    fetchProgress();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <Card className="bg-white/90 backdrop-blur-sm border-indigo-100">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800">Your Progress</CardTitle>
          <CardDescription>Track your journey through the Know Israel program</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-900">Lessons Completed</h3>
              <p className="text-2xl font-bold text-indigo-600">{completedLessons}/{totalLessons}</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-900">Hours Invested</h3>
              <p className="text-2xl font-bold text-indigo-600">{totalHours}</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-indigo-900">Next Session</h3>
              <p className="text-2xl font-bold text-indigo-600">Today</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressOverview;