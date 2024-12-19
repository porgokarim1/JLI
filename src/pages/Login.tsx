import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here we would typically handle the login with a backend
    // For now, just show a success message and redirect
    toast.success("Successfully logged in!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-blue-50 py-12 px-4">
      <div className="container max-w-md mx-auto">
        <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-purple-900">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-purple-900">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="border-purple-200 focus:border-primary"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-purple-900">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    className="border-purple-200 focus:border-primary"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button 
                  variant="outline" 
                  type="button" 
                  onClick={() => navigate("/")}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;