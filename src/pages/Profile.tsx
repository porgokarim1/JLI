import { useEffect, useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Profile } from "@/components/dashboard/types";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { LogOut, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const fetchProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not found');

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
};

const updateProfile = async (profile: Partial<Profile>) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not found');

  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
  <div className="text-center p-8">
    <p className="text-red-500 mb-4">Something went wrong:</p>
    <pre className="text-sm mb-4">{error.message}</pre>
    <Button onClick={resetErrorBoundary}>Try again</Button>
  </div>
);

const ProfileContent = ({ profile, onSignOut }: { profile: Profile, onSignOut: () => Promise<void> }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully');
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: Error) => {
      console.error('Error updating profile:', error);
      toast.error(`Error updating profile: ${error.message}`);
    }
  });

  const handleUpdate = async () => {
    updateProfileMutation.mutate(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      {isMobile && (
        <Button
          variant="destructive"
          onClick={onSignOut}
          className="w-full mb-4 flex items-center justify-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      )}

      <Card className="border-2 border-gray-400 bg-white/80 backdrop-blur-sm mb-4">
        <CardHeader className="py-2">
          <CardTitle className="flex justify-between items-center text-lg">
            <span className="flex items-center gap-2">
              👤 Profile Information
            </span>
            <Button 
              variant={isEditing ? "destructive" : "outline"}
              onClick={() => {
                if (isEditing) {
                  setFormData({});
                }
                setIsEditing(!isEditing);
              }}
              className="transition-all hover:scale-105 text-black text-sm"
            >
              {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <ProfileForm 
            profile={profile}
            isEditing={isEditing}
            formData={formData}
            onSave={handleUpdate}
            onCancel={() => {
              setFormData({});
              setIsEditing(false);
            }}
            onChange={handleChange}
          />
        </CardContent>
      </Card>
    </>
  );
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    retry: 1,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading profile</div>;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-16 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2">
              <User className="h-6 w-6 text-gray-600" />
              <span className="text-gray-800">
                Your Profile 📝
              </span>
            </h1>
          </div>

          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
            <Suspense fallback={<LoadingSpinner />}>
              <ProfileContent profile={profile} onSignOut={handleSignOut} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;