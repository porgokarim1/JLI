import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const images = [
  "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/soldier_image-PNG.png",
  "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/soldierswalkingPNG.png",
  "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/solderWithMachineGunPNG.png",
  "https://ngvjxscjejkjojvntjay.supabase.co/storage/v1/object/public/General%20images/airplanePNG.png"
];

const AutoRotatingCarousel = () => {
  const autoplayPlugin = Autoplay({
    delay: 5000,
    stopOnInteraction: false,
    stopOnMouseEnter: true
  });

  const [emblaRef] = useEmblaCarousel(
    { loop: true }, 
    [autoplayPlugin]
  );

  return (
    <Carousel className="w-full h-[400px] md:h-[600px] lg:h-[800px]">
      <CarouselContent ref={emblaRef}>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default AutoRotatingCarousel;