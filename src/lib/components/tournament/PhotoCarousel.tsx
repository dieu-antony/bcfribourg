import * as React from "react";
import Image, { type StaticImageData } from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";

export interface CarouselImage {
  src: string | StaticImageData;
  alt: string;
}

export function PhotoCarousel({ images }: { images: CarouselImage[] }) {
  const autoplay = React.useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <Carousel
      className="w-full"
      plugins={[autoplay.current]}
      opts={{ loop: true, dragFree: true }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem
            key={`${image.alt}-${index}`}
            className="basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 333px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                loading={index < 3 ? "eager" : "lazy"}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}