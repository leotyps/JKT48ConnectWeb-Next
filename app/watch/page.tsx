
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
  const webSocketRef = useRef<WebSocket | null>(null);
  const showroomIntervalRef = useRef<NodeJS.Timeout>();
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  // Get member name from URL query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nameFromQuery = urlParams.get('name');
    
    if (nameFromQuery) {
      setMemberName(nameFromQuery.toLowerCase());
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
            connectIdnWebSocket(memberLive.url_key, memberLive.slug);
          } else if (memberLive.type === 'showroom') {
            startShowroomPolling(memberLive.room_id);
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
      // Cleanup connections
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
      if (showroomIntervalRef.current) {
        clearInterval(showroomIntervalRef.current);
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [memberName]);

  // Get channel ID for IDN chat
  const getChannelId = async (username: string, slug: string): Promise<string> => {
    try {
      const response = await fetch(
        `https://fskhri.online/api/chat-proxy?username=${username}&slug=${slug}`
      );
      const data = await response.json();
      if (!data.channelId) {
        throw new Error('Chat ID not found in response');
      }
      return data.channelId;
    } catch (error) {
      console.error('Failed to get channel ID:', error);
      throw error;
    }
  };

  // Connect to IDN WebSocket
  const connectIdnWebSocket = async (username: string, slug: string) => {
    try {
      // Close existing connection if any
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }

      const channelId = await getChannelId(username, slug);
      const ws = new WebSocket('wss://chat.idn.app');
      webSocketRef.current = ws;
      
      const nickname = 'user_' + Math.random().toString(36).substring(2, 8);
      let isAuthenticated = false;
      let hasJoinedChannel = false;
      
      ws.onopen = () => {
        console.log('WebSocket connected');
        setChatConnected(true);
        ws.send('NICK ' + nickname);
        ws.send('USER websocket 0 * :WebSocket User');
      };
      
      ws.onmessage = (event) => {
        const message = event.data;
        
        if (message.startsWith('PING')) {
          ws.send('PONG' + message.substring(4));
          return;
        }
        
        if (message.includes('001') && !isAuthenticated) {
          isAuthenticated = true;
          ws.send('JOIN #' + channelId);
          console.log('Authenticated and joining channel:', channelId);
          return;
        }
        
        if (message.includes('JOIN') && !hasJoinedChannel) {
          hasJoinedChannel = true;
          console.log('Successfully joined channel');
          return;
        }
        
        if (message.includes('PRIVMSG')) {
          const messageMatch = message.match(/PRIVMSG #[^ ]+ :(.*)/);
          if (messageMatch) {
            try {
              const chatData = JSON.parse(messageMatch[1]);
              if (chatData?.chat) {
                const chatMessage: ChatMessage = {
                  type: 'chat',
                  user: chatData.user,
                  message: chatData.chat.message,
                  timestamp: chatData.timestamp || Date.now()
                };
                
                setChatMessages(prev => {
                  const newMessages = [...prev, chatMessage];
                  // Keep only last 50 messages for performance
                  return newMessages.slice(-50);
                });
                scrollToBottom();
              }
            } catch (parseError) {
              console.error('Failed to parse message:', parseError);
            }
          }
        }
      };
      
      ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        setChatConnected(false);
        webSocketRef.current = null;
        
        // Reconnect after 5 seconds if not manually closed
        if (event.code !== 1000) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('Attempting to reconnect...');
            connectIdnWebSocket(username, slug);
          }, 5000);
        }
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setChatConnected(false);
      };
      
    } catch (error) {
      console.error('Failed to set up WebSocket:', error);
      setChatConnected(false);
      
      // Retry connection after 5 seconds
      reconnectTimeoutRef.current = setTimeout(() => {
        connectIdnWebSocket(username, slug);
      }, 5000);
    }
  };

  // Start Showroom polling (keep as is since Showroom doesn't have WebSocket)
  const startShowroomPolling = async (roomId: number) => {
    try {
      const pollComments = async () => {
        try {
          const response = await fetch(`/api/jkt48/chat-stream-sr?room_id=${roomId}&apikey=JKTCONNECT`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data && data.comment_log) {
            setShowroomComments(data.comment_log.slice(-50)); // Keep last 50 comments
            scrollToBottom();
          }
          
          setChatConnected(true);
        } catch (error) {
          console.error("Error polling Showroom comments:", error);
          setChatConnected(false);
        }
      };

      // Poll every 3 seconds for Showroom
      showroomIntervalRef.current = setInterval(pollComments, 3000);
      pollComments(); // Initial call
      
    } catch (error) {
      console.error("Error starting Showroom polling:", error);
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

  // Manual reconnect function
  const handleReconnect = () => {
    if (liveData?.type === 'idn') {
      connectIdnWebSocket(liveData.url_key, liveData.slug);
    }
  };

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="w-full max-w-7xl mx-auto px-4">
          <Breadcrumbs className="mb-6">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/live">Live</BreadcrumbItem>
            <BreadcrumbItem>{memberName || 'Loading...'}</BreadcrumbItem>
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
            <BreadcrumbItem>{memberName || 'Unknown'}</BreadcrumbItem>
          </Breadcrumbs>
          
          <Card className="max-w-md mx-auto">
            <CardBody className="text-center py-8">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-xl font-semibold mb-2">Stream Not Available</h3>
              <p className="text-default-500 mb-4">
                {error || `${memberName || 'Member'} is not currently streaming.`}
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
                    {!chatConnected && liveData.type === 'idn' && (
                      <Button
                        size="sm"
                        color="primary"
                        variant="light"
                        onClick={handleReconnect}
                      >
                        Reconnect
                      </Button>
                    )}
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
                          <p className="text-tiny">
                            {chatConnected ? 'Waiting for chat messages' : 'Connecting to chat...'}
                          </p>
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
