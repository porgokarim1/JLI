import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, CheckCircle2, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavigationButtonsProps {
  showBack: boolean;
  showHome?: boolean;
  onNext: () => void;
  onBack?: () => void;
  isNextDisabled?: boolean;
  isLoading?: boolean;
  homeButtonClassName?: string;
}

export const NavigationButtons = ({
  showBack,
  showHome,
  onNext,
  onBack,
  isNextDisabled,
  isLoading,
  homeButtonClassName
}: NavigationButtonsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex justify-center space-x-2 mb-4">
        <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
        <Circle className="w-5 h-5 text-muted" />
        <Circle className="w-5 h-5 text-muted" />
        <Circle className="w-5 h-5 text-muted" />
      </div>

      <div className="flex justify-between gap-2">
        {showBack && (
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        {showHome && (
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className={`flex-1 ${homeButtonClassName}`}
            disabled={isLoading}
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Main Page
          </Button>
        )}
        <Button
          onClick={onNext}
          className="flex-1"
          disabled={isLoading || isNextDisabled}
        >
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};