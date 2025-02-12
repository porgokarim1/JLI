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
import { useToast } from "@/components/ui/use-toast"; import BottomNav from "@/components/navigation/BottomNav";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";


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
  <div className="flex items-center justify-center min-h-screen">
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
      <Card className="bg-white border-none">
        <CardHeader className="flex flex-row items-center justify-between p-4 pt-0">
        </CardHeader>
        <CardContent className="p-6 pt-0">
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
          <div className="space-y-6">
            <div className="pt-4 flex justify-end">
              {!isEditing && (
                <Button
                  onClick={() => {
                    if (isEditing) {
                      setFormData({});
                    }
                    setIsEditing(!isEditing);
                  }}
                  className="w-24 bg-[#F4D32F] text-black hover:bg-[#F4D32F]-hover font-semibold"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
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
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
  });

  const [sendingEmail, setSendingEmail] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.subject.trim() || !contactForm.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Subject and message must contain at least one character.",
        variant: "destructive"
      });
      return;
    }
    setSendingEmail(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('No session found');

      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name, email')
        .eq('id', session.user.id)
        .single();

      if (!profile) throw new Error('Profile not found');

      const response = await supabase.rpc('send_email', {
        to_email: 'zlatopolsky@sinaischolars.com',
        subject: contactForm.subject,
        html_content: `<p><strong>Sender:</strong> ${profile.first_name} ${profile.last_name} (${profile.email})</p>
        <p>From: Contact Us - Student App</p>
        <p>${contactForm.message}</p>`
      });

      if (response.error) throw new Error(response.error.message);

      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
      });

      setContactForm({ subject: '', message: '' });
    } catch (error) {
      console.error('Error sending contact email:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSendingEmail(false);
    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col">
        <NavigationBar />
        <LoadingSpinner />
        {isMobile && <BottomNav />}
      </div>
    );
  }
  if (error) return <div>Error loading profile</div>;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <NavigationBar />
      <div className="container mx-auto px-4 pt-24 pb-4 bg-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
            <Suspense fallback={<LoadingSpinner />}>
              <ProfileContent profile={profile} onSignOut={handleSignOut} />
            </Suspense>
          </ErrorBoundary>
          {/* Contact Us Card */}
          <Card className="bg-white border-none">
            <CardContent className="p-4 sm:p-6">
              <div className="relative mb-6">
                <span className="text-xl font-bold">
                  <span className="relative">
                    <span className="relative z-10">CONTACT US</span>
                    <span className="absolute bottom-0 left-0 w-full h-[8px] bg-[#FFD700] -z-0"></span>
                  </span>
                </span>
              </div>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    required
                    placeholder="Subject of your message"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    placeholder="Write your message here"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="w-32 bg-[#F4D32F] text-black hover:bg-primary-hover font-semibold"
                    disabled={sendingEmail}
                  >
                    {sendingEmail ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;