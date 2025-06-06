"use client"

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Input, Button, Chip, Progress, Divider, Breadcrumbs, BreadcrumbItem, Alert } from "@heroui/react";

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

interface APIResponse {
  status: boolean;
  data?: APIKeyDetail;
  message?: string;
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

interface ServerStatsResponse {
  status: boolean;
  data?: ServerStats;
  message?: string;
}

const PACKAGE_COLORS = {
  basic: 'primary',
  premium: 'secondary', 
  enterprise: 'success'
} as const;

const PACKAGE_LIMITS = {
  basic: 1000,
  premium: 5000,
  enterprise: 25000
} as const;

export default function JKT48APIChecker() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyDetail, setKeyDetail] = useState<APIKeyDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [serverStats, setServerStats] = useState<ServerStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState<string | null>(null);

  const handleCheckKey = async () => {
    if (!apiKey.trim()) {
      setError('Please enter an API key');
      return;
    }

    setLoading(true);
    setError(null);
    setKeyDetail(null);

    try {
      // Import the package
      const jkt48Api = require('@jkt48/core');
      
      // Get key details
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

  const fetchServerStats = async () => {
    setStatsLoading(true);
    setStatsError(null);

    try {
      const response = await fetch('https://v2.jkt48connect.my.id/api/admin/stats?username=vzy&password=vzy');
      const result: ServerStatsResponse = await response.json();

      if (result.status === true && result.data) {
        setServerStats(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch server stats');
      }
    } catch (err) {
      console.error('Server stats error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch server stats';
      setStatsError(errorMessage);
    } finally {
      setStatsLoading(false);
    }
  };

  // Fetch server stats on component mount
  useEffect(() => {
    fetchServerStats();
  }, []);

  const formatDateForChart = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getPackageDisplayName = (type: string) => {
    const displayNames: { [key: string]: string } = {
      'free': 'Free',
      'basic': 'Basic',
      'premium': 'Premium',
      'premiumPlus': 'Premium Plus'
    };
    return displayNames[type] || type;
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

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full max-w-4xl">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>API Key Checker</BreadcrumbItem>
        </Breadcrumbs>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JKT48Connect API Key Checker</h1>
          <p className="text-lg text-default-600">
            Check the status, usage, and details of your JKT48Connect API key
          </p>
        </div>

        {/* Server Status Section */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center w-full">
              <h3 className="text-xl font-bold">JKT48Connect Server Status</h3>
              <Button
                variant="bordered"
                size="sm"
                isLoading={statsLoading}
                onPress={fetchServerStats}
              >
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            {statsError && (
              <Alert className="mb-4">
                <div>
                  <h4 className="font-semibold">Error Loading Server Stats</h4>
                  <p>{statsError}</p>
                </div>
              </Alert>
            )}

            {serverStats && (
              <div className="space-y-6">
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold">{serverStats.totalKeys.toLocaleString()}</p>
                    <p className="text-sm text-default-600">Total API Keys</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold">{serverStats.activeKeys.toLocaleString()}</p>
                    <p className="text-sm text-default-600">Active Keys</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold">{serverStats.totalRequests.toLocaleString()}</p>
                    <p className="text-sm text-default-600">Total Requests</p>
                  </div>
                </div>

                <Divider />

                {/* Key Statistics by Type */}
                <div>
                  <h4 className="font-semibold mb-4">API Keys by Package Type</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {serverStats.keyStats.map((stat) => (
                      <div key={stat.type} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium">{getPackageDisplayName(stat.type)}</h5>
                          <Chip size="sm" variant="flat">
                            {stat.count} keys
                          </Chip>
                        </div>
                        <p className="text-sm text-default-600">
                          Total Usage: {parseInt(stat.total_usage).toLocaleString()}
                        </p>
                        <p className="text-xs text-default-500 mt-1">
                          Avg per key: {Math.round(parseInt(stat.total_usage) / parseInt(stat.count) || 0).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Divider />

                {/* Daily Usage Chart */}
                <div>
                  <h4 className="font-semibold mb-4">Daily Request Statistics (Last 7 Days)</h4>
                  <div className="overflow-x-auto">
                    <div className="min-w-full">
                      <div className="grid grid-cols-8 gap-2 mb-2">
                        <div className="text-xs font-medium text-default-600">Date</div>
                        {serverStats.dailyStats.slice(-7).map((stat) => (
                          <div key={stat.date} className="text-xs text-center font-medium text-default-600">
                            {formatDateForChart(stat.date)}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-8 gap-2 items-end" style={{ height: '200px' }}>
                        <div className="text-xs font-medium text-default-600 self-end">Requests</div>
                        {serverStats.dailyStats.slice(-7).map((stat) => {
                          const maxCount = Math.max(...serverStats.dailyStats.slice(-7).map(s => s.count));
                          const height = (stat.count / maxCount) * 160;
                          return (
                            <div key={stat.date} className="flex flex-col items-center justify-end">
                              <div 
                                className="w-full bg-default-300 rounded-t-md mb-1 min-h-1"
                                style={{ height: `${height}px` }}
                              ></div>
                              <div className="text-xs text-center font-medium">
                                {stat.count.toLocaleString()}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!serverStats && !statsLoading && !statsError && (
              <div className="text-center py-8">
                <p className="text-default-500">Loading server statistics...</p>
              </div>
            )}
          </CardBody>
        </Card>

        {/* API Key Input */}
        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-xl font-bold">Check API Key Status</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
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
              />
              
              <div className="flex gap-2 justify-center">
                <Button
                  color="primary"
                  size="lg"
                  isLoading={loading}
                  onPress={handleCheckKey}
                  isDisabled={!apiKey.trim()}
                >
                  Check API Key
                </Button>
                
                {(keyDetail || error) && (
                  <Button
                    color="default"
                    variant="bordered"
                    size="lg"
                    onPress={resetForm}
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
          <Alert color="danger" className="mb-6">
            <div>
              <h4 className="font-semibold">Error</h4>
              <p>{error}</p>
            </div>
          </Alert>
        )}

        {/* API Key Details */}
        {keyDetail && (
          <div className="space-y-6">
            {/* Status Overview */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-xl font-bold">API Key Status</h3>
                  <Chip 
                    color={keyDetail.active ? 'success' : 'danger'}
                    variant="flat"
                  >
                    {keyDetail.active ? 'Active' : 'Inactive'}
                  </Chip>
                </div>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-default-500 text-sm">API Key</p>
                      <div className="bg-default-100 p-3 rounded mt-1">
                        <code className="text-sm break-all select-all">{keyDetail.key}</code>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-default-500 text-sm">Owner</p>
                      <p className="font-semibold">{keyDetail.owner}</p>
                    </div>
                    
                    <div>
                      <p className="text-default-500 text-sm">Email</p>
                      <p className="font-semibold">{keyDetail.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-default-500 text-sm">Package Type</p>
                      <Chip 
                        color={PACKAGE_COLORS[keyDetail.type as keyof typeof PACKAGE_COLORS] || 'default'}
                        className="capitalize"
                      >
                        {keyDetail.type}
                      </Chip>
                    </div>
                  </div>

                  {/* Usage Stats */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-default-500 text-sm">Usage This Month</p>
                        <p className="text-sm">
                          {parseInt(keyDetail.usage_count).toLocaleString()} / {parseInt(keyDetail.limit_count).toLocaleString()}
                        </p>
                      </div>
                      <Progress 
                        value={calculateUsagePercentage()}
                        color={getUsageColor()}
                        size="md"
                        className="mb-1"
                      />
                      <p className="text-xs text-default-400">
                        {calculateUsagePercentage().toFixed(1)}% used
                      </p>
                    </div>

                    <div>
                      <p className="text-default-500 text-sm">Requests Today</p>
                      <p className="font-semibold text-lg">{keyDetail.stats.requestsToday.toLocaleString()}</p>
                    </div>

                    <div>
                      <p className="text-default-500 text-sm">Total Requests</p>
                      <p className="font-semibold text-lg">{keyDetail.stats.totalRequests.toLocaleString()}</p>
                    </div>

                    <div>
                      <p className="text-default-500 text-sm">Days Until Expiry</p>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-lg">{getDaysUntilExpiry()}</p>
                        {getDaysUntilExpiry() <= 7 && (
                          <Chip color="warning" size="sm">
                            Expiring Soon
                          </Chip>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Dates Information */}
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Timeline</h3>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-default-500 text-sm">Created Date</p>
                    <div>
                      <p className="font-semibold">{formatDate(keyDetail.created_at).date}</p>
                      <p className="text-sm text-default-600">{formatDate(keyDetail.created_at).time}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-default-500 text-sm">Expiry Date</p>
                    <div>
                      <p className="font-semibold">{formatDate(keyDetail.expire_at).date}</p>
                      <p className="text-sm text-default-600">{formatDate(keyDetail.expire_at).time}</p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Usage Recommendations */}
            {calculateUsagePercentage() > 80 && (
              <Alert color="warning">
                <div>
                  <h4 className="font-semibold">High Usage Warning</h4>
                  <p>
                    You've used {calculateUsagePercentage().toFixed(1)}% of your monthly limit. 
                    Consider upgrading your plan or monitoring your usage more closely.
                  </p>
                </div>
              </Alert>
            )}

            {getDaysUntilExpiry() <= 7 && getDaysUntilExpiry() > 0 && (
              <Alert color="warning">
                <div>
                  <h4 className="font-semibold">Expiry Warning</h4>
                  <p>
                    Your API key will expire in {getDaysUntilExpiry()} day{getDaysUntilExpiry() !== 1 ? 's' : ''}. 
                    Please renew your subscription to continue using the API.
                  </p>
                </div>
              </Alert>
            )}

            {getDaysUntilExpiry() === 0 && (
              <Alert color="danger">
                <div>
                  <h4 className="font-semibold">API Key Expired</h4>
                  <p>
                    Your API key has expired. Please purchase a new API key to continue using the service.
                  </p>
                </div>
              </Alert>
            )}
          </div>
        )}

        {/* API Documentation */}
        <Card className="mt-8">
          <CardHeader>
            <h3 className="text-xl font-bold">API Usage Guide</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Installation</h4>
                <div className="bg-default-100 p-3 rounded">
                  <code className="text-sm">npm install @jkt48/core</code>
                </div>
              </div>
              
              <Divider />
              
              <div>
                <h4 className="font-semibold mb-2">Basic Usage</h4>
                <div className="bg-default-900 text-default-50 p-4 rounded overflow-x-auto">
                  <pre className="text-sm">
{`const jkt48Api = require('@jkt48/core');

// Get members list
const members = await jkt48Api.members('YOUR_API_KEY');

// Get member detail  
const memberDetail = await jkt48Api.memberDetail('Freya', 'YOUR_API_KEY');

// Get recent news
const news = await jkt48Api.news('YOUR_API_KEY');`}
                  </pre>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
