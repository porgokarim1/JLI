import { Check, ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CampusSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CampusSelector = ({ value, onChange }: CampusSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [campuses, setCampuses] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const { data, error } = await supabase
          .from('campuses')
          .select('name')
          .order('name');
        
        if (error) throw error;
        setCampuses(data || []);
      } catch (error) {
        console.error('Error fetching campuses:', error);
        toast.error('Failed to load campuses');
      } finally {
        setLoading(false);
      }
    };

    fetchCampuses();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white"
          disabled={loading}
        >
          {loading ? "Loading campuses..." : (value || "Select your campus...")}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search campus..." />
          <CommandEmpty>No campus found.</CommandEmpty>
          <CommandGroup>
            {campuses.map((campus) => (
              <CommandItem
                key={campus.name}
                value={campus.name}
                onSelect={(currentValue) => {
                  onChange(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === campus.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {campus.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};