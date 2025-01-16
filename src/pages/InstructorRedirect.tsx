import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const InstructorRedirect = () => {
  const navigate = useNavigate();

  const handleRedirect = async () => {
    // Sign out from current platform
    await supabase.auth.signOut();
    
    // Open teacher platform in new tab
    window.open('https://teacher.knowisrael.app', '_blank');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-md w-full mx-4 p-8 bg-white rounded-lg shadow-lg text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, Instructor!</h1>
        <p className="text-gray-600">
          Please use the teacher platform to access your dashboard and manage your lessons.
        </p>
        <Button 
          onClick={handleRedirect}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Go to Teacher Platform
        </Button>
      </div>
    </div>
  );
};

export default InstructorRedirect;