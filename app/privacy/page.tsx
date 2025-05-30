"use client"

import { Card, CardBody, Breadcrumbs, BreadcrumbItem, Link, Button, Divider, Chip } from "@heroui/react";

export default function PrivacyPolicy() {
  const lastUpdated = "30 Mei 2025";

  const sections = [
    {
      title: "1. Informasi yang Kami Kumpulkan",
      icon: "📋",
      content: [
        {
          subtitle: "Data Personal",
          points: [
            "Nomor WhatsApp untuk layanan bot",
            "Username Discord untuk layanan bot",
            "Data profil dasar yang diperlukan untuk layanan"
          ]
        },
        {
          subtitle: "Data Penggunaan",
          points: [
            "Log aktivitas penggunaan bot dan layanan",
            "Preferensi notifikasi dan pengaturan pengguna",
            "Statistik penggunaan untuk peningkatan layanan"
          ]
        },
        {
          subtitle: "Data Teknis",
          points: [
            "Informasi perangkat dan browser",
            "Alamat IP untuk keamanan sistem",
            "Data cache untuk optimalisasi performa"
          ]
        }
      ]
    },
    {
      title: "2. Bagaimana Kami Menggunakan Informasi",
      icon: "🔧",
      content: [
        {
          subtitle: "Penyediaan Layanan",
          points: [
            "Mengirimkan notifikasi live dan update JKT48",
            "Memberikan informasi member dan jadwal theater",
            "Menyediakan akses ke fitur-fitur JKT48Connect"
          ]
        },
        {
          subtitle: "Peningkatan Layanan",
          points: [
            "Menganalisis pola penggunaan untuk pengembangan fitur",
            "Mengoptimalkan performa sistem dan bot",
            "Mengidentifikasi dan memperbaiki masalah teknis"
          ]
        },
        {
          subtitle: "Komunikasi",
          points: [
            "Mengirimkan pengumuman penting terkait layanan",
            "Merespons pertanyaan dan permintaan bantuan",
            "Memberikan update dan informasi baru"
          ]
        }
      ]
    },
    {
      title: "3. Berbagi Informasi",
      icon: "🤝",
      content: [
        {
          subtitle: "Kami TIDAK Membagikan Data Anda",
          points: [
            "Data personal Anda tidak dijual kepada pihak ketiga",
            "Informasi pribadi tidak dibagikan untuk tujuan komersial",
            "Privasi pengguna adalah prioritas utama kami"
          ]
        },
        {
          subtitle: "Pengecualian Berbagi Data",
          points: [
            "Jika diwajibkan oleh hukum yang berlaku",
            "Untuk melindungi keamanan sistem dan pengguna",
            "Dengan persetujuan eksplisit dari pengguna"
          ]
        }
      ]
    },
    {
      title: "4. Keamanan Data",
      icon: "🔒",
      content: [
        {
          subtitle: "Perlindungan Data",
          points: [
            "Enkripsi data sensitif menggunakan standar industri",
            "Akses terbatas hanya untuk tim authorized",
            "Monitoring keamanan sistem 24/7"
          ]
        },
        {
          subtitle: "Backup dan Recovery",
          points: [
            "Backup data secara berkala untuk mencegah kehilangan",
            "Sistem recovery yang handal dan teruji",
            "Penyimpanan backup di lokasi yang aman"
          ]
        }
      ]
    },
    {
      title: "5. Hak-Hak Pengguna",
      icon: "⚖️",
      content: [
        {
          subtitle: "Hak Akses dan Kontrol",
          points: [
            "Hak untuk mengetahui data apa saja yang kami simpan",
            "Hak untuk meminta penghapusan data personal",
            "Hak untuk mengubah atau memperbarui informasi"
          ]
        },
        {
          subtitle: "Hak Portabilitas",
          points: [
            "Hak untuk mendapatkan salinan data Anda",
            "Hak untuk memindahkan data ke layanan lain",
            "Hak untuk membatasi pemrosesan data tertentu"
          ]
        }
      ]
    },
    {
      title: "6. Cookie dan Teknologi Pelacakan",
      icon: "🍪",
      content: [
        {
          subtitle: "Penggunaan Cookie",
          points: [
            "Cookie untuk menyimpan preferensi pengguna",
            "Session cookie untuk keamanan login",
            "Analytics cookie untuk memahami penggunaan"
          ]
        },
        {
          subtitle: "Kontrol Cookie",
          points: [
            "Anda dapat mengatur preferensi cookie di browser",
            "Opsi untuk menolak cookie non-esensial",
            "Panduan lengkap tersedia di halaman bantuan"
          ]
        }
      ]
    },
    {
      title: "7. Penyimpanan dan Retensi Data",
      icon: "💾",
      content: [
        {
          subtitle: "Periode Penyimpanan",
          points: [
            "Data aktif disimpan selama akun masih aktif",
            "Data backup disimpan maksimal 2 tahun",
            "Data analytics agregat dapat disimpan lebih lama"
          ]
        },
        {
          subtitle: "Penghapusan Data",
          points: [
            "Data dihapus otomatis setelah periode retensi",
            "Penghapusan manual tersedia atas permintaan",
            "Konfirmasi penghapusan akan diberikan kepada pengguna"
          ]
        }
      ]
    },
    {
      title: "8. Layanan Pihak Ketiga",
      icon: "🔗",
      content: [
        {
          subtitle: "Integrasi Platform",
          points: [
            "WhatsApp Business API untuk layanan bot",
            "Discord API untuk bot Discord",
            "CDN services untuk optimalisasi konten"
          ]
        },
        {
          subtitle: "Tanggung Jawab",
          points: [
            "Setiap pihak ketiga memiliki privacy policy sendiri",
            "Kami memilih partner yang mematuhi standar privasi",
            "Pengguna disarankan membaca kebijakan masing-masing platform"
          ]
        }
      ]
    }
  ];

  const contactMethods = [
    {
      method: "WhatsApp",
      contact: "6285701479245",
      link: "https://wa.me/6285701479245",
      icon: "💬",
      description: "Chat langsung dengan Valzyy (Creator)"
    },
    {
      method: "Email",
      contact: "support@jkt48connect.com",
      link: "mailto:support@jkt48connect.com",
      icon: "📧",
      description: "Email resmi untuk pertanyaan privasi"
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        
        {/* Breadcrumbs */}
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs size="sm" className="text-sm">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem>Privacy Policy</BreadcrumbItem>
          </Breadcrumbs>
        </div>

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="mb-6">
            <div className="text-6xl sm:text-7xl mb-4">🔐</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
              Privacy <span className="text-blue-600">Policy</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Komitmen kami dalam melindungi privasi dan data personal pengguna JKT48Connect
            </p>
          </div>
          
          <div className="flex justify-center gap-2 flex-wrap">
            <Chip size="md" color="primary" variant="flat" startContent="📅">
              Terakhir diperbarui: {lastUpdated}
            </Chip>
            <Chip size="md" color="success" variant="flat" startContent="✅">
              Berlaku Efektif
            </Chip>
            <Chip size="md" color="warning" variant="flat" startContent="🔒">
              Data Protected
            </Chip>
          </div>
        </div>

        {/* Introduction */}
        <Card className="mb-8 sm:mb-12 border border-gray-200 dark:border-gray-800">
          <CardBody className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                🛡️ Pendahuluan
              </h2>
            </div>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
                JKT48Connect berkomitmen untuk melindungi privasi dan keamanan data personal pengguna. 
                Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, 
                dan melindungi informasi Anda ketika menggunakan layanan kami.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-4">
                Dengan menggunakan layanan JKT48Connect (termasuk WhatsApp Bot, Discord Bot, Website, 
                dan NPM Packages), Anda menyetujui praktik yang dijelaskan dalam kebijakan ini.
              </p>
              <div className="border border-blue-200 dark:border-blue-800 rounded-xl p-4 mt-6">
                <p className="text-blue-700 dark:text-blue-300 font-semibold mb-2">
                  💡 Penting untuk Diketahui:
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Kebijakan ini berlaku untuk semua produk dan layanan dalam ecosystem JKT48Connect. 
                  Kami menyarankan Anda membaca kebijakan ini secara lengkap dan berkala memeriksa 
                  pembaruan yang mungkin dilakukan.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Main Content Sections */}
        <div className="space-y-8 sm:space-y-12 mb-12 sm:mb-16">
          {sections.map((section, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-800">
              <CardBody className="p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl sm:text-4xl">{section.icon}</div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                
                <div className="space-y-6">
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                        {subsection.subtitle}
                      </h3>
                      <ul className="space-y-2">
                        {subsection.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Children Privacy */}
        <Card className="mb-8 sm:mb-12 border border-orange-200 dark:border-orange-800">
          <CardBody className="p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-3xl sm:text-4xl">👶</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                9. Perlindungan Anak-Anak
              </h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                JKT48Connect sangat peduli dengan perlindungan privasi anak-anak. Layanan kami dirancang 
                untuk pengguna berusia 13 tahun ke atas. Jika kami mengetahui bahwa kami telah mengumpulkan 
                data personal dari anak di bawah 13 tahun tanpa persetujuan orang tua, kami akan segera 
                menghapus informasi tersebut.
              </p>
              <div className="border border-orange-200 dark:border-orange-800 rounded-xl p-4">
                <p className="text-orange-700 dark:text-orange-300 font-semibold mb-2">
                  ⚠️ Perhatian Orang Tua:
                </p>
                <p className="text-orange-600 dark:text-orange-400 text-sm">
                  Jika Anda adalah orang tua dan mengetahui bahwa anak Anda telah memberikan informasi 
                  personal kepada kami, silakan hubungi kami segera agar kami dapat mengambil tindakan 
                  yang diperlukan.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Changes to Policy */}
        <Card className="mb-8 sm:mb-12 border border-purple-200 dark:border-purple-800">
          <CardBody className="p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-3xl sm:text-4xl">🔄</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                10. Perubahan Kebijakan
              </h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan 
                perubahan dalam praktik kami atau karena alasan operasional, hukum, atau regulasi lainnya.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                    📢 Pemberitahuan Perubahan
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li className="text-purple-600 dark:text-purple-400">• Notifikasi melalui bot WhatsApp</li>
                    <li className="text-purple-600 dark:text-purple-400">• Pengumuman di Discord</li>
                    <li className="text-purple-600 dark:text-purple-400">• Update di website resmi</li>
                  </ul>
                </div>
                
                <div className="border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                    📅 Implementasi
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li className="text-purple-600 dark:text-purple-400">• Berlaku 30 hari setelah notifikasi</li>
                    <li className="text-purple-600 dark:text-purple-400">• Waktu adaptasi untuk pengguna</li>
                    <li className="text-purple-600 dark:text-purple-400">• Opsi untuk berhenti menggunakan layanan</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Contact Information */}
        <Card className="border border-green-200 dark:border-green-800">
          <CardBody className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="text-4xl sm:text-5xl mb-4">📞</div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Hubungi Kami
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan 
                hak-hak Anda terkait data personal, jangan ragu untuk menghubungi kami.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {contactMethods.map((contact, index) => (
                <div key={index} className="border border-green-200 dark:border-green-800 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-3">{contact.icon}</div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{contact.method}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{contact.description}</p>
                  <div className="font-mono text-sm font-semibold border border-green-300 dark:border-green-700 rounded-lg p-3 mb-4">
                    {contact.contact}
                  </div>
                  <Button
                    as={Link}
                    href={contact.link}
                    isExternal
                    color="success"
                    size="md"
                    className="w-full font-semibold"
                    startContent={contact.icon}
                  >
                    Hubungi Sekarang
                  </Button>
                </div>
              ))}
            </div>

            <div className="border border-green-200 dark:border-green-800 rounded-xl p-6">
              <h4 className="font-bold text-lg mb-3 text-center text-gray-900 dark:text-white">
                🕐 Waktu Respons
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-green-600 dark:text-green-400 font-semibold">WhatsApp</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">1-24 jam</div>
                </div>
                <div>
                  <div className="text-green-600 dark:text-green-400 font-semibold">Email</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">1-3 hari kerja</div>
                </div>
                <div>
                  <div className="text-green-600 dark:text-green-400 font-semibold">Permintaan Data</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">5-7 hari kerja</div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
