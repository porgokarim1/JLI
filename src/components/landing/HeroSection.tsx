import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SimpleSlideshow from "./SimpleSlideshow";
import { Sparkles, Star } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-4 items-center relative">
        <div className="text-left space-y-4 relative z-10 bg-white/80 md:bg-transparent p-4 md:p-0 rounded-lg mt-20 md:mt-16 lg:mt-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-none relative text-3d">
              K
              <span className="absolute -top-4 left-[0.45em]">'</span>
              NOW
              <br />
              ISRAEL
              <Star className="inline-block ml-2 text-vibrant-blue animate-float" fill="currentColor" />
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
              <div className="relative inline-block">
                <span className="nav-link text-vibrant-purple hover:text-vibrant-pink transition-colors">
                  YOUR GUIDE TO ADDRESSING
                </span>
              </div>
              <br />
              <div className="relative inline-block">
                <span className="nav-link text-vibrant-blue hover:text-vibrant-orange transition-colors">
                  THE CURRENT CONFLICT
                </span>
              </div>
              <br />
              <div className="relative inline-block">
                <span className="nav-link text-vibrant-orange hover:text-vibrant-purple transition-colors">
                  WITH CONFIDENCE
                </span>
                <Star className="inline-block ml-2 text-vibrant-blue animate-pulse" fill="currentColor" />
              </div>
            </h2>

            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl glass p-4 rounded-xl">
              A four-part course on confronting the pervasive lies and misinformation 
              about Israel that Jewish students frequently face on college campuses, 
              equipping you with practical skills and effective responses.
              <Star className="inline-block ml-2 text-vibrant-blue animate-bounce" fill="currentColor" />
            </p>
            
            <div className="pt-4 space-x-4">
              <Button 
                size="lg"
                className="modern-card bg-gradient-to-r from-soft-purple to-soft-blue text-vibrant-purple hover:opacity-90 shadow-lg hover:shadow-xl transition-all group"
                onClick={() => navigate("/register")}
              >
                Join the Program
                <Sparkles className="ml-2 w-4 h-4 group-hover:animate-spin" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="modern-card border-2 border-vibrant-purple text-vibrant-purple hover:bg-vibrant-purple/10 group"
                onClick={() => navigate("/login")}
              >
                Login
                <Star className="ml-2 w-4 h-4 group-hover:animate-pulse" fill="currentColor" />
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