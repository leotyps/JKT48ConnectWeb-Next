
"use client"

import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader, Image, Skeleton, Breadcrumbs, BreadcrumbItem, Chip, Link, Input, Select, SelectItem, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Avatar, Divider, Tabs, Tab, Progress, Textarea } from "@heroui/react";
import axios from 'axios';

interface APIPackage {
  name: string;
  price: number;
  limit: number;
  description: string;
  features: string[];
  color: "primary" | "secondary" | "success" | "warning" | "danger";
}

interface PaymentData {
  packageType: string;
  owner: string;
  email: string;
  customApiKey?: string;
  amount: number;
  fee: number;
  total: number;
  qrImageUrl?: string;
  transactionId?: string;
  status: 'pending' | 'processing' | 'success' | 'failed' | 'expired';
  createdAt: Date;
}

interface APIKeyResult {
  key: string;
  owner: string;
  email: string;
  package: string;
  limit: number;
  active: boolean;
  createdAt: string;
  expireAt: string;
}

export default function BuyAPIKey() {
  // Package definitions
  const API_PACKAGES: Record<string, APIPackage> = {
    basic: {
      name: 'Basic',
      price: 2500,
      limit: 1000,
      description: 'Cocok untuk penggunaan personal',
      features: ['1,000 requests/bulan', 'Basic support', 'Standard rate limiting'],
      color: 'primary'
    },
    premium: {
      name: 'Premium',
      price: 6500,
      limit: 5000,
      description: 'Cocok untuk aplikasi kecil',
      features: ['5,000 requests/bulan', 'Priority support', 'Higher rate limits', 'Custom API key'],
      color: 'secondary'
    },
    enterprise: {
      name: 'Enterprise',
      price: 35000,
      limit: 25000,
      description: 'Cocok untuk aplikasi besar',
      features: ['25,000 requests/bulan', '24/7 support', 'No rate limiting', 'Custom API key', 'Premium features'],
      color: 'success'
    }
  };

  // States
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [customApiKey, setCustomApiKey] = useState('');
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'creating' | 'waiting' | 'processing' | 'success' | 'failed'>('idle');
  const [apiKeyResult, setApiKeyResult] = useState<APIKeyResult | null>(null);
  const [countdown, setCountdown] = useState(600); // 10 minutes
  
  // Modal states
  const {isOpen: isPaymentOpen, onOpen: onPaymentOpen, onOpenChange: onPaymentOpenChange} = useDisclosure();
  const {isOpen: isResultOpen, onOpen: onResultOpen, onOpenChange: onResultOpenChange} = useDisclosure();

  // Payment verification interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout;

    if (paymentStatus === 'waiting' && paymentData) {
      // Countdown timer
      countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setPaymentStatus('failed');
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Payment verification
      interval = setInterval(async () => {
        try {
          const merchant = 'OK1453563';
          const keyorkut = '584312217038625421453563OKCT6AF928C85E124621785168CD18A9B693';
          
          const statusRes = await axios.get(
            `https://api.jkt48connect.my.id/api/orkut/cekstatus?merchant=${merchant}&keyorkut=${keyorkut}&amount=${paymentData.total}&api_key=JKTCONNECT`
          );
          
          if (statusRes.data.status === 'success' && Array.isArray(statusRes.data.data) && statusRes.data.data.length > 0) {
            const trx = statusRes.data.data[0];
            setPaymentStatus('processing');
            
            // Create API Key
            try {
              // Simulate API key creation (replace with actual API call)
              const apiKeyData: APIKeyResult = {
                key: customApiKey || `JKT48_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                owner: paymentData.owner,
                email: paymentData.email,
                package: paymentData.packageType,
                limit: API_PACKAGES[paymentData.packageType].limit,
                active: true,
                createdAt: new Date().toISOString(),
                expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
              };
              
              setApiKeyResult(apiKeyData);
              setPaymentStatus('success');
              onPaymentOpenChange();
              onResultOpen();
              
            } catch (apiError) {
              console.error('Error creating API key:', apiError);
              setPaymentStatus('failed');
            }
            
            clearInterval(interval);
            clearInterval(countdownInterval);
          }
        } catch (error) {
          console.error('Payment verification error:', error);
        }
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [paymentStatus, paymentData, customApiKey, onPaymentOpenChange, onResultOpen]);

  const calculateFee = (amount: number) => {
    const feePercentage = Math.random() * (0.05 - 0.01) + 0.01;
    return Math.ceil(amount * feePercentage);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const validateForm = () => {
    if (!selectedPackage || !owner.trim() || !email.trim()) {
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePurchase = async () => {
    if (!validateForm()) {
      alert('Please fill all required fields with valid information');
      return;
    }

    setLoading(true);
    setPaymentStatus('creating');

    try {
      const pkg = API_PACKAGES[selectedPackage];
      const amount = pkg.price;
      const fee = calculateFee(amount);
      const total = amount + fee;

      // Generate QRIS
      const apiUrl = `https://api.jkt48connect.my.id/api/orkut/createpayment?amount=${total}&qris=00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214149391352933240303UMI51440014ID.CO.QRIS.WWW0215ID20233077025890303UMI5204541153033605802ID5919VALZSTORE%20OK14535636006SERANG61054211162070703A016304DCD2&api_key=JKTCONNECT`;
      const qrisRes = await axios.get(apiUrl);
      
      if (!qrisRes.data.qrImageUrl) {
        throw new Error('QR Code generation failed');
      }

      const payment: PaymentData = {
        packageType: selectedPackage,
        owner: owner.trim(),
        email: email.trim(),
        customApiKey: customApiKey.trim() || undefined,
        amount,
        fee,
        total,
        qrImageUrl: qrisRes.data.qrImageUrl,
        transactionId: `TXN_${Date.now()}`,
        status: 'pending',
        createdAt: new Date()
      };

      setPaymentData(payment);
      setPaymentStatus('waiting');
      setCountdown(600); // Reset countdown
      onPaymentOpen();

    } catch (error) {
      console.error('Purchase error:', error);
      setPaymentStatus('failed');
      alert('Failed to create payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPaymentStatus('idle');
    setPaymentData(null);
    setApiKeyResult(null);
    setCountdown(600);
    onPaymentOpenChange();
  };

  const resetForm = () => {
    setSelectedPackage('');
    setOwner('');
    setEmail('');
    setCustomApiKey('');
    setPaymentData(null);
    setApiKeyResult(null);
    setPaymentStatus('idle');
    setCountdown(600);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
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
            Choose the perfect API package for your application needs
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(API_PACKAGES).map(([key, pkg]) => (
            <Card 
              key={key}
              isPressable
              isHoverable
              className={`${selectedPackage === key ? 'ring-2 ring-primary' : ''} transition-all duration-200`}
              onPress={() => setSelectedPackage(key)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h3 className="text-xl font-bold">{pkg.name}</h3>
                    <p className="text-small text-default-500">{pkg.description}</p>
                  </div>
                  <Chip color={pkg.color} variant="flat">
                    {key === 'enterprise' ? 'Popular' : key === 'premium' ? 'Best Value' : 'Starter'}
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
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <h2 className="text-2xl font-bold">Purchase API Key</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={owner}
              onValueChange={setOwner}
              isRequired
              description="This will be used as the API key owner"
            />
            
            <Input
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              value={email}
              onValueChange={setEmail}
              isRequired
              description="We'll send the API key details to this email"
            />
            
            <Input
              label="Custom API Key (Optional)"
              placeholder="Enter custom API key (leave empty for auto-generated)"
              value={customApiKey}
              onValueChange={setCustomApiKey}
              description="Must be unique and contain only alphanumeric characters"
            />

            {selectedPackage && (
              <Card className="bg-default-50">
                <CardBody>
                  <h4 className="font-semibold mb-2">Order Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Package:</span>
                      <span className="font-medium">{API_PACKAGES[selectedPackage].name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Limit:</span>
                      <span>{API_PACKAGES[selectedPackage].limit.toLocaleString()} requests</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Package Price:</span>
                      <span>Rp {API_PACKAGES[selectedPackage].price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fee:</span>
                      <span>~Rp {calculateFee(API_PACKAGES[selectedPackage].price).toLocaleString()}</span>
                    </div>
                    <Divider />
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>~Rp {(API_PACKAGES[selectedPackage].price + calculateFee(API_PACKAGES[selectedPackage].price)).toLocaleString()}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}
          </CardBody>
          <CardFooter>
            <div className="flex gap-2 w-full">
              <Button
                color="danger"
                variant="flat"
                onPress={resetForm}
                isDisabled={loading}
              >
                Reset
              </Button>
              <Button
                color="primary"
                onPress={handlePurchase}
                isLoading={loading}
                isDisabled={!validateForm()}
                className="flex-1"
              >
                {loading ? 'Creating Payment...' : 'Purchase API Key'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Payment Modal */}
      <Modal 
        isOpen={isPaymentOpen} 
        onOpenChange={onPaymentOpenChange}
        size="2xl"
        isDismissable={false}
        hideCloseButton={paymentStatus === 'processing'}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex items-center gap-2">
                  {paymentStatus === 'waiting' && (
                    <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
                  )}
                  {paymentStatus === 'processing' && (
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                  Payment {paymentStatus === 'waiting' ? 'Pending' : paymentStatus === 'processing' ? 'Processing' : 'Status'}
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
                            <span className="text-default-500">Package:</span>
                            <p className="font-medium">{API_PACKAGES[paymentData.packageType].name}</p>
                          </div>
                          <div>
                            <span className="text-default-500">Owner:</span>
                            <p className="font-medium">{paymentData.owner}</p>
                          </div>
                          <div>
                            <span className="text-default-500">Email:</span>
                            <p className="font-medium">{paymentData.email}</p>
                          </div>
                          <div>
                            <span className="text-default-500">Total:</span>
                            <p className="font-medium">Rp {paymentData.total.toLocaleString()}</p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    {/* QR Code and Status */}
                    {paymentStatus === 'waiting' && paymentData.qrImageUrl && (
                      <div className="text-center space-y-4">
                        <div>
                          <p className="text-lg font-semibold mb-2">Scan QR Code to Pay</p>
                          <p className="text-default-500 text-sm mb-4">
                            Time remaining: {formatTime(countdown)}
                          </p>
                          <Progress 
                            value={(countdown / 600) * 100} 
                            color="warning"
                            className="mb-4"
                          />
                        </div>
                        
                        <Image
                          src={paymentData.qrImageUrl}
                          alt="QR Code"
                          width={300}
                          height={300}
                          className="mx-auto"
                        />
                        
                        <p className="text-sm text-default-500">
                          Payment will be verified automatically after completion
                        </p>
                      </div>
                    )}

                    {paymentStatus === 'processing' && (
                      <div className="text-center space-y-4">
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                        <div>
                          <p className="text-lg font-semibold">Payment Received!</p>
                          <p className="text-default-500">Creating your API key...</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                {paymentStatus === 'waiting' && (
                  <Button color="danger" variant="light" onPress={handleCancel}>
                    Cancel Payment
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Success Result Modal */}
      <Modal 
        isOpen={isResultOpen} 
        onOpenChange={onResultOpenChange}
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-success">
                ✅ API Key Created Successfully!
              </ModalHeader>
              <ModalBody>
                {apiKeyResult && (
                  <div className="space-y-4">
                    <Card className="bg-success-50">
                      <CardBody>
                        <h4 className="font-semibold mb-4">Your API Key Details</h4>
                        
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-default-500">API Key:</span>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="bg-default-100 p-2 rounded text-xs flex-1 font-mono">
                                {apiKeyResult.key}
                              </code>
                              <Button
                                size="sm"
                                isIconOnly
                                variant="flat"
                                onPress={() => navigator.clipboard.writeText(apiKeyResult.key)}
                              >
                                📋
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-default-500">Owner:</span>
                              <p className="font-medium">{apiKeyResult.owner}</p>
                            </div>
                            <div>
                              <span className="text-default-500">Package:</span>
                              <p className="font-medium">{apiKeyResult.package}</p>
                            </div>
                            <div>
                              <span className="text-default-500">Monthly Limit:</span>
                              <p className="font-medium">{apiKeyResult.limit.toLocaleString()} requests</p>
                            </div>
                            <div>
                              <span className="text-default-500">Status:</span>
                              <Chip color="success" size="sm">Active</Chip>
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-default-500">Valid Until:</span>
                            <p className="font-medium">
                              {new Date(apiKeyResult.expireAt).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Card>
                      <CardBody>
                        <h4 className="font-semibold mb-2">Next Steps</h4>
                        <ul className="text-sm space-y-1 text-default-600">
                          <li>• Save your API key in a secure location</li>
                          <li>• Check your email for detailed documentation</li>
                          <li>• Start integrating with our API endpoints</li>
                          <li>• Monitor your usage in the dashboard</li>
                        </ul>
                      </CardBody>
                    </Card>

                    <div className="flex gap-2">
                      <Button
                        as={Link}
                        href="https://docs.jkt48connect.my.id"
                        isExternal
                        variant="flat"
                        startContent={📚}
                      >
                        Documentation
                      </Button>
                      <Button
                        as={Link}
                        href="https://dashboard.jkt48connect.my.id"
                        isExternal
                        variant="flat"
                        startContent={📊}
                      >
                        Dashboard
                      </Button>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="primary" 
                  onPress={() => {
                    onClose();
                    resetForm();
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
