import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AutoRotatingCarousel from "./AutoRotatingCarousel";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 items-start relative">
        <div className="text-left space-y-8 relative z-10 bg-white/80 md:bg-transparent p-4 md:p-0 rounded-lg">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
                <span className="text-primary">K</span>
                <span className="text-black">NO</span>
                <span className="text-primary">W</span>
                <span className="text-black"> GENOCIDE</span>
                <br />
                <span className="text-primary">K</span>
                <span className="text-black">NO</span>
                <span className="text-primary">W</span>
                <br />
                <span className="text-black">WAR</span>
              </h1>
              
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

            <p className="text-2xl md:text-3xl font-bold leading-tight">
              <span className="bg-primary px-2">AMIDST</span> <span className="bg-primary px-2">THE</span> <span className="bg-primary px-2">CHAOS</span>,
              <br />
              NOTHING <span className="bg-primary px-2">REALLY</span> IS
              <br />
              <span className="bg-primary px-2">CLEAR</span>, AS <span className="bg-primary px-2">ANSWERS</span>
              <br />
              <span className="bg-primary px-2">SEEM</span> <span className="bg-primary px-2">ELUSIVE</span>, <span className="bg-primary px-2">AND</span>
              <br />
              <span className="bg-primary px-2">IT</span> <span className="bg-primary px-2">ALL</span> <span className="bg-primary px-2">APPEARS</span> <span className="bg-primary px-2">AS</span>
              <br />
              IT SEEMS.
            </p>
          </div>
        </div>
        <div className="w-full h-[400px] md:h-[600px]">
          <AutoRotatingCarousel />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;