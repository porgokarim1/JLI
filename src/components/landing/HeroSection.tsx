import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SimpleSlideshow from "./SimpleSlideshow";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 items-center relative">
        <div className="text-left space-y-8 relative z-10 bg-white/80 md:bg-transparent p-4 md:p-0 rounded-lg">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none relative">
                K
                <span className="absolute -top-4 left-[0.45em]">'</span>
                NOW
                <br />
                ISRAEL
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                <span className="bg-primary px-2">YOUR GUIDE TO ADDRESSING</span>
                <br />
                <span className="bg-primary px-2">THE CURRENT CONFLICT</span>
                <br />
                <span className="bg-primary px-2">WITH CONFIDENCE</span>
              </h2>

              <p className="text-xl md:text-2xl leading-relaxed max-w-2xl">
                A four-part course on confronting the pervasive lies and misinformation 
                about Israel that Jewish students frequently face on college campuses, 
                equipping you with practical skills and effective responses.
              </p>
              
              <div className="pt-4 space-x-4">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                  onClick={() => navigate("/register")}
                >
                  Join the Program
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