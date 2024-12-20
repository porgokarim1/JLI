import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      <div>
        <Label htmlFor="campus">Campus</Label>
        <Select 
          value={formData.campus}
          onValueChange={(value) => onChange("campus", value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your campus" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nyu">New York University</SelectItem>
            <SelectItem value="columbia">Columbia University</SelectItem>
            <SelectItem value="harvard">Harvard University</SelectItem>
          </SelectContent>
        </Select>
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