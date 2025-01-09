import { BookOpen, Users, User, LayoutDashboard } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => navigate("/")}
          className={`flex flex-col items-center space-y-1 flex-1 py-2 ${
            isActive("/") ? "text-primary" : "text-gray-500"
          }`}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => navigate("/lessons")}
          className={`flex flex-col items-center space-y-1 flex-1 py-2 ${
            isActive("/lessons") ? "text-primary" : "text-gray-500"
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-xs">Lessons</span>
        </button>
        <button
          onClick={() => navigate("/engagement")}
          className={`flex flex-col items-center space-y-1 flex-1 py-2 ${
            isActive("/engagement") ? "text-primary" : "text-gray-500"
          }`}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs">Engage+</span>
        </button>
        <button
          onClick={() => navigate("/profile")}
          className={`flex flex-col items-center space-y-1 flex-1 py-2 ${
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