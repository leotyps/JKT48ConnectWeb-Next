"use client"

import { useState, useEffect } from "react";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { Image } from "@heroui/react";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import JKT48News from "@/components/JKT48News";
import JKT48Birthday from "@/components/JKT48Birthday";
import JKT48TheaterCard from "@/components/JKT48TheaterCard";
import JKT48Theater from "@/components/JKT48Theater";
import JKT48Youtube from "@/components/JKT48Youtube";

const sliderImages = [
  "https://res.cloudinary.com/dlx2zm7ha/image/upload/v1737093681/mb5qsuezkp9gbfvicvig.webp",
  "https://jkt48.com/images/banner.fanclub2021-id.jpg",
  "https://jkt48.com/images/banner.home.tokopedia.jpg",
  "https://jkt48.com/images/banner.home.valkyrie48_2023.jpg?v=2",
  "https://jkt48.com/images/banner.home.jkt48v.jpg"
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Power up your&nbsp;</span>
        <span className={title({ color: "violet" })}>JKT48&nbsp;</span>
        <br />
        <span className={title()}>
          project with easy API access and cool dev tools.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Use JKT48Connect's API and tools to build something fun.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Read Docs
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      {/* Image Slider with Glow Gradient Effect */}
      <div className="w-full max-w-4xl mt-8 relative">
        {/* Animated Background Gradient */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-lg blur-xl opacity-30 animate-pulse"></div>
        
        {/* Main Container */}
        <div className="relative bg-black/20 backdrop-blur-sm rounded-lg p-1 border border-white/10">
          {/* Slider Container */}
          <div className="w-full overflow-hidden relative h-48 rounded-lg">
            {/* Inner Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-violet-500/20 via-transparent to-pink-500/20 z-10 rounded-lg"></div>
            
            {sliderImages.map((src, index) => (
              <div 
                key={index} 
                className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out ${
                  currentIndex === index 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-105"
                }`}
              >
                <Image
                  alt={`Slide image ${index + 1}`}
                  className="w-full h-full object-contain rounded-lg"
                  src={src}
                />
              </div>
            ))}
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-500/5 to-pink-500/10 rounded-lg"></div>
          </div>
          
          {/* Bottom Glow Line */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-violet-400 to-transparent blur-sm"></div>
        </div>

        {/* Floating Particles Effect */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-8 right-6 w-1 h-1 bg-violet-400 rounded-full animate-pulse opacity-80"></div>
        <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce opacity-70"></div>
        <div className="absolute bottom-4 right-4 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-50"></div>
      </div>

      <JKT48TheaterCard />

      <JKT48News />
      <JKT48Birthday />
      <JKT48Theater />
      <JKT48Youtube />

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
