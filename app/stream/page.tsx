"use client"

import { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Link, Skeleton, Breadcrumbs, BreadcrumbItem, Button, Chip } from "@heroui/react";

interface LiveStream {
  name: string;
  img: string;
  img_alt: string;
  url_key: string;
  room_id: number;
  started_at: string;
  is_graduate: boolean;
  is_group: boolean;
  type: "showroom" | "idn";
  streaming_url_list: Array<{
    label: string;
    quality: number;
    url: string;
  }>;
  is_premium?: boolean;
  slug?: string;
  chat_room_id?: string;
}

interface RecentLive {
  _id: string;
  data_id: string;
  idn?: {
    id: string;
    username: string;
    slug: string;
    title: string;
    image: string;
  };
  member: {
    name: string;
    nickname: string;
    img_alt: string;
    img: string;
    url: string;
    is_graduate: boolean;
    is_official: boolean;
  };
  created_at: string;
  live_info: {
    duration: number;
    viewers: {
      num: number;
      is_excitement: boolean;
    };
    date: {
      start: string;
      end: string;
    };
  };
  gift_rate: number;
  room_id: number;
  points: number;
  type: "showroom" | "idn";
  total_gift: string;
}

export default function JKT48LiveStreams() {
  const [liveData, setLiveData] = useState<LiveStream[]>([]);
  const [recentData, setRecentData] = useState<RecentLive[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiveData() {
      try {
        const jkt48Api = require('@jkt48/core');
        const apiKey = 'JKTCONNECT';
        
        // Fetch current live streams
        const live = await jkt48Api.live(apiKey);
        setLiveData(live || []);
        
        // Fetch recent live streams
        const recent = await jkt48Api.recent(apiKey);
        setRecentData(recent?.slice(0, 12) || []); // Show up to 12 recent streams
        
      } catch (error) {
        console.error("Error fetching live data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLiveData();
    
    // Refresh live data every 30 seconds
    const interval = setInterval(fetchLiveData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Format date to show relative time or specific time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  // Format duration from milliseconds to readable format
  const formatDuration = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Format viewer count
  const formatViewers = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // Get appropriate image source based on stream type
  const getLiveStreamImage = (stream: LiveStream) => {
    return stream.type === "idn" ? stream.img_alt : stream.img;
  };

  // Get appropriate image classes based on stream type
  const getLiveStreamImageClasses = (stream: LiveStream) => {
    const baseClasses = "w-full h-60 z-0";
    if (stream.type === "idn") {
      // Square format for IDN streams
      return `${baseClasses} object-cover`;
    } else {
      // Landscape format for Showroom streams
      return `${baseClasses} object-cover`;
    }
  };

  const renderLiveSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={`live-skeleton-${index}`} className="w-full">
        <Skeleton className="rounded-lg">
          <div className="h-80 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    ));
  };

  const renderRecentSkeletons = () => {
    return Array(8).fill(0).map((_, index) => (
     <Card key={`recent-skeleton-${index}`} className="w-full h-[280px] flex flex-col">
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
      </Card>
    ));
  };

  const getLiveStreamUrl = (stream: LiveStream) => {
    // Extract member name and encode it for URL
    const memberName = stream.name.split('/')[0].trim();
    const encodedName = encodeURIComponent(memberName);
    return `https://www.jkt48connect.my.id/watch?name=${encodedName}`;
  };

  const getRecentStreamUrl = (recent: RecentLive) => {
    if (recent.type === "idn" && recent.idn?.slug) {
      return `https://www.idn.app/live/${recent.idn.slug}`;
    }
    return `https://www.showroom-live.com/r/${recent.member.url}`;
  };

  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <Breadcrumbs className="mb-8">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Live Streams</BreadcrumbItem>
      </Breadcrumbs>

      {/* Current Live Streams Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-3xl font-bold text-left">Currently Live</h2>
          <Chip color="danger" variant="dot" size="sm">
            {loading ? "..." : `${liveData.length} live`}
          </Chip>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {loading ? (
            renderLiveSkeletons()
          ) : liveData.length > 0 ? (
            liveData.map((stream) => (
              <Card 
                key={`${stream.type}-${stream.room_id}`} 
                isFooterBlurred 
                className="border-none h-80 w-full" 
                radius="lg"
              >
                <div className="relative">
                  <Image
                    alt={`${stream.name} live stream`}
                    className={getLiveStreamImageClasses(stream)}
                    src={getLiveStreamImage(stream)}
                  />
                  <div className="absolute top-2 left-2 z-10">
                    <Chip 
                      color="danger" 
                      size="sm" 
                      variant="solid"
                      className="animate-pulse"
                    >
                      🔴 LIVE
                    </Chip>
                  </div>
                  <div className="absolute top-2 right-2 z-10">
                    <Chip 
                      color="default" 
                      size="sm" 
                      variant="solid"
                      className="bg-black/60 text-white"
                    >
                      {stream.type.toUpperCase()}
                    </Chip>
                  </div>
                </div>
                <CardFooter className="justify-between before:bg-black/60 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <div className="flex flex-col flex-1 mr-2">
                    <p className="text-sm font-bold text-white truncate">
                      {stream.name.split('/')[0].trim()}
                    </p>
                    <p className="text-xs text-white/80">
                      Started {formatDate(stream.started_at)}
                    </p>
                  </div>
                  <Button
                    className="text-xs"
                    color="primary"
                    radius="lg"
                    size="sm"
                    variant="solid"
                    as="a" 
                    href={getLiveStreamUrl(stream)}
                    target="_blank"
                  >
                    Watch
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg">No members currently live</p>
              <p className="text-sm text-default-500 mt-2">Check back later for live streams</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Live Streams Section */}
      <div>
        <h2 className="text-3xl font-bold mb-8 text-left">Recent Live Streams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {loading ? (
            renderRecentSkeletons()
          ) : recentData.length > 0 ? (
            recentData.map((recent) => (
              <Card key={recent._id} className="w-full">
                <CardHeader className="flex gap-3">
                  <Image
                    alt={recent.member.nickname}
                    height={40}
                    radius="sm"
                    src={recent.member.img_alt || recent.member.img}
                    width={40}
                    className="object-cover"
                  />
                  <div className="flex flex-col flex-1">
                    <p className="text-md font-semibold">
                      {recent.member.nickname}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-small text-default-500">
                        {formatDate(recent.live_info.date.end)}
                      </p>
                      <Chip size="sm" variant="flat" color="secondary">
                        {recent.type.toUpperCase()}
                      </Chip>
                    </div>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="py-3">
                  <div className="space-y-2">
                    {recent.idn?.title && (
                      <p className="font-medium text-sm line-clamp-2">
                        {recent.idn.title}
                      </p>
                    )}
                    <div className="flex justify-between text-xs text-default-500">
                      <span>👥 {formatViewers(recent.live_info.viewers.num)} viewers</span>
                      <span>⏱️ {formatDuration(recent.live_info.duration)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-success-600">💰 {recent.total_gift}</span>
                      <span className="text-warning-600">⭐ {recent.points} pts</span>
                    </div>
                  </div>
                </CardBody>
                <Divider />
                <CardFooter className="py-2">
                  <Link 
                    isExternal 
                    showAnchorIcon 
                    href={getRecentStreamUrl(recent)}
                    size="sm"
                  >
                    View Profile
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg">No recent live streams available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
