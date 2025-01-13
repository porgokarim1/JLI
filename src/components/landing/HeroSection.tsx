import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 min-h-[calc(100vh-64px)] flex items-center justify-center mt-16 md:mt-0">
      <div className="grid md:grid-cols-2 gap-2 items-center w-full max-w-3xl mx-auto">
        <div className="text-center space-y-2 relative z-10 bg-white/80 md:bg-transparent p-3 rounded-lg">
          <div className="space-y-2">
            <img 
              src="https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/Know%20Israel%20Logo%20Black.svg"
              alt="K'NOW ISRAEL"
              className="w-full h-auto max-w-[300px] mx-auto"
            />
            <p className="text-black text-sm md:text-base mt-4 max-w-[400px] mx-auto">
              A four-part course on confronting the pervasive lies and misinformation about Israel that Jewish students frequently face on college campuses, equipping you with practical skills and effective responses.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
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
                className="w-full sm:w-auto border-2 border-[#8E9196] text-[#8E9196] hover:bg-[#8E9196] hover:text-white"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full h-[300px] md:h-[450px] flex flex-col justify-center items-center">
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