import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="text-left space-y-12">
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
                <span className="text-primary">KNO</span>W
                <br />
                <span className="text-black">ISRAEL</span>
                <br />
                <span className="text-primary">KNO</span>W
                <br />
                <span className="text-black">TRUTH</span>
              </h1>
              
              <div className="pt-6 space-x-4">
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
              <span className="bg-primary px-2">AMIDST THE CHAOS</span>,
              <br />
              NOTHING <span className="bg-primary px-2">REALLY</span> IS
              <br />
              <span className="bg-primary px-2">CLEAR</span>, AS <span className="bg-primary px-2">ANSWERS</span>
              <br />
              <span className="bg-primary px-2">SEEM</span> <span className="bg-primary px-2">ELUSIVE</span>, AND
              <br />
              <span className="bg-primary px-2">IT ALL APPEARS AS</span>
              <br />
              IT SEEMS.
            </p>
          </div>
        </div>
        <div className="relative h-[600px] rounded-lg overflow-hidden shadow-xl">
          <img 
            src="https://media.istockphoto.com/id/1161968873/photo/tel-aviv-israel-under-an-epic-sky.jpg?s=612x612&w=0&k=20&c=01lh9quVxC64mE44YzowS-xR8RWJcqX9UBxoU0aUoXk="
            alt="Tel Aviv Skyline" 
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;