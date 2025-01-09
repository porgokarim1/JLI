import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";

interface ParticipantCounterProps {
  value: number;
  onChange: (value: number) => void;
}

const ParticipantCounter = ({ value, onChange }: ParticipantCounterProps) => {
  const options = [
    { count: 1, label: "👤 (1)", icon: <User className="h-4 w-4" /> },
    { count: 2, label: "👥 (2 peers)", icon: <Users className="h-4 w-4" /> },
    { count: 3, label: "👤👥 (3 peers)", icon: <Users className="h-4 w-4" /> },
    { count: 4, label: "👥👤+ (3+ peers)", icon: <Users className="h-4 w-4" /> }
  ];

  return (
    <div className="flex items-center justify-center gap-2">
      {options.map((option) => (
        <Button
          key={option.count}
          type="button"
          variant={value === option.count ? "default" : "outline"}
          className="flex-1"
          onClick={() => onChange(option.count)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default ParticipantCounter;