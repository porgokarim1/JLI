import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    campus: "",
    organization: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    password: "",
    agreeToTerms: false,
    agreeToDisclaimer: false,
    rewardTier: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms || !formData.agreeToDisclaimer) {
      toast.error("Sorry, you can't register without accepting the terms and disclaimer");
      return;
    }

    setIsLoading(true);

    try {
      // Register the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            campus: formData.campus,
            organization: formData.organization,
            gender: formData.gender,
            phone: formData.phone,
            reward_tier: formData.rewardTier
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        toast.success(`${formData.firstName}, welcome to the Know Israel Program!`);
        navigate("/");
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-lg text-gray-600">
                  Hi There! Thank you for your interest in participating in the Know Israel program. Let's get to know you a bit.
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

                  <div>
                    <h3 className="font-medium mb-2">Choose your program goals</h3>
                    <RadioGroup
                      onValueChange={(value) => setFormData({...formData, rewardTier: value})}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tier1" id="tier1" />
                        <Label htmlFor="tier1">Basic Engagement (3 conversations)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tier2" id="tier2" />
                        <Label htmlFor="tier2">Active Engagement (7 conversations)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tier3" id="tier3" />
                        <Label htmlFor="tier3">Advanced Engagement (15 conversations)</Label>
                      </div>
                    </RadioGroup>
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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
