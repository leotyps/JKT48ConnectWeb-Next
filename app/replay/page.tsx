
"use client"

import { useState, useEffect } from "react";
import { Card, CardFooter, Image, Button, Skeleton, Breadcrumbs, BreadcrumbItem, Input, Select, SelectItem } from "@heroui/react";

interface ReplayItem {
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

export default function JKT48Replay() {
  const [replayData, setReplayData] = useState<ReplayItem[]>([]);
  const [filteredReplays, setFilteredReplays] = useState<ReplayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<string>("all");
  const [selectedLiveType, setSelectedLiveType] = useState<string>("all");
  const [selectedTheaterShow, setSelectedTheaterShow] = useState<string>("all");

  useEffect(() => {
    async function fetchReplay() {
      try {
        const jkt48Api = require('@jkt48/core');
        const apiKey = 'JKTCONNECT';
        const replay = await jkt48Api.replay(apiKey);
        
        // Handle both array and object responses
        const replayList: ReplayItem[] = Array.isArray(replay) ? replay : (replay.replay || []);
        
        // Take more than 50 items (up to 100 or all available)
        const extendedReplayList = replayList.slice(0, 100);
        
        setReplayData(extendedReplayList);
        setFilteredReplays(extendedReplayList);
      } catch (error) {
        console.error("Error fetching replay:", error);
        setReplayData([]);
        setFilteredReplays([]);
      } finally {
        setLoading(false);
      }
    }

    fetchReplay();
  }, []);

  // Filter and search effect
  useEffect(() => {
    let filtered = [...replayData];

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter((replay: ReplayItem) => {
        const title = replay.title?.toLowerCase() || '';
        const channelName = replay.channelName?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();
        
        return title.includes(query) || channelName.includes(query);
      });
    }

    // Filter by channel
    if (selectedChannel !== "all") {
      if (selectedChannel === "theater") {
        filtered = filtered.filter((replay: ReplayItem) => 
          replay.channelName?.toLowerCase().includes("dexter 48")
        );
      } else if (selectedChannel === "live") {
        filtered = filtered.filter((replay: ReplayItem) => 
          replay.channelName?.toLowerCase().includes("jkt48 daily live")
        );
      }
    }

    // Filter by live type (IDN or SHOWROOM)
    if (selectedLiveType !== "all") {
      filtered = filtered.filter((replay: ReplayItem) => {
        const title = replay.title?.toLowerCase() || '';
        if (selectedLiveType === "idn") {
          return title.includes("live idn");
        } else if (selectedLiveType === "showroom") {
          return title.includes("showroom");
        }
        return false;
      });
    }

    // Filter by theater show
    if (selectedTheaterShow !== "all") {
      filtered = filtered.filter((replay: ReplayItem) => {
        const title = replay.title?.toLowerCase() || '';
        switch (selectedTheaterShow) {
          case "pajama_drive":
            return title.includes("pajama drive");
          case "aturan_anti_cinta":
            return title.includes("aturan anti cinta");
          case "cara_meminum_ramune":
            return title.includes("cara meminum ramune");
          case "tunas_dibalik_seragam":
            return title.includes("tunas dibalik seragam");
          case "ingin_bertemu":
            return title.includes("ingin bertemu");
          default:
            return false;
        }
      });
    }

    setFilteredReplays(filtered);
  }, [replayData, searchQuery, selectedChannel, selectedLiveType, selectedTheaterShow]);

  // Get channel options (Theater or Live)
  const getChannelOptions = () => {
    return [
      { key: "all", label: "All Channels" },
      { key: "theater", label: "Theater (DEXTER 48)" },
      { key: "live", label: "Live (JKT48 Daily Live)" }
    ];
  };

  // Get live type options (IDN or SHOWROOM)
  const getLiveTypeOptions = () => {
    return [
      { key: "all", label: "All Live Types" },
      { key: "idn", label: "Live IDN" },
      { key: "showroom", label: "SHOWROOM" }
    ];
  };

