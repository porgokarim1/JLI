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

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          toast.error("Failed to load profile");
          return;
        }

        if (profile?.first_name) {
          setFirstName(profile.first_name);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred");
      }
    };

    getProfile();
  }, []);

  return (
    <div className="flex flex-col items-start px-2 pt-0 md:pt-16">
      <h1 className="text-lg font-semibold text-slate-800">
        Welcome back{firstName ? `, ${firstName}` : ""}
      </h1>
    </div>
  );
};

export default DashboardHeader;