import { useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import NavigationBar from "@/components/navigation/NavigationBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Profile } from "@/components/dashboard/types";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { useToast } from "@/components/ui/use-toast";import BottomNav from "@/components/navigation/BottomNav";
;


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
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({});
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();


  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
      });
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
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
        <CardHeader className="flex flex-row items-center justify-between p-4">
          <CardTitle className="text-2xl font-bold">
            {profile.first_name} {profile.last_name}
          </CardTitle>
          <Button
            variant={isEditing ? "destructive" : "outline"}
            onClick={() => {
              if (isEditing) {
                setFormData({});
              }
              setIsEditing(!isEditing);
            }}
            className={`transition-all hover:scale-105 text-black text-sm ml-4 ${!isEditing ? 'block' : 'hidden'}`} // Se oculta cuando está editando
          >
            {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
          </Button>
        </CardHeader>
        <CardContent className="pt-4">
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
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  const handleSignOut = async () => {
    console.log("Starting sign out process...");
    try {
      localStorage.clear();
      console.log("Local storage cleared");

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error during sign out:", error);
        navigate("/login");
        toast({
          title: "Sign Out Error",
          description: "There was an error signing out, but you've been logged out locally.",
          variant: "destructive",
        });
      } else {
        console.log("Sign out successful");
        toast({
          title: "Signed Out",
          description: "You have been successfully signed out.",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Unexpected error during sign out:", error);
      localStorage.clear();
      navigate("/login");
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try logging in again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <NavigationBar />
        <div className="pt-20 container mx-auto px-4">
          <LoadingSpinner />
        </div>
        {isMobile && <BottomNav />}
      </div>
    );
  }
  if (error) return <div>Error loading profile</div>;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-4">
        <div className="max-w-4xl mx-auto">
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