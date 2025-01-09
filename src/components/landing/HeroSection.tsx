import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 h-[calc(100vh-64px)] flex items-center justify-center">
      <div className="text-center space-y-12 max-w-2xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none relative">
          K
          <span className="absolute -top-4 left-[0.45em]">'</span>
          NOW
          <br />
          ISRAEL
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="w-full sm:w-auto bg-[#FFD700] text-black hover:bg-[#FFD700]/90 px-12"
            onClick={() => navigate("/register")}
          >
            Join
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/10 px-12"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;