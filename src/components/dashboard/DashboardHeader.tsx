import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DashboardHeader = () => {
  const [firstName, setFirstName] = useState<string>("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast.error("User not found");
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching profile:', error);
          toast.error('Failed to load profile');
          return;
        }
        
        if (profile?.first_name) {
          setFirstName(profile.first_name);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred');
      }
    };

    getProfile();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="flex items-start">
      <h1 className="text-2xl font-bold text-slate-800">
        {getGreeting()}{firstName ? `, ${firstName}` : ''}!
      </h1>
    </div>
  );
};

export default DashboardHeader;