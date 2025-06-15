"use client"

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Chip, Progress, Tabs, Tab, Breadcrumbs, BreadcrumbItem, Image } from "@heroui/react";
// Using fetch instead of axios

interface BoostPlan {
  name: string;
  type: 'limit' | 'expiry';
  value: number;
  price: number;
  description: string;
  color: "primary" | "secondary" | "success" | "warning" | "danger";
}

interface PaymentData {
  qrImageUrl: string;
  amount: number;
  fee: number;
  total: number;
  planInfo: BoostPlan;
  apiKey: string;
  customValue?: number;
}

interface BoostResult {
  key: string;
  owner: string;
  email: string;
  type: string;
  previousLimit?: number;
  additionalLimit?: number;
  newLimit?: string;
  previousExpireAt?: string;
  additionalDays?: number;
  newExpireAt?: string;
  active: boolean;
  createdAt: string;
  expireAt?: string;
}

const BOOST_PLANS: Record<string, BoostPlan> = {
  // Limit Plans
  small_limit: {
    name: 'Small Boost',
    type: 'limit',
    value: 1000,
    price: 2000,
    description: 'Add 1,000 API calls',
    color: 'primary'
  },
  medium_limit: {
    name: 'Medium Boost',
    type: 'limit',
    value: 2500,
    price: 5000,
    description: 'Add 2,500 API calls',
    color: 'secondary'
  },
  large_limit: {
    name: 'Large Boost',
    type: 'limit',
    value: 5000,
    price: 8000,
    description: 'Add 5,000 API calls',
    color: 'success'
  },
  // Expiry Plans
  week_extend: {
    name: '1 Week',
    type: 'expiry',
    value: 7,
    price: 1000,
    description: 'Extend 7 days',
    color: 'primary'
  },
  month_extend: {
    name: '1 Month',
    type: 'expiry',
    value: 30,
    price: 2350,
    description: 'Extend 30 days',
    color: 'secondary'
  },
  quarter_extend: {
    name: '3 Months',
    type: 'expiry',
    value: 90,
    price: 6000,
    description: 'Extend 90 days',
    color: 'success'
  }
};

export default function JKT48APIBoost() {
  const [activeTab, setActiveTab] = useState('limit');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'checking' | 'success' | 'failed'>('idle');
  const [boostResult, setBoostResult] = useState<BoostResult | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(600);
  
  const {isOpen: isPaymentOpen, onOpen: onPaymentOpen, onOpenChange: onPaymentOpenChange} = useDisclosure();
  const {isOpen: isSuccessOpen, onOpen: onSuccessOpen, onOpenChange: onSuccessOpenChange} = useDisclosure();

  const calculateCustomPrice = (value: number) => value * 20;
  const calculateFee = (amount: number) => Math.ceil(amount * (Math.random() * 0.04 + 0.01));

  const handlePurchase = async () => {
    if (!apiKey || (!selectedPlan && !customValue)) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      let planInfo: BoostPlan;
      let finalValue: number;

      if (selectedPlan) {
        planInfo = BOOST_PLANS[selectedPlan];
        finalValue = planInfo.value;
      } else {
        const value = parseInt(customValue);
        if (isNaN(value) || value <= 0) {
          alert('Please enter a valid number');
          return;
        }
        planInfo = {
          name: `Custom ${activeTab === 'limit' ? 'Limit' : 'Extension'}`,
          type: activeTab as 'limit' | 'expiry',
          value,
          price: calculateCustomPrice(value),
          description: `${activeTab === 'limit' ? 'Add ' + value + ' API calls' : 'Extend ' + value + ' days'}`,
          color: 'warning'
        };
        finalValue = value;
      }

      const amount = planInfo.price;
      const fee = calculateFee(amount);
      const total = amount + fee;

      const qrisUrl = `https://api.jkt48connect.my.id/api/orkut/createpayment?amount=${total}&qris=00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214149391352933240303UMI51440014ID.CO.QRIS.WWW0215ID20233077025890303UMI5204541153033605802ID5919VALZSTORE%20OK14535636006SERANG61054211162070703A016304DCD2&api_key=JKTCONNECT`;
      
      const response = await fetch(qrisUrl);
      const data = await response.json();
      
      if (!response.data.qrImageUrl) {
        throw new Error('Failed to generate QR code');
      }

      setPaymentData({
        qrImageUrl: response.data.qrImageUrl,
        amount,
        fee,
        total,
        planInfo,
        apiKey,
        customValue: selectedPlan ? undefined : finalValue
      });

      setPaymentStatus('pending');
      setTimeRemaining(600);
      onPaymentOpen();

    } catch (error) {
      console.error('Payment generation error:', error);
      alert('Failed to generate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Timer and verification effects (simplified)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (paymentStatus === 'pending' && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev <= 1 ? 0 : prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [paymentStatus, timeRemaining]);

  useEffect(() => {
    let verificationInterval: NodeJS.Timeout;
    if (paymentStatus === 'pending' && paymentData) {
      verificationInterval = setInterval(async () => {
        try {
          const statusUrl = `https://api.jkt48connect.my.id/api/orkut/cekstatus?merchant=OK1453563&keyorkut=584312217038625421453563OKCT6AF928C85E124621785168CD18A9B693&amount=${paymentData.total}&api_key=JKTCONNECT`;
          const response = await axios.get(statusUrl);
          
          if (response.data.status === 'success' && response.data.data?.length > 0) {
            setPaymentStatus('checking');
            
            try {
              const jkt48Api = require('@jkt48/core');
              let result;

              if (paymentData.planInfo.type === 'limit') {
                const limitValue = paymentData.customValue || paymentData.planInfo.value;
                result = await jkt48Api.admin.addLimit(paymentData.apiKey, limitValue);
              } else {
                const daysValue = paymentData.customValue || paymentData.planInfo.value;
                result = await jkt48Api.admin.addExpiry(paymentData.apiKey, daysValue);
              }

              if (result?.status === true && result.data) {
                setBoostResult(result.data);
                setPaymentStatus('success');
                onPaymentOpenChange();
                onSuccessOpen();
              } else {
                throw new Error(result?.message || 'Failed to process boost');
              }
            } catch (apiError) {
              console.error('API boost error:', apiError);
              setPaymentStatus('failed');
              alert(`Payment successful but failed to process boost: ${apiError instanceof Error ? apiError.message : 'Unknown error'}`);
            }
          }
        } catch (error) {
          console.error('Payment verification error:', error);
        }
      }, 5000);
    }
    return () => clearInterval(verificationInterval);
  }, [paymentStatus, paymentData, onPaymentOpenChange, onSuccessOpen]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const resetForm = () => {
    setSelectedPlan('');
    setApiKey('');
    setCustomValue('');
    setPaymentData(null);
    setPaymentStatus('idle');
    setBoostResult(null);
    setTimeRemaining(600);
  };

  const filteredPlans = Object.entries(BOOST_PLANS).filter(([_, plan]) => plan.type === activeTab);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full max-w-4xl">
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>API Boost</BreadcrumbItem>
        </Breadcrumbs>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">JKT48 API Boost & Extend</h1>
          <p className="text-lg text-default-600">
            Boost your API limits or extend your API key expiry
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <Input
              isRequired
              label="API Key"
              placeholder="Enter your API key"
              value={apiKey}
              onValueChange={setApiKey}
              className="max-w-md"
            />
          </CardHeader>
          <CardBody>
            <Tabs 
              selectedKey={activeTab} 
              onSelectionChange={(key) => {
                setActiveTab(key as string);
                setSelectedPlan('');
                setCustomValue('');
              }}
              className="mb-6"
            >
              <Tab key="limit" title="Boost Limits">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {filteredPlans.map(([key, plan]) => (
                    <Card 
                      key={key}
                      isPressable
                      isHoverable
                      className={`cursor-pointer transition-all ${selectedPlan === key ? 'ring-2 ring-primary' : ''}`}
                      onPress={() => {
                        setSelectedPlan(key);
                        setCustomValue('');
                      }}
                    >
                      <CardBody className="text-center">
                        <Chip color={plan.color} className="mb-2">{plan.name}</Chip>
                        <p className="font-bold text-lg">Rp {plan.price.toLocaleString()}</p>
                        <p className="text-sm text-default-600">{plan.description}</p>
                      </CardBody>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-default-600 mb-2">Or set custom amount:</p>
                  <Input
                    type="number"
                    label="Custom Limit Amount"
                    placeholder="Enter number of API calls"
                    value={customValue}
                    onValueChange={(value) => {
                      setCustomValue(value);
                      setSelectedPlan('');
                    }}
                    className="max-w-xs mx-auto"
                    endContent={
                      customValue && (
                        <span className="text-xs text-default-500">
                          Rp {calculateCustomPrice(parseInt(customValue) || 0).toLocaleString()}
                        </span>
                      )
                    }
                  />
                  <p className="text-xs text-default-400 mt-1">Rate: Rp 20 per API call</p>
                </div>
              </Tab>

              <Tab key="expiry" title="Extend Expiry">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {filteredPlans.map(([key, plan]) => (
                    <Card 
                      key={key}
                      isPressable
                      isHoverable
                      className={`cursor-pointer transition-all ${selectedPlan === key ? 'ring-2 ring-primary' : ''}`}
                      onPress={() => {
                        setSelectedPlan(key);
                        setCustomValue('');
                      }}
                    >
                      <CardBody className="text-center">
                        <Chip color={plan.color} className="mb-2">{plan.name}</Chip>
                        <p className="font-bold text-lg">Rp {plan.price.toLocaleString()}</p>
                        <p className="text-sm text-default-600">{plan.description}</p>
                      </CardBody>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-default-600 mb-2">Or set custom days:</p>
                  <Input
                    type="number"
                    label="Custom Days"
                    placeholder="Enter number of days"
                    value={customValue}
                    onValueChange={(value) => {
                      setCustomValue(value);
                      setSelectedPlan('');
                    }}
                    className="max-w-xs mx-auto"
                    endContent={
                      customValue && (
                        <span className="text-xs text-default-500">
                          Rp {calculateCustomPrice(parseInt(customValue) || 0).toLocaleString()}
                        </span>
                      )
                    }
                  />
                  <p className="text-xs text-default-400 mt-1">Rate: Rp 20 per day</p>
                </div>
              </Tab>
            </Tabs>

            <div className="text-center">
              <Button
                color="primary"
                size="lg"
                isLoading={loading}
                onPress={handlePurchase}
                isDisabled={!apiKey || (!selectedPlan && !customValue)}
              >
                {selectedPlan ? 
                  `Purchase ${BOOST_PLANS[selectedPlan]?.name} - Rp ${BOOST_PLANS[selectedPlan]?.price.toLocaleString()}` :
                  customValue ? 
                    `Purchase Custom - Rp ${calculateCustomPrice(parseInt(customValue) || 0).toLocaleString()}` :
                    'Select a plan or enter custom value'
                }
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Payment Modal */}
      <Modal isOpen={isPaymentOpen} onOpenChange={onPaymentOpenChange} size="xl" isDismissable={false}>
        <ModalContent>
          <ModalHeader>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">Complete Payment</h3>
              <p className="text-sm text-default-500">Time remaining: {formatTime(timeRemaining)}</p>
            </div>
          </ModalHeader>
          <ModalBody>
            {paymentData && (
              <div className="space-y-4">
                <Card>
                  <CardBody>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-default-500">Plan</p>
                        <p className="font-semibold">{paymentData.planInfo.name}</p>
                      </div>
                      <div>
                        <p className="text-default-500">API Key</p>
                        <p className="font-semibold text-xs break-all">{paymentData.apiKey}</p>
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

                <div className="text-center">
                  <p className="mb-4">Scan QR code to complete payment</p>
                  <Image
                    src={paymentData.qrImageUrl}
                    alt="Payment QR Code"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                </div>

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
                      <span className="text-sm">Processing boost...</span>
                    </div>
                  )}
                </div>

                <Progress value={(600 - timeRemaining) / 600 * 100} color="primary" size="sm" />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => {
              setPaymentStatus('idle');
              onPaymentOpenChange();
            }}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={isSuccessOpen} onOpenChange={onSuccessOpenChange} size="2xl">
        <ModalContent>
          <ModalHeader>
            <h3 className="text-xl font-bold text-success">🎉 Boost Applied Successfully!</h3>
          </ModalHeader>
          <ModalBody>
            {boostResult && (
              <div className="space-y-4">
                <Card>
                  <CardBody>
                    <h4 className="font-semibold mb-3">Updated API Key Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-default-500">Owner</p>
                          <p className="font-semibold">{boostResult.owner}</p>
                        </div>
                        <div>
                          <p className="text-default-500">Email</p>
                          <p className="font-semibold">{boostResult.email}</p>
                        </div>
                        <div>
                          <p className="text-default-500">Package Type</p>
                          <p className="font-semibold">{boostResult.type}</p>
                        </div>
                        <div>
                          <p className="text-default-500">Status</p>
                          <Chip color="success" size="sm">Active</Chip>
                        </div>
                      </div>

                      {boostResult.newLimit && (
                        <div className="border-t pt-3">
                          <h5 className="font-semibold mb-2">Limit Update</h5>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-default-500">Previous Limit</p>
                              <p className="font-semibold">{boostResult.previousLimit?.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-default-500">Added Limit</p>
                              <p className="font-semibold text-success">+{boostResult.additionalLimit?.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-default-500">New Total Limit</p>
                            <p className="font-bold text-lg">{parseInt(boostResult.newLimit).toLocaleString()}</p>
                          </div>
                        </div>
                      )}

                      {boostResult.newExpireAt && (
                        <div className="border-t pt-3">
                          <h5 className="font-semibold mb-2">Expiry Extension</h5>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-default-500">Previous Expiry</p>
                              <p className="font-semibold">{new Date(boostResult.previousExpireAt!).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-default-500">Added Days</p>
                              <p className="font-semibold text-success">+{boostResult.additionalDays} days</p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-default-500">New Expiry Date</p>
                            <p className="font-bold text-lg">{new Date(boostResult.newExpireAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={() => {
              onSuccessOpenChange();
              resetForm();
            }}>
              Boost Another API Key
            </Button>
            <Button color="success" variant="light" onPress={onSuccessOpenChange}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
}
