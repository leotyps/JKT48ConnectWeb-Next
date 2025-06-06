
"use client"

import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader, Image, Skeleton, Breadcrumbs, BreadcrumbItem, Chip, Link, Input, Select, SelectItem, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Avatar, Divider, Tabs, Tab, Progress } from "@heroui/react";
import axios from "axios";

interface APIPackage {
  name: string;
  price: number;
  limit: number;
  description: string;
  features: string[];
  color: "primary" | "secondary" | "success" | "warning" | "danger";
}

interface PaymentData {
  qrImageUrl: string;
  amount: number;
  fee: number;
  total: number;
  packageInfo: APIPackage;
  userInfo: {
    name: string;
    email: string;
    customKey?: string;
  };
}

interface APIKeyResult {
  key: string;
  owner: string;
  email: string;
  limit: number;
  active: boolean;
  createdAt: string;
  expireAt: string;
  package: string;
}

interface TransactionData {
  amount: string;
  date: string;
  buyer_reff: string;
}

const API_PACKAGES: Record<string, APIPackage> = {
  basic: {
    name: 'basic',
    price: 100,
    limit: 1000,
    description: 'Cocok untuk penggunaan personal',
    features: ['1,000 API calls/month', 'Basic support', 'Standard rate limiting'],
    color: 'primary'
  },
  premium: {
    name: 'premium',
    price: 6500,
    limit: 5000,
    description: 'Cocok untuk aplikasi kecil',
    features: ['5,000 API calls/month', 'Priority support', 'Higher rate limits', 'Email notifications'],
    color: 'secondary'
  },
  enterprise: {
    name: 'enterprise',
    price: 35000,
    limit: 25000,
    description: 'Cocok untuk aplikasi besar',
    features: ['25,000 API calls/month', '24/7 Premium support', 'Custom rate limits', 'Dedicated account manager', 'SLA guarantee'],
    color: 'success'
  }
};

