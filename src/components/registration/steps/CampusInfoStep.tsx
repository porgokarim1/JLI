import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CampusSelector } from "../CampusSelector";

interface CampusInfoStepProps {
  formData: {
    campus: string;
    organization: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const CampusInfoStep = ({ formData, onChange, onNext, onBack }: CampusInfoStepProps) => {
  const handleNext = () => {
    if (!formData.campus || !formData.organization) {
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Almost there! 🎓</h2>
        <p className="text-muted-foreground">Tell us about your campus</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="campus">Your Campus</Label>
          <CampusSelector
            value={formData.campus}
            onChange={(value) => onChange("campus", value)}
          />
        </div>

        <div>
          <Label htmlFor="organization">Organization</Label>
          <Select
            value={formData.organization}
            onValueChange={(value) => onChange("organization", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your organization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student-center">Student Center</SelectItem>
              <SelectItem value="mosad">Mosad</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          variant="outline"
          onClick={onBack}
          className="flex-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button 
          onClick={handleNext}
          className="flex-1"
          disabled={!formData.campus || !formData.organization}
        >
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};