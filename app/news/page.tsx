
"use client"

import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import News from "@/components/news";

export default function JKT48News() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Breadcrumbs - Aligned to left */}
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>News</BreadcrumbItem>
      </Breadcrumbs>

      {/* News Component */}
      <News />
    </div>
  );
}
