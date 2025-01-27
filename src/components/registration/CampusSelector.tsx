import Select from "react-select";
import { useUniversities } from "@/hooks/use-universities";

interface CampusSelectorProps {
  value: { value: string; label: string } | null;
  onChange: (value: { value: string; label: string } | null) => void;
}

export const CampusSelector = ({ value, onChange }: CampusSelectorProps) => {
  const { data: universities = [], isLoading } = useUniversities();


  const options = universities.map((university) => ({
    value: university,
    label: university,
  }));

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isSearchable={true}
      isLoading={isLoading}
    />
  );
};