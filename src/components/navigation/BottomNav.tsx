import { useLocation, useNavigate } from "react-router-dom";
import { Home, Users, BookOpen, MessageSquare, PieChart, User } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 md:hidden z-50">
      <div className="flex justify-around items-center">
        <button
          onClick={() => navigate("/")}
          className={`flex flex-col items-center ${
            isActive("/") ? "text-primary" : "text-gray-500"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => navigate("/engagement")}
          className={`flex flex-col items-center ${
            isActive("/engagement") ? "text-primary" : "text-gray-500"
          }`}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs">Engage</span>
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
          onClick={() => navigate("/chat")}
          className={`flex flex-col items-center ${
            isActive("/chat") ? "text-primary" : "text-gray-500"
          }`}
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs">AI Chat</span>
        </button>
        <button
          onClick={() => navigate("/overview")}
          className={`flex flex-col items-center ${
            isActive("/overview") ? "text-primary" : "text-gray-500"
          }`}
        >
          <PieChart className="h-5 w-5" />
          <span className="text-xs">Overview</span>
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