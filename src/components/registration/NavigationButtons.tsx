import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavigationButtonsProps {
  showBack?: boolean;
  showHome?: boolean;
  nextLabel?: string;
  onNext: () => void;
  onBack?: () => void;
  isNextDisabled?: boolean;
  isLoading?: boolean;
}

export const NavigationButtons = ({
  showBack = true,
  showHome = false,
  nextLabel = "Next",
  onNext,
  onBack,
  isNextDisabled = false,
  isLoading = false,
}: NavigationButtonsProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t md:static md:bg-transparent md:border-0 md:p-0">
      <div className="flex gap-4 max-w-md mx-auto">
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
            className="flex-1"
            disabled={isLoading}
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Main Page
          </Button>
        )}

        <Button
          onClick={onNext}
          className="flex-1"
          disabled={isNextDisabled || isLoading}
        >
          {nextLabel}
          {nextLabel === "Next" ? (
            <ArrowRight className="ml-2 h-4 w-4" />
          ) : (
            <Check className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};