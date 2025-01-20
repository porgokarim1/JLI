import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DashboardHeader = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [campus, setCampus] = useState<string>("");
  const [instructorFirstName, setInstructorFirstName] = useState<string>("");
  const [instructorLastName, setInstructorLastName] = useState<string>("");

  useEffect(() => {
    const getProfileAndInstructor = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast.error("User not found");
          return;
        }


        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('first_name, campus')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          toast.error('Failed to load profile');
          return;
        }

        if (profile?.first_name) {
          setFirstName(profile.first_name);
        }
        if (profile?.campus) {
          setCampus(profile.campus);

          const { data: instructor, error: instructorError } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('role', 'instructor')
            .eq('campus', profile.campus)
            .maybeSingle();

          if (instructorError) {
            console.error('Error fetching instructor:', instructorError);
            toast.error('Failed to load instructor');
            return;
          }

          if (instructor) {
            setInstructorFirstName(instructor.first_name || "");
            setInstructorLastName(instructor.last_name || "");
          }
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred');
      }
    };

    getProfileAndInstructor();
  }, []);

  return (
    <div className="flex flex-col items-start px-2">
      <h1 className="text-lg font-semibold text-slate-800">
        Welcome back{firstName ? `, ${firstName}` : ''}
      </h1>
      {instructorFirstName && instructorLastName && (
        <p className="text-sm text-slate-600">
          Instructor: Rabbi {instructorFirstName} {instructorLastName}
        </p>
      )}
    </div>
  );
};

export default DashboardHeader;
