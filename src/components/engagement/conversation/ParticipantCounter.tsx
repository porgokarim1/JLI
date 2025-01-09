import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";

interface ParticipantCounterProps {
  value: number;
  onChange: (value: number) => void;
}

const ParticipantCounter = ({ value, onChange }: ParticipantCounterProps) => {
  const options = [
    { count: 1, label: "👤 (1)", icon: <User className="h-4 w-4" /> },
    { count: 2, label: "👥 (2)", icon: <Users className="h-4 w-4" /> },
    { count: 3, label: "👤👥 (3)", icon: <Users className="h-4 w-4" /> },
    { count: 4, label: "👥👤(3+)", icon: <Users className="h-4 w-4" /> }
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:items-center sm:justify-center">
      {options.map((option) => (
        <Button
          key={option.count}
          type="button"
          variant={value === option.count ? "default" : "outline"}
          className="w-full text-xs sm:text-sm py-1 px-2 h-auto"
          onClick={() => onChange(option.count)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default ParticipantCounter;
