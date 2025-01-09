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
        <div className="pt-16 container mx-auto px-4">
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
      <div className="pt-16 container mx-auto px-4 py-4 max-h-screen overflow-hidden">
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
          {lessons?.map((lesson) => (
            <Card key={lesson.id} className="flex flex-col md:flex-col hover:shadow-lg transition-shadow h-auto">
              <div className="md:w-full w-1/3 md:h-40 h-full">
                {lesson.image_url && (
                  <img 
                    src={lesson.image_url} 
                    alt={lesson.title}
                    className="w-full h-full object-cover rounded-t-lg md:rounded-t-lg md:rounded-b-none rounded-l-lg md:rounded-l-none"
                  />
                )}
              </div>
              <div className="flex-1 p-4">
                <h3 className="font-medium text-sm mb-1 truncate">{lesson.title}</h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{lesson.description}</p>
                <div className="flex items-center justify-between mt-auto">
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
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;