export default function JKT48APIStore() {
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    customKey: ''
  });
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'checking' | 'success' | 'failed'>('idle');
  const [apiKeyResult, setApiKeyResult] = useState<APIKeyResult | null>(null);
  const [transactionData, setTransactionData] = useState<TransactionData | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  
  // Modal states
  const {isOpen: isPaymentOpen, onOpen: onPaymentOpen, onOpenChange: onPaymentOpenChange} = useDisclosure();
  const {isOpen: isSuccessOpen, onOpen: onSuccessOpen, onOpenChange: onSuccessOpenChange} = useDisclosure();

  // Calculate fee (1-5% random)
  const calculateFee = (amount: number) => {
    const feePercentage = Math.random() * (0.05 - 0.01) + 0.01;
    return Math.ceil(amount * feePercentage);
  };

  // Validate email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handlePurchase = async () => {
    if (!selectedPackage || !userInfo.name || !userInfo.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (!validateEmail(userInfo.email)) {
      alert('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const pkg = API_PACKAGES[selectedPackage];
      const amount = pkg.price;
      const fee = calculateFee(amount);
      const total = amount + fee;

      // Generate QRIS payment
      const qrisUrl = `https://api.jkt48connect.my.id/api/orkut/createpayment?amount=${total}&qris=00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214149391352933240303UMI51440014ID.CO.QRIS.WWW0215ID20233077025890303UMI5204541153033605802ID5919VALZSTORE%20OK14535636006SERANG61054211162070703A016304DCD2&api_key=JKTCONNECT`;
      
      const response = await axios.get(qrisUrl);
      
      if (!response.data.qrImageUrl) {
        throw new Error('Failed to generate QR code');
      }

      setPaymentData({
        qrImageUrl: response.data.qrImageUrl,
        amount,
        fee,
        total,
        packageInfo: pkg,
        userInfo: { ...userInfo }
      });

      setPaymentStatus('pending');
      setTimeRemaining(600); // Reset timer
      onPaymentOpen();

    } catch (error) {
      console.error('Payment generation error:', error);
      alert('Failed to generate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (paymentStatus === 'pending' && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setPaymentStatus('failed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paymentStatus, timeRemaining]);

  // Payment verification effect
  useEffect(() => {
    let verificationInterval: NodeJS.Timeout;

    if (paymentStatus === 'pending' && paymentData) {
      verificationInterval = setInterval(async () => {
        try {
          const merchant = 'OK1453563';
          const keyorkut = '584312217038625421453563OKCT6AF928C85E124621785168CD18A9B693';
          const statusUrl = `https://api.jkt48connect.my.id/api/orkut/cekstatus?merchant=${merchant}&keyorkut=${keyorkut}&amount=${paymentData.total}&api_key=JKTCONNECT`;
          
          const response = await axios.get(statusUrl);
          
          if (response.data.status === 'success' && Array.isArray(response.data.data) && response.data.data.length > 0) {
            const transaction = response.data.data[0];
            setTransactionData(transaction);
            setPaymentStatus('checking');
            
            // Create API Key - FIXED VERSION
            try {
              console.log('Creating API key with params:', {
                owner: paymentData.userInfo.name,
                email: paymentData.userInfo.email,
                packageType: selectedPackage,
                customKey: paymentData.userInfo.customKey || undefined
              });

              // Import the package dynamically to ensure fresh instance
              const jkt48Api = require('@jkt48/core');
              
              // Use the same pattern as your working bot code
              const result = await jkt48Api.admin.createKey(
                paymentData.userInfo.name,                    // owner
                paymentData.userInfo.email,                   // email
                selectedPackage,                              // packageType (basic/premium/enterprise)
                paymentData.userInfo.customKey || undefined   // customApiKey (undefined if empty)
              );

              console.log('API Key creation result:', result);

              // Validate response
              if (result && result.status === true && result.data) {
                setApiKeyResult(result.data);
                setPaymentStatus('success');
                onPaymentOpenChange(); // Close payment modal
                onSuccessOpen(); // Open success modal
              } else {
                throw new Error(result?.message || 'Invalid response from server - no data returned');
              }
              
            } catch (apiError) {
              console.error('API Key creation error:', apiError);
              
              // Try alternative method using require() like in your bot code
              try {
                console.log('Trying alternative method with require...');
                
                // This might work better in some environments
                const jkt48Api = require('@jkt48/core');
                
                const altResult = await jkt48Api.admin.createKey(
                  paymentData.userInfo.name,
                  paymentData.userInfo.email,
                  selectedPackage,
                  paymentData.userInfo.customKey || undefined
                );

                console.log('Alternative method result:', altResult);

                if (altResult && altResult.status === true && altResult.data) {
                  setApiKeyResult(altResult.data);
                  setPaymentStatus('success');
                  onPaymentOpenChange();
                  onSuccessOpen();
                } else {
                  throw new Error(altResult?.message || 'Alternative method failed - no valid response');
                }
                
              } catch (altError) {
                console.error('Both methods failed:', altError);
                setPaymentStatus('failed');
                
                const errorMessage = apiError instanceof Error ? apiError.message : 'Unknown error occurred';
                alert(`Payment successful but failed to create API Key: ${errorMessage}\n\nTransaction ID: ${transaction.buyer_reff}\nPlease contact support with this information.`);
              }
            }
          }
        } catch (error) {
          console.error('Payment verification error:', error);
        }
      }, 5000);
    }

    return () => {
      if (verificationInterval) clearInterval(verificationInterval);
    };
  }, [paymentStatus, paymentData, selectedPackage, onPaymentOpenChange, onSuccessOpen]);

  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Reset form
  const resetForm = () => {
    setSelectedPackage('');
    setUserInfo({ name: '', email: '', customKey: '' });
    setPaymentData(null);
    setPaymentStatus('idle');
    setApiKeyResult(null);
    setTransactionData(null);
    setTimeRemaining(600);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full max-w-6xl">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>API Store</BreadcrumbItem>
        </Breadcrumbs>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JKT48Connect API Store</h1>
          <p className="text-lg text-default-600">
            Dapatkan akses ke API JKT48Connect dengan berbagai paket yang sesuai kebutuhan Anda
          </p>
        </div>

        {/* Package Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(API_PACKAGES).map(([key, pkg]) => (
            <Card 
              key={key} 
              isPressable
              isHoverable
              shadow="sm"
              className={`cursor-pointer transition-all ${
                selectedPackage === key ? 'ring-2 ring-primary scale-105' : ''
              }`}
              onPress={() => setSelectedPackage(key)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h3 className="text-xl font-bold">{pkg.name}</h3>
                    <p className="text-default-500 text-sm">{pkg.description}</p>
                  </div>
                  <Chip color={pkg.color} variant="flat" size="sm">
                    {pkg.name}
                  </Chip>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="mb-4">
                  <span className="text-3xl font-bold">Rp {pkg.price.toLocaleString()}</span>
                  <span className="text-default-500">/month</span>
                </div>
                <div className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Purchase Form */}
        {selectedPackage && (
          <Card className="mb-8">
            <CardHeader>
              <h3 className="text-xl font-bold">Purchase Information</h3>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  isRequired
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={userInfo.name}
                  onValueChange={(value) => setUserInfo(prev => ({ ...prev, name: value }))}
                />
                <Input
                  isRequired
                  type="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  value={userInfo.email}
                  onValueChange={(value) => setUserInfo(prev => ({ ...prev, email: value }))}
                />
                <Input
                  label="Custom API Key (Optional)"
                  placeholder="Leave empty for auto-generated key"
                  value={userInfo.customKey}
                  onValueChange={(value) => setUserInfo(prev => ({ ...prev, customKey: value }))}
                  description="If empty, a random API key will be generated"
                />
              </div>
              
              <div className="mt-6 flex justify-center">
                <Button
                  color="primary"
                  size="lg"
                  isLoading={loading}
                  onPress={handlePurchase}
                  isDisabled={!selectedPackage || !userInfo.name || !userInfo.email}
                >
                  Purchase API Key - Rp {API_PACKAGES[selectedPackage]?.price.toLocaleString()}
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {/* How to Use Section */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold">How to Use JKT48Connect API</h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Installation</h4>
                <code className="bg-default-100 px-3 py-2 rounded block">
                  npm install @jkt48/core
                </code>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Basic Usage</h4>
                <pre className="bg-default-100 p-4 rounded text-sm overflow-x-auto">
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
          </CardBody>
        </Card>
      </div>

      {/* Payment Modal */}
      <Modal 
        isOpen={isPaymentOpen} 
        onOpenChange={onPaymentOpenChange}
        size="2xl"
        isDismissable={false}
        hideCloseButton
      >
        <ModalContent>
          <ModalHeader>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">Complete Payment</h3>
              <p className="text-sm text-default-500">
                Time remaining: {formatTime(timeRemaining)}
              </p>
            </div>
          </ModalHeader>
          <ModalBody>
            {paymentData && (
              <div className="space-y-4">
                {/* Payment Info */}
                <Card>
                  <CardBody>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-default-500">Package</p>
                        <p className="font-semibold">{paymentData.packageInfo.name}</p>
                      </div>
                      <div>
                        <p className="text-default-500">Owner</p>
                        <p className="font-semibold">{paymentData.userInfo.name}</p>
                      </div>
                      <div>
                        <p className="text-default-500">Amount</p>
                        <p className="font-semibold">Rp {paymentData.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-default-500">Fee</p>
                        <p className="font-semibold">Rp {paymentData.fee.toLocaleString()}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-default-500">Total</p>
                        <p className="font-bold text-lg">Rp {paymentData.total.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* QR Code */}
                <div className="text-center">
                  <p className="mb-4">Scan QR code below to complete payment</p>
                  <Image
                    src={paymentData.qrImageUrl}
                    alt="Payment QR Code"
                    width={250}
                    height={250}
                    className="mx-auto"
                  />
                </div>

                {/* Status */}
                <div className="text-center">
                  {paymentStatus === 'pending' && (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm">Waiting for payment...</span>
                    </div>
                  )}
                  {paymentStatus === 'checking' && (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-success"></div>
                      <span className="text-sm">Creating API Key...</span>
                    </div>
                  )}
                  {paymentStatus === 'failed' && (
                    <p className="text-danger">Payment timeout or failed</p>
                  )}
                </div>

                {/* Progress */}
                <Progress 
                  value={(600 - timeRemaining) / 600 * 100} 
                  color="primary"
                  size="sm"
                />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button 
              color="danger" 
              variant="light" 
              onPress={() => {
                setPaymentStatus('idle');
                onPaymentOpenChange();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Success Modal */}
<Modal 
  isOpen={isSuccessOpen} 
  onOpenChange={onSuccessOpenChange}
  size="full"
  scrollBehavior="inside"
  classNames={{
    base: "sm:max-w-3xl sm:mx-4",
    body: "p-4",
    header: "p-4 pb-2",
    footer: "p-4 pt-2"
  }}
>
  <ModalContent>
    <ModalHeader>
      <div className="text-center w-full">
        <h3 className="text-lg sm:text-xl font-bold text-success">🎉 API Key Created Successfully!</h3>
      </div>
    </ModalHeader>
    <ModalBody>
      {apiKeyResult && transactionData && (
        <div className="space-y-4">
          {/* API Key Details Card */}
          <Card>
            <CardBody className="p-3 sm:p-4">
              <h4 className="font-semibold mb-3 text-sm sm:text-base">API Key Details</h4>
              <div className="space-y-3">
                {/* API Key - Full width on mobile */}
                <div>
                  <p className="text-default-500 text-xs sm:text-sm mb-1">API Key</p>
                  <div className="bg-default-100 p-2 rounded text-xs break-all">
                    <code className="select-all">{apiKeyResult.key}</code>
                  </div>
                  <p className="text-xs text-default-400 mt-1">Tap to select all</p>
                </div>
                
                {/* Two columns on larger screens, single column on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <p className="text-default-500">Owner</p>
                    <p className="font-semibold break-words">{apiKeyResult.owner}</p>
                  </div>
                  <div>
                    <p className="text-default-500">Email</p>
                    <p className="font-semibold break-words">{apiKeyResult.email}</p>
                  </div>
                  <div>
                    <p className="text-default-500">Package</p>
                    <p className="font-semibold capitalize">{apiKeyResult.package}</p>
                  </div>
                  <div>
                    <p className="text-default-500">Limit</p>
                    <p className="font-semibold">{apiKeyResult.limit.toLocaleString()} requests</p>
                  </div>
                  <div>
                    <p className="text-default-500">Status</p>
                    <Chip color="success" size="sm" className="text-xs">
                      {apiKeyResult.active ? 'Active' : 'Inactive'}
                    </Chip>
                  </div>
                  <div>
                    <p className="text-default-500">Created</p>
                    <p className="font-semibold text-xs sm:text-sm">
                      {new Date(apiKeyResult.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-default-400">
                      {new Date(apiKeyResult.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                {/* Expiry - Full width */}
                <div className="border-t pt-3">
                  <p className="text-default-500 text-xs sm:text-sm">Expires</p>
                  <p className="font-semibold text-sm sm:text-base">
                    {new Date(apiKeyResult.expireAt).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-default-400">
                    {new Date(apiKeyResult.expireAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Transaction Details Card */}
          <Card>
            <CardBody className="p-3 sm:p-4">
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Transaction Details</h4>
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-default-500">Amount Paid</p>
                    <p className="font-semibold">Rp {transactionData.amount}</p>
                  </div>
                  <div>
                    <p className="text-default-500">Date</p>
                    <p className="font-semibold text-xs sm:text-sm">
                      {transactionData.date}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-default-500">Transaction ID</p>
                  <div className="bg-default-100 p-2 rounded mt-1">
                    <code className="text-xs break-all select-all">{transactionData.buyer_reff}</code>
                  </div>
                  <p className="text-xs text-default-400 mt-1">Tap to select all</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Important Notes */}
          <div className="bg-warning-50 border border-warning-200 rounded-lg p-3 sm:p-4">
            <h4 className="font-semibold text-warning-800 mb-2 text-sm sm:text-base">Important Notes:</h4>
            <ul className="text-xs sm:text-sm text-warning-700 space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="text-warning-600 mt-0.5">•</span>
                <span>Keep your API key secure and don't share it publicly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning-600 mt-0.5">•</span>
                <span>Your API key is ready to use immediately</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning-600 mt-0.5">•</span>
                <span>Monitor your usage to avoid exceeding limits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning-600 mt-0.5">•</span>
                <span>Contact support if you need assistance</span>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <Card className="bg-primary-50/50">
            <CardBody className="p-3 sm:p-4">
              <h4 className="font-semibold mb-2 text-sm sm:text-base text-primary-800">Quick Start</h4>
              <p className="text-xs sm:text-sm text-primary-700 mb-3">
                Copy this code to start using your API key:
              </p>
              <div className="bg-default-900 text-default-50 p-3 rounded text-xs overflow-x-auto">
                <code className="whitespace-pre select-all">
{`const jkt48Api = require('@jkt48/core');
const members = await jkt48Api.members('${apiKeyResult.key}');`}
                </code>
              </div>
              <p className="text-xs text-primary-600 mt-2">Tap code to select all</p>
            </CardBody>
          </Card>
        </div>
      )}
    </ModalBody>
    <ModalFooter className="flex flex-col sm:flex-row gap-2">
      <Button 
        color="primary" 
        className="w-full sm:w-auto order-2 sm:order-1"
        onPress={() => {
          onSuccessOpenChange();
          resetForm();
        }}
      >
        Create Another API Key
      </Button>
      <Button 
        color="success" 
        variant="light" 
        className="w-full sm:w-auto order-1 sm:order-2"
        onPress={onSuccessOpenChange}
      >
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </section>
  );
}
