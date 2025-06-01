"use client"

import { 
  Card, CardBody, Image, Breadcrumbs, BreadcrumbItem, Link, Button, Divider, Chip, Avatar, Heading, Text 
} from "@heroui/react";
import { useState } from "react";

export default function AboutJKT48Connect() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      name: "Zenova WhatsApp Bot",
      description: "WhatsApp bot dengan fitur JKT48 lengkap, terutama live dan endlive notification yang paling diminati users",
      contact: "6285189020193",
      link: "https://wa.me/6285189020193",
      type: "WhatsApp Bot",
      icon: "💬",
      features: ["Live Notification", "End Live Notification", "Member Info", "Theater Schedule"],
      highlight: true,
      color: "success"
    },
    {
      name: "JKT48Connect Discord Bot",
      description: "Discord bot public dengan fitur live notification dan berbagai fitur JKT48 lainnya",
      link: "https://top.gg/bot/1305141693477027891?s=0f5136415d254",
      type: "Discord Bot",
      icon: "🤖",
      features: ["Live Notification", "Member Commands", "Theater Info", "Public Access"],
      color: "primary"
    },
    {
      name: "JKT48Connect Website",
      description: "Website resmi JKT48Connect dengan berbagai fitur dan informasi lengkap tentang JKT48",
      type: "Website",
      icon: "🌐",
      features: ["Member Database", "Theater Schedule", "Live Tracking", "News & Updates"],
      color: "secondary"
    },
    {
      name: "@jkt48/core",
      description: "Package module dengan fitur JKT48 paling lengkap dan komprehensif untuk developer",
      link: "https://npmjs.com/package/@jkt48/core",
      type: "NPM Package",
      icon: "📦",
      features: ["Complete JKT48 API", "Member Data", "Live Tracking", "Theater Info", "Most Comprehensive"],
      highlight: true,
      color: "warning"
    },
    {
      name: "@jkt48connect-corp/sdk",
      description: "SDK package dengan fitur JKT48 yang sama namun dalam format SDK yang mudah digunakan",
      link: "https://npmjs.com/package/@jkt48connect-corp/sdk",
      type: "SDK Package",
      icon: "⚡",
      features: ["JKT48 API", "Member Data", "Live Tracking", "SDK Format"],
      color: "danger"
    }
  ];

  const teams = [
    {
      name: "J-Force",
      description: "Tim development utama yang menaungi berbagai project JKT48Connect",
      link: "https://github.com/j-forces",
      icon: "👥",
      color: "primary"
    },
    {
      name: "Zenova",
      description: "Divisi khusus untuk pengembangan WhatsApp bot dan layanan messaging",
      icon: "🚀",
      color: "success"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "WhatsApp Bot": return "success";
      case "Discord Bot": return "primary";
      case "Website": return "secondary";
      case "NPM Package": return "warning";
      case "SDK Package": return "danger";
      default: return "default";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        
        {/* Breadcrumbs */}
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs size="sm" className="text-sm">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem>About</BreadcrumbItem>
          </Breadcrumbs>
        </div>

        {/* Hero Section */}
        <div className="relative text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-30 rounded-3xl"></div>
          <div className="relative z-10 space-y-4 sm:space-y-6 max-w-4xl mx-auto py-12">
            <div className="flex justify-center">
              <Image
                src="https://files.catbox.moe/i1qudl.jpg"
                alt="JKT48Connect Logo"
                width={120}
                height={120}
                className="rounded-full shadow-2xl border-4 border-white dark:border-gray-800"
                fallbackSrc="https://via.placeholder.com/150x150?text=JKT48Connect"
              />
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight">
              JKT48<span className="text-yellow-300">Connect</span>
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 leading-relaxed font-medium px-4">
              Ecosystem terlengkap untuk semua kebutuhan informasi JKT48 Anda
            </p>
            <div className="flex justify-center gap-2 flex-wrap px-4">
              <Chip size="md" color="primary" variant="flat" startContent="🚀">Trusted Platform</Chip>
              <Chip size="md" color="success" variant="flat" startContent="🎯">Real-time Updates</Chip>
              <Chip size="md" color="warning" variant="flat" startContent="💡">Innovation Driven</Chip>
            </div>
          </div>
        </div>

        {/* Creator Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-8 sm:mb-10">
            <Heading size="lg" className="font-bold mb-3 text-gray-900 dark:text-white">
              Meet The <span className="text-purple-600">Creator</span>
            </Heading>
            <Text size="md" className="text-gray-600 dark:text-gray-300">
              Mastermind behind JKT48Connect ecosystem
            </Text>
          </div>
          
          <Card className="max-w-4xl mx-auto shadow-lg border-0 rounded-3xl overflow-hidden">
            <CardBody className="p-6 sm:p-8 lg:p-12 bg-white dark:bg-gray-900">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                
                {/* Avatar */}
                <div className="flex-shrink-0 relative">
                  <Avatar
                    src="https://files.catbox.moe/ljpa5c.jpg"
                    className="w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full border-4 border-white dark:border-gray-800 shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white dark:border-gray-950 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">✓</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 text-center lg:text-left space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Valzyy</h3>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-2">
                      <Chip color="primary" variant="flat" startContent="💻">Fullstack Developer</Chip>
                      <Chip color="success" variant="flat" startContent="🏗️">System Architect</Chip>
                      <Chip color="warning" variant="flat" startContent="🚀">Innovation Leader</Chip>
                    </div>
                  </div>
                  
                  <Text size="md" className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Pencipta dan pengembang utama JKT48Connect ecosystem. Seorang fullstack developer 
                    yang berdedikasi menciptakan solusi teknologi terbaik untuk komunitas JKT48 Indonesia
                  </Text>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center justify-center lg:justify-start gap-3 text-sm sm:text-base">
                        <span className="text-gray-500">📱 Contact:</span> 
                        <code className="bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-lg font-mono">
                          6285701479245
                        </code>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                      <Button
                        as={Link}
                        href="https://wa.me/6285701479245"
                        isExternal
                        color="success"
                        size="lg"
                        startContent="💬"
                        className="font-semibold"
                      >
                        WhatsApp Valzyy
                      </Button>
                      <Button
                        as={Link}
                        href="https://github.com/j-forces"
                        isExternal
                        color="default"
                        variant="bordered"
                        size="lg"
                        startContent="🐙"
                        className="font-semibold"
                      >
                        GitHub
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Teams Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-8 sm:mb-10">
            <Heading size="lg" className="font-bold mb-3 text-gray-900 dark:text-white">
              Development <span className="text-blue-600">Teams</span>
            </Heading>
            <Text size="md" className="text-gray-600 dark:text-gray-300">
              Tim-tim yang dibentuk untuk mengembangkan ecosystem JKT48Connect
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {teams.map((team, index) => (
              <Card 
                key={index} 
                className="group hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-2xl border-0 overflow-hidden"
              >
                <CardBody className="p-6 sm:p-8 text-center bg-white dark:bg-gray-900">
                  <div className="text-5xl sm:text-6xl mb-4">{team.icon}</div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900 dark:text-white">{team.name}</h3>
                  <Text size="md" className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {team.description}
                  </Text>
                  {team.link && (
                    <Button
                      as={Link}
                      href={team.link}
                      isExternal
                      color={team.color as any}
                      size="lg"
                      className="font-semibold"
                    >
                      Visit Repository
                    </Button>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <Heading size="lg" className="text-center font-bold mb-8 sm:mb-10 text-gray-900 dark:text-white">
            Tentang <span className="text-purple-600">JKT48Connect</span>
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10 sm:mb-12">
            {[
              { icon: "🎯", title: "Mission", desc: "Menyediakan akses informasi JKT48 yang akurat, real-time, dan mudah diakses untuk seluruh komunitas", color: "primary" },
              { icon: "🚀", title: "Innovation", desc: "Menggunakan teknologi terdepan untuk memberikan experience terbaik bagi para fans JKT48", color: "success" },
              { icon: "💜", title: "Community", desc: "Membangun ekosistem yang kuat untuk menghubungkan fans JKT48 di seluruh Indonesia", color: "warning" }
            ].map((item, index) => (
              <Card key={index} className="group hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-2xl border-0 overflow-hidden">
                <CardBody className="p-6 sm:p-8 text-center bg-white dark:bg-gray-900">
                  <div className="text-5xl sm:text-6xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                  <Text size="md" className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</Text>
                </CardBody>
              </Card>
            ))}
          </div>
          
          <Card className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg border-0">
            <CardBody className="p-6 sm:p-8 lg:p-12">
              <div className="text-center">
                <Text size="lg" className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  JKT48Connect lahir dari kebutuhan komunitas akan platform terintegrasi yang menyediakan 
                  informasi lengkap tentang JKT48. Dengan berbagai tools dan layanan yang telah dikembangkan, 
                  kami telah melayani ribuan fans JKT48 di seluruh Indonesia.
                </Text>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                  {[
                    { value: "1000+", label: "Active Users", color: "text-blue-600" },
                    { value: "24/7", label: "Live Monitoring", color: "text-green-600" },
                    { value: "5+", label: "Major Projects", color: "text-purple-600" },
                    { value: "100%", label: "Free Access", color: "text-orange-600" }
                  ].map((stat, index) => (
                    <div key={index} className="p-4">
                      <div className={`text-3xl sm:text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                      <div className="text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-8 sm:mb-10">
            <Heading size="lg" className="font-bold mb-3 text-gray-900 dark:text-white">
              Our <span className="text-green-600">Projects</span>
            </Heading>
            <Text size="md" className="text-gray-600 dark:text-gray-300">
              Berbagai project yang telah dikembangkan untuk komunitas JKT48
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className={`h-full group transition-all duration-300 rounded-2xl overflow-hidden ${
                  project.highlight 
                    ? 'shadow-xl ring-2 ring-blue-100 dark:ring-blue-900' 
                    : 'shadow-lg'
                }`}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <CardBody className="p-6 h-full flex flex-col bg-white dark:bg-gray-900">
                  
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="text-3xl sm:text-4xl flex-shrink-0">{project.icon}</div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">{project.name}</h3>
                        {project.highlight && (
                          <div className="text-sm text-blue-600 font-semibold mt-1">⭐ Featured</div>
                        )}
                      </div>
                    </div>
                    <Chip 
                      size="md" 
                      color={getTypeColor(project.type)}
                      variant="flat"
                      className="flex-shrink-0 ml-2"
                    >
                      {project.type}
                    </Chip>
                  </div>
                  
                  {/* Description */}
                  <Text size="sm" className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-grow">
                    {project.description}
                  </Text>

                  {/* Contact */}
                  {project.contact && (
                    <div className="mb-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-xl border-2 border-green-200 dark:border-green-800">
                      <Text size="sm" className="text-green-700 dark:text-green-300 mb-2 font-semibold">
                        📱 Contact Number:
                      </Text>
                      <code className="font-mono text-sm bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-lg block">
                        {project.contact}
                      </code>
                    </div>
                  )}

                  {/* Features */}
                  <div className="mb-6">
                    <Text size="sm" className="text-gray-500 dark:text-gray-400 mb-3 font-semibold">
                      ✨ Features:
                    </Text>
                    <div className="flex flex-wrap gap-2">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <Chip key={idx} size="sm" variant="bordered" className="text-xs">
                          {feature}
                        </Chip>
                      ))}
                      {project.features.length > 3 && (
                        <Chip size="sm" variant="bordered" className="text-xs">
                          +{project.features.length - 3} more
                        </Chip>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  {project.link && (
                    <Button
                      as={Link}
                      href={project.link}
                      isExternal
                      color={project.highlight ? "primary" : project.color as any}
                      variant={project.highlight ? "solid" : "flat"}
                      className="w-full font-semibold mt-auto"
                      size="lg"
                      startContent={
                        project.type === "WhatsApp Bot" ? "💬" :
                        project.type === "Discord Bot" ? "🤖" :
                        project.type.includes("Package") ? "📦" : "🌐"
                      }
                    >
                      {project.type === "WhatsApp Bot" ? "Chat WhatsApp" :
                       project.type === "Discord Bot" ? "Invite Bot" :
                       project.type.includes("Package") ? "View Package" : "Visit"}
                    </Button>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* API Key Info Banner */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl shadow-lg overflow-hidden">
            <CardBody className="p-6 sm:p-8 lg:p-12 text-center">
              <Heading size="md" className="text-white font-bold mb-4">
                🔐 API Key Information
              </Heading>
              <Text size="md" className="text-white/90 leading-relaxed mb-6">
                Untuk menggunakan package atau API JKT48Connect, kamu perlu API key terlebih dahulu.<br/>
                Kamu bisa membeli API key secara otomatis melalui Bot dengan command <code className="bg-white/25 px-2 py-1 rounded">.buyapi</code>, atau langsung hubungi developer (Valzyy).<br/>
                Semua dokumentasi lengkap untuk API &amp; package ada di bawah.
              </Text>
              <Button
                as={Link}
                href="https://docs.jkt48connect.my.id"
                isExternal
                color="light"
                size="lg"
                className="font-semibold bg-white text-indigo-600 hover:bg-gray-100"
              >
                📖 Lihat Full Docs
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Featured Packages */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/10 dark:to-orange-950/10 rounded-3xl shadow-lg overflow-hidden">
            <CardBody className="p-6 sm:p-8 lg:p-12">
              <div className="text-center mb-8">
                <Heading size="md" className="font-bold mb-3 text-gray-900 dark:text-white">
                  🏆 Developer Packages
                </Heading>
                <Text size="md" className="text-gray-600 dark:text-gray-300">
                  Paket unggulan untuk developer yang ingin mengintegrasikan JKT48 API
                </Text>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {[
                  {
                    icon: "📦",
                    name: "@jkt48/core",
                    color: "warning",
                    desc: "Package dengan fitur JKT48 paling lengkap dan komprehensif. Pilihan utama untuk developer yang membutuhkan akses full JKT48 API.",
                    badges: ["Most Complete", "Production Ready"],
                    link: "https://npmjs.com/package/@jkt48/core"
                  },
                  {
                    icon: "⚡",
                    name: "@jkt48connect-corp/sdk",
                    color: "danger",
                    desc: "SDK format dengan fitur yang sama, memberikan kemudahan integrasi dalam berbagai project development.",
                    badges: ["SDK Format", "Easy Integration"],
                    link: "https://npmjs.com/package/@jkt48connect-corp/sdk"
                  }
                ].map((pkg, index) => (
                  <Card key={index} className="border-0 rounded-2xl overflow-hidden shadow-lg">
                    <CardBody className="p-6 sm:p-8 text-center bg-white dark:bg-gray-900">
                      <div className="text-5xl mb-4">{pkg.icon}</div>
                      <h4 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                        {pkg.name}
                      </h4>
                      <Text size="md" className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {pkg.desc}
                      </Text>
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {pkg.badges.map((badge, idx) => (
                          <Chip 
                            key={idx} 
                            size="md" 
                            color={idx === 0 ? pkg.color as any : "success"} 
                            variant="flat"
                          >
                            {badge}
                          </Chip>
                        ))}
                      </div>
                      <Button
                        as={Link}
                        href={pkg.link}
                        isExternal
                        color={pkg.color as any}
                        size="lg"
                        className="w-full font-semibold"
                      >
                        View on NPM
                      </Button>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="text-center mb-20">
          <div className="mb-8 sm:mb-10">
            <Heading size="lg" className="font-bold mb-4 text-gray-900 dark:text-white">
              Get In <span className="text-blue-600">Touch</span>
            </Heading>
            <Text size="md" className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Punya pertanyaan, saran, atau ingin berkolaborasi? Tim JKT48Connect siap membantu Anda!
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {[
              { icon: "💬", title: "WhatsApp Bot", desc: "Chat dengan Zenova Bot", link: "https://wa.me/6285189020193", btn: "Chat Zenova", color: "success" },
              { icon: "👨‍💻", title: "Contact Creator", desc: "Hubungi Valzyy langsung", link: "https://wa.me/6285701479245", btn: "Chat Valzyy", color: "primary" },
              { icon: "🤖", title: "Discord Bot", desc: "Invite JKT48Connect Bot", link: "https://top.gg/bot/1305141693477027891?s=0f5136415d254", btn: "Invite Bot", color: "secondary" }
            ].map((contact, index) => (
              <Card key={index} className="group hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-2xl border-0 overflow-hidden">
                <CardBody className="p-6 sm:p-8 text-center bg-white dark:bg-gray-900">
                  <div className="text-5xl mb-4">{contact.icon}</div>
                  <h4 className="font-bold mb-2 text-2xl text-gray-900 dark:text-white">{contact.title}</h4>
                  <Text size="md" className="text-gray-600 dark:text-gray-300 mb-6">{contact.desc}</Text>
                  <Button
                    as={Link}
                    href={contact.link}
                    isExternal
                    color={contact.color as any}
                    size="lg"
                    className="w-full font-semibold"
                  >
                    {contact.btn}
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>

          <Card className="bg-blue-50 dark:bg-blue-950/20 rounded-3xl shadow-lg overflow-hidden border-0">
            <CardBody className="p-6 sm:p-8 lg:p-12">
              <Heading size="md" className="font-bold mb-4 text-gray-900 dark:text-white">🚀 Join Our Community</Heading>
              <Text size="md" className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg max-w-2xl mx-auto">
                Bergabunglah dengan ribuan fans JKT48 lainnya dan dapatkan update terbaru 
                dari ecosystem JKT48Connect!
              </Text>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button color="success" size="lg" startContent="💬" className="font-semibold">
                  WhatsApp Community
                </Button>
                <Button color="primary" size="lg" startContent="💬" className="font-semibold">
                  Discord Server
                </Button>
                <Button color="secondary" size="lg" startContent="📢" className="font-semibold">
                  Telegram Channel
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

      </div>
    </div>
  );
}
