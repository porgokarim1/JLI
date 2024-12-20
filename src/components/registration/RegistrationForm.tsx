import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ProgramGoalsSection } from "./ProgramGoalsSection";
import { useNavigate } from "react-router-dom";

interface RegistrationFormProps {
  formData: {
    campus: string;
    organization: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
    password: string;
    agreeToTerms: boolean;
    agreeToDisclaimer: boolean;
    rewardTier: string;
  };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const RegistrationForm = ({ formData, setFormData, onSubmit, isLoading }: RegistrationFormProps) => {
  const navigate = useNavigate();
  
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-lg text-gray-600">
          Welcome! Join us to learn about Israel through an authentic Torah perspective and gain the tools to engage in meaningful conversations.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="campus">Campus</Label>
          <Select 
            onValueChange={(value) => setFormData({...formData, campus: value})}
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
            onValueChange={(value) => setFormData({...formData, organization: value})}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              required
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              required
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            />
          </div>
        </div>

        <div>
          <Label>Gender</Label>
          <RadioGroup
            onValueChange={(value) => setFormData({...formData, gender: value})}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="undisclosed" id="undisclosed" />
              <Label htmlFor="undisclosed">Prefer not to say</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            required
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            required
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        <ProgramGoalsSection 
          value={formData.rewardTier}
          onChange={(value) => setFormData({...formData, rewardTier: value})}
        />

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              required
              onCheckedChange={(checked) => 
                setFormData({...formData, agreeToTerms: checked as boolean})
              }
            />
            <Label htmlFor="terms">I agree to the program conditions</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="disclaimer" 
              required
              onCheckedChange={(checked) => 
                setFormData({...formData, agreeToDisclaimer: checked as boolean})
              }
            />
            <Label htmlFor="disclaimer">I agree to the program disclaimer</Label>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            type="button" 
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
};