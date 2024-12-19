import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  // For now, we'll use a simple boolean. Later when auth is implemented, this will come from the auth context
  const isLoggedIn = true; // Changed to true for development

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {!isLoggedIn ? (
        <>
          {/* Hero Section for Non-Logged In Users */}
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
                  src="https://images.unsplash.com/photo-1544967082-d9d25d867d66"
                  alt="Jerusalem Old City" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* User Types Section */}
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

          {/* Call to Action Section */}
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
        </>
      ) : (
        <>
          {/* Dashboard Header for Logged In Users */}
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-slate-800">Welcome Back!</h1>
              <Button 
                variant="outline"
                onClick={() => {/* Add logout handler later */}}
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="container mx-auto px-4 py-8">
            <Card className="bg-white/90 backdrop-blur-sm border-indigo-100 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">Your Progress</CardTitle>
                <CardDescription>Track your journey through the Know Israel program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h3 className="font-semibold text-indigo-900">Lessons Completed</h3>
                    <p className="text-2xl font-bold text-indigo-600">2/4</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h3 className="font-semibold text-indigo-900">Hours Invested</h3>
                    <p className="text-2xl font-bold text-indigo-600">3</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h3 className="font-semibold text-indigo-900">Next Session</h3>
                    <p className="text-2xl font-bold text-indigo-600">Tomorrow</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Program Overview Section */}
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

          {/* Resources Section */}
          <div className="container mx-auto px-4 py-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
                <CardHeader>
                  <CardTitle className="text-slate-800">Study Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">Access supplementary reading materials and resources.</p>
                  <Button variant="outline" className="w-full">View Materials</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
                <CardHeader>
                  <CardTitle className="text-slate-800">Discussion Forum</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">Engage with other students and share insights.</p>
                  <Button variant="outline" className="w-full">Join Discussion</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-indigo-100">
                <CardHeader>
                  <CardTitle className="text-slate-800">Schedule Session</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 mb-4">Book your next learning session.</p>
                  <Button variant="outline" className="w-full">Schedule Now</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Content Data
const lessons = [
  {
    title: "Israel's Right to Exist",
    description: "Israel's right to exist and responding to accusations of occupation.",
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66" // Western Wall plaza
  },
  {
    title: "Ethics of Warfare",
    description: "The ethics of warfare from a Torah perspective.",
    image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd" // Jerusalem Old City view
  },
  {
    title: "Two-State Solution",
    description: "The practicality and Torah values related to the two-state solution.",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d" // Jerusalem City Walls
  },
  {
    title: "International Relations",
    description: "Navigating Israel's isolation in the international community and the Torah view.",
    image: "https://images.unsplash.com/photo-1522083165195-3424ed129620" // Israeli Flag at Western Wall
  },
];

const userTypes = [
  {
    title: "Students",
    description: "College students interested in learning about Israel through a Jewish lens and engaging in meaningful conversations.",
    image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0" // Students in yeshiva
  },
  {
    title: "Instructors (Shluchim)",
    description: "Leaders who guide and facilitate the Know Israel courses on college campuses.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7" // Rabbi teaching
  },
  {
    title: "Administrators",
    description: "JLI on Campus program administrators who oversee and manage the program's operation.",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744" // Synagogue
  },
];

export default Index;
