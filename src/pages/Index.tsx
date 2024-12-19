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
              src="/photo-1501854140801-50d01698950b" 
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
    image: "/photo-1517022812141-23620dba5c23"
  },
  {
    title: "Ethics of Warfare",
    description: "The ethics of warfare from a Torah perspective.",
    image: "/photo-1466721591366-2d5fba72006d"
  },
  {
    title: "Two-State Solution",
    description: "The practicality and Torah values related to the two-state solution.",
    image: "/photo-1498936178812-4b2e558d2937"
  },
  {
    title: "International Relations",
    description: "Navigating Israel's isolation in the international community and the Torah view.",
    image: "/photo-1618160702438-9b02ab6515c9"
  },
];

const userTypes = [
  {
    title: "Students",
    description: "College students interested in learning about Israel through a Jewish lens and engaging in meaningful conversations.",
    image: "/photo-1721322800607-8c38375eef04"
  },
  {
    title: "Instructors (Shluchim)",
    description: "Leaders who guide and facilitate the Know Israel courses on college campuses.",
    image: "/photo-1582562124811-c09040d0a901"
  },
  {
    title: "Administrators",
    description: "JLI on Campus program administrators who oversee and manage the program's operation.",
    image: "/photo-1501854140801-50d01698950b"
  },
];

export default Index;