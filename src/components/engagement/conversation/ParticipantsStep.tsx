import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { Minus, Plus, User } from "lucide-react";

interface ParticipantsStepProps {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
  participantCount: number;
  onParticipantCountChange: (count: number) => void;
}

const COLORS = [
  'text-blue-500',
  'text-green-500',
  'text-red-500',
  'text-yellow-500',
  'text-purple-500',
  'text-pink-500',
  'text-indigo-500',
  'text-orange-500'
];

const ParticipantsStep = ({ 
  form, 
  onNext, 
  onBack, 
  participantCount, 
  onParticipantCountChange 
}: ParticipantsStepProps) => {
  const handleIncrement = () => {
    onParticipantCountChange(Math.min(participantCount + 1, 32));
  };

  const handleDecrement = () => {
    onParticipantCountChange(Math.max(participantCount - 1, 1));
  };

  const getParticipantIcons = () => {
    const icons = [];
    const totalParticipants = Math.min(participantCount, 32);
    const angleStep = (2 * Math.PI) / totalParticipants;
    
    for (let i = 0; i < totalParticipants; i++) {
      const angle = i * angleStep;
      const radius = 40 + (Math.floor(i / 8) * 20);
      const x = Math.cos(angle) * radius + 64;
      const y = Math.sin(angle) * radius + 64;
      const colorIndex = i % COLORS.length;
      
      icons.push(
        <div
          key={i}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}
        >
          <User className={`h-6 w-6 ${COLORS[colorIndex]}`} />
        </div>
      );
    }
    return icons;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">How many people were involved? 👥</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleDecrement}
            disabled={participantCount <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-lg font-semibold min-w-[3ch] text-center">
            {participantCount}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleIncrement}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="relative w-[200px] h-[200px]">
            {getParticipantIcons()}
            {participantCount > 32 && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground">
                +{participantCount - 32} more
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <Button onClick={onNext}>Next Step</Button>
        <Button variant="outline" onClick={onBack}>Go Back</Button>
      </div>
    </div>
  );
};

export default ParticipantsStep;