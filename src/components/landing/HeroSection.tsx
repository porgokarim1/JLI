import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 h-[calc(100vh-64px)] flex items-center">
      <div className="grid md:grid-cols-2 gap-4 items-center w-full">
        <div className="text-center md:text-left space-y-4 relative z-10 bg-white/80 md:bg-transparent p-4 md:p-0 rounded-lg">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none relative text-3d">
              K
              <span className="absolute -top-4 left-[0.45em]">'</span>
              NOW
              <br />
              ISRAEL
            </h1>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-[#FFD700] text-black hover:bg-[#FFD700]/90"
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
        <div className="w-full h-[300px] md:h-[500px]">
          <img
            src="https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/SM-5785-KI-GIF-1-Transparent-Story.gif"
            alt="K'NOW Israel Animation"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;