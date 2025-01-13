import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useUniversities = () => {
  return useQuery({
    queryKey: ["universities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("universities")
        .select("name")
        .eq("confirmed", true)
        .order("name");

      if (error) throw error;
      return data.map(uni => uni.name);
    }
  });
};