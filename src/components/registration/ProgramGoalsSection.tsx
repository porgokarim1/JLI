import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ProgramGoalsSectionProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProgramGoalsSection = ({ value, onChange }: ProgramGoalsSectionProps) => {
  return (
    <div>
      <h3 className="font-medium mb-2">Choose your learning path</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Select how you would like to engage with our program to learn about Israel through a Torah perspective
      </p>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="space-y-3"
      >
        <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors">
          <RadioGroupItem value="basic" id="basic" className="mt-1" />
          <div>
            <Label htmlFor="basic" className="font-medium">Basic Understanding</Label>
            <p className="text-sm text-muted-foreground">
              Learn the fundamentals of Israel's significance through Torah sources and gain confidence in basic discussions
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors">
          <RadioGroupItem value="intermediate" id="intermediate" className="mt-1" />
          <div>
            <Label htmlFor="intermediate" className="font-medium">Active Engagement</Label>
            <p className="text-sm text-muted-foreground">
              Deepen your understanding with Torah perspectives on current events and develop skills for meaningful conversations
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors">
          <RadioGroupItem value="advanced" id="advanced" className="mt-1" />
          <div>
            <Label htmlFor="advanced" className="font-medium">Leadership Track</Label>
            <p className="text-sm text-muted-foreground">
              Master in-depth Torah sources about Israel, learn to address complex questions, and become a campus leader
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};