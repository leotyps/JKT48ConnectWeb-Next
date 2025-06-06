"use client"

import { useState } from "react";
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
