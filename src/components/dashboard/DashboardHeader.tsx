import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const DashboardHeader = () => {
  const [firstName, setFirstName] = useState<string>("");

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', user.id)
          .single();
        
        if (profile?.first_name) {
          setFirstName(profile.first_name);
        }
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
    <div className="container mx-auto px-4 py-1">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold text-slate-800">
          {getGreeting()}, {firstName}!
        </h1>
      </div>
    </div>
  );
};

export default DashboardHeader;