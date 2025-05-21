"use client"

import { useState, useEffect } from "react";
import { Image } from "@heroui/react";

const images = [
  "https://placehold.co/600x400/purple/white?text=JKT48+Image+1",
  "https://placehold.co/600x400/indigo/white?text=JKT48+Image+2",
  "https://placehold.co/600x400/violet/white?text=JKT48+Image+3",
  "https://placehold.co/600x400/fuchsia/white?text=JKT48+Image+4",
  "https://placehold.co/600x400/pink/white?text=JKT48+Image+5"
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl overflow-hidden relative h-[400px]">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <div key={index} className="min-w-full h-full flex-shrink-0">
            <Image
              isBlurred
              isZoomed
              alt={`Slide image ${index + 1}`}
              className="w-full h-full object-cover"
              src={src}
              radius="lg"
            />
          </div>
        ))}
      </div>
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
