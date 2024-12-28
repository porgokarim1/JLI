import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Profile } from "@/components/dashboard/types";
import PhoneInput from 'react-phone-number-input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import 'react-phone-number-input/style.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      toast.error('Error fetching profile');
      return;
    }

    setProfile(data);
    setFormData(data);
  };

  const handleUpdate = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update(formData)
      .eq('id', user.id);

    if (error) {
      toast.error('Error updating profile');
      return;
    }

    toast.success('Profile updated successfully');
    setIsEditing(false);
    fetchProfile();
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Profile Information</span>
                <Button 
                  variant={isEditing ? "destructive" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={formData.first_name || ''}
                      onChange={(e) => handleChange('first_name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={formData.last_name || ''}
                      onChange={(e) => handleChange('last_name', e.target.value)}
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
                        onChange={(value) => handleChange('phone', value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campus">Campus</Label>
                    <Select 
                      value={formData.campus || ''}
                      onValueChange={(value) => handleChange("campus", value)}
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
                      onValueChange={(value) => handleChange("organization", value)}
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
                <Button className="w-full" onClick={handleUpdate}>
                  Save Changes
                </Button>
              </>
              ) : (
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
              )}
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="about">
              <AccordionTrigger className="text-xl font-semibold">About</AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>Welcome to our learning platform! We are dedicated to providing high-quality educational content and fostering meaningful engagement within our community. Our mission is to make learning accessible, engaging, and effective for all students.</p>
                <p className="mt-4">Our platform offers:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Comprehensive lesson materials</li>
                  <li>Interactive learning experiences</li>
                  <li>Community engagement opportunities</li>
                  <li>Progress tracking and analytics</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy">
              <AccordionTrigger className="text-xl font-semibold">Privacy Policy</AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
                <h4 className="font-bold mt-4">Information We Collect</h4>
                <ul className="list-disc pl-6 mt-2">
                  <li>Personal information (name, email, phone number)</li>
                  <li>Educational progress and engagement data</li>
                  <li>Usage information and analytics</li>
                </ul>
                <h4 className="font-bold mt-4">How We Use Your Information</h4>
                <ul className="list-disc pl-6 mt-2">
                  <li>To provide and improve our educational services</li>
                  <li>To personalize your learning experience</li>
                  <li>To communicate important updates and information</li>
                </ul>
                <h4 className="font-bold mt-4">Data Protection</h4>
                <p>We implement various security measures to protect your personal information and ensure it is not accessed, disclosed, altered, or destroyed without authorization.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="terms">
              <AccordionTrigger className="text-xl font-semibold">Terms and Conditions</AccordionTrigger>
              <AccordionContent className="prose max-w-none">
                <p>By using our platform, you agree to these Terms and Conditions. Please read them carefully.</p>
                <h4 className="font-bold mt-4">User Responsibilities</h4>
                <ul className="list-disc pl-6 mt-2">
                  <li>Maintain accurate and up-to-date profile information</li>
                  <li>Respect intellectual property rights</li>
                  <li>Follow community guidelines and engagement policies</li>
                </ul>
                <h4 className="font-bold mt-4">Platform Usage</h4>
                <ul className="list-disc pl-6 mt-2">
                  <li>Access to content is for personal, non-commercial use</li>
                  <li>Sharing account credentials is prohibited</li>
                  <li>Users must not engage in disruptive behavior</li>
                </ul>
                <h4 className="font-bold mt-4">Content Guidelines</h4>
                <p>All content must be appropriate for an educational environment and respect intellectual property rights. Users are responsible for any content they share or create on the platform.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
