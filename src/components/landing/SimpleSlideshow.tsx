import { useEffect, useState } from "react";

const images = [
  "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/know_ThruthPNG.png",
  "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/know_warPNG.png",
  "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/knowGenocide.png",
  "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/nothingisAsitSeemsPNG.png"
];

const SimpleSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, currentIndex === images.length - 1 ? 10000 : 5000); // 10 seconds for last image, 5 seconds for others

    return () => clearInterval(interval);
  }, [currentIndex]); // Added currentIndex as dependency to update interval timing

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default SimpleSlideshow;