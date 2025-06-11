// Use client
"use client"

import { useState, useEffect, useRef } from "react";
import { Card, CardBody, CardHeader, Avatar, Button, Skeleton, Breadcrumbs, BreadcrumbItem, Chip, ScrollShadow, Divider } from "@heroui/react";
import Plyr from "plyr-react";

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

  const plyrRef = useRef<APITypes>(null); // Ref for Plyr instance
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const webSocketRef = useRef<WebSocket | null>(null);
  const showroomIntervalRef = useRef<NodeJS.Timeout>();
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nameFromQuery = urlParams.get('name');
    
    if (nameFromQuery) {
      setMemberName(nameFromQuery.toLowerCase());
    }
  }, []);

  const handleVideoLoad = () => {
    if (plyrRef.current) {
      const player = plyrRef.current.plyr;
      const video = player.media;
      const aspectRatio = video.videoWidth / video.videoHeight;
      
      if (aspectRatio > 1.2) {
        setVideoAspectRatio('landscape');
      } else if (aspectRatio < 0.8) {
        setVideoAspectRatio('portrait');
      } else {
        setVideoAspectRatio('square');
      }
    }
  };

  useEffect(() => {
    async function fetchLiveData() {
      if (!memberName) return;
      
      try {
        const jkt48Api = require('@jkt48/core');
        const apiKey = 'JKTCONNECT';
        const live = await jkt48Api.live(apiKey);
        
        const memberLive = live.find((item: LiveData) => 
          item.name.toLowerCase() === memberName.toLowerCase()
        );
        
        if (memberLive) {
          setLiveData(memberLive);
          
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

  const getChannelId = async (username: string, slug: string): Promise<string> => {
    try {
      const response = await fetch(`https://fskhri.online/api/chat-proxy?username=${username}&slug=${slug}`);
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

  const connectIdnWebSocket = async (username: string, slug: string) => {
    try {
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
      
      reconnectTimeoutRef.current = setTimeout(() => {
        connectIdnWebSocket(username, slug);
      }, 5000);
    }
  };

  const startShowroomPolling = async (roomId: number) => {
    try {
      const pollComments = async () => {
        try {
          const response = await fetch(`https://v2.jkt48connect.my.id/api/jkt48/chat-stream-sr?room_id=${roomId}&apikey=JKTCONNECT`);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data && data.comment_log) {
            setShowroomComments(data.comment_log.slice(-50));
            scrollToBottom();
          }
          
          setChatConnected(true);
        } catch (error) {
          console.error("Error polling Showroom comments:", error);
          setChatConnected(false);
        }
      };

      showroomIntervalRef.current = setInterval(pollComments, 3000);
      pollComments();
      
    } catch (error) {
      console.error("Error starting Showroom polling:", error);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  const handleReconnect = () => {
    if (liveData?.type === 'idn') {
      connectIdnWebSocket(liveData.url_key, liveData.slug);
    }
  };

  const getVideoContainerStyle = () => {
    switch (videoAspectRatio) {
      case 'portrait':
        return { paddingBottom: '177.78%' };
      case 'square':
        return { paddingBottom: '100%' };
      default:
        return { paddingBottom: '56.25%' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <Breadcrumbs className="mb-6">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/live">Live</BreadcrumbItem>
            <BreadcrumbItem>{memberName || 'Loading...'}</BreadcrumbItem>
          </Breadcrumbs>
          
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3">
              <Card className="shadow-lg">
                <CardBody className="p-0">
                  <Skeleton className="rounded-lg">
                    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg bg-default-300" />
                  </Skeleton>
                </CardBody>
              </Card>
              
              <Card className="mt-4 shadow-lg">
                <CardBody>
                  <div className="flex items-start gap-4">
                    <Skeleton className="rounded-full">
                      <div className="w-16 h-16 rounded-full bg-default-300" />
                    </Skeleton>
                    <div className="flex-1 space-y-2">
                      <Skeleton className="w-3/4 rounded-lg">
                        <div className="h-8 rounded-lg bg-default-300" />
                      </Skeleton>
                      <Skeleton className="w-1/2 rounded-lg">
                        <div className="h-4 rounded-lg bg-default-300" />
                      </Skeleton>
                      <Skeleton className="w-2/3 rounded-lg">
                        <div className="h-4 rounded-lg bg-default-300" />
                      </Skeleton>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            
            <div className="xl:col-span-1">
              <Card className="h-[600px] shadow-lg">
                <CardHeader>
                  <Skeleton className="w-24 rounded-lg">
                    <div className="h-6 rounded-lg bg-default-300" />
                  </Skeleton>
                </CardHeader>
                <CardBody>
                  <Skeleton className="w-full h-full rounded-lg">
                    <div className="w-full h-full rounded-lg bg-default-300" />
                  </Skeleton>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !liveData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumbs className="mb-6">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/live">Live</BreadcrumbItem>
            <BreadcrumbItem>{memberName || 'Unknown'}</BreadcrumbItem>
          </Breadcrumbs>
          
          <Card className="max-w-md mx-auto shadow-xl border-0">
            <CardBody className="text-center py-12">
              <div className="text-8xl mb-6 opacity-50">😔</div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">Stream Not Available</h3>
              <p className="text-default-500 mb-6 leading-relaxed">
                {error || `${memberName || 'Member'} is not currently streaming.`}
              </p>
              <Button 
                color="primary" 
                size="lg"
                className="font-semibold"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/live">Live</BreadcrumbItem>
          <BreadcrumbItem className="font-semibold">{liveData.name}</BreadcrumbItem>
        </Breadcrumbs>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-4">
            <Card className="overflow-hidden shadow-lg border-0">
              <CardBody className="p-0">
                <div className="relative w-full bg-black flex items-center justify-center" 
                     style={getVideoContainerStyle()}>
                  <Plyr
                    ref={plyrRef}
                    source={{
                      type: 'video',
                      sources: liveData.streaming_url_list.map(stream => ({
                        src: stream.url,
                        type: 'application/x-mpegURL',
                      })),
                    }}
                    options={{
                      controls: [
                        'play-large',
                        'play',
                        'progress',
                        'current-time',
                        'mute',
                        'volume',
                        'captions',
                        'settings',
                        'fullscreen',
                      ],
                      tooltips: { controls: true },
                    }}
                  />
                </div>
              </CardBody>
            </Card>

            <Card className="shadow-lg border-0">
              <CardBody className="p-6">
                <div className="flex items-start gap-6">
                  <Avatar
                    src={liveData.img_alt || liveData.img}
                    size="lg"
                    name={liveData.name}
                    className="ring-4 ring-primary/20"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                        {liveData.name}
                      </h1>
                      <Chip
                        color="danger"
                        variant="shadow"
                        size="md"
                        startContent={
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        }
                        className="font-semibold"
                      >
                        LIVE
                      </Chip>
                      <Chip 
                        color="primary" 
                        variant="flat" 
                        size="md"
                        className="font-medium"
                      >
                        {liveData.type.toUpperCase()}
                      </Chip>
                    </div>
                    
                    <div className="space-y-2 text-default-600">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Started:</span>
                        <span>{formatStartedTime(liveData.started_at)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Stream Key:</span>
                        <code className="bg-default-100 px-2 py-1 rounded text-sm">
                          {liveData.url_key}
                        </code>
                      </div>
                      {liveData.streaming_url_list.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Quality:</span>
                          <div className="flex gap-2">
                            {liveData.streaming_url_list.map((stream, index) => (
                              <Chip
                                key={index}
                                size="sm"
                                variant="flat"
                                color="secondary"
                              >
                                {stream.label || `${stream.quality}p`}
                              </Chip>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="xl:col-span-1">
            <Card className="h-[600px] shadow-lg border-0">
              <CardHeader className="pb-3 px-6 pt-6">
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-xl font-bold text-foreground">Live Chat</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        chatConnected ? 'bg-success animate-pulse' : 'bg-danger'
                      }`} />
                      <span className="text-sm font-medium text-default-600">
                        {chatConnected ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                    {!chatConnected && liveData.type === 'idn' && (
                      <Button
                        size="sm"
                        color="primary"
                        variant="light"
                        onClick={handleReconnect}
                        className="text-xs"
                      >
                        Reconnect
                      </Button>
                    )}
                  </div>
                </div>
                <Divider className="mt-3" />
              </CardHeader>
              
              <CardBody className="pt-0 px-6 pb-6">
                <ScrollShadow 
                  ref={chatContainerRef}
                  className="flex-1 h-full"
                  hideScrollBar
                >
                  <div className="flex flex-col gap-3">
                    {liveData.type === 'idn' ? (
                      chatMessages.length === 0 ? (
                        <div className="text-center text-default-500 py-12 space-y-2">
                          <div className="text-4xl opacity-50">💬</div>
                          <p className="font-medium">No messages yet</p>
                          <p className="text-sm">
                            {chatConnected ? 'Waiting for chat messages...' : 'Connecting to chat...'}
                          </p>
                        </div>
                      ) : (
                        chatMessages.map((msg, index) => (
                          <div key={`${msg.timestamp}-${index}`} 
                               className="flex gap-3 p-3 hover:bg-default-50 rounded-xl transition-colors">
                            <Avatar
                              src={msg.user?.avatar_url}
                              size="sm"
                              name={msg.user?.name}
                              className="flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold truncate text-foreground">
                                  {msg.user?.name}
                                </p>
                                <Chip
                                  size="sm"
                                  variant="flat"
                                  color="primary"
                                  className="text-xs font-medium"
                                >
                                  L{msg.user?.level_tier}
                                </Chip>
                              </div>
                              <p className="text-sm text-foreground leading-relaxed break-words">
                                {msg.message}
                              </p>
                              <p className="text-xs text-default-400">
                                {msg.timestamp ? formatTime(msg.timestamp) : ''}
                              </p>
                            </div>
                          </div>
                        ))
                      )
                    ) : (
                      showroomComments.length === 0 ? (
                        <div className="text-center text-default-500 py-12 space-y-2">
                          <div className="text-4xl opacity-50">💬</div>
                          <p className="font-medium">No comments yet</p>
                          <p className="text-sm">Waiting for comments...</p>
                        </div>
                      ) : (
                        showroomComments.map((comment, index) => (
                          <div key={`${comment.created_at}-${index}`} 
                               className="flex gap-3 p-3 hover:bg-default-50 rounded-xl transition-colors">
                            <Avatar
                              src={comment.avatar_url}
                              size="sm"
                              name={comment.name}
                              className="flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0 space-y-1">
                              <p className="text-sm font-semibold truncate text-foreground">
                                {comment.name}
                              </p>
                              <p className="text-sm text-foreground leading-relaxed break-words">
                                {comment.comment}
                              </p>
                              <p className="text-xs text-default-400">
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
    </div>
  );
}
