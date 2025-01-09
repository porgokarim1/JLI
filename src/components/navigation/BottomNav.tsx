import { BookOpen, Users, User, LayoutDashboard } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 md:hidden">
      <div className="flex justify-around items-center">
        <button
          onClick={() => navigate("/")}
          className={`flex flex-col items-center ${
            isActive("/") ? "text-primary" : "text-gray-500"
          }`}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => navigate("/lessons")}
          className={`flex flex-col items-center ${
            isActive("/lessons") ? "text-primary" : "text-gray-500"
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-xs">Lessons</span>
        </button>
        <button
          onClick={() => navigate("/engagement")}
          className={`flex flex-col items-center ${
            isActive("/engagement") ? "text-primary" : "text-gray-500"
          }`}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs">Engagement</span>
        </button>
        <button
          onClick={() => navigate("/profile")}
          className={`flex flex-col items-center ${
            isActive("/profile") ? "text-primary" : "text-gray-500"
          }`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;