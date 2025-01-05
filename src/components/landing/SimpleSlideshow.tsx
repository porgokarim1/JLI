import { useEffect, useState } from "react";

const images = [
  "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/soldier_image-PNG.png",
  "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/soldierswalkingPNG.png",
  "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/solderWithMachineGunPNG.png",
  "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/airplanePNG.png"
];

const SimpleSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default SimpleSlideshow;