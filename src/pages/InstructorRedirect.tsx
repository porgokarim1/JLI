import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const InstructorRedirect = () => {
  const navigate = useNavigate();

  const handleRedirect = async () => {
    try {
      await supabase.auth.signOut();
      window.open('https://teacher.knowisrael.app', '_blank');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome, Instructor!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please use the Teacher Platform to access your dashboard and manage your lessons.
          </p>
        </div>
        <Button
          onClick={handleRedirect}
          className="w-full max-w-xs mx-auto"
        >
          Go to Teacher Platform
        </Button>
      </div>
    </div>
  );
};

export default InstructorRedirect;