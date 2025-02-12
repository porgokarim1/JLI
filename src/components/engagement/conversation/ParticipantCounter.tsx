import { ChevronUp, ChevronDown } from "lucide-react";

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
    }
  ];


  const increase = () => {
    if (value >= 4 && value < 20) onChange(value + 1);
  };


  const decrease = () => {
    if (value > 4) onChange(value - 1);
  };


  const handleFourClick = () => {
    if (value < 4) {
      onChange(4); 
    }
  };

  return (
    <div className="grid grid-cols-4 gap-1 w-full">
      {options.map((option) => (
        <button
          key={option.count}
          type="button"
          onClick={() => onChange(option.count)}
          className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
            value === option.count
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


      <div
        className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all cursor-pointer ${
          value >= 4 ? "border-primary bg-primary/10" : "border-gray-200 hover:border-primary/50"
        }`}
        onClick={handleFourClick} 
      >
        <img 
          src="https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/fourPeopleBlack.png" 
          alt="4+ people"
          className="h-8 w-auto object-contain"
        />
        

        {value >= 4 && (
          <div className="flex items-center mt-1 relative">

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); 
                increase();
              }}
              className="absolute top-[-12px] right-[-25px] p-1 text-gray-600 hover:text-black"
            >
              <ChevronUp size={14} />
            </button>


            <span className="text-xs font-medium">{value}</span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                decrease();
              }}
              className="absolute bottom-[-12px] right-[-25px] p-1 text-gray-600 hover:text-black"
            >
              <ChevronDown size={14} />
            </button>
          </div>
        )}
        {value < 4 && <span className="text-xs text-muted-foreground mt-1">4+</span>}
      </div>
    </div>
  );
};

export default ParticipantCounter;