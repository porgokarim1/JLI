import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";

interface ParticipantCounterProps {
  value: number;
  onChange: (value: number) => void;
}

const ParticipantCounter = ({ value, onChange }: ParticipantCounterProps) => {
  const options = [
    { count: 1, label: "👤", sublabel: "(1)", icon: <User className="h-3 w-3" /> },
    { count: 2, label: "👥", sublabel: "(2)", icon: <Users className="h-3 w-3" /> },
    { count: 3, label: "👤👥", sublabel: "(3)", icon: <Users className="h-3 w-3" /> },
    { count: 4, label: "👥👤", sublabel: "(3+)", icon: <Users className="h-3 w-3" /> }
  ];

  return (
    <div className="flex flex-nowrap gap-0.5 overflow-x-auto">
      {options.map((option) => (
        <Button
          key={option.count}
          type="button"
          variant={value === option.count ? "default" : "outline"}
          className="flex-shrink-0 text-lg py-0.5 px-2 h-10 whitespace-nowrap"
          onClick={() => onChange(option.count)}
        >
          <span className="mr-1">{option.label}</span>
          <span className="text-xs text-gray-500">{option.sublabel}</span>
        </Button>
      ))}
    </div>
  );
};

export default ParticipantCounter;