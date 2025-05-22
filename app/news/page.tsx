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
import News from "@/components/news";
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
      <News />
      </section>
  );
}
