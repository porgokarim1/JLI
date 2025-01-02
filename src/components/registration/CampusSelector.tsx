import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const universities = [
  "Adelphi University",
  "American University",
  "Arizona State University",
  "Auraria Campus",
  "Binghamton University",
  "Birmingham Chabad Student Centre",
  "Bradley University",
  "Brooklyn College",
  "Brown University",
  "Colombia University",
  "Harvard University",
  "New York University",
  "Massachusetts Institute of Technology"
];

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
      <SelectContent>
        {universities.map((university) => (
          <SelectItem key={university} value={university}>
            {university}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};