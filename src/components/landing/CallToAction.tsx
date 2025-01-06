import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-3xl font-bold mb-4 text-slate-800">Ready to Get Started?</h2>
      <p className="text-xl text-slate-700 mb-6 max-w-2xl mx-auto">
        Join our community and become part of the conversation about Israel through a Jewish lens.
      </p>
      <div className="space-x-4">
        <Button 
          size="lg"
          className="bg-[#FFD700] hover:bg-[#FFD700]/90 text-black shadow-lg hover:shadow-xl transition-all"
          onClick={() => navigate("/register")}
        >
          Join
        </Button>
        <Button 
          size="lg"
          variant="outline"
          className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;