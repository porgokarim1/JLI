import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SimpleSlideshow from "./SimpleSlideshow";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-4 items-start relative min-h-[calc(100vh-200px)]">
        <div className="text-left space-y-4 relative z-10 bg-white/80 md:bg-transparent p-4 md:p-0 rounded-lg">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-none relative text-3d">
              K
              <span className="absolute -top-4 left-[0.45em]">'</span>
              NOW
              <br />
              ISRAEL
            </h1>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-gray-500 text-gray-500 hover:bg-gray-500/10"
                onClick={() => navigate("/register")}
              >
                Join
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/10"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full h-[400px] md:h-[600px] lg:h-[800px]">
          <SimpleSlideshow />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;