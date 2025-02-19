import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { LogIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showInstructorDialog, setShowInstructorDialog] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First check if the user exists and get their role
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('email', formData.email)
        .single();

      if (profileData?.role === 'instructor') {
        setIsLoading(false);
        setShowInstructorDialog(true);
        return; // Stop here if it's an instructor
      }

      // Proceed with login only if not an instructor
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) throw signInError;

      toast.success("Successfully logged in!");
      navigate("/");
    } catch (error: any) {
      setIsLoading(false);
      toast.error("Error during login: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstructorRedirect = () => {
    window.open('https://teacher.knowisrael.app', '_blank');
    setShowInstructorDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/lesson_images/logo.png?t=2025-01-02T06%3A41%3A20.422Z"
              alt="Logo"
              className="h-12 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          <h1 className="text-4xl font-black mb-2">
            <span className="text-black">KNOW ISRAEL</span>
          </h1>
        </div>

        <Card className="bg-white/70 backdrop-blur-sm border-primary">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center space-x-2">
              <LogIn className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold text-center">Login</h2>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-black font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="border-black focus:border-primary"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-black font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    className="border-black focus:border-primary"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-4 sticky bottom-4 bg-white/70 backdrop-blur-sm py-4">
                <Button 
                  type="submit"
                  className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-black"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/register")}
                  className="w-full border-gray-500 text-gray-500 hover:bg-gray-500/10"
                  disabled={isLoading}
                >
                  Join
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showInstructorDialog} onOpenChange={setShowInstructorDialog}>
        <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-sm border-primary">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-primary">
              Instructor Access
            </DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <img 
                  src="https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/lesson_images/logo.png"
                  alt="Logo"
                  className="h-16"
                />
              </div>
              <p className="text-center text-gray-700">
                This platform is designed for students. As an instructor, please use the dedicated teacher platform to access your account.
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button 
              onClick={handleInstructorRedirect}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-black font-semibold"
            >
              Go to Teacher Platform
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;