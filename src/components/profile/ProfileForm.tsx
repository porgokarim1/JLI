import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Profile } from "@/components/dashboard/types";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

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
  if (!isEditing) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="text-sm text-gray-500">First Name</Label>
          <p className="text-lg">{profile.first_name}</p>
        </div>
        <div>
          <Label className="text-sm text-gray-500">Last Name</Label>
          <p className="text-lg">{profile.last_name}</p>
        </div>
        <div>
          <Label className="text-sm text-gray-500">Email</Label>
          <p className="text-lg">{profile.email}</p>
        </div>
        <div>
          <Label className="text-sm text-gray-500">Phone</Label>
          <p className="text-lg">{profile.phone}</p>
        </div>
        <div>
          <Label className="text-sm text-gray-500">Campus</Label>
          <p className="text-lg">{profile.campus}</p>
        </div>
        <div>
          <Label className="text-sm text-gray-500">Organization</Label>
          <p className="text-lg">{profile.organization}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            name="first_name"
            value={formData.first_name || ''}
            onChange={(e) => onChange('first_name', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name || ''}
            onChange={(e) => onChange('last_name', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="phone-input-container">
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="US"
              value={formData.phone || ''}
              onChange={(value) => onChange('phone', value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="campus">Campus</Label>
          <Select 
            value={formData.campus || ''}
            onValueChange={(value) => onChange("campus", value)}
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
        <div className="space-y-2">
          <Label htmlFor="organization">Organization</Label>
          <Select 
            value={formData.organization || ''}
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
      <div className="flex justify-end gap-4 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};