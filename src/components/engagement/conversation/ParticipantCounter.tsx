import { Button } from "@/components/ui/button";

interface ParticipantCounterProps {
  value: number;
  onChange: (value: number) => void;
}

const ParticipantCounter = ({ value, onChange }: ParticipantCounterProps) => {
  const options = [
    { 
      count: 1, 
      image: "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/onePersonBlack.png", 
      sublabel: "1" 
    },
    { 
      count: 2, 
      image: "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/twoPeopleBlack.png", 
      sublabel: "2" 
    },
    { 
      count: 3, 
      image: "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/threePeopleBlack.png", 
      sublabel: "3" 
    },
    { 
      count: 4, 
      image: "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/fourPeopleBlack.png", 
      sublabel: "4+" 
    }
  ];

  const getSelectedCount = (optionCount: number, currentValue: number) => {
    if (optionCount === 4 && currentValue >= 4) return true;
    return currentValue === optionCount;
  };

  return (
    <div className="grid grid-cols-4 gap-1 w-full">
      {options.map((option) => (
        <button
          key={option.count}
          type="button"
          onClick={() => onChange(option.count)}
          className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
            getSelectedCount(option.count, value)
              ? "border-primary bg-primary/10"
              : "border-gray-200 hover:border-primary/50"
          }`}
        >
          <img 
            src={option.image} 
            alt={`${option.count} ${option.count === 1 ? 'person' : 'people'}`}
            className="h-8 w-auto object-contain"
          />
          <span className="text-xs text-muted-foreground mt-1">{option.sublabel}</span>
        </button>
      ))}
    </div>
  );
};

export default ParticipantCounter;