"use client"

import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Link, Skeleton, Breadcrumbs, BreadcrumbItem } from "@heroui/react";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  label: string;
}

export default function JKT48News() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const jkt48Api = require('@jkt48/core');
        const apiKey = 'JKTCONNECT';
        const news = await jkt48Api.news(apiKey);
        setNewsData(news.news.slice(0, 10));
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  const renderSkeletons = () => {
    return Array(10).fill(0).map((_, index) => (
      <Card key={`skeleton-${index}`} className="w-full h-[250px] flex flex-col">
        <div className="p-4 flex gap-3">
          <Skeleton className="rounded-lg">
            <div className="h-12 w-12 rounded-lg bg-default-300" />
          </Skeleton>
          <div className="space-y-2 flex-1">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-4 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 rounded-lg bg-default-200" />
            </Skeleton>
          </div>
        </div>
        <Divider />
        <div className="p-4 flex-grow space-y-3">
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-4 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-4 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-4 rounded-lg bg-default-200" />
          </Skeleton>
        </div>
        <Divider />
        <div className="p-4">
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-4 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </Card>
    ));
  };

  return (
   <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full">
      {/* Breadcrumbs */}
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>News</BreadcrumbItem>
      </Breadcrumbs>

      {/* News Content */}
      <div className="mt-8 w-full">
        <h2 className="text-2xl font-bold mb-4">Hot News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loading ? (
            renderSkeletons()
          ) : (
            newsData.map((item) => (
              <Card key={item.id} className="w-full">
                <CardHeader className="flex gap-3">
                  <Image
                    alt="JKT48 News Category"
                    height={25}
                    radius="sm"
                    src={`https://jkt48.com${item.label}`}
                    width={55}
                  />
                  <div className="flex flex-col">
                    <p className="text-md">JKT48 News</p>
                    <p className="text-small text-default-500">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>{item.title}</p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link isExternal showAnchorIcon href={`https://jkt48.com/news/detail/id/${item.id}?lang=id`}>
                    Read full news
                  </Link>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  </section>
  );
}
