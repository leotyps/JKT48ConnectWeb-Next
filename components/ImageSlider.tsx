"use client"

import { useState, useEffect, useRef } from "react";
import { Image } from "@heroui/react";

const images = [
  "https://res.cloudinary.com/dlx2zm7ha/image/upload/v1737093681/mb5qsuezkp9gbfvicvig.webp",
  "https://jkt48.com/images/banner.fanclub2021-id.jpg",
  "https://jkt48.com/images/banner.home.tokopedia.jpg",
  "https://jkt48.com/images/banner.home.valkyrie48_2023.jpg?v=2",
  "https://jkt48.com/images/banner.home.jkt48v.jpg"
];

export default function ImageSlider() {
  const [position, setPosition] = useState(0);
  const sliderRef = useRef(null);
  
  useEffect(() => {
    const speed = 1; // Adjust speed (pixels per frame)
    let animationId: number | undefined;
    
    const animate = () => {
      setPosition(prevPosition => {
        const newPosition = prevPosition + speed;
        
        // Reset position when all images have passed
        if (newPosition >= images.length * 100) {
          return 0;
        }
        return newPosition;
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className="w-full max-w-xl overflow-hidden relative h-36">
      <div 
        ref={sliderRef}
        className="flex h-full"
        style={{ 
          transform: `translateX(-${position % (images.length * 100) / images.length}%)`,
          transition: position === 0 ? 'none' : 'transform 100ms linear'
        }}
      >
        {/* Duplicate images to create continuous effect */}
        {[...images, ...images].map((src, index) => (
          <div key={index} className="min-w-full h-full flex-shrink-0">
            <Image
              isBlurred
              alt={`Slide image ${index % images.length + 1}`}
              className="w-full h-full object-cover"
              src={src}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
