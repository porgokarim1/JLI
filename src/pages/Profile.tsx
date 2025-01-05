import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Profile } from "@/components/dashboard/types";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { AboutSection } from "@/components/profile/AboutSection";
import { Sparkles, User } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({});

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      fetchProfile();
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('User not found');
        navigate("/login");
        return;
      }

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
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while fetching profile');
    }
  };

  const handleUpdate = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('User not found');
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          id: user.id,
          ...formData
        })
        .eq('id', user.id);

      if (error) {
        toast.error('Error updating profile');
        return;
      }

      toast.success('Profile updated successfully 🎉');
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while updating profile');
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
              <User className="h-8 w-8 text-primary" />
              <span className="bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
                Your Profile
              </span>
              <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
            </h1>
            <p className="text-gray-600">Manage your personal information and preferences ✨</p>
          </div>

          <Card className="border-primary/20 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  Profile Information
                </span>
                <Button 
                  variant={isEditing ? "destructive" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                  className="transition-all hover:scale-105"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileForm 
                profile={profile}
                isEditing={isEditing}
                formData={formData}
                onSave={handleUpdate}
                onCancel={() => setIsEditing(false)}
                onChange={handleChange}
              />
            </CardContent>
          </Card>

          <AboutSection />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;