  // Get theater show options
  const getTheaterShowOptions = () => {
    return [
      { key: "all", label: "All Theater Shows" },
      { key: "pajama_drive", label: "Pajama Drive" },
      { key: "aturan_anti_cinta", label: "Aturan Anti Cinta" },
      { key: "cara_meminum_ramune", label: "Cara Meminum Ramune" },
      { key: "tunas_dibalik_seragam", label: "Tunas Dibalik Seragam" },
      { key: "ingin_bertemu", label: "Ingin Bertemu" }
    ];
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedChannel("all");
    setSelectedLiveType("all");
    setSelectedTheaterShow("all");
  };

  // Format views count
  const formatViews = (views: string) => {
    const viewCount = parseInt(views);
    if (viewCount >= 1000000) {
      return `${(viewCount / 1000000).toFixed(1)}M views`;
    } else if (viewCount >= 1000) {
      return `${(viewCount / 1000).toFixed(1)}K views`;
    }
    return `${viewCount} views`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get content type and member name from title
  const getContentInfo = (title: string, channelName: string) => {
    const lowerTitle = title.toLowerCase();
    
    // Check if it's a theater show
    if (channelName.toLowerCase().includes("dexter 48")) {
      if (lowerTitle.includes("pajama drive")) return { type: "Pajama Drive", member: "" };
      if (lowerTitle.includes("aturan anti cinta")) return { type: "Aturan Anti Cinta", member: "" };
      if (lowerTitle.includes("cara meminum ramune")) return { type: "Cara Meminum Ramune", member: "" };
      if (lowerTitle.includes("tunas dibalik seragam")) return { type: "Tunas Dibalik Seragam", member: "" };
      if (lowerTitle.includes("ingin bertemu")) return { type: "Ingin Bertemu", member: "" };
      if (lowerTitle.includes("school")) return { type: "JKT48 School", member: "" };
      if (lowerTitle.includes("battle")) return { type: "Battle", member: "" };
      if (lowerTitle.includes("catur asta")) return { type: "Catur Asta", member: "" };
      return { type: "Theater", member: "" };
    }
    
    // Check if it's a live stream
    if (channelName.toLowerCase().includes("jkt48 daily live")) {
      // Extract member name from title
      let memberName = "";
      if (lowerTitle.includes("live idn")) {
        const match = title.match(/Live IDN\s+([A-Za-z]+)\s+JKT48/i);
        memberName = match ? match[1] : "";
        return { type: "Live IDN", member: memberName };
      }
      if (lowerTitle.includes("showroom")) {
        const match = title.match(/Live SHOWROOM\s+([A-Za-z]+)\s+JKT48/i);
        memberName = match ? match[1] : "";
        return { type: "SHOWROOM", member: memberName };
      }
      return { type: "Live", member: "" };
    }
    
    return { type: "Video", member: "" };
  };

  const renderSkeletons = () => {
    return Array(16).fill(0).map((_, index) => (
      <Card key={`skeleton-${index}`} isFooterBlurred className="border-none" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="w-full h-[200px] rounded-lg bg-default-300" />
        </Skeleton>
        <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <div className="flex flex-col gap-1">
            <Skeleton className="w-24 rounded-lg">
              <div className="h-3 rounded-lg bg-white/20" />
            </Skeleton>
            <Skeleton className="w-16 rounded-lg">
              <div className="h-2 rounded-lg bg-white/20" />
            </Skeleton>
          </div>
          <Skeleton className="rounded-lg">
            <div className="h-6 w-16 rounded-lg bg-white/20" />
          </Skeleton>
        </CardFooter>
      </Card>
    ));
  };

  const handleWatchVideo = (videoUrl: string) => {
    window.open(videoUrl, '_blank');
  };

  // Check if any filter is active
  const hasActiveFilters = searchQuery || selectedChannel !== "all" || selectedLiveType !== "all" || selectedTheaterShow !== "all";

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>Replay</BreadcrumbItem>
        </Breadcrumbs>

        {/* Replay Content */}
        <div className="mt-8 w-full">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Live Replay & Theater Shows</h2>
              <div className="text-sm text-default-500">
                {loading ? 'Loading...' : `${filteredReplays.length} of ${replayData.length} videos`}
              </div>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col gap-3">
              <Input
                isClearable
                placeholder="Search by title, member name, or show..."
                startContent={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="w-full"
              />
              
              <div className="flex flex-col md:flex-row gap-3">
                <Select
                  placeholder="All Channels"
                  className="flex-1"
                  selectedKeys={selectedChannel !== "all" ? [selectedChannel] : []}
                  onSelectionChange={(keys) => {
                    const value = Array.from(keys)[0] as string;
                    setSelectedChannel(value || "all");
                    // Reset other filters when channel changes
                    if (value !== "all") {
                      setSelectedLiveType("all");
                      setSelectedTheaterShow("all");
                    }
                  }}
                  items={getChannelOptions()}
                >
                  {(item) => (
                    <SelectItem key={item.key}>
                      {item.label}
                    </SelectItem>
                  )}
                </Select>
                
                {/* Show Live Type filter only when Live channel is selected */}
                {(selectedChannel === "live" || selectedChannel === "all") && (
                  <Select
                    placeholder="All Live Types"
                    className="flex-1"
                    selectedKeys={selectedLiveType !== "all" ? [selectedLiveType] : []}
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as string;
                      setSelectedLiveType(value || "all");
                    }}
                    items={getLiveTypeOptions()}
                  >
                    {(item) => (
                      <SelectItem key={item.key}>
                        {item.label}
                      </SelectItem>
                    )}
                  </Select>
                )}
                
