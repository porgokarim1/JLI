import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

const UnauthenticatedButtons = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="ghost"
        className="text-gray-700 hover:text-primary hover:bg-gray-50 inline-flex items-center"
        onClick={() => navigate("/login")}
      >
        <LogIn className="h-5 w-5 mr-2" />
        Login
      </Button>
      <Button
        variant="outline"
        className="inline-flex items-center border-2 border-gray-500 text-gray-500 hover:bg-gray-500/10"
        onClick={() => navigate("/register")}
      >
        <UserPlus className="h-5 w-5 mr-2" />
        Register
      </Button>
    </>
  );
};

export default UnauthenticatedButtons;