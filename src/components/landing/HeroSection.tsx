import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SimpleSlideshow from "./SimpleSlideshow";
import { BookOpen, Star } from "lucide-react";

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
              <Star className="inline-block ml-2 text-primary animate-float" fill="currentColor" />
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
              <div className="relative inline-block">
                <span className="nav-link text-secondary">
                  YOUR GUIDE TO ADDRESSING
                </span>
              </div>
              <br />
              <div className="relative inline-block">
                <span className="nav-link text-primary">
                  THE CURRENT CONFLICT
                </span>
              </div>
              <br />
              <div className="relative inline-block">
                <span className="nav-link text-secondary">
                  WITH CONFIDENCE
                </span>
                <Star className="inline-block ml-2 text-primary animate-pulse" fill="currentColor" />
              </div>
            </h2>

            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl bg-soft-blue p-4 rounded-xl text-secondary">
              A four-part course on confronting the pervasive lies and misinformation 
              about Israel that Jewish students frequently face on college campuses, 
              equipping you with practical skills and effective responses.
              <BookOpen className="inline-block ml-2 text-primary animate-bounce" />
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-dark shadow-lg hover:shadow-xl transition-all group"
                onClick={() => navigate("/register")}
              >
                Join the Program
                <Star className="ml-2 w-4 h-4 group-hover:animate-spin" fill="currentColor" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/10 group"
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