"use client"

import { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardHeader, Avatar, Button, Skeleton, Breadcrumbs, BreadcrumbItem, Chip, ScrollShadow } from "@heroui/react";

interface LiveData {
  name: string;
  img: string;
  img_alt: string;
  url_key: string;
  slug: string;
  room_id: number;
  is_graduate: boolean;
  is_group: boolean;
  chat_room_id: string;
  started_at: string;
  streaming_url_list: Array<{
    label: string;
    quality: number;
    url: string;
  }>;
  type: string;
}

interface ChatMessage {
  type: string;
  user?: {
    name: string;
    username: string;
    avatar_url: string;
    color_code?: string;
    uuid: string;
    level_tier: number;
  };
  message?: string;
  timestamp?: number;
}

interface ShowroomComment {
  ua: number;
  avatar_id: number;
  aft: number;
  avatar_url: string;
  name: string;
  created_at: number;
  comment: string;
  user_id: number;
}

export default function JKT48LivePlayer() {
  const [liveData, setLiveData] = useState<LiveData | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showroomComments, setShowroomComments] = useState<ShowroomComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [memberName, setMemberName] = useState<string>("");
  const [chatConnected, setChatConnected] = useState(false);
  const [error, setError] = useState<string>("");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatIntervalRef = useRef<NodeJS.Timeout>();

  // Get member name from URL path
  useEffect(() => {
    const path = window.location.pathname;
    const pathParts = path.split('/');
    const nameFromPath = pathParts[pathParts.length - 1];
    
    if (nameFromPath && nameFromPath !== 'live') {
      setMemberName(nameFromPath.toLowerCase());
    }
  }, []);

  // Fetch live data
  useEffect(() => {
    async function fetchLiveData() {
      if (!memberName) return;
      
      try {
        const jkt48Api = require('@jkt48/core');
        const apiKey = 'JKTCONNECT';
        const live = await jkt48Api.live(apiKey);
        
        // Find member data by name
        const memberLive = live.find((item: LiveData) => 
          item.name.toLowerCase() === memberName.toLowerCase()
        );
        
        if (memberLive) {
          setLiveData(memberLive);
          
          // Start chat stream based on type
          if (memberLive.type === 'idn') {
            startIdnChatStream(memberLive.url_key, memberLive.slug);
          } else if (memberLive.type === 'showroom') {
            startShowroomChatStream(memberLive.room_id);
          }
        } else {
          setError(`Live stream for ${memberName} not found or not currently streaming.`);
        }
      } catch (error) {
        console.error("Error fetching live data:", error);
        setError("Failed to fetch live data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchLiveData();

    return () => {
      if (chatIntervalRef.current) {
        clearInterval(chatIntervalRef.current);
      }
    };
  }, [memberName]);

  // Start IDN chat stream
  const startIdnChatStream = async (username: string, slug: string) => {
    try {
      const jkt48Api = require('@jkt48/core');
      const apiKey = 'JKTCONNECT';
      
      // Simulate WebSocket connection by polling
      const pollChat = async () => {
        try {
          const chatStream = await jkt48Api.chatStream(username, slug, apiKey);
          
          // Handle different response types
          if (typeof chatStream === 'string') {
            const lines = chatStream.split('\n').filter(line => line.trim());
            for (const line of lines) {
              try {
                const data = JSON.parse(line);
                if (data.type === 'chat' && data.message) {
                  setChatMessages(prev => [...prev.slice(-49), data]); // Keep last 50 messages
                  scrollToBottom();
                }
              } catch (e) {
                // Skip invalid JSON lines
              }
            }
          }
          
          setChatConnected(true);
        } catch (error) {
          console.error("Error polling chat:", error);
          setChatConnected(false);
        }
      };

      // Poll every 2 seconds
      chatIntervalRef.current = setInterval(pollChat, 2000);
      pollChat(); // Initial call
      
    } catch (error) {
      console.error("Error starting IDN chat stream:", error);
    }
  };

  // Start Showroom chat stream
  const startShowroomChatStream = async (roomId: number) => {
    try {
      const jkt48Api = require('@jkt48/core');
      const apiKey = 'JKTCONNECT';
      
      const pollChat = async () => {
        try {
          const chatStreamSR = await jkt48Api.chatStreamSR(roomId, apiKey);
          
          if (chatStreamSR && chatStreamSR.comment_log) {
            setShowroomComments(chatStreamSR.comment_log.slice(-50)); // Keep last 50 comments
            scrollToBottom();
          }
          
          setChatConnected(true);
        } catch (error) {
          console.error("Error polling Showroom chat:", error);
          setChatConnected(false);
        }
      };

      // Poll every 3 seconds for Showroom
      chatIntervalRef.current = setInterval(pollChat, 3000);
      pollChat(); // Initial call
      
    } catch (error) {
      console.error("Error starting Showroom chat stream:", error);
    }
  };

  // Scroll chat to bottom
  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  // Format timestamp
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format started time
  const formatStartedTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="w-full max-w-7xl mx-auto px-4">
          <Breadcrumbs className="mb-6">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/live">Live</BreadcrumbItem>
            <BreadcrumbItem>{memberName}</BreadcrumbItem>
          </Breadcrumbs>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Skeleton className="rounded-lg">
                <div className="w-full h-[400px] md:h-[500px] rounded-lg bg-default-300" />
              </Skeleton>
              <div className="mt-4">
                <Skeleton className="w-3/4 rounded-lg">
                  <div className="h-8 rounded-lg bg-default-300" />
                </Skeleton>
                <Skeleton className="w-1/2 rounded-lg mt-2">
                  <div className="h-4 rounded-lg bg-default-300" />
                </Skeleton>
              </div>
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="rounded-lg">
                <div className="w-full h-[400px] md:h-[500px] rounded-lg bg-default-300" />
              </Skeleton>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !liveData) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="w-full max-w-7xl mx-auto px-4">
          <Breadcrumbs className="mb-6">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/live">Live</BreadcrumbItem>
            <BreadcrumbItem>{memberName}</BreadcrumbItem>
          </Breadcrumbs>
          
          <Card className="max-w-md mx-auto">
            <CardBody className="text-center py-8">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-xl font-semibold mb-2">Stream Not Available</h3>
              <p className="text-default-500 mb-4">
                {error || `${memberName} is not currently streaming.`}
              </p>
              <Button 
                color="primary" 
                variant="flat"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </CardBody>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full max-w-7xl mx-auto px-4">
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/live">Live</BreadcrumbItem>
          <BreadcrumbItem>{liveData.name}</BreadcrumbItem>
        </Breadcrumbs>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardBody className="p-0">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    poster={liveData.img}
                  >
                    {liveData.streaming_url_list.map((stream, index) => (
                      <source
                        key={index}
                        src={stream.url}
                        type="application/x-mpegURL"
                      />
                    ))}
                    Your browser does not support the video tag.
                  </video>
                </div>
              </CardBody>
            </Card>

            {/* Live Info */}
            <Card className="mt-4">
              <CardBody>
                <div className="flex items-start gap-4">
                  <Avatar
                    src={liveData.img_alt || liveData.img}
                    size="lg"
                    name={liveData.name}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold">{liveData.name}</h1>
                      <Chip
                        color="danger"
                        variant="flat"
                        size="sm"
                        startContent={
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        }
                      >
                        LIVE
                      </Chip>
                      <Chip color="primary" variant="flat" size="sm">
                        {liveData.type.toUpperCase()}
                      </Chip>
                    </div>
                    <p className="text-default-500 text-sm">
                      Started at {formatStartedTime(liveData.started_at)}
                    </p>
                    <p className="text-default-500 text-sm">
                      Stream Key: {liveData.url_key}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-1">
            <Card className="h-[400px] md:h-[500px]">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-lg font-semibold">Live Chat</h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${chatConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-tiny text-default-500">
                      {chatConnected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <ScrollShadow 
                  ref={chatContainerRef}
                  className="flex-1 h-full"
                >
                  <div className="flex flex-col gap-2">
                    {liveData.type === 'idn' ? (
                      // IDN Chat Messages
                      chatMessages.length === 0 ? (
                        <div className="text-center text-default-500 py-8">
                          <p>No messages yet...</p>
                          <p className="text-tiny">Waiting for chat messages</p>
                        </div>
                      ) : (
                        chatMessages.map((msg, index) => (
                          <div key={`${msg.timestamp}-${index}`} className="flex gap-2 p-2 hover:bg-default-50 rounded-lg">
                            <Avatar
                              src={msg.user?.avatar_url}
                              size="sm"
                              name={msg.user?.name}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm font-medium truncate">
                                  {msg.user?.name}
                                </p>
                                <Chip
                                  size="sm"
                                  variant="flat"
                                  color="primary"
                                  className="text-tiny"
                                >
                                  L{msg.user?.level_tier}
                                </Chip>
                              </div>
                              <p className="text-sm text-wrap break-words">
                                {msg.message}
                              </p>
                              <p className="text-tiny text-default-400">
                                {msg.timestamp ? formatTime(msg.timestamp) : ''}
                              </p>
                            </div>
                          </div>
                        ))
                      )
                    ) : (
                      // Showroom Comments
                      showroomComments.length === 0 ? (
                        <div className="text-center text-default-500 py-8">
                          <p>No comments yet...</p>
                          <p className="text-tiny">Waiting for comments</p>
                        </div>
                      ) : (
                        showroomComments.map((comment, index) => (
                          <div key={`${comment.created_at}-${index}`} className="flex gap-2 p-2 hover:bg-default-50 rounded-lg">
                            <Avatar
                              src={comment.avatar_url}
                              size="sm"
                              name={comment.name}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm font-medium truncate">
                                  {comment.name}
                                </p>
                              </div>
                              <p className="text-sm text-wrap break-words">
                                {comment.comment}
                              </p>
                              <p className="text-tiny text-default-400">
                                {formatTime(comment.created_at * 1000)}
                              </p>
                            </div>
                          </div>
                        ))
                      )
                    )}
                  </div>
                </ScrollShadow>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
