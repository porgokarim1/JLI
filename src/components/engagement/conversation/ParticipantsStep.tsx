import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { Minus, Plus, User } from "lucide-react";
import { useState } from "react";

interface ParticipantsStepProps {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
  participantCount: number;
  onParticipantCountChange: (count: number) => void;
}

const ParticipantsStep = ({ form, onNext, onBack, participantCount, onParticipantCountChange }: ParticipantsStepProps) => {
  const handleIncrement = () => {
    onParticipantCountChange(participantCount + 1);
  };

  const handleDecrement = () => {
    onParticipantCountChange(Math.max(participantCount - 1, 1));
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
          <div className="relative w-32 h-32">
            {[...Array(Math.min(participantCount, 8))].map((_, index) => {
              const angle = (index * (360 / Math.min(participantCount, 8))) * (Math.PI / 180);
              const radius = 40;
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

      <div className="flex flex-col space-y-2">
        <Button onClick={onNext}>Next Step</Button>
        <Button variant="outline" onClick={onBack}>Go Back</Button>
      </div>
    </div>
  );
};

export default ParticipantsStep;