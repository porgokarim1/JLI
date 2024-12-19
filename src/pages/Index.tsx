import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Know Israel
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Empowering Jewish college students with knowledge and confidence to engage in meaningful conversations about Israel.
          </p>
          <div className="space-x-4">
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => navigate("/register")}
            >
              Join the Program
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </div>
      </div>

      {/* Program Overview */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Program Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lessons.map((lesson, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Lesson {index + 1}</CardTitle>
                <CardDescription>90-minute session</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{lesson.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* User Types */}
      <div className="container mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Who Can Join?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypes.map((type, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{type.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join our community and become part of the conversation about Israel through a Jewish lens.
        </p>
        <div className="space-x-4">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => navigate("/register")}
          >
            Register Now
          </Button>
          <Button 
            size="lg"
            variant="outline"
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
