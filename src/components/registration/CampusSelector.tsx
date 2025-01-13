import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { universities } from "./data/universities";

interface CampusSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CampusSelector = ({ value, onChange }: CampusSelectorProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white"
        >
          {value
            ? universities.find((university) => university === value)
            : "Select your campus..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search campus..." />
          <CommandEmpty>No campus found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto">
            {universities.map((university) => (
              <CommandItem
                key={university}
                value={university}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue)
                  setOpen(false)
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