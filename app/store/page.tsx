"use client"

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Input, Select, SelectItem, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Progress } from "@heroui/react";
import axios from "axios";

interface APIKey {
  key: string;
  owner: string;
  email: string;
  type: string;
  limit: number;
  active: boolean;
  createdAt: string;
  expireAt: string;
}

interface PaymentData {
  qrImageUrl: string;
  amount: number;
  fee: number;
  total: number;
}

interface AddLimitPlan {
  name: string;
  additionalLimit: number;
  price: number;
}

interface AddExpiryPlan {
  name: string;
  additionalDays: number;
  price: number;
}

const ADD_LIMIT_PLANS: AddLimitPlan[] = [
  { name: 'Small Boost', additionalLimit: 1000, price: 2000 },
  { name: 'Medium Boost', additionalLimit: 2500, price: 5000 },
  { name: 'Large Boost', additionalLimit: 5000, price: 8000 }
];

const ADD_EXPIRY_PLANS: AddExpiryPlan[] = [
  { name: '1 Month', additionalDays: 30, price: 2350 },
  { name: '3 Months', additionalDays: 90, price: 6500 },
  { name: '6 Months', additionalDays: 180, price: 12000 }
];

export default function JKT48APIStore() {
  const [apiKey, setApiKey] = useState<string>('');
  const [action, setAction] = useState<'addLimit' | 'addExpiry'>('addLimit');
  const [selectedPlan, setSelectedPlan] = useState<string | number>('custom');
  const [customQuantity, setCustomQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'checking' | 'success' | 'failed'>('idle');
  const [apiKeyResult, setApiKeyResult] = useState<APIKey | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  
  // Modal states
  const { isOpen: isPaymentOpen, onOpen: onPaymentOpen, onOpenChange: onPaymentOpenChange } = useDisclosure();
  const { isOpen: isSuccessOpen, onOpen: onSuccessOpen, onOpenChange: onSuccessOpenChange } = useDisclosure();

  // Calculate fee (1-5% random)
  const calculateFee = (amount: number) => {
    const feePercentage = Math.random() * (0.05 - 0.01) + 0.01;
    return Math.ceil(amount * feePercentage);
  };

  // Handle form submission
  const handlePurchase = async () => {
    if (!apiKey || (selectedPlan === 'custom' && (isNaN(customQuantity) || customQuantity <= 0))) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      let amount;
      let quantity;

      if (selectedPlan !== 'custom') {
        quantity = action === 'addLimit' ? ADD_LIMIT_PLANS.find(plan => plan.name === selectedPlan)?.additionalLimit || 0 :
                   ADD_EXPIRY_PLANS.find(plan => plan.name === selectedPlan)?.additionalDays || 0;
        amount = action === 'addLimit' ? ADD_LIMIT_PLANS.find(plan => plan.name === selectedPlan)?.price || 0 :
                  ADD_EXPIRY_PLANS.find(plan => plan.name === selectedPlan)?.price || 0;
      } else {
        quantity = customQuantity;
        amount = quantity * 20; // Custom price per unit
      }

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
        total
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
            setPaymentStatus('checking');
            
            // Update API Key Limit or Expiry
            try {
              const jkt48Api = require('@jkt48/core');
              
              let result;
              if (action === 'addLimit') {
                result = await jkt48Api.admin.addLimit(apiKey, selectedPlan === 'custom' ? customQuantity * 1000 : quantity);
              } else if (action === 'addExpiry') {
                result = await jkt48Api.admin.addExpiry(apiKey, selectedPlan === 'custom' ? customQuantity : quantity);
              }

              if (result && result.status === true && result.data) {
                setApiKeyResult(result.data);
                setPaymentStatus('success');
                onPaymentOpenChange(); // Close payment modal
                onSuccessOpen(); // Open success modal
              } else {
                throw new Error(result?.message || 'Invalid response from server - no data returned');
              }
              
            } catch (apiError) {
              console.error('API Key update error:', apiError);
              setPaymentStatus('failed');
              
              const errorMessage = apiError instanceof Error ? apiError.message : 'Unknown error occurred';
              alert(`Payment successful but failed to update API Key: ${errorMessage}\n\nPlease contact support with this information.`);
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
  }, [paymentStatus, paymentData, action, apiKey, selectedPlan, customQuantity, quantity, onPaymentOpenChange, onSuccessOpen]);

  // Format time remaining
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Reset form
  const resetForm = () => {
    setApiKey('');
    setAction('addLimit');
    setSelectedPlan('custom');
    setCustomQuantity(1);
    setPaymentData(null);
    setPaymentStatus('idle');
    setApiKeyResult(null);
    setTimeRemaining(600);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JKT48Connect API Store</h1>
          <p className="text-lg text-default-600">
            Manage your API key limits and expiry.
          </p>
        </div>

        {/* Purchase Form */}
        <Card className="mb-8">
          <CardHeader>
            <h3 className="text-xl font-bold">Purchase Information</h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                isRequired
                label="API Key"
                placeholder="Enter your API Key"
                value={apiKey}
                onValueChange={(value) => setApiKey(value)}
              />
              <Select
                isRequired
                label="Action"
                value={action}
                onValueChange={(value) => setAction(value as 'addLimit' | 'addExpiry')}
              >
                <SelectItem value="addLimit">Add Limit</SelectItem>
                <SelectItem value="addExpiry">Add Expiry</SelectItem>
              </Select>
              <Select
                isRequired
                label="Plan"
                value={selectedPlan}
                onValueChange={(value) => setSelectedPlan(value)}
              >
                <SelectItem value="custom">Custom</SelectItem>
                {action === 'addLimit' ? ADD_LIMIT_PLANS.map(plan => (
                  <SelectItem key={plan.name} value={plan.name}>{plan.name} (+{plan.additionalLimit} limit)</SelectItem>
                )) : ADD_EXPIRY_PLANS.map(plan => (
                  <SelectItem key={plan.name} value={plan.name}>{plan.name} (+{plan.additionalDays} days)</SelectItem>
                ))}
              </Select>
              {selectedPlan === 'custom' && (
                <Input
                  isRequired
                  type="number"
                  label="Custom Quantity"
                  placeholder="Enter quantity"
                  value={customQuantity}
                  onValueChange={(value) => setCustomQuantity(Number(value))}
                  description={action === 'addLimit' ? 'Quantity is in thousands of API calls' : 'Quantity is in days'}
                />
              )}
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button
                color="primary"
                size="lg"
                isLoading={loading}
                onPress={handlePurchase}
                isDisabled={!apiKey || (selectedPlan === 'custom' && (isNaN(customQuantity) || customQuantity <= 0))}
              >
                Purchase - Rp {(selectedPlan === 'custom' ? customQuantity * 20 : (action === 'addLimit' ? ADD_LIMIT_PLANS.find(plan => plan.name === selectedPlan)?.price || 0 : ADD_EXPIRY_PLANS.find(plan => plan.name === selectedPlan)?.price || 0)).toLocaleString()}
              </Button>
            </div>
          </CardBody>
        </Card>

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
                          <p className="text-default-500">Action</p>
                          <p className="font-semibold">{action === 'addLimit' ? 'Add Limit' : 'Add Expiry'}</p>
                        </div>
                        <div>
                          <p className="text-default-500">Quantity</p>
                          <p className="font-semibold">{selectedPlan === 'custom' ? customQuantity : quantity}</p>
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
                        <span className="text-sm">Updating API Key...</span>
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
                <h3 className="text-lg sm:text-xl font-bold text-success">🎉 Update Successful!</h3>
              </div>
            </ModalHeader>
            <ModalBody>
              {apiKeyResult && (
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
                            <p className="text-default-500">Type</p>
                            <p className="font-semibold capitalize">{apiKeyResult.type}</p>
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
                Update Another API Key
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
      </div>
    </section>
  );
}
