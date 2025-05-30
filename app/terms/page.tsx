"use client"

import { Card, CardBody, Breadcrumbs, BreadcrumbItem, Link, Button, Divider, Chip, Avatar, Accordion, AccordionItem } from "@heroui/react";
import { useState } from "react";

export default function TermsOfService() {
  const [lastUpdated] = useState("30 May 2025");

  const sections = [
    {
      id: "acceptance",
      title: "1. Penerimaan Ketentuan",
      icon: "✅",
      content: [
        "Dengan menggunakan layanan JKT48Connect, Anda menyetujui untuk terikat dengan Ketentuan Layanan ini.",
        "Jika Anda tidak setuju dengan ketentuan ini, mohon tidak menggunakan layanan kami.",
        "Ketentuan ini berlaku untuk semua pengguna layanan JKT48Connect termasuk WhatsApp Bot, Discord Bot, Website, dan NPM Packages."
      ]
    },
    {
      id: "services",
      title: "2. Deskripsi Layanan",
      icon: "🔧",
      content: [
        "JKT48Connect menyediakan informasi dan layanan terkait grup idol JKT48 melalui berbagai platform.",
        "Layanan kami meliputi: Zenova WhatsApp Bot, JKT48Connect Discord Bot, Website, dan Developer Packages.",
        "Kami menyediakan notifikasi live streaming, informasi member, jadwal theater, dan fitur-fitur lainnya.",
        "Layanan ini disediakan secara gratis untuk komunitas JKT48."
      ]
    },
    {
      id: "user-conduct",
      title: "3. Kode Etik Pengguna",
      icon: "👥",
      content: [
        "Pengguna dilarang menggunakan layanan untuk tujuan yang melanggar hukum atau merugikan pihak lain.",
        "Dilarang melakukan spam, harassment, atau tindakan yang mengganggu pengguna lain.",
        "Pengguna tidak diperkenankan menyebarkan konten yang tidak pantas, SARA, atau pornografi.",
        "Dilarang melakukan reverse engineering, hacking, atau upaya merusak sistem kami.",
        "Pengguna bertanggung jawab atas semua aktivitas yang dilakukan menggunakan akun mereka."
      ]
    },
    {
      id: "intellectual-property",
      title: "4. Hak Kekayaan Intelektual",
      icon: "📝",
      content: [
        "Semua konten, logo, dan materi yang tersedia di JKT48Connect dilindungi hak cipta.",
        "Informasi tentang JKT48 yang kami sediakan bersumber dari platform resmi JKT48.",
        "Pengguna tidak diperkenankan menggunakan konten kami untuk tujuan komersial tanpa izin.",
        "Logo dan nama JKT48 adalah milik PT. Indonesia Musik Nusantara (JKT48 Operation Team)."
      ]
    },
    {
      id: "privacy",
      title: "5. Privasi dan Data",
      icon: "🔒",
      content: [
        "Kami menghormati privasi pengguna dan berkomitmen melindungi data pribadi.",
        "Data yang dikumpulkan hanya digunakan untuk meningkatkan kualitas layanan.",
        "Kami tidak menjual, menyewakan, atau membagikan data pribadi kepada pihak ketiga.",
        "Untuk WhatsApp Bot, kami hanya menyimpan nomor telepon untuk keperluan layanan.",
        "Pengguna dapat menghubungi kami untuk penghapusan data pribadi."
      ]
    },
    {
      id: "limitations",
      title: "6. Batasan Layanan",
      icon: "⚠️",
      content: [
        "Layanan JKT48Connect disediakan 'sebagaimana adanya' tanpa jaminan tertentu.",
        "Kami tidak bertanggung jawab atas kerugian yang timbul dari penggunaan layanan.",
        "Ketersediaan layanan dapat terganggu karena maintenance, update, atau masalah teknis.",
        "Kami berhak membatasi atau menangguhkan akses pengguna yang melanggar ketentuan.",
        "Informasi yang disediakan mungkin tidak selalu akurat atau terkini."
      ]
    },
    {
      id: "bot-usage",
      title: "7. Penggunaan Bot",
      icon: "🤖",
      content: [
        "WhatsApp Bot (Zenova) dan Discord Bot disediakan untuk memudahkan akses informasi JKT48.",
        "Pengguna dilarang melakukan spam atau abuse terhadap bot.",
        "Bot dapat mengalami downtime atau maintenance tanpa pemberitahuan sebelumnya.",
        "Fitur bot dapat berubah atau dihentikan sewaktu-waktu sesuai kebijakan pengembang.",
        "Pengguna bertanggung jawab atas biaya internet yang digunakan untuk mengakses bot."
      ]
    },
    {
      id: "developer-terms",
      title: "8. Ketentuan Developer",
      icon: "👨‍💻",
      content: [
        "NPM Packages (@jkt48/core dan @jkt48connect-corp/sdk) disediakan untuk developer.",
        "Penggunaan packages harus sesuai dengan lisensi yang tercantum dalam dokumentasi.",
        "Developer dilarang menggunakan packages untuk tujuan yang merugikan JKT48 atau fans.",
        "Kami tidak bertanggung jawab atas penggunaan packages di aplikasi pihak ketiga.",
        "API rate limiting dapat diterapkan untuk mencegah abuse."
      ]
    },
    {
      id: "termination",
      title: "9. Penghentian Layanan",
      icon: "🚫",
      content: [
        "Kami berhak menghentikan atau menangguhkan akses pengguna yang melanggar ketentuan.",
        "Pengguna dapat menghentikan penggunaan layanan kapan saja.",
        "Penghentian layanan dapat dilakukan tanpa pemberitahuan dalam kasus pelanggaran berat.",
        "Data pengguna dapat dihapus setelah penghentian layanan.",
        "Hak dan kewajiban yang telah timbul tetap berlaku setelah penghentian."
      ]
    },
    {
      id: "changes",
      title: "10. Perubahan Ketentuan",
      icon: "🔄",
      content: [
        "JKT48Connect berhak mengubah Ketentuan Layanan ini sewaktu-waktu.",
        "Perubahan akan diumumkan melalui website atau channel komunikasi resmi.",
        "Penggunaan layanan setelah perubahan dianggap sebagai persetujuan terhadap ketentuan baru.",
        "Pengguna disarankan untuk memeriksa ketentuan secara berkala.",
        "Versi terbaru ketentuan akan selalu tersedia di website resmi."
      ]
    }
  ];

  const contactInfo = [
    {
      type: "Creator",
      name: "Valzyy",
      contact: "6285701479245",
      link: "https://wa.me/6285701479245",
      icon: "👨‍💻",
      color: "primary"
    },
    {
      type: "WhatsApp Bot",
      name: "Zenova Bot",
      contact: "6285189020193",
      link: "https://wa.me/6285189020193",
      icon: "💬",
      color: "success"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        
        {/* Breadcrumbs */}
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs size="sm" className="text-sm">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem>Terms of Service</BreadcrumbItem>
          </Breadcrumbs>
        </div>

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="mb-6">
            <Avatar
              src="https://files.catbox.moe/i1qudl.jpg"
              alt="JKT48Connect Logo"
              className="w-20 h-20 sm:w-24 sm:h-24 mx-auto border-4 border-white dark:border-gray-800 shadow-xl"
            />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4">
            Terms of <span className="text-blue-600">Service</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Ketentuan Layanan JKT48Connect Ecosystem
          </p>
          
          <div className="flex justify-center gap-2 flex-wrap mb-8">
            <Chip size="md" color="primary" variant="flat" startContent="📋">Legal Document</Chip>
            <Chip size="md" color="success" variant="flat" startContent="🔄">Updated: {lastUpdated}</Chip>
            <Chip size="md" color="warning" variant="flat" startContent="⚖️">Binding Agreement</Chip>
          </div>

          <Card className="bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-200 dark:border-blue-800">
            <CardBody className="p-6 sm:p-8">
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 dark:text-white">📋 Ringkasan Penting</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Dokumen ini mengatur penggunaan semua layanan JKT48Connect termasuk WhatsApp Bot, 
                  Discord Bot, Website, dan Developer Packages. Mohon baca dengan seksama sebelum menggunakan layanan kami.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-8 mb-12 sm:mb-16">
          <Accordion variant="bordered" className="shadow-lg">
            {sections.map((section, index) => (
              <AccordionItem
                key={section.id}
                aria-label={section.title}
                title={
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{section.icon}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{section.title}</span>
                  </div>
                }
                className="border-gray-200 dark:border-gray-700"
              >
                <div className="space-y-4 pb-4">
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="text-gray-600 dark:text-gray-300 leading-relaxed pl-8">
                      • {paragraph}
                    </p>
                  ))}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Important Notice */}
        <div className="mb-12 sm:mb-16">
          <Card className="bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-800 shadow-xl">
            <CardBody className="p-6 sm:p-8">
              <div className="text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 text-red-800 dark:text-red-200">Pemberitahuan Penting</h3>
                <div className="space-y-4 text-red-700 dark:text-red-300">
                  <p className="leading-relaxed">
                    <strong>JKT48Connect adalah layanan independen</strong> yang tidak berafiliasi secara resmi dengan 
                    JKT48 atau PT. Indonesia Musik Nusantara. Kami menyediakan informasi publik tentang JKT48 
                    untuk kemudahan komunitas fans.
                  </p>
                  <p className="leading-relaxed">
                    Dengan menggunakan layanan kami, Anda mengakui bahwa telah membaca, memahami, 
                    dan menyetujui semua ketentuan yang tercantum dalam dokumen ini.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              Kontak & <span className="text-purple-600">Dukungan</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Jika Anda memiliki pertanyaan tentang Ketentuan Layanan ini, silakan hubungi kami
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactInfo.map((contact, index) => (
              <Card key={index} className="border-2 border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
                <CardBody className="p-6 text-center">
                  <div className="text-3xl mb-4">{contact.icon}</div>
                  <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{contact.type}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{contact.name}</p>
                  
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <code className="text-sm font-mono">{contact.contact}</code>
                  </div>
                  
                  <Button
                    as={Link}
                    href={contact.link}
                    isExternal
                    color={contact.color as any}
                    size="lg"
                    className="w-full font-semibold"
                    startContent="💬"
                  >
                    Hubungi via WhatsApp
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="text-center">
          <Card className="bg-gray-50 dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800">
            <CardBody className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                📋 Dokumentasi Terkait
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Dokumen penting lainnya yang mungkin Anda perlukan
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  color="primary" 
                  size="lg" 
                  startContent="🔒"
                  className="font-semibold"
                >
                  Privacy Policy
                </Button>
                <Button 
                  as={Link}
                  href="/"
                  color="success" 
                  size="lg" 
                  startContent="🏠"
                  className="font-semibold"
                >
                  Back to Home
                </Button>
                <Button 
                  color="secondary" 
                  size="lg" 
                  startContent="📞"
                  className="font-semibold"
                >
                  Contact Support
                </Button>
              </div>
              
              <Divider className="my-6" />
              
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Terakhir diperbarui: <strong>{lastUpdated}</strong> | 
                Versi: <strong>1.0</strong> | 
                Berlaku untuk semua layanan JKT48Connect
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
