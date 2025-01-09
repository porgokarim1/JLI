import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Handshake,
  Home,
  Menu,
  PieChart,
  User,
  X,
} from "lucide-react";
import MobileMenu from "./MobileMenu";

interface NavigationBarProps {
  isAuthenticated?: boolean;
}

const NavigationBar = ({ isAuthenticated }: NavigationBarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              src="https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/lesson_images/logo.png?t=2025-01-02T06%3A41%3A20.422Z"
              alt="Logo"
              className="h-8 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {isAuthenticated && (
            <div className="hidden md:flex md:items-center md:space-x-2 ml-auto">
              <Button
                variant="ghost"
                className="flex items-center gap-1 px-3"
                onClick={() => navigate("/")}
              >
                <Home className="h-5 w-5" />
                Home
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-1 px-3"
                onClick={() => navigate("/engagement")}
              >
                <Handshake className="h-5 w-5" />
                Engagement
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-1 px-3"
                onClick={() => navigate("/lessons")}
              >
                <BookOpen className="h-5 w-5" />
                Lessons
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-1 px-3"
                onClick={() => navigate("/about")}
              >
                <PieChart className="h-5 w-5" />
                About
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-1 px-3"
                onClick={() => navigate("/profile")}
              >
                <User className="h-5 w-5" />
                Profile
              </Button>
            </div>
          )}
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} isAuthenticated={isAuthenticated} />
    </nav>
  );
};

export default NavigationBar;