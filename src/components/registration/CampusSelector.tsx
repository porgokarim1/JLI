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
        setLoading(true);
        const { data, error } = await supabase
          .from('campuses')
          .select('name')
          .order('name');
        
        if (error) {
          throw error;
        }

        // Ensure we're setting a valid array
        setCampuses(Array.isArray(data) ? data : []);
        
      } catch (error) {
        console.error('Error fetching campuses:', error);
        toast.error('Failed to load campuses');
        setCampuses([]); // Ensure we set an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchCampuses();
  }, []);

  // Early return for loading state
  if (loading) {
    return (
      <Button
        variant="outline"
        role="combobox"
        disabled
        className="w-full justify-between bg-white"
      >
        <span className="text-muted-foreground">Loading campuses...</span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white"
        >
          {value ? (
            value
          ) : (
            <span className="text-muted-foreground">Select your campus...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search campus..." />
          <CommandEmpty>No campus found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
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