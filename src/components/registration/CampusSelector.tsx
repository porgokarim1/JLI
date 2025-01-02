import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
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

const universities = [
  "Adelphi University",
  "American University",
  "Arizona State University",
  "Auraria Campus",
  "Binghamton University",
  "Birmingham Chabad Student Centre",
  "Bradley University",
  "Brooklyn College",
  "Brown University",
  "Colombia University",
  "Harvard University",
  "New York University",
  "Massachusetts Institute of Technology"
];

interface CampusSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CampusSelector = ({ value, onChange }: CampusSelectorProps) => {
  const [open, setOpen] = useState(false);

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
            universities.find((uni) => uni === value) || value
          ) : (
            <span className="text-muted-foreground">Select your campus...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search campus..." />
          <CommandEmpty>No campus found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {universities.map((university) => (
              <CommandItem
                key={university}
                value={university}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === university ? "opacity-100" : "opacity-0"
                  )}
                />
                {university}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};