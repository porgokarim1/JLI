import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const lessons = [
  {
    title: "Israel's Right to Exist",
    description: "Israel's right to exist and responding to accusations of occupation.",
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66"
  },
  {
    title: "Ethics of Warfare",
    description: "The ethics of warfare from a Torah perspective.",
    image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd"
  },
  {
    title: "Two-State Solution",
    description: "The practicality and Torah values related to the two-state solution.",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d"
  },
  {
    title: "International Relations",
    description: "Navigating Israel's isolation in the international community and the Torah view.",
    image: "https://images.unsplash.com/photo-1522083165195-3424ed129620"
  },
];

const LessonsList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Learning Path</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {lessons.map((lesson, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
            <CardHeader>
              <div className="w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                <img 
                  src={lesson.image} 
                  alt={lesson.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-slate-800">Lesson {index + 1}</CardTitle>
              <CardDescription className="text-slate-600">90-minute session</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">{lesson.description}</p>
              <Button 
                className="w-full mt-4"
                variant={index <= 1 ? "secondary" : "default"}
              >
                {index <= 1 ? "Completed" : "Start Lesson"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LessonsList;