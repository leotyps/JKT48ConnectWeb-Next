"use client"

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Input, Button, Chip, Progress, Divider, Breadcrumbs, BreadcrumbItem, Alert, Skeleton } from "@heroui/react";

interface APIKeyDetail {
  id: string;
  key: string;
  owner: string;
  email: string;
  type: string;
  usage_count: string;
  limit_count: string;
  active: boolean;
  created_at: string;
  expire_at: string;
  stats: {
    totalRequests: number;
    requestsToday: number;
  };
}

interface ServerStats {
  totalKeys: number;
  activeKeys: number;
  totalRequests: number;
  keyStats: {
    type: string;
    count: string;
    total_usage: string;
  }[];
  dailyStats: {
    date: string;
    count: number;
  }[];
}

interface APIResponse {
  status: boolean;
  data?: APIKeyDetail;
  message?: string;
}

interface ServerStatsResponse {
  status: boolean;
  data?: ServerStats;
  message?: string;
}

const PACKAGE_COLORS = {
  basic: 'primary',
  free: 'default',
  premium: 'secondary', 
  premiumPlus: 'success',
  enterprise: 'warning'
} as const;

const PACKAGE_LIMITS = {
  basic: 1000,
  free: 100,
  premium: 5000,
  premiumPlus: 10000,
  enterprise: 25000
} as const;

export default function JKT48APIChecker() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyDetail, setKeyDetail] = useState<APIKeyDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Server stats states
  const [serverStats, setServerStats] = useState<ServerStats | null>(null);
  const [serverStatsLoading, setServerStatsLoading] = useState(false);
  const [serverStatsError, setServerStatsError] = useState<string | null>(null);

  // Load server stats on component mount
  useEffect(() => {
    loadServerStats();
  }, []);

  const loadServerStats = async () => {
    setServerStatsLoading(true);
    setServerStatsError(null);

    try {
      const jkt48Api = require('@jkt48/core');
      const result: ServerStatsResponse = await jkt48Api.admin.getStats();
      
      console.log('Server stats result:', result);

      if (result.status === true && result.data) {
        setServerStats(result.data);
      } else {
        throw new Error(result.message || 'Failed to load server statistics');
      }
      
    } catch (err) {
      console.error('Server stats error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load server statistics';
      setServerStatsError(errorMessage);
    } finally {
      setServerStatsLoading(false);
    }
  };

  const handleCheckKey = async () => {
    if (!apiKey.trim()) {
      setError('Please enter an API key');
      return;
    }

    setLoading(true);
    setError(null);
    setKeyDetail(null);

    try {
      const jkt48Api = require('@jkt48/core');
      const result: APIResponse = await jkt48Api.admin.getKeyDetail(apiKey.trim());
      
      console.log('API Key check result:', result);

      if (result.status === true && result.data) {
        setKeyDetail(result.data);
      } else {
        throw new Error(result.message || 'API key not found or invalid');
      }
      
    } catch (err) {
      console.error('API Key check error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to check API key';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const calculateUsagePercentage = () => {
    if (!keyDetail) return 0;
    const usage = parseInt(keyDetail.usage_count);
    const limit = parseInt(keyDetail.limit_count);
    return Math.min((usage / limit) * 100, 100);
  };

  const getDaysUntilExpiry = () => {
    if (!keyDetail) return 0;
    const expireDate = new Date(keyDetail.expire_at);
    const now = new Date();
    const diffTime = expireDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(diffDays, 0);
  };

  const getUsageColor = () => {
    const percentage = calculateUsagePercentage();
    if (percentage >= 90) return 'danger';
    if (percentage >= 70) return 'warning';
    return 'success';
  };

  const resetForm = () => {
    setApiKey('');
    setKeyDetail(null);
    setError(null);
  };

  const getTotalDailyRequests = () => {
    if (!serverStats) return 0;
    return serverStats.dailyStats.reduce((total, day) => total + day.count, 0);
  };

  const getPackageDisplayName = (type: string) => {
    const names: { [key: string]: string } = {
      basic: 'Basic',
      free: 'Free',
      premium: 'Premium',
      premiumPlus: 'Premium Plus',
      enterprise: 'Enterprise'
    };
    return names[type] || type;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-12 px-4">
        <div className="w-full max-w-6xl">
          {/* Breadcrumbs */}
          <Breadcrumbs className="mb-8">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem>API Key Checker</BreadcrumbItem>
          </Breadcrumbs>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">JKT</span>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                JKT48Connect API
              </h1>
            </div>
            <p className="text-xl text-default-600 max-w-2xl mx-auto">
              Monitor your API key status, usage statistics, and server performance in real-time
            </p>
          </div>

          {/* Server Status Section */}
          <Card className="mb-8 shadow-xl border-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <h3 className="text-2xl font-bold">Server Status</h3>
                </div>
                <Button
                  size="sm"
                  variant="bordered"
                  onPress={loadServerStats}
                  isLoading={serverStatsLoading}
                >
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              {serverStatsLoading ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="rounded-xl">
                        <div className="h-20 w-full"></div>
                      </Skeleton>
                    ))}
                  </div>
                </div>
              ) : serverStatsError ? (
                <Alert color="danger">
                  <div>
                    <h4 className="font-semibold">Failed to Load Server Stats</h4>
                    <p>{serverStatsError}</p>
                  </div>
                </Alert>
              ) : serverStats ? (
                <div className="space-y-6">
                  {/* Overall Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      <CardBody className="text-center p-6">
                        <p className="text-blue-100 text-sm font-medium">Total Keys</p>
                        <p className="text-3xl font-bold">{serverStats.totalKeys.toLocaleString()}</p>
                      </CardBody>
                    </Card>
                    
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                      <CardBody className="text-center p-6">
                        <p className="text-green-100 text-sm font-medium">Active Keys</p>
                        <p className="text-3xl font-bold">{serverStats.activeKeys.toLocaleString()}</p>
                      </CardBody>
                    </Card>
                    
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                      <CardBody className="text-center p-6">
                        <p className="text-purple-100 text-sm font-medium">Total Requests</p>
                        <p className="text-3xl font-bold">{serverStats.totalRequests.toLocaleString()}</p>
                      </CardBody>
                    </Card>
                    
                    <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                      <CardBody className="text-center p-6">
                        <p className="text-orange-100 text-sm font-medium">7-Day Requests</p>
                        <p className="text-3xl font-bold">{getTotalDailyRequests().toLocaleString()}</p>
                      </CardBody>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Package Distribution */}
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <h4 className="text-xl font-bold">Package Distribution</h4>
                      </CardHeader>
                      <CardBody>
                        <div className="space-y-4">
                          {serverStats.keyStats.map((stat, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-default-50 rounded-xl">
                              <div className="flex items-center gap-3">
                                <Chip
                                  color={PACKAGE_COLORS[stat.type as keyof typeof PACKAGE_COLORS] || 'default'}
                                  variant="flat"
                                  size="sm"
                                >
                                  {getPackageDisplayName(stat.type)}
                                </Chip>
                                <span className="font-medium">{stat.count} keys</span>
                              </div>
                              <span className="text-sm text-default-600">
                                {parseInt(stat.total_usage).toLocaleString()} requests
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardBody>
                    </Card>

                    {/* Daily Usage Chart */}
                    <Card className="border-0 shadow-lg">
                      <CardHeader>
                        <h4 className="text-xl font-bold">7-Day Usage Trend</h4>
                      </CardHeader>
                      <CardBody>
                        <div className="space-y-3">
                          {serverStats.dailyStats.map((day, index) => {
                            const maxCount = Math.max(...serverStats.dailyStats.map(d => d.count));
                            const percentage = (day.count / maxCount) * 100;
                            
                            return (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="font-medium">
                                    {new Date(day.date).toLocaleDateString('id-ID', { 
                                      weekday: 'short', 
                                      month: 'short', 
                                      day: 'numeric' 
                                    })}
                                  </span>
                                  <span className="text-default-600">{day.count.toLocaleString()}</span>
                                </div>
                                <Progress
                                  value={percentage}
                                  color="primary"
                                  size="sm"
                                  className="mb-1"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              ) : null}
            </CardBody>
          </Card>

          {/* API Key Input */}
          <Card className="mb-8 shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-t-xl">
              <h3 className="text-2xl font-bold">Check API Key Status</h3>
            </CardHeader>
            <CardBody className="p-8">
              <div className="space-y-6">
                <Input
                  label="API Key"
                  placeholder="Enter your JKT48Connect API key"
                  value={apiKey}
                  onValueChange={setApiKey}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCheckKey();
                    }
                  }}
                  size="lg"
                  variant="bordered"
                  classNames={{
                    input: "text-lg",
                    inputWrapper: "h-14 shadow-lg border-2 hover:border-primary focus-within:border-primary"
                  }}
                />
                
                <div className="flex gap-3 justify-center">
                  <Button
                    color="primary"
                    size="lg"
                    isLoading={loading}
                    onPress={handleCheckKey}
                    isDisabled={!apiKey.trim()}
                    className="px-8 py-3 font-semibold shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-xl transition-all"
                  >
                    Check API Key
                  </Button>
                  
                  {(keyDetail || error) && (
                    <Button
                      color="default"
                      variant="bordered"
                      size="lg"
                      onPress={resetForm}
                      className="px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all"
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Error Display */}
          {error && (
            <Alert color="danger" className="mb-8 shadow-lg">
              <div>
                <h4 className="font-semibold">Error</h4>
                <p>{error}</p>
              </div>
            </Alert>
          )}

          {/* API Key Details */}
          {keyDetail && (
            <div className="space-y-8">
              {/* Status Overview */}
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-xl">
                  <div className="flex justify-between items-center w-full">
                    <h3 className="text-2xl font-bold">API Key Details</h3>
                    <Chip 
                      color={keyDetail.active ? 'success' : 'danger'}
                      variant="solid"
                      size="lg"
                      className="text-white font-semibold"
                    >
                      {keyDetail.active ? '✓ Active' : '✗ Inactive'}
                    </Chip>
                  </div>
                </CardHeader>
                <CardBody className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Basic Info */}
                    <div className="space-y-6">
                      <div>
                        <p className="text-default-500 text-sm font-medium mb-2">API Key</p>
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl border">
                          <code className="text-sm break-all select-all font-mono">{keyDetail.key}</code>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Owner</p>
                          <p className="font-bold text-lg">{keyDetail.owner}</p>
                        </div>
                        
                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                          <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Email</p>
                          <p className="font-bold text-lg break-all">{keyDetail.email}</p>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-4 rounded-xl">
                        <p className="text-pink-600 dark:text-pink-400 text-sm font-medium mb-2">Package Type</p>
                        <Chip 
                          color={PACKAGE_COLORS[keyDetail.type as keyof typeof PACKAGE_COLORS] || 'default'}
                          className="capitalize font-semibold text-lg px-4 py-2"
                          size="lg"
                        >
                          {getPackageDisplayName(keyDetail.type)}
                        </Chip>
                      </div>
                    </div>

                    {/* Usage Stats */}
                    <div className="space-y-6">
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl">
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-orange-600 dark:text-orange-400 font-medium">Usage This Month</p>
                          <p className="text-sm font-semibold">
                            {parseInt(keyDetail.usage_count).toLocaleString()} / {parseInt(keyDetail.limit_count).toLocaleString()}
                          </p>
                        </div>
                        <Progress 
                          value={calculateUsagePercentage()}
                          color={getUsageColor()}
                          size="lg"
                          className="mb-2"
                        />
                        <p className="text-sm text-default-600 font-medium">
                          {calculateUsagePercentage().toFixed(1)}% used
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
                          <p className="text-green-600 dark:text-green-400 text-sm font-medium">Today</p>
                          <p className="font-bold text-2xl">{keyDetail.stats.requestsToday.toLocaleString()}</p>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center">
                          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total</p>
                          <p className="font-bold text-2xl">{keyDetail.stats.totalRequests.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-xl text-center">
                        <p className="text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-2">Days Until Expiry</p>
                        <div className="flex items-center justify-center gap-3">
                          <p className="font-bold text-3xl">{getDaysUntilExpiry()}</p>
                          {getDaysUntilExpiry() <= 7 && (
                            <Chip color="warning" size="sm" className="font-semibold">
                              ⚠ Expiring Soon
                            </Chip>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Timeline */}
              <Card className="shadow-xl border-0">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-xl">
                  <h3 className="text-2xl font-bold">Timeline</h3>
                </CardHeader>
                <CardBody className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl">
                      <p className="text-green-600 dark:text-green-400 text-sm font-medium mb-3">Created Date</p>
                      <div>
                        <p className="font-bold text-xl">{formatDate(keyDetail.created_at).date}</p>
                        <p className="text-lg text-default-600">{formatDate(keyDetail.created_at).time}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-xl">
                      <p className="text-orange-600 dark:text-orange-400 text-sm font-medium mb-3">Expiry Date</p>
                      <div>
                        <p className="font-bold text-xl">{formatDate(keyDetail.expire_at).date}</p>
                        <p className="text-lg text-default-600">{formatDate(keyDetail.expire_at).time}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Alerts */}
              {calculateUsagePercentage() > 80 && (
                <Alert color="warning" className="shadow-lg">
                  <div>
                    <h4 className="font-semibold">⚠️ High Usage Warning</h4>
                    <p>
                      You've used {calculateUsagePercentage().toFixed(1)}% of your monthly limit. 
                      Consider upgrading your plan or monitoring your usage more closely.
                    </p>
                  </div>
                </Alert>
              )}

              {getDaysUntilExpiry() <= 7 && getDaysUntilExpiry() > 0 && (
                <Alert color="warning" className="shadow-lg">
                  <div>
                    <h4 className="font-semibold">⏰ Expiry Warning</h4>
                    <p>
                      Your API key will expire in {getDaysUntilExpiry()} day{getDaysUntilExpiry() !== 1 ? 's' : ''}. 
                      Please renew your subscription to continue using the API.
                    </p>
                  </div>
                </Alert>
              )}

              {getDaysUntilExpiry() === 0 && (
                <Alert color="danger" className="shadow-lg">
                  <div>
                    <h4 className="font-semibold">🚫 API Key Expired</h4>
                    <p>
                      Your API key has expired. Please purchase a new API key to continue using the service.
                    </p>
                  </div>
                </Alert>
              )}
            </div>
          )}

          {/* API Documentation */}
          <Card className="mt-12 shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-t-xl">
              <h3 className="text-2xl font-bold">📚 API Usage Guide</h3>
            </CardHeader>
            <CardBody className="p-8">
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-xl mb-4 text-blue-600">Installation</h4>
                  <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono shadow-inner">
                    <code className="text-lg">npm install @jkt48/core</code>
                  </div>
                </div>
                
                <Divider className="my-6" />
                
                <div>
                  <h4 className="font-bold text-xl mb-4 text-purple-600">Basic Usage Examples</h4>
                  <div className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto shadow-inner">
                    <pre className="text-sm leading-relaxed">
{`const jkt48Api = require('@jkt48/core');

// Get members list
const members = await jkt48Api.members('YOUR_API_KEY');

// Get member detail  
const memberDetail = await jkt48Api.memberDetail('Freya', 'YOUR_API_KEY');

// Get recent news
const news = await jkt48Api.news('YOUR_API_KEY');

// Get theater schedule
const schedule = await jkt48Api.schedule('YOUR_API_KEY');`}
                    </pre>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
                  <h4 className="font-bold text-lg mb-3 text-indigo-600">💡 Pro Tips</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Always store your API key securely and never expose it in client-side code</li>
                    <li>• Monitor your usage regularly to avoid hitting rate limits</li>
                    <li>• Use caching mechanisms to reduce unnecessary API calls</li>
                    <li>• Consider upgrading to a higher tier if you consistently hit usage limits</li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
}
