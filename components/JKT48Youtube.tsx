
"use client"

import { useState, useEffect } from "react";
import { Card, CardHeader, CardFooter, Image, Button, Skeleton } from "@heroui/react";

interface YouTubeItem {
  videoId: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  publishedAt: string;
  channelId: string;
  views: string;
  channelName: string;
  channelImage: string;
}

export default function JKT48YouTube() {
  const [youtubeData, setYoutubeData] = useState<YouTubeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchYouTubeVideos() {
      try {
        const jkt48Api = require('@jkt48/core');
        const apiKey = 'JKTCONNECT';
        const youtube = await jkt48Api.youtube(apiKey);
        setYoutubeData(youtube.slice(0, 6));
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchYouTubeVideos();
  }, []);

  const formatViews = (views: string) => {
    const viewCount = parseInt(views, 10);
    if (isNaN(viewCount) || viewCount === 0) return "N/A";
    if (viewCount >= 1000000) {
      return `${(viewCount / 1000000).toFixed(1)}M views`;
    } else if (viewCount >= 1000) {
      return `${(viewCount / 1000).toFixed(1)}K views`;
    }
    return `${viewCount} views`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <Card key={`skeleton-${index}`} isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-6 md:col-span-4">
        <div className="absolute z-10 top-1 flex-col items-start p-4">
          <Skeleton className="w-2/5 rounded-lg mb-2">
            <div className="h-4 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-5 rounded-lg bg-default-200" />
          </Skeleton>
        </div>
        <Skeleton className="w-full h-full rounded-none">
          <div className="w-full h-full bg-default-300" />
        </Skeleton>
        <div className="absolute bg-black/40 bottom-0 z-10 w-full p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Skeleton className="rounded-full">
                <div className="w-10 h-10 rounded-full bg-default-200" />
              </Skeleton>
              <div className="flex flex-col">
                <Skeleton className="w-20 rounded-lg mb-1">
                  <div className="h-3 rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-16 rounded-lg">
                  <div className="h-3 rounded-lg bg-default-200" />
                </Skeleton>
              </div>
            </div>
            <Skeleton className="rounded-full">
              <div className="w-20 h-8 rounded-full bg-default-200" />
            </Skeleton>
          </div>
        </div>
      </Card>
    ));
  };

  return (
    <div className="mt-12 w-full">
      <h2 className="text-2xl font-bold mb-4">JKT48 YouTube Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          renderSkeletons()
        ) : (
          youtubeData.map((item) => (
            <Card key={item.videoId || item.title} isFooterBlurred className="w-full h-[300px]">
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">{formatDate(item.publishedAt)}</p>
                <h4 className="text-white/90 font-medium text-lg line-clamp-2">{item.title}</h4>
              </CardHeader>
              <Image
                removeWrapper
                alt={item.title}
                className="z-0 w-full h-full object-cover"
                src={item.thumbnail}
              />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                  <Image
                    alt={item.channelName}
                    className="rounded-full w-10 h-10 bg-black"
                    src={item.channelImage}
                  />
                  <div className="flex flex-col">
                    <p className="text-tiny text-white/60">{item.channelName}</p>
                    <p className="text-tiny text-white/60">{formatViews(item.views)}</p>
                  </div>
                </div>
                <Button 
                  as="a" 
                  href={item.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  radius="full" 
                  size="sm"
                >
                  Watch
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
