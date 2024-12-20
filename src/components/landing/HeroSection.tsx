import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 tracking-tight">
            Know Israel
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 mb-8">
            Empowering Jewish college students with knowledge and confidence to engage in meaningful conversations about Israel.
          </p>
          <div className="space-x-4">
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
        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1544967082-d9d25d867d66"
            alt="Jerusalem Old City" 
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;