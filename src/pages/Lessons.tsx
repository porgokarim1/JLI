import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLessons } from "@/components/dashboard/useLessons";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Lessons = () => {
  const { data: lessons, isLoading } = useLessons();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <NavigationBar />
        <div className="pt-20 container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalProgress = lessons ? 
    (lessons.filter((lesson) => lesson.progress?.status === 'completed').length / lessons.length) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="pt-16 container mx-auto px-4 py-4">
        <Card className="mb-4 bg-white/90 backdrop-blur-sm border-indigo-100">
          <CardHeader className="py-2">
            <CardTitle className="text-lg">Your Learning Journey</CardTitle>
            <CardDescription className="text-sm">Track your progress through all lessons</CardDescription>
          </CardHeader>
          <CardContent className="py-2">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium">{Math.round(totalProgress)}%</span>
              </div>
              <Progress value={totalProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {lessons?.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                    {lesson.image_url && (
                      <img 
                        src={lesson.image_url} 
                        alt={lesson.title}
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1 truncate">{lesson.title}</h3>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{lesson.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {lesson.progress?.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => navigate(`/lesson/${lesson.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
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