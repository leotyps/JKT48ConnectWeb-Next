"use client"

import { Card, CardBody, Breadcrumbs, BreadcrumbItem, Link, Button, Input, Textarea, Chip } from "@heroui/react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const contactMethods = [
    {
      title: "WhatsApp",
      description: "Chat langsung dengan Valzyy (Creator)",
      contact: "+62 857-0147-9245",
      link: "https://wa.me/6285701479245",
      icon: "💬",
      color: "success",
      available: "24/7",
      responseTime: "1-24 jam"
    },
    {
      title: "Email Support",
      description: "Email resmi untuk pertanyaan umum",
      contact: "support@jkt48connect.com",
      link: "mailto:support@jkt48connect.com",
      icon: "📧",
      color: "primary",
      available: "Senin-Jumat",
      responseTime: "1-3 hari kerja"
    },
    {
      title: "Discord",
      description: "Bergabung dengan komunitas Discord",
      contact: "JKT48Connect Server",
      link: "https://discord.gg/jkt48connect",
      icon: "💭",
      color: "secondary",
      available: "24/7",
      responseTime: "Real-time"
    },
    {
      title: "GitHub",
      description: "Laporkan bug atau request fitur",
      contact: "github.com/valzyy",
      link: "https://github.com/valzyy",
      icon: "🔧",
      color: "warning",
      available: "24/7",
      responseTime: "1-7 hari"
    }
  ];

  const faqItems = [
    {
      question: "Bagaimana cara menggunakan bot WhatsApp?",
      answer: "Kirim pesan ke nomor WhatsApp kami dan bot akan merespons otomatis dengan menu bantuan.",
      icon: "❓"
    },
    {
      question: "Apakah layanan JKT48Connect gratis?",
      answer: "Ya, semua layanan JKT48Connect gratis untuk digunakan. Kami tidak mengenakan biaya apapun.",
      icon: "💰"
    },
    {
      question: "Bagaimana cara mendapatkan notifikasi live?",
      answer: "Daftar melalui bot WhatsApp atau Discord untuk mendapatkan notifikasi real-time tentang JKT48.",
      icon: "🔔"
    },
    {
      question: "Apakah data saya aman?",
      answer: "Ya, kami menggunakan enkripsi dan standar keamanan tinggi untuk melindungi data pengguna.",
      icon: "🔒"
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to WhatsApp with pre-filled message
    const message = `Halo! Saya ingin menghubungi JKT48Connect.

Nama: ${formData.name}
Email: ${formData.email}
Subjek: ${formData.subject}

Pesan:
${formData.message}`;
    
    const whatsappUrl = `https://wa.me/6285701479245?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        
        {/* Breadcrumbs */}
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs size="sm" className="text-sm">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem>Contact</BreadcrumbItem>
          </Breadcrumbs>
        </div>

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="mb-6">
            <div className="text-6xl sm:text-7xl mb-4">📞</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
              Hubungi <span className="text-blue-600">Kami</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Ada pertanyaan? Butuh bantuan? Tim JKT48Connect siap membantu Anda 24/7
            </p>
          </div>
          
          <div className="flex justify-center gap-2 flex-wrap">
            <Chip size="md" color="success" variant="flat" startContent="✅">
              Respons Cepat
            </Chip>
            <Chip size="md" color="primary" variant="flat" startContent="🤝">
              Support 24/7
            </Chip>
            <Chip size="md" color="warning" variant="flat" startContent="🔥">
              Tim Berpengalaman
            </Chip>
          </div>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-800 hover:scale-105 transition-transform duration-300">
              <CardBody className="p-6 text-center">
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {method.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {method.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="font-mono text-sm font-semibold border border-gray-300 dark:border-gray-700 rounded-lg p-2">
                    {method.contact}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Tersedia: {method.available}</span>
                    <span>Respons: {method.responseTime}</span>
                  </div>
                </div>
                <Button
                  as={Link}
                  href={method.link}
                  isExternal
                  color={method.color}
                  size="md"
                  className="w-full font-semibold"
                  startContent={method.icon}
                >
                  Hubungi Sekarang
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 sm:mb-16">
          
          {/* Contact Form */}
          <Card className="border border-gray-200 dark:border-gray-800">
            <CardBody className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">📝</div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                  Kirim Pesan
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Isi form di bawah dan kami akan menghubungi Anda sesegera mungkin
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Nama Lengkap"
                    placeholder="Masukkan nama Anda"
                    value={formData.name}
                    onValueChange={(value) => handleInputChange('name', value)}
                    isRequired
                    startContent="👤"
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onValueChange={(value) => handleInputChange('email', value)}
                    isRequired
                    startContent="📧"
                  />
                </div>
                
                <Input
                  label="Subjek"
                  placeholder="Tentang apa pesan Anda?"
                  value={formData.subject}
                  onValueChange={(value) => handleInputChange('subject', value)}
                  isRequired
                  startContent="📋"
                />
                
                <Textarea
                  label="Pesan"
                  placeholder="Tuliskan pesan Anda di sini..."
                  value={formData.message}
                  onValueChange={(value) => handleInputChange('message', value)}
                  minRows={6}
                  isRequired
                />

                <div className="border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <p className="text-blue-700 dark:text-blue-300 font-semibold mb-2 text-sm">
                    💡 Catatan:
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 text-sm">
                    Setelah mengirim form, Anda akan diarahkan ke WhatsApp dengan pesan yang sudah terisi otomatis.
                  </p>
                </div>

                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="w-full font-semibold"
                  startContent="🚀"
                >
                  Kirim via WhatsApp
                </Button>
              </form>
            </CardBody>
          </Card>

          {/* FAQ Section */}
          <div className="space-y-6">
            <Card className="border border-gray-200 dark:border-gray-800">
              <CardBody className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">❓</div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                    FAQ
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Pertanyaan yang sering diajukan
                  </p>
                </div>

                <div className="space-y-4">
                  {faqItems.map((faq, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="text-xl">{faq.icon}</div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {faq.question}
                        </h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm ml-8">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>

            {/* Quick Stats */}
            <Card className="border border-green-200 dark:border-green-800">
              <CardBody className="p-6">
                <h3 className="text-xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                  📊 Statistik Support
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">98%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Kepuasan Pengguna</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">&lt;4h</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Rata-rata Respons</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">24/7</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Dukungan Online</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">1000+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Masalah Terselesaikan</div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Business Hours */}
          <Card className="border border-purple-200 dark:border-purple-800">
            <CardBody className="p-6">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🕐</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Jam Operasional
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">WhatsApp Bot</span>
                  <Chip size="sm" color="success" variant="flat">24/7 Online</Chip>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Discord Bot</span>
                  <Chip size="sm" color="success" variant="flat">24/7 Online</Chip>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Email Support</span>
                  <Chip size="sm" color="primary" variant="flat">Senin-Jumat</Chip>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Live Chat</span>
                  <Chip size="sm" color="warning" variant="flat">09:00-21:00 WIB</Chip>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Emergency Contact */}
          <Card className="border border-red-200 dark:border-red-800">
            <CardBody className="p-6">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🚨</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Kontak Darurat
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Untuk masalah urgent atau sistem down
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="border border-red-200 dark:border-red-700 rounded-lg p-3 text-center">
                  <div className="font-semibold text-red-700 dark:text-red-300 mb-1">
                    WhatsApp Priority
                  </div>
                  <div className="font-mono text-sm">+62 857-0147-9245</div>
                  <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                    Respons dalam 15 menit
                  </div>
                </div>
                
                <Button
                  as={Link}
                  href="https://wa.me/6285701479245?text=🚨 URGENT: "
                  isExternal
                  color="danger"
                  size="md"
                  className="w-full font-semibold"
                  startContent="🚨"
                >
                  Hubungi Sekarang
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Final CTA */}
        <Card className="border border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardBody className="p-8 text-center">
            <div className="text-5xl mb-4">🤝</div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Siap Membantu Anda!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto mb-6">
              Tim JKT48Connect selalu siap membantu Anda dengan segala pertanyaan dan kebutuhan. 
              Jangan ragu untuk menghubungi kami kapan saja!
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button
                as={Link}
                href="https://wa.me/6285701479245"
                isExternal
                color="success"
                size="lg"
                className="font-semibold"
                startContent="💬"
              >
                Chat WhatsApp
              </Button>
              <Button
                as={Link}
                href="mailto:support@jkt48connect.com"
                isExternal
                color="primary"
                size="lg"
                className="font-semibold"
                startContent="📧"
              >
                Kirim Email
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
