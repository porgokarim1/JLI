import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 tracking-tight">
            Know Israel
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-2xl mx-auto">
            Empowering Jewish college students with knowledge and confidence to engage in meaningful conversations about Israel.
          </p>
          <div className="space-x-4">
            <Button 
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate("/register")}
            >
              Join the Program
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </div>
      </div>

      {/* Program Overview */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Program Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lessons.map((lesson, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm border-indigo-100">
              <CardHeader>
                <CardTitle className="text-slate-800">Lesson {index + 1}</CardTitle>
                <CardDescription className="text-slate-600">90-minute session</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{lesson.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* User Types */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Who Can Join?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypes.map((type, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm border-indigo-100">
              <CardHeader>
                <CardTitle className="text-slate-800">{type.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-slate-800">Ready to Get Started?</h2>
        <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
          Join our community and become part of the conversation about Israel through a Jewish lens.
        </p>
        <div className="space-x-4">
          <Button 
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all"
            onClick={() => navigate("/register")}
          >
            Register Now
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

// Content Data
const lessons = [
  {
    description: "Israel's right to exist and responding to accusations of occupation.",
  },
  {
    description: "The ethics of warfare from a Torah perspective.",
  },
  {
    description: "The practicality and Torah values related to the two-state solution.",
  },
  {
    description: "Navigating Israel's isolation in the international community and the Torah view.",
  },
];

const userTypes = [
  {
    title: "Students",
    description: "College students interested in learning about Israel through a Jewish lens and engaging in meaningful conversations.",
  },
  {
    title: "Instructors (Shluchim)",
    description: "Leaders who guide and facilitate the Know Israel courses on college campuses.",
  },
  {
    title: "Administrators",
    description: "JLI on Campus program administrators who oversee and manage the program's operation.",
  },
];

export default Index;