import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CampusSelector } from "./CampusSelector";

interface CampusSectionProps {
  formData: {
    campus: string;
    organization: string;
  };
  onChange: (field: string, value: string) => void;
}

export const CampusSection = ({ formData, onChange }: CampusSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="campus">Campus</Label>
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
          required
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
  );
};