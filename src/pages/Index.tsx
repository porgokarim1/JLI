import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 tracking-tight">
              Know Israel
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 mb-8">
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
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="Israel Landscape" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Program Overview */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Program Overview</h2>
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
            <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
              <CardHeader>
                <div className="w-full h-48 mb-4 rounded-t-lg overflow-hidden">
                  <img 
                    src={type.image} 
                    alt={type.title}
                    className="w-full h-full object-cover"
                  />
                </div>
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
    title: "Israel's Right to Exist",
    description: "Israel's right to exist and responding to accusations of occupation.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
  },
  {
    title: "Ethics of Warfare",
    description: "The ethics of warfare from a Torah perspective.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  {
    title: "Two-State Solution",
    description: "The practicality and Torah values related to the two-state solution.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    title: "International Relations",
    description: "Navigating Israel's isolation in the international community and the Torah view.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
  },
];

const userTypes = [
  {
    title: "Students",
    description: "College students interested in learning about Israel through a Jewish lens and engaging in meaningful conversations.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    title: "Instructors (Shluchim)",
    description: "Leaders who guide and facilitate the Know Israel courses on college campuses.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
  },
  {
    title: "Administrators",
    description: "JLI on Campus program administrators who oversee and manage the program's operation.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  },
];

export default Index;