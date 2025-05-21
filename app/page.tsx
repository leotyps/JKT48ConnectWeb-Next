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
          Use JKT48Connect’s API and tools to build something fun.
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

      {/* Integrated Image Slider */}
      <div className="w-full max-w-4xl mt-8">
        <div className="w-full overflow-hidden relative h-48">
          {sliderImages.map((src, index) => (
            <div 
              key={index} 
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                currentIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                
                alt={`Slide image ${index + 1}`}
                className="w-full h-full object-contain"
                src={src}
              />
            </div>
          ))}
        </div>
      </div>

      <JKT48TheaterCard />

      <JKT48News />
      <JKT48Birthday />
    </section>
  );
}
