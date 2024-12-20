import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold mb-6 text-slate-800">Ready to Get Started?</h2>
      <p className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
        Join our community and become part of the conversation about Israel through a Jewish lens.
      </p>
      <div className="space-x-4">
        <Button 
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
          onClick={() => navigate("/register")}
        >
          Register Now
        </Button>
        <Button 
          size="lg"
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;