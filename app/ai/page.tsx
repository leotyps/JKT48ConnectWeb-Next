
"use client"

import { useState, useRef, useEffect } from "react";
import { Card, CardBody, CardHeader, Input, Button, Avatar, Spinner, Breadcrumbs, BreadcrumbItem, Chip } from "@heroui/react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  error?: boolean;
}

interface ChatStats {
  totalMessages: number;
  totalTokens: number;
  sessionStartTime: Date;
}

const GEMINI_API_KEY = 'AIzaSyBPqBufOKIhl3LgZNlKkBSWJ0K24Oqe3Xk';

export default function JKT48ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant powered by Google Gemini. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStats, setChatStats] = useState<ChatStats>({
    totalMessages: 1,
    totalTokens: 0,
    sessionStartTime: new Date()
  });
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const typewriterEffect = async (text: string, messageId: string) => {
    const words = text.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? ' ' : '') + words[i];
      
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, content: currentText, isTyping: true }
          : msg
      ));
      
      // Adjust typing speed based on word length
      const delay = words[i].length > 8 ? 80 : 40;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    // Remove typing indicator
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isTyping: false }
        : msg
    ));
  };

  const callGeminiAPI = async (prompt: string, retries = 3): Promise<string> => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
    
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          if (response.status === 429) {
            // Rate limited, wait and retry
            await new Promise(resolve => setTimeout(resolve, (attempt + 1) * 2000));
            continue;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
          return data.candidates[0].content.parts[0].text;
        } else {
          throw new Error('Invalid response format from Gemini API');
        }
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);
        
        if (attempt === retries - 1) {
          throw error;
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, (attempt + 1) * 1000));
      }
    }
    
    throw new Error('All retry attempts failed');
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      // Create assistant message with typing indicator
      const assistantMessageId = (Date.now() + 1).toString();
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isTyping: true
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(true);

      const response = await callGeminiAPI(userMessage.content);
      
      setIsTyping(false);
      setRetryCount(0);
      
      // Use typewriter effect for assistant response
      await typewriterEffect(response, assistantMessageId);

      // Update stats
      setChatStats(prev => ({
        ...prev,
        totalMessages: prev.totalMessages + 2,
        totalTokens: prev.totalTokens + userMessage.content.length + response.length
      }));

    } catch (err) {
      console.error('Error sending message:', err);
      setRetryCount(prev => prev + 1);
      
      let errorMessage = 'Failed to get response. Please try again.';
      
      if (err instanceof Error) {
        if (err.message.includes('429')) {
          errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
        } else if (err.message.includes('403')) {
          errorMessage = 'API key issue. Please check your configuration.';
        } else if (err.message.includes('network') || err.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection.';
        }
      }
      
      setError(errorMessage);
      
      // Remove the empty assistant message on error
      setMessages(prev => prev.filter(msg => !(msg.content === '' && msg.role === 'assistant')));
      setIsTyping(false);
    } finally {
      setIsLoading(false);
    }
  };

  const retryLastMessage = () => {
    const lastUserMessage = messages.filter(msg => msg.role === 'user').pop();
    if (lastUserMessage) {
      setInputMessage(lastUserMessage.content);
      setError(null);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m your AI assistant powered by Google Gemini. How can I help you today?',
        timestamp: new Date()
      }
    ]);
    setChatStats({
      totalMessages: 1,
      totalTokens: 0,
      sessionStartTime: new Date()
    });
    setError(null);
    setRetryCount(0);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSessionDuration = () => {
    const now = new Date();
    const diff = now.getTime() - chatStats.sessionStartTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full max-w-6xl">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>AI Chatbot</BreadcrumbItem>
        </Breadcrumbs>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Avatar
                alt="Gemini AI"
                size="lg"
                className="ring-4 ring-primary-100 bg-gradient-to-r from-blue-500 to-purple-600"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">AI Assistant</h1>
              <p className="text-sm text-default-500">Powered by Google Gemini</p>
            </div>
          </div>
          <p className="text-lg text-default-600 max-w-2xl mx-auto">
            Chat with our intelligent AI assistant. Ask questions, get help, or just have a conversation!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <Avatar size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600" />
                    <div>
                      <h3 className="font-semibold">AI Assistant</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <span className="text-xs text-success">Online</span>
                        {isTyping && (
                          <span className="text-xs text-default-500 animate-pulse">Typing...</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="bordered"
                    onPress={clearChat}
                    className="hover:scale-105 transition-transform"
                  >
                    Clear Chat
                  </Button>
                </div>
              </CardHeader>

              <CardBody className="flex-1 overflow-hidden p-0">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 animate-fadeIn ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animationFillMode: 'both'
                      }}
                    >
                      <Avatar
                        size="sm"
                        className={message.role === 'user' 
                          ? 'bg-gradient-to-r from-green-400 to-blue-500' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-600'
                        }
                      />
                      <div className={`flex flex-col gap-1 max-w-[80%] ${
                        message.role === 'user' ? 'items-end' : 'items-start'
                      }`}>
                        <div
                          className={`px-4 py-3 rounded-2xl relative transition-all duration-200 hover:scale-[1.02] ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground rounded-br-md'
                              : message.error
                              ? 'bg-danger-50 border border-danger-200 text-danger-700 rounded-bl-md'
                              : 'bg-default-100 text-default-900 rounded-bl-md'
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.content}
                            {message.isTyping && (
                              <span className="inline-block w-2 h-4 bg-current ml-1 animate-pulse" />
                            )}
                          </p>
                        </div>
                        <span className="text-xs text-default-400 px-2">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && !isTyping && (
                    <div className="flex gap-3 animate-fadeIn">
                      <Avatar size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600" />
                      <div className="bg-default-100 px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex items-center gap-2">
                          <Spinner size="sm" />
                          <span className="text-sm text-default-600">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t p-4">
                  {error && (
                    <div className="mb-3 p-3 bg-danger-50 border border-danger-200 rounded-lg text-danger-600 text-sm animate-slideDown">
                      <div className="flex justify-between items-center">
                        <span>{error}</span>
                        <Button
                          size="sm"
                          color="danger"
                          variant="light"
                          onPress={retryLastMessage}
                        >
                          Retry
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      placeholder="Type your message..."
                      value={inputMessage}
                      onValueChange={setInputMessage}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                      size="lg"
                      variant="bordered"
                      className="flex-1"
                      isDisabled={isLoading}
                      maxLength={1000}
                      endContent={
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-default-400">
                            {inputMessage.length}/1000
                          </span>
                        </div>
                      }
                    />
                    <Button
                      color="primary"
                      size="lg"
                      isLoading={isLoading}
                      onPress={sendMessage}
                      isDisabled={!inputMessage.trim() || isLoading}
                      className="px-6 hover:scale-105 transition-transform"
                    >
                      Send
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2 text-xs text-default-400">
                    <span>Press Enter to send, Shift+Enter for new line</span>
                    <span>Powered by Google Gemini</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chat Statistics */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Session Stats</h3>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-default-600">Messages</span>
                    <Chip size="sm" variant="flat" color="primary">
                      {chatStats.totalMessages}
                    </Chip>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-default-600">Characters</span>
                    <Chip size="sm" variant="flat" color="secondary">
                      {chatStats.totalTokens.toLocaleString()}
                    </Chip>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-default-600">Duration</span>
                    <Chip size="sm" variant="flat" color="success">
                      {getSessionDuration()}
                    </Chip>
                  </div>

                  {retryCount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-default-600">Retries</span>
                      <Chip size="sm" variant="flat" color="warning">
                        {retryCount}
                      </Chip>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Quick Actions</h3>
              </CardHeader>
              <CardBody className="space-y-2">
                <Button
                  variant="bordered"
                  size="sm"
                  className="w-full justify-start"
                  onPress={() => setInputMessage("Explain quantum physics in simple terms")}
                  isDisabled={isLoading}
                >
                  🔬 Explain Science
                </Button>
                <Button
                  variant="bordered"
                  size="sm"
                  className="w-full justify-start"
                  onPress={() => setInputMessage("Write a creative story")}
                  isDisabled={isLoading}
                >
                  ✍️ Creative Writing
                </Button>
                <Button
                  variant="bordered"
                  size="sm"
                  className="w-full justify-start"
                  onPress={() => setInputMessage("Help me with coding")}
                  isDisabled={isLoading}
                >
                  💻 Coding Help
                </Button>
                <Button
                  variant="bordered"
                  size="sm"
                  className="w-full justify-start"
                  onPress={() => setInputMessage("Give me productivity tips")}
                  isDisabled={isLoading}
                >
                  📈 Productivity Tips
                </Button>
              </CardBody>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Features</h3>
              </CardHeader>
              <CardBody className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>Real-time responses</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>Multiple languages</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-secondary rounded-full" />
                  <span>Code assistance</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-warning rounded-full" />
                  <span>Creative writing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-danger rounded-full" />
                  <span>Auto retry on errors</span>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </section>
  );
}
