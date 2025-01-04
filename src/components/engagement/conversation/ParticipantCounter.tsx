import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, User } from "lucide-react";

interface ParticipantCounterProps {
  value: number;
  onChange: (value: number) => void;
}

const ParticipantCounter = ({ value, onChange }: ParticipantCounterProps) => {
  const handleIncrement = () => {
    onChange(Math.min(value + 1, 10));
  };

  const handleDecrement = () => {
    onChange(Math.max(value - 1, 1));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={value <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-lg font-semibold min-w-[3ch] text-center">
          {value}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          disabled={value >= 10}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          {[...Array(value)].map((_, index) => {
            const angle = (index * (360 / value)) * (Math.PI / 180);
            const radius = 40; // Adjust this value to change the circle size
            const x = Math.cos(angle) * radius + 64;
            const y = Math.sin(angle) * radius + 64;
            
            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                }}
              >
                <User className="h-6 w-6" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ParticipantCounter;