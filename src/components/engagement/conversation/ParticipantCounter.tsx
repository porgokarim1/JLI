import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";

interface ParticipantCounterProps {
  value: number;
  onChange: (value: number) => void;
}

const ParticipantCounter = ({ value, onChange }: ParticipantCounterProps) => {
  const options = [
    { count: 1, label: "👤", sublabel: "(1)", icon: <User className="h-2 w-2" /> },
    { count: 2, label: "👥", sublabel: "(2)", icon: <Users className="h-2 w-2" /> },
    { count: 3, label: "👤👥", sublabel: "(3)", icon: <Users className="h-2 w-2" /> },
    { count: 4, label: "👥👤", sublabel: "(3+)", icon: <Users className="h-2 w-2" /> }
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {options.map((option) => (
        <Button
          key={option.count}
          type="button"
          variant={value === option.count ? "default" : "outline"}
          className="flex-1 text-xl py-0.5 px-1 h-12"
          onClick={() => onChange(option.count)}
        >
          <div className="flex items-center justify-center h-full">
            <span className="inline-flex items-center">
              {option.label}
              <span className="text-xs text-muted-foreground">{option.sublabel}</span>
            </span>
          </div>
        </Button>
      ))}
    </div>
  );
};

export default ParticipantCounter;
