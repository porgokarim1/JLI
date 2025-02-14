import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Building2, House, Mail, Phone, UniversityIcon, User } from "lucide-react";
import { Profile } from "@/components/dashboard/types";
import PhoneInput, { isValidPhoneNumber, formatPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useUniversities } from "@/hooks/use-universities";

interface ProfileFormProps {
  profile: Profile;
  isEditing: boolean;
  formData: Partial<Profile>;
  onSave: () => Promise<void>;
  onCancel: () => void;
  onChange: (field: string, value: any) => void;
}

export const ProfileForm = ({
  profile,
  isEditing,
  formData,
  onSave,
  onCancel,
  onChange
}: ProfileFormProps) => {
  const { data: universities = [], isLoading: isLoadingUniversities } = useUniversities();
  const [phoneError, setPhoneError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && !formData.first_name) {
      onChange("first_name", profile.first_name || "");
      onChange("last_name", profile.last_name || "");
      onChange("email", profile.email || "");
      onChange("phone", profile.phone || "");
      onChange("campus", profile.campus || "");
      onChange("address", profile.address || "");
      onChange("city", profile.city || "");
      onChange("gender", profile.gender || "");
    }
  }, [isEditing]);

  const handlePhoneChange = (value: string | undefined) => {
    if (value && !isValidPhoneNumber(value)) {
      setPhoneError("Invalid phone number. Please enter a valid one.");
    } else {
      setPhoneError(null);
    }
    onChange("phone", value || "");
  };

  const handleInputChange = (field: string, value: string) => {
    onChange(field, value);
  };

  return (
    <div className="space-y-6">
      <div className="relative mb-6">
        <span className="text-xl font-bold">
          <span className="relative">
            <span className="relative z-10">PROFILE</span>
            <span className="absolute bottom-0 left-0 w-full h-[8px] bg-[#FFD700] -z-0"></span>
          </span>
        </span>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-500 mb-1 block">First Name</label>
          <div className={`flex items-center ${isEditing ? 'border rounded p-2' : 'bg-[#F1F1F1] p-2'}`}>
            <User className="h-5 w-5 text-gray-400 mr-2" />
            {isEditing ? (
              <input
                id="first_name"
                name="first_name"
                value={formData.first_name || ""}
                onChange={(e) => {
                  if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                    handleInputChange("first_name", e.target.value);
                  }
                }}
                className="w-full bg-transparent focus:outline-none"
              />
            ) : (
              <span>{profile?.first_name}</span>
            )}
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-500 mb-1 block">Last Name</label>
          <div className={`flex items-center ${isEditing ? 'border rounded p-2' : 'bg-[#F1F1F1] p-2'}`}>
            <User className="h-5 w-5 text-gray-400 mr-2" />
            {isEditing ? (
              <input
                type="text"
                className="w-full bg-transparent focus:outline-none"
                id="last_name"
                name="last_name"
                value={formData.last_name || ""}
                onChange={(e) => {
                  if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                    handleInputChange("last_name", e.target.value);
                  }
                }}
                pattern="^[a-zA-Z\s]*$"
              />
            ) : (
              <span>{profile?.last_name}</span>
            )}
          </div>
        </div>
      </div>
      <div>
        <label className="text-sm text-gray-500 mb-1 block">Email</label>
        <div className={"flex items-center bg-[#F1F1F1] p-2"}>
          <Mail className="h-5 w-5 text-gray-400 mr-2" />
          <span>{profile?.email}</span>
        </div>
      </div>
      <div>
        <label className="text-sm text-gray-500 mb-1 block">Phone Number</label>
        <div className={`flex items-center ${isEditing ? 'border rounded p-2' : 'bg-[#F1F1F1] p-2'}`}>
          <Phone className="h-5 w-5 text-gray-400 mr-2" />
          {isEditing ? (
            <div className="w-full">
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="US"
                value={formData.phone || ""}
                onChange={handlePhoneChange}
                className="bg-transparent"
              />
            </div>
          ) : (
            <span>{profile?.phone ? formatPhoneNumber(profile.phone) : ''}</span>
          )}
        </div>
      </div>
      <div>
        <label className="text-sm text-gray-500 mb-1 block">Campus</label>
        <div className={"flex items-center bg-[#F1F1F1] p-2"}>
          <UniversityIcon className="h-5 w-5 text-gray-400 mr-2" />
          <span>{profile?.campus}</span>
        </div>
      </div>
      <div><span className="text-l font-bold">Leave your address so we can send you your rewards</span></div>
      <div>
        <label className="text-sm text-gray-500 mb-1 block">Address</label>
        <div className={`flex items-center ${isEditing ? 'border rounded p-2' : 'bg-[#F1F1F1] p-2'}`}>
          <House className="h-5 w-5 text-gray-400 mr-2" />
          {isEditing ? (
            <input
              type="text"
              className="w-full bg-transparent focus:outline-none"
              id="address"
              name="address"
              value={formData.address || ""}
              onChange={(e) => {
                handleInputChange("address", e.target.value);
              }}
              pattern="^[a-zA-Z\s]*$"
            />
          ) : (
            <span>{profile?.address ? profile.address : "Your Adress"}</span>
          )}
        </div>
      </div>
      <div>
        <label className="text-sm text-gray-500 mb-1 block">City</label>
        <div className={`flex items-center ${isEditing ? 'border rounded p-2' : 'bg-[#F1F1F1] p-2'}`}>
          <Building2 className="h-5 w-5 text-gray-400 mr-2" />
          {isEditing ? (
            <input
              type="text"
              className="w-full bg-transparent focus:outline-none"
              id="city"
              name="city"
              value={formData.city || ""}
              onChange={(e) => {
                handleInputChange("city", e.target.value);
              }}
              pattern="^[a-zA-Z\s]*$"
            />
          ) : (
            <span>{profile?.city ? profile.city : "Your City"}</span>
          )}
        </div>
      </div>
      <div className="pt-4 flex justify-end">
        {isEditing ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onCancel}
              className="w-24"
            >
              Cancel
            </Button>
            <Button
              onClick={onSave}
              disabled={!!phoneError}
              className="w-24 bg-[#F4D32F] text-black hover:bg-[#F4D32F]-hover font-semibold"
            >
              Save
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};