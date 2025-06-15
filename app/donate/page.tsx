"use client"

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Chip, Progress, Breadcrumbs, BreadcrumbItem, Image, Textarea, Divider } from "@heroui/react";
import { Heart, Coffee, Gift, Users, Code, Server, Lightbulb } from "lucide-react";

interface PaymentData {
  qrImageUrl: string;
  amount: number;
  fee: number;
  total: number;
  donorName: string;
  message: string;
}

const SUGGESTED_AMOUNTS = [
  { amount: 5000, label: "☕ Buy us a coffee", icon: Coffee },
  { amount: 15000, label: "💝 Small support", icon: Gift },
  { amount: 50000, label: "❤️ Big support", icon: Heart },
  { amount: 100000, label: "🚀 Major contribution", icon: Lightbulb },
];

export default function JKT48ConnectDonation() {
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donationMessage, setDonationMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'pending' | 'success' | 'failed'>('idle');
  const [timeRemaining, setTimeRemaining] = useState(600);
  
  const {isOpen: isPaymentOpen, onOpen: onPaymentOpen, onOpenChange: onPaymentOpenChange} = useDisclosure();
  const {isOpen: isSuccessOpen, onOpen: onSuccessOpen, onOpenChange: onSuccessOpenChange} = useDisclosure();

  const calculateFee = (amount: number) => Math.ceil(amount * (Math.random() * 0.04 + 0.01));

  const handleDonation = async () => {
    const amount = parseInt(donationAmount);
    
    if (!amount || amount < 1000) {
      alert('Minimum donation amount is Rp 1,000');
      return;
    }

    if (!isAnonymous && !donorName.trim()) {
      alert('Please enter your name or choose to donate anonymously');
      return;
    }

    setLoading(true);
    try {
      const fee = calculateFee(amount);
      const total = amount + fee;
      const finalDonorName = isAnonymous ? 'Anonymous Supporter' : donorName.trim();

      // Updated QRIS URL with proper encoding
      const qrisCode = encodeURIComponent("00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214149391352933240303UMI51440014ID.CO.QRIS.WWW0215ID20233077025890303UMI5204541153033605802ID5919VALZSTORE OK14535636006SERANG61054211162070703A016304DCD2");
      const qrisUrl = `https://api.jkt48connect.my.id/api/orkut/createpayment?amount=${total}&qris=${qrisCode}&api_key=JKTCONNECT`;
      
      console.log('Generating payment with URL:', qrisUrl);
      
      const response = await fetch(qrisUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Payment response:', data);
      
      if (!data || !data.qrImageUrl) {
        throw new Error(data?.message || 'No QR code received from server');
      }

      setPaymentData({
        qrImageUrl: data.qrImageUrl,
        amount,
        fee,
        total,
        donorName: finalDonorName,
        message: donationMessage
      });

      setPaymentStatus('pending');
      setTimeRemaining(600);
      onPaymentOpen();

    } catch (error) {
      console.error('Payment generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Failed to generate payment: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const selectSuggestedAmount = (amount: number) => {
    setDonationAmount(amount.toString());
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (paymentStatus === 'pending' && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev <= 1 ? 0 : prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [paymentStatus, timeRemaining]);

  // Payment verification effect
  useEffect(() => {
    let verificationInterval: NodeJS.Timeout;
    if (paymentStatus === 'pending' && paymentData) {
      verificationInterval = setInterval(async () => {
        try {
          const statusUrl = `https://api.jkt48connect.my.id/api/orkut/cekstatus?merchant=OK1453563&keyorkut=584312217038625421453563OKCT6AF928C85E124621785168CD18A9B693&amount=${paymentData.total}&api_key=JKTCONNECT`;
          const response = await fetch(statusUrl);
          const data = await response.json();
          
          if (data.status === 'success' && data.data?.length > 0) {
            setPaymentStatus('success');
            onPaymentOpenChange();
            onSuccessOpen();
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
    setDonationAmount('');
    setDonorName('');
    setDonationMessage('');
    setIsAnonymous(false);
    setPaymentData(null);
    setPaymentStatus('idle');
    setTimeRemaining(600);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full max-w-4xl">
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>Donation</BreadcrumbItem>
        </Breadcrumbs>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold">Support JKT48Connect</h1>
            <Heart className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-lg text-default-600 max-w-2xl mx-auto">
            Help us keep JKT48Connect running and growing. Your support means the world to us and the JKT48 community!
          </p>
        </div>

        {/* About Section */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold">Why Your Support Matters</h2>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Server className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Server Costs</h3>
                <p className="text-sm text-default-600">
                  Maintaining reliable servers to keep the API running 24/7 for the community
                </p>
              </div>
              <div className="text-center">
                <Code className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Development</h3>
                <p className="text-sm text-default-600">
                  Continuous improvements, new features, and bug fixes to enhance user experience
                </p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Community</h3>
                <p className="text-sm text-default-600">
                  Supporting the JKT48 fan community with free and accessible tools
                </p>
              </div>
            </div>

            <Divider />

            <div className="text-center">
              <h3 className="font-semibold text-lg mb-3">What We Provide</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="text-left space-y-2">
                  <p>• 🎭 Comprehensive JKT48 member data API</p>
                  <p>• 📱 Social media integration and updates</p>
                  <p>• 🎵 Theater schedule and setlist information</p>
                  <p>• 📊 Real-time statistics and analytics</p>
                </div>
                <div className="text-left space-y-2">
                  <p>• 🔄 Regular data updates and maintenance</p>
                  <p>• 💻 Free API access for developers</p>
                  <p>• 📖 Comprehensive documentation</p>
                  <p>• 🛠️ Community support and assistance</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Donation Form */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-2xl font-bold">Make a Donation</h2>
            <p className="text-default-600">Every contribution, no matter the size, helps us continue our mission</p>
          </CardHeader>
          <CardBody className="space-y-6">
            {/* Suggested Amounts */}
            <div>
              <h3 className="font-semibold mb-3">Quick Select</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {SUGGESTED_AMOUNTS.map((suggestion, index) => {
                  const IconComponent = suggestion.icon;
                  return (
                    <Card
                      key={index}
                      isPressable
                      isHoverable
                      className={`cursor-pointer transition-all ${donationAmount === suggestion.amount.toString() ? 'ring-2 ring-primary' : ''}`}
                      onPress={() => selectSuggestedAmount(suggestion.amount)}
                    >
                      <CardBody className="text-center py-4">
                        <IconComponent className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <p className="font-bold text-sm">Rp {suggestion.amount.toLocaleString()}</p>
                        <p className="text-xs text-default-600">{suggestion.label}</p>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            </div>

            <Divider />

            {/* Custom Amount */}
            <div className="space-y-4">
              <h3 className="font-semibold">Custom Amount</h3>
              <Input
                type="number"
                label="Donation Amount (IDR)"
                placeholder="Enter amount (minimum Rp 1,000)"
                value={donationAmount}
                onValueChange={setDonationAmount}
                startContent={<span className="text-default-400">Rp</span>}
                className="max-w-md"
              />
              {donationAmount && parseInt(donationAmount) >= 1000 && (
                <p className="text-sm text-success">
                  ✨ Thank you for your generous support of Rp {parseInt(donationAmount).toLocaleString()}!
                </p>
              )}
            </div>

            <Divider />

            {/* Donor Information */}
            <div className="space-y-4">
              <h3 className="font-semibold">Donor Information</h3>
              
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="anonymous" className="text-sm cursor-pointer">
                  Donate anonymously
                </label>
              </div>

              {!isAnonymous && (
                <Input
                  label="Your Name"
                  placeholder="Enter your name (optional if anonymous)"
                  value={donorName}
                  onValueChange={setDonorName}
                  className="max-w-md"
                />
              )}

              <Textarea
                label="Message (Optional)"
                placeholder="Leave a message of support for the JKT48Connect team..."
                value={donationMessage}
                onValueChange={setDonationMessage}
                maxRows={3}
                className="max-w-md"
              />
            </div>

            <Divider />

            {/* Donation Button */}
            <div className="text-center">
              <Button
                color="primary"
                size="lg"
                isLoading={loading}
                onPress={handleDonation}
                isDisabled={!donationAmount || parseInt(donationAmount) < 1000 || (!isAnonymous && !donorName.trim())}
                className="px-8"
              >
                {donationAmount && parseInt(donationAmount) >= 1000
                  ? `💝 Donate Rp ${parseInt(donationAmount).toLocaleString()}`
                  : '💝 Support JKT48Connect'
                }
              </Button>
              <p className="text-xs text-default-500 mt-2">
                Your donation is processed securely through QRIS payment system
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Additional Info */}
        <Card>
          <CardBody>
            <div className="text-center space-y-3">
              <h3 className="font-semibold">💙 Thank You for Your Support!</h3>
              <p className="text-sm text-default-600 max-w-2xl mx-auto">
                JKT48Connect is a community-driven project created by fans, for fans. 
                Your donations help us maintain and improve our services while keeping them free and accessible to everyone. 
                Together, we're building the best resource for the JKT48 community!
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-default-500">
                <span>🔒 Secure Payment</span>
                <span>•</span>
                <span>🚫 No Recurring Charges</span>
                <span>•</span>
                <span>💯 100% Community Driven</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Payment Modal */}
      <Modal isOpen={isPaymentOpen} onOpenChange={onPaymentOpenChange} size="xl" isDismissable={false}>
        <ModalContent>
          <ModalHeader>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">Complete Your Donation</h3>
              <p className="text-sm text-default-500">Time remaining: {formatTime(timeRemaining)}</p>
            </div>
          </ModalHeader>
          <ModalBody>
            {paymentData && (
              <div className="space-y-4">
                <Card>
                  <CardBody>
                    <div className="space-y-3">
                      <div className="text-center">
                        <h4 className="font-semibold text-lg">💝 Thank You, {paymentData.donorName}!</h4>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-default-500">Donation Amount</p>
                          <p className="font-semibold text-lg">Rp {paymentData.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-default-500">Processing Fee</p>
                          <p className="font-semibold">Rp {paymentData.fee.toLocaleString()}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-default-500">Total to Pay</p>
                          <p className="font-bold text-xl text-primary">Rp {paymentData.total.toLocaleString()}</p>
                        </div>
                      </div>

                      {paymentData.message && (
                        <div className="border-t pt-3">
                          <p className="text-default-500 text-sm">Your Message:</p>
                          <p className="text-sm italic">"{paymentData.message}"</p>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>

                <div className="text-center">
                  <p className="mb-4 font-medium">Scan QR code with your banking app</p>
                  <Image
                    src={paymentData.qrImageUrl}
                    alt="Donation QR Code"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                  <p className="text-xs text-default-500 mt-2">
                    Supports all major Indonesian banks and e-wallets
                  </p>
                </div>

                <div className="text-center">
                  {paymentStatus === 'pending' && (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span className="text-sm">Waiting for payment confirmation...</span>
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
            <h3 className="text-2xl font-bold text-success">🎉 Donation Successful!</h3>
          </ModalHeader>
          <ModalBody>
            {paymentData && (
              <div className="space-y-6 text-center">
                <div className="text-6xl">💖</div>
                
                <div>
                  <h4 className="text-xl font-bold mb-2">Thank You, {paymentData.donorName}!</h4>
                  <p className="text-lg">
                    Your generous donation of <span className="font-bold text-primary">Rp {paymentData.amount.toLocaleString()}</span> has been received!
                  </p>
                </div>

                <Card>
                  <CardBody>
                    <div className="space-y-3">
                      <h5 className="font-semibold">Your Impact</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <Server className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                          <p className="font-medium">Server Uptime</p>
                          <p className="text-default-600">Keeping APIs running smoothly</p>
                        </div>
                        <div className="text-center">
                          <Code className="w-8 h-8 text-green-500 mx-auto mb-2" />
                          <p className="font-medium">New Features</p>
                          <p className="text-default-600">Continuous improvements</p>
                        </div>
                        <div className="text-center">
                          <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                          <p className="font-medium">Community Growth</p>
                          <p className="text-default-600">Supporting JKT48 fans worldwide</p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {paymentData.message && (
                  <Card>
                    <CardBody>
                      <h5 className="font-semibold mb-2">Your Message</h5>
                      <p className="text-sm italic">"{paymentData.message}"</p>
                      <p className="text-xs text-default-500 mt-2">
                        We truly appreciate your kind words and support! 💙
                      </p>
                    </CardBody>
                  </Card>
                )}

                <div className="text-sm text-default-600">
                  <p>
                    🌟 You're now part of the JKT48Connect community of supporters! 
                    Your contribution helps keep our services free and accessible to all JKT48 fans.
                  </p>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={() => {
              onSuccessOpenChange();
              resetForm();
            }}>
              Make Another Donation
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
