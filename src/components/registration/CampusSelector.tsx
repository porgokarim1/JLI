import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { universities } from "./data/universities";
import { UniversitySelectItem } from "./UniversitySelectItem";

interface CampusSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CampusSelector = ({ value, onChange }: CampusSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-white">
        <SelectValue placeholder="Select your campus..." />
      </SelectTrigger>
      <SelectContent className="bg-white border border-input shadow-md">
        {universities.map((university) => (
          <UniversitySelectItem key={university} university={university} />
        ))}
      </SelectContent>
    </Select>
  );
};