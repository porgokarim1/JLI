import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PersonalInfoSection } from "../PersonalInfoSection";

const PersonalInfoStep = ({ formData, onChange, onNext }: {
  formData: any;
  onChange: (field: string, value: string) => void;
  onNext: () => void;
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate("/")}
        className="text-gray-500 border-gray-500 hover:bg-gray-100"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Main Page
      </Button>

      <PersonalInfoSection formData={formData} onChange={onChange} />

      <div className="sticky bottom-4 bg-white/70 backdrop-blur-sm py-4">
        <Button onClick={onNext} className="w-full">
          Next
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;