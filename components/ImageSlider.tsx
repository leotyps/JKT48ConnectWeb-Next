"use client"

import { useState, useEffect } from "react";
import { Image } from "@heroui/react";

const images = [
  "https://res.cloudinary.com/dlx2zm7ha/image/upload/v1737093681/mb5qsuezkp9gbfvicvig.webp",
  "https://jkt48.com/images/banner.fanclub2021-id.jpg",
  "https://jkt48.com/images/banner.home.tokopedia.jpg",
  "https://jkt48.com/images/banner.home.valkyrie48_2023.jpg?v=2",
  "https://jkt48.com/images/banner.home.jkt48v.jpg"
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
    <div className="w-full max-w-xl overflow-hidden relative h-48">
      {images.map((src, index) => (
        <div 
          key={index} 
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            currentIndex === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            isBlurred
            alt={`Slide image ${index + 1}`}
            className="w-full h-full object-contain"
            src={src}
          />
        </div>
      ))}
    </div>
  );
}