                {/* Show Theater Show filter only when Theater channel is selected */}
                {(selectedChannel === "theater" || selectedChannel === "all") && (
                  <Select
                    placeholder="All Theater Shows"
                    className="flex-1"
                    selectedKeys={selectedTheaterShow !== "all" ? [selectedTheaterShow] : []}
                    onSelectionChange={(keys) => {
                      const value = Array.from(keys)[0] as string;
                      setSelectedTheaterShow(value || "all");
                    }}
                    items={getTheaterShowOptions()}
                  >
                    {(item) => (
                      <SelectItem key={item.key}>
                        {item.label}
                      </SelectItem>
                    )}
                  </Select>
                )}
                
                {hasActiveFilters && (
                  <Button
                    variant="flat"
                    onPress={clearFilters}
                    className="min-w-fit"
                    startContent={
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    }
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {loading ? (
              renderSkeletons()
            ) : filteredReplays.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-default-500">
                  {replayData.length === 0 ? "No replay videos available" : "No videos found matching your search criteria"}
                </p>
                {hasActiveFilters && (
                  <Button
                    variant="flat"
                    onPress={clearFilters}
                    className="mt-2"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              filteredReplays.map((replay: ReplayItem) => {
                if (!replay || !replay.videoId) return null;
                
                const contentInfo = getContentInfo(replay.title, replay.channelName);
                
                return (
                  <Card 
                    key={replay.videoId} 
                    isFooterBlurred 
                    className="border-none" 
                    radius="lg"
                  >
                    <Image
                      alt={replay.title}
                      className="object-cover"
                      height={200}
                      src={replay.thumbnail}
                      width="100%"
                      fallbackSrc="https://via.placeholder.com/320x200?text=JKT48+Replay"
                    />
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                      <div className="flex flex-col gap-1 flex-1 mr-2">
                        <p className="text-tiny text-white font-semibold line-clamp-1">
                          {contentInfo.type}
                          {contentInfo.member && ` - ${contentInfo.member}`}
                        </p>
                        <p className="text-tiny text-white/80 line-clamp-1">
                          {formatViews(replay.views)} • {formatDate(replay.publishedAt)}
                        </p>
                        <p className="text-tiny text-white/60 line-clamp-1">
                          {replay.channelName}
                        </p>
                      </div>
                      <Button
                        className="text-tiny text-white bg-black/20 hover:bg-black/40"
                        color="default"
                        radius="lg"
                        size="sm"
                        variant="flat"
                        onClick={() => handleWatchVideo(replay.videoUrl)}
                        startContent={
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        }
                      >
                        Watch
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
