import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AuthenticatedButtons = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
      return;
    }
    navigate("/login");
  };

  return (
    <div className="flex items-center space-x-4">
      <Link to="/engagement" className="nav-link">
        Engagement
      </Link>
      <Link to="/about" className="nav-link">
        About
      </Link>
      <Link to="/profile" className="nav-link">
        Profile
      </Link>
      <Button
        variant="ghost"
        className="text-primary hover:text-primary/80"
        onClick={handleSignOut}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default AuthenticatedButtons;