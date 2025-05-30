
"use client"

import { Card, CardBody, Image, Breadcrumbs, BreadcrumbItem, Link, Button, Divider, Chip, Avatar } from "@heroui/react";
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
      gradient: "from-green-400 to-green-600"
    },
    {
      name: "JKT48Connect Discord Bot",
      description: "Discord bot public dengan fitur live notification dan berbagai fitur JKT48 lainnya",
      link: "https://top.gg/bot/1305141693477027891?s=0f5136415d254",
      type: "Discord Bot",
      icon: "🤖",
      features: ["Live Notification", "Member Commands", "Theater Info", "Public Access"],
      gradient: "from-indigo-400 to-purple-600"
    },
    {
      name: "JKT48Connect Website",
      description: "Website resmi JKT48Connect dengan berbagai fitur dan informasi lengkap tentang JKT48",
      type: "Website",
      icon: "🌐",
      features: ["Member Database", "Theater Schedule", "Live Tracking", "News & Updates"],
      gradient: "from-blue-400 to-cyan-600"
    },
    {
      name: "@jkt48/core",
      description: "Package module dengan fitur JKT48 paling lengkap dan komprehensif untuk developer",
      link: "https://npmjs.com/package/@jkt48/core",
      type: "NPM Package",
      icon: "📦",
      features: ["Complete JKT48 API", "Member Data", "Live Tracking", "Theater Info", "Most Comprehensive"],
      highlight: true,
      gradient: "from-yellow-400 to-orange-600"
    },
    {
      name: "@jkt48connect-corp/sdk",
      description: "SDK package dengan fitur JKT48 yang sama namun dalam format SDK yang mudah digunakan",
      link: "https://npmjs.com/package/@jkt48connect-corp/sdk",
      type: "SDK Package",
      icon: "⚡",
      features: ["JKT48 API", "Member Data", "Live Tracking", "SDK Format"],
      gradient: "from-red-400 to-pink-600"
    }
  ];

  const teams = [
    {
      name: "J-Force",
      description: "Tim development utama yang menaungi berbagai project JKT48Connect",
      link: "https://github.com/j-forces",
      icon: "👥",
      gradient: "from-purple-400 to-indigo-600"
    },
    {
      name: "Zenova",
      description: "Divisi khusus untuk pengembangan WhatsApp bot dan layanan messaging",
      icon: "🚀",
      gradient: "from-green-400 to-teal-600"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      <section className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-12">
        
        {/* Mobile-Optimized Breadcrumbs */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <Breadcrumbs size="sm" className="text-xs sm:text-sm">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem>About</BreadcrumbItem>
          </Breadcrumbs>
        </div>

        {/* Mobile-First Hero Section */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="relative inline-block mb-4 sm:mb-6 lg:mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-30 animate-pulse"></div>
            <Image
              src="/jkt48connect-logo.png"
              alt="JKT48Connect Logo"
              width={80}
              height={80}
              className="relative rounded-2xl shadow-xl sm:w-32 sm:h-32 lg:w-40 lg:h-40"
              fallbackSrc="https://via.placeholder.com/150x150?text=JKT48Connect"
            />
          </div>
          
          <div className="space-y-3 sm:space-y-4 lg:space-y-6 px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              JKT48Connect
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-default-600 max-w-4xl mx-auto leading-relaxed font-medium px-2">
              Ecosystem terlengkap untuk semua kebutuhan informasi JKT48 Anda
            </p>
            <div className="flex justify-center gap-2 flex-wrap px-2">
              <Chip size="sm" color="primary" variant="flat" className="text-xs">🚀 Trusted Platform</Chip>
              <Chip size="sm" color="success" variant="flat" className="text-xs">🎯 Real-time Updates</Chip>
              <Chip size="sm" color="warning" variant="flat" className="text-xs">💡 Innovation Driven</Chip>
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Creator Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8 px-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Meet The Creator
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-default-600">Mastermind behind JKT48Connect ecosystem</p>
          </div>
          
          <Card className="mx-auto overflow-hidden shadow-2xl border-0">
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
              <CardBody className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8">
                  
                  {/* Mobile-First Avatar */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                    <Avatar
                      src="https://files.catbox.moe/ljpa5c.jpg"
                      className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 border-4 border-white shadow-2xl"
                    />
                    <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-green-500 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 sm:border-4 border-white flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm">✓</span>
                    </div>
                  </div>
                  
                  {/* Mobile-Optimized Content */}
                  <div className="text-center w-full space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">Valzyy</h3>
                      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-3">
                        <Chip color="primary" variant="flat" size="sm" startContent="💻" className="text-xs">
                          Fullstack Developer
                        </Chip>
                        <Chip color="success" variant="flat" size="sm" startContent="🏗️" className="text-xs">
                          System Architect
                        </Chip>
                        <Chip color="warning" variant="flat" size="sm" startContent="🚀" className="text-xs">
                          Innovation Leader
                        </Chip>
                      </div>
                    </div>
                    
                    <p className="text-default-700 leading-relaxed text-sm sm:text-base lg:text-lg px-2">
                      Pencipta dan pengembang utama JKT48Connect ecosystem. Seorang fullstack developer 
                      yang berdedikasi menciptakan solusi teknologi terbaik untuk komunitas JKT48 Indonesia.
                    </p>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
                        <span className="text-default-500">📱 Contact:</span> 
                        <code className="bg-default-100 px-2 py-1 rounded text-xs font-mono break-all">
                          6285701479245
                        </code>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 px-2">
                        <Button
                          as={Link}
                          href="https://wa.me/6285701479245"
                          isExternal
                          color="success"
                          variant="flat"
                          startContent="💬"
                          className="font-medium w-full sm:w-auto text-xs sm:text-sm"
                          size="sm"
                        >
                          WhatsApp Valzyy
                        </Button>
                        <Button
                          as={Link}
                          href="https://github.com/j-forces"
                          isExternal
                          color="default"
                          variant="flat"
                          startContent="🐙"
                          className="font-medium w-full sm:w-auto text-xs sm:text-sm"
                          size="sm"
                        >
                          GitHub
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </div>
          </Card>
        </div>

        {/* Mobile-First Teams Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8 px-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">Development Teams</h2>
            <p className="text-sm sm:text-base lg:text-lg text-default-600">
              Tim-tim yang dibentuk untuk mengembangkan ecosystem JKT48Connect
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            {teams.map((team, index) => (
              <Card 
                key={index} 
                className="group hover:scale-105 transition-all duration-300 overflow-hidden border-0 shadow-lg"
              >
                <div className={`bg-gradient-to-r ${team.gradient} p-[1px]`}>
                  <div className="bg-white dark:bg-slate-900 rounded-lg">
                    <CardBody className="p-4 sm:p-6 text-center">
                      <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4">{team.icon}</div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{team.name}</h3>
                      <p className="text-xs sm:text-sm text-default-600 mb-3 sm:mb-4 leading-relaxed">
                        {team.description}
                      </p>
                      {team.link && (
                        <Button
                          as={Link}
                          href={team.link}
                          isExternal
                          color="primary"
                          variant="flat"
                          size="sm"
                          className="w-full sm:w-auto text-xs"
                        >
                          Visit Repository
                        </Button>
                      )}
                    </CardBody>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Mobile-Optimized About Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center px-2">
            Tentang JKT48Connect
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {[
              { icon: "🎯", title: "Mission", desc: "Menyediakan akses informasi JKT48 yang akurat, real-time, dan mudah diakses untuk seluruh komunitas" },
              { icon: "🚀", title: "Innovation", desc: "Menggunakan teknologi terdepan untuk memberikan experience terbaik bagi para fans JKT48" },
              { icon: "💜", title: "Community", desc: "Membangun ekosistem yang kuat untuk menghubungkan fans JKT48 di seluruh Indonesia" }
            ].map((item, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 border-0 shadow-lg">
                <CardBody className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4">{item.icon}</div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-default-600 leading-relaxed">{item.desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>
          
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-0 shadow-xl">
            <CardBody className="p-4 sm:p-6 lg:p-8">
              <div className="text-center">
                <p className="text-default-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 px-2">
                  JKT48Connect lahir dari kebutuhan komunitas akan platform terintegrasi yang menyediakan 
                  informasi lengkap tentang JKT48. Dengan berbagai tools dan layanan yang telah dikembangkan, 
                  kami telah melayani ribuan fans JKT48 di seluruh Indonesia.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-center">
                  {[
                    { value: "1000+", label: "Active Users" },
                    { value: "24/7", label: "Live Monitoring" },
                    { value: "5+", label: "Major Projects" },
                    { value: "100%", label: "Free Access" }
                  ].map((stat, index) => (
                    <div key={index} className="p-2 sm:p-3">
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-default-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Mobile-First Projects Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8 px-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">Our Projects</h2>
            <p className="text-sm sm:text-base lg:text-lg text-default-600">
              Berbagai project yang telah dikembangkan untuk komunitas JKT48
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className={`h-full group transition-all duration-300 overflow-hidden border-0 shadow-lg ${
                  project.highlight ? 'ring-2 ring-primary/20' : ''
                } ${hoveredProject === index ? 'scale-105' : ''}`}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className={`bg-gradient-to-r ${project.gradient} p-[1px]`}>
                  <div className="bg-white dark:bg-slate-900 rounded-lg h-full">
                    <CardBody className="p-4 sm:p-6 h-full flex flex-col">
                      
                      {/* Header */}
                      <div className="flex justify-between items-start mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                          <div className="text-xl sm:text-2xl lg:text-3xl flex-shrink-0">{project.icon}</div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm sm:text-base lg:text-lg font-bold truncate">{project.name}</h3>
                            {project.highlight && (
                              <div className="text-xs text-primary font-medium">⭐ Featured</div>
                            )}
                          </div>
                        </div>
                        <Chip 
                          size="sm" 
                          color={getTypeColor(project.type)}
                          variant="flat"
                          className="text-xs flex-shrink-0 ml-2"
                        >
                          {project.type}
                        </Chip>
                      </div>
                      
                      {/* Description */}
                      <p className="text-xs sm:text-sm text-default-600 mb-3 sm:mb-4 leading-relaxed flex-grow">
                        {project.description}
                      </p>

                      {/* Contact */}
                      {project.contact && (
                        <div className="mb-3 sm:mb-4 p-3 bg-success-50 dark:bg-success-950/20 rounded-lg">
                          <p className="text-xs text-success-700 dark:text-success-300 mb-1">📱 Contact Number:</p>
                          <code className="font-mono text-xs bg-success-100 dark:bg-success-900/30 px-2 py-1 rounded break-all">
                            {project.contact}
                          </code>
                        </div>
                      )}

                      {/* Features */}
                      <div className="mb-3 sm:mb-4">
                        <p className="text-xs text-default-500 mb-2 font-medium">✨ Features:</p>
                        <div className="flex flex-wrap gap-1">
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
                          color={project.highlight ? "primary" : "default"}
                          variant={project.highlight ? "solid" : "flat"}
                          className="w-full font-medium text-xs sm:text-sm mt-auto"
                          size="sm"
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
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Mobile-Optimized Featured Packages */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <Card className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-950/10 dark:via-orange-950/10 dark:to-red-950/10 border-2 border-warning-200 dark:border-warning-800 overflow-hidden">
            <CardBody className="p-4 sm:p-6 lg:p-8">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">🏆 Developer Packages</h3>
                <p className="text-xs sm:text-sm text-default-600">
                  Paket unggulan untuk developer yang ingin mengintegrasikan JKT48 API
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
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
                  <Card key={index} className={`border-2 border-${pkg.color}-200 dark:border-${pkg.color}-800`}>
                    <CardBody className="p-4 sm:p-6 text-center">
                      <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{pkg.icon}</div>
                      <h4 className="text-base sm:text-lg lg:text-xl font-bold mb-2 text-warning-600">
                        {pkg.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-default-600 mb-3 sm:mb-4 leading-relaxed">
                        {pkg.desc}
                      </p>
                      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                        {pkg.badges.map((badge, idx) => (
                          <Chip 
                            key={idx} 
                            size="sm" 
                            color={idx === 0 ? pkg.color as any : "success"} 
                            variant="flat" 
                            className="text-xs"
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
                        variant="solid"
                        className="w-full text-xs sm:text-sm"
                        size="sm"
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

        {/* Mobile-First Contact Section */}
        <div className="text-center">
          <div className="mb-4 sm:mb-6 lg:mb-8 px-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">Get In Touch</h2>
            <p className="text-sm sm:text-base lg:text-lg text-default-600 leading-relaxed">
              Punya pertanyaan, saran, atau ingin berkolaborasi? Tim JKT48Connect siap membantu Anda!
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {[
              { icon: "💬", title: "WhatsApp Bot", desc: "Chat dengan Zenova Bot", link: "https://wa.me/6285189020193", btn: "Chat Zenova", color: "success" },
              { icon: "👨‍💻", title: "Contact Creator", desc: "Hubungi Valzyy langsung", link: "https://wa.me/6285701479245", btn: "Chat Valzyy", color: "primary" },
              { icon: "🤖", title: "Discord Bot", desc: "Invite JKT48Connect Bot", link: "https://top.gg/bot/1305141693477027891?s=0f5136415d254", btn: "Invite Bot", color: "secondary" }
            ].map((contact, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 border-0 shadow-lg">
                <CardBody className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{contact.icon}</div>
                  <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{contact.title}</h4>
                  <p className="text-xs sm:text-sm text-default-600 mb-2 sm:mb-3">{contact.desc}</p>
                  <Button
                    as={Link}
                    href={contact.link}
                    isExternal
                    color={contact.color as any}
                    variant="flat"
                    size="sm"
                    className="w-full text-xs"
                  >
                    {contact.btn}
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-primary-200 dark:border-primary-800 shadow-xl">
            <CardBody className="p-4 sm:p-6 lg:p-8">
              <h4 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-4">🚀 Join Our Community</h4>
              <p className="text-xs sm:text-sm text-default-600 mb-4 sm:mb-6 px-2 leading-relaxed">
                Bergabunglah dengan ribuan fans JKT48 lainnya dan dapatkan update terbaru 
                dari ecosystem JKT48Connect!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 lg:gap-4">
                <Button color="success" size="sm" startContent="💬" className="font-medium text-xs w-full sm:w-auto">
                  WhatsApp Community
                </Button>
                <Button color="primary" size="sm" startContent="💬" className="font-medium text-xs w-full sm:w-auto">
                  Discord Server
                </Button>
                <Button color="secondary" size="sm" startContent="📢" className="font-medium text-xs w-full sm:w-auto">
                  Telegram Channel
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
}
