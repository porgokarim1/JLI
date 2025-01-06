import { SelectItem } from "@/components/ui/select";

interface UniversitySelectItemProps {
  university: string;
}

export const UniversitySelectItem = ({ university }: UniversitySelectItemProps) => {
  return (
    <SelectItem key={university} value={university}>
      {university}
    </SelectItem>
  );
};