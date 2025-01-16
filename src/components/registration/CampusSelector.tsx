import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UniversitySelectItem } from "./UniversitySelectItem";
import { useUniversities } from "@/hooks/use-universities";

interface CampusSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CampusSelector = ({ value, onChange }: CampusSelectorProps) => {
  const { data: universities = [], isLoading } = useUniversities();

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-white" disabled={isLoading}>
        <SelectValue placeholder={isLoading ? "Loading universities..." : "Select your campus..."} />
      </SelectTrigger>
      <SelectContent className="bg-white border border-input shadow-md max-h-[300px]">
        {universities.map((university) => (
          <UniversitySelectItem key={university} university={university} />
        ))}
      </SelectContent>
    </Select>
  );
};