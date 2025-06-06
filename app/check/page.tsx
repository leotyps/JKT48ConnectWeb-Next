"use client"

import React, { useState } from "react";
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
  keyStats: Array<{
    type: string;
    count: string;
    total_usage: string;
  }>;
  dailyStats: Array<{
    date: string;
    count: number;
  }>;
}

interface ServerStatsResponse {
  status: boolean;
  data?: ServerStats;
  message?: string;
}

const PACKAGE_COLORS = {
  basic: 'primary',
  premium: 'secondary', 
  enterprise: 'success',
  premiumPlus: 'warning',
  free: 'default'
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

  const handleGetServerStats = async () => {
    setStatsLoading(true);
    setStatsError(null);

    try {
      const response = await fetch('https://v2.jkt48connect.my.id/api/admin/stats?username=vzy&password=vzy');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ServerStatsResponse = await response.json();
      
      console.log('Server stats result:', result);

      if (result.status === true && result.data) {
        setServerStats(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch server statistics');
      }
      
    } catch (err) {
      console.error('Server stats error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch server statistics';
      setStatsError(errorMessage);
    } finally {
      setStatsLoading(false);
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

  const formatNumber = (num: number | string) => {
    const numValue = typeof num === 'string' ? parseInt(num) : num;
    return numValue.toLocaleString();
  };

  const formatDailyStatsDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalUsageByType = () => {
    if (!serverStats) return 0;
    return serverStats.keyStats.reduce((total, stat) => {
      return total + parseInt(stat.total_usage);
    }, 0);
  };

  // Load server stats on component mount
  React.useEffect(() => {
    handleGetServerStats();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full max-w-4xl">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600">Home</a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-sm font-medium text-gray-500">API Key Checker</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JKT48Connect API Key Checker</h1>
          <p className="text-lg text-gray-600">
            Check the status, usage, and details of your JKT48Connect API key
          </p>
        </div>

        {/* Server Status */}
        <div className="bg-white rounded-lg border shadow-sm mb-6">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-xl font-bold">JKT48Connect Server Status</h3>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  statsLoading 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                }`}
                disabled={statsLoading}
                onClick={handleGetServerStats}
              >
                {statsLoading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>
          <div className="p-6">
            {statsError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-red-800">Error loading server stats</h4>
                    <p className="mt-1 text-sm text-red-700">{statsError}</p>
                  </div>
                </div>
              </div>
            )}
            
            {statsLoading && !serverStats && (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading server statistics...</p>
              </div>
            )}

            {serverStats && (
              <div className="space-y-6">
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{formatNumber(serverStats.totalKeys)}</p>
                    <p className="text-sm text-gray-600">Total API Keys</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{formatNumber(serverStats.activeKeys)}</p>
                    <p className="text-sm text-gray-600">Active Keys</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{formatNumber(serverStats.totalRequests)}</p>
                    <p className="text-sm text-gray-600">Total Requests</p>
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Key Statistics by Type */}
                <div>
                  <h4 className="font-semibold mb-4">API Keys by Package Type</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {serverStats.keyStats.map((stat, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                            stat.type === 'premiumPlus' ? 'bg-yellow-100 text-yellow-800' :
                            stat.type === 'premium' ? 'bg-purple-100 text-purple-800' :
                            stat.type === 'basic' ? 'bg-blue-100 text-blue-800' :
                            stat.type === 'free' ? 'bg-gray-100 text-gray-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {stat.type}
                          </span>
                          <span className="text-sm font-semibold">{stat.count} keys</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Total Usage</p>
                          <p className="font-semibold">{formatNumber(stat.total_usage)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-200" />

                {/* Daily Statistics */}
                <div>
                  <h4 className="font-semibold mb-4">Daily Request Statistics (Last 7 Days)</h4>
                  <div className="space-y-2">
                    {serverStats.dailyStats.slice(-7).map((stat, index) => {
                      const maxCount = Math.max(...serverStats.dailyStats.slice(-7).map(s => s.count));
                      const percentage = (stat.count / maxCount) * 100;
                      
                      return (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-16 text-sm text-gray-600">
                            {formatDailyStatsDate(stat.date)}
                          </div>
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-20 text-right text-sm font-semibold">
                            {formatNumber(stat.count)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* API Key Input */}
        <div className="bg-white rounded-lg border shadow-sm mb-6">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">Check API Key Status</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                <input
                  type="text"
                  placeholder="Enter your JKT48Connect API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCheckKey();
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex gap-2 justify-center">
                <button
                  className={`px-6 py-2 font-medium rounded-md ${
                    loading || !apiKey.trim()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  disabled={loading || !apiKey.trim()}
                  onClick={handleCheckKey}
                >
                  {loading ? 'Checking...' : 'Check API Key'}
                </button>
                
                {(keyDetail || error) && (
                  <button
                    className="px-6 py-2 font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    onClick={resetForm}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h4 className="text-sm font-medium text-red-800">Error</h4>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* API Key Details */}
        {keyDetail && (
          <div className="space-y-6">
            {/* Status Overview */}
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-xl font-bold">API Key Status</h3>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    keyDetail.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {keyDetail.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 text-sm">API Key</p>
                      <div className="bg-gray-100 p-3 rounded mt-1">
                        <code className="text-sm break-all select-all">{keyDetail.key}</code>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-sm">Owner</p>
                      <p className="font-semibold">{keyDetail.owner}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-sm">Email</p>
                      <p className="font-semibold">{keyDetail.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-500 text-sm">Package Type</p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                        keyDetail.type === 'premiumPlus' ? 'bg-yellow-100 text-yellow-800' :
                        keyDetail.type === 'premium' ? 'bg-purple-100 text-purple-800' :
                        keyDetail.type === 'basic' ? 'bg-blue-100 text-blue-800' :
                        keyDetail.type === 'free' ? 'bg-gray-100 text-gray-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {keyDetail.type}
                      </span>
                    </div>
                  </div>

                  {/* Usage Stats */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-500 text-sm">Usage This Month</p>
                        <p className="text-sm">
                          {parseInt(keyDetail.usage_count).toLocaleString()} / {parseInt(keyDetail.limit_count).toLocaleString()}
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div 
                          className={`h-2 rounded-full ${
                            getUsageColor() === 'danger' ? 'bg-red-600' :
                            getUsageColor() === 'warning' ? 'bg-yellow-600' :
                            'bg-green-600'
                          }`}
                          style={{ width: `${calculateUsagePercentage()}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-400">
                        {calculateUsagePercentage().toFixed(1)}% used
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Requests Today</p>
                      <p className="font-semibold text-lg">{keyDetail.stats.requestsToday.toLocaleString()}</p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Total Requests</p>
                      <p className="font-semibold text-lg">{keyDetail.stats.totalRequests.toLocaleString()}</p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">Days Until Expiry</p>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-lg">{getDaysUntilExpiry()}</p>
                        {getDaysUntilExpiry() <= 7 && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                            Expiring Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates Information */}
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold">Timeline</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-gray-500 text-sm">Created Date</p>
                    <div>
                      <p className="font-semibold">{formatDate(keyDetail.created_at).date}</p>
                      <p className="text-sm text-gray-600">{formatDate(keyDetail.created_at).time}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-gray-500 text-sm">Expiry Date</p>
                    <div>
                      <p className="font-semibold">{formatDate(keyDetail.expire_at).date}</p>
                      <p className="text-sm text-gray-600">{formatDate(keyDetail.expire_at).time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Recommendations */}
            {calculateUsagePercentage() > 80 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-yellow-800">High Usage Warning</h4>
                    <p className="mt-1 text-sm text-yellow-700">
                      You've used {calculateUsagePercentage().toFixed(1)}% of your monthly limit. 
                      Consider upgrading your plan or monitoring your usage more closely.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {getDaysUntilExpiry() <= 7 && getDaysUntilExpiry() > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-yellow-800">Expiry Warning</h4>
                    <p className="mt-1 text-sm text-yellow-700">
                      Your API key will expire in {getDaysUntilExpiry()} day{getDaysUntilExpiry() !== 1 ? 's' : ''}. 
                      Please renew your subscription to continue using the API.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {getDaysUntilExpiry() === 0 && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-red-800">API Key Expired</h4>
                    <p className="mt-1 text-sm text-red-700">
                      Your API key has expired. Please purchase a new API key to continue using the service.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* API Documentation */}
        <div className="bg-white rounded-lg border shadow-sm mt-8">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold">API Usage Guide</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Installation</h4>
                <div className="bg-gray-100 p-3 rounded">
                  <code className="text-sm">npm install @jkt48/core</code>
                </div>
              </div>
              
              <hr className="border-gray-200" />
              
              <div>
                <h4 className="font-semibold mb-2">Basic Usage</h4>
                <div className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
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
          </div>
        </div>
      </div>
    </section>
  );
}
