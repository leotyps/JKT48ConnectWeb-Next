
"use client"

import { Card, CardBody, Image, Breadcrumbs, BreadcrumbItem, Link, Button, Divider, Chip, Avatar } from "@heroui/react";

export default function AboutJKT48Connect() {
  const projects = [
    {
      name: "Zenova WhatsApp Bot",
      description: "WhatsApp bot dengan fitur JKT48 lengkap, terutama live dan endlive notification yang paling diminati users",
      contact: "6285189020193",
      link: "https://wa.me/6285189020193",
      type: "WhatsApp Bot",
      icon: "💬",
      features: ["Live Notification", "End Live Notification", "Member Info", "Theater Schedule"],
      highlight: true
    },
    {
      name: "JKT48Connect Discord Bot",
      description: "Discord bot public dengan fitur live notification dan berbagai fitur JKT48 lainnya",
      link: "https://top.gg/bot/1305141693477027891?s=0f5136415d254",
      type: "Discord Bot",
      icon: "🤖",
      features: ["Live Notification", "Member Commands", "Theater Info", "Public Access"]
    },
    {
      name: "JKT48Connect Website",
      description: "Website resmi JKT48Connect dengan berbagai fitur dan informasi lengkap tentang JKT48",
      type: "Website",
      icon: "🌐",
      features: ["Member Database", "Theater Schedule", "Live Tracking", "News & Updates"]
    },
    {
      name: "@jkt48/core",
      description: "Package module dengan fitur JKT48 paling lengkap dan komprehensif untuk developer",
      link: "https://npmjs.com/package/@jkt48/core",
      type: "NPM Package",
      icon: "📦",
      features: ["Complete JKT48 API", "Member Data", "Live Tracking", "Theater Info", "Most Comprehensive"],
      highlight: true
    },
    {
      name: "@jkt48connect-corp/sdk",
      description: "SDK package dengan fitur JKT48 yang sama namun dalam format SDK yang mudah digunakan",
      link: "https://npmjs.com/package/@jkt48connect-corp/sdk",
      type: "SDK Package",
      icon: "⚡",
      features: ["JKT48 API", "Member Data", "Live Tracking", "SDK Format"]
    }
  ];

  const teams = [
    {
      name: "J-Force",
      description: "Tim development utama yang menaungi berbagai project JKT48Connect",
      link: "https://github.com/j-forces",
      icon: "👥"
    },
    {
      name: "Zenova",
      description: "Divisi khusus untuk pengembangan WhatsApp bot dan layanan messaging",
      icon: "🚀"
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
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-12">
      <div className="w-full max-w-7xl px-4">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-8">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>About</BreadcrumbItem>
        </Breadcrumbs>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
            <Image
              src="/jkt48connect-logo.png"
              alt="JKT48Connect Logo"
              width={150}
              height={150}
              fallbackSrc="https://via.placeholder.com/150x150?text=JKT48Connect"
              className="relative rounded-3xl shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              JKT48Connect
            </h1>
            <p className="text-xl md:text-2xl text-default-600 max-w-4xl mx-auto leading-relaxed font-medium">
              Ecosystem terlengkap untuk semua kebutuhan informasi JKT48 Anda
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Chip size="lg" color="primary" variant="flat" className="px-4 py-2">🚀 Trusted Platform</Chip>
              <Chip size="lg" color="success" variant="flat" className="px-4 py-2">🎯 Real-time Updates</Chip>
              <Chip size="lg" color="warning" variant="flat" className="px-4 py-2">💡 Innovation Driven</Chip>
            </div>
          </div>
        </div>

        {/* Creator Section - Enhanced */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Meet The Creator
            </h2>
            <p className="text-lg text-default-600">Mastermind behind JKT48Connect ecosystem</p>
          </div>
          
          <Card className="max-w-4xl mx-auto overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8">
              <CardBody className="p-0">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50"></div>
                    <Avatar
                      src="https://files.catbox.moe/ljpa5c.jpg"
                      className="relative w-32 h-32 md:w-40 md:h-40 border-4 border-white shadow-2xl"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left space-y-4">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">Valzyy</h3>
                      <div className="flex justify-center md:justify-start gap-2 mb-3">
                        <Chip color="primary" variant="flat" startContent="💻">Fullstack Developer</Chip>
                        <Chip color="success" variant="flat" startContent="🏗️">System Architect</Chip>
                        <Chip color="warning" variant="flat" startContent="🚀">Innovation Leader</Chip>
                      </div>
                    </div>
                    
                    <p className="text-default-700 leading-relaxed text-lg">
                      Pencipta dan pengembang utama JKT48Connect ecosystem. Seorang fullstack developer 
                      yang berdedikasi menciptakan solusi teknologi terbaik untuk komunitas JKT48 Indonesia.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <span className="text-default-500">📱 Contact:</span> 
                        <code className="bg-default-100 px-2 py-1 rounded text-sm font-mono">6285701479245</code>
                      </div>
                      
                      <div className="flex justify-center md:justify-start gap-3">
                        <Button
                          as={Link}
                          href="https://wa.me/6285701479245"
                          isExternal
                          color="success"
                          variant="flat"
                          startContent="💬"
                          className="font-medium"
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
                          className="font-medium"
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

        {/* Teams Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Development Teams</h2>
            <p className="text-lg text-default-600">Tim-tim yang dibentuk untuk mengembangkan ecosystem JKT48Connect</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {teams.map((team, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300">
                <CardBody className="p-6 text-center">
                  <div className="text-4xl mb-4">{team.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{team.name}</h3>
                  <p className="text-default-600 mb-4">{team.description}</p>
                  {team.link && (
                    <Button
                      as={Link}
                      href={team.link}
                      isExternal
                      color="primary"
                      variant="flat"
                      size="sm"
                    >
                      Visit Repository
                    </Button>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* About Section - Enhanced */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Tentang JKT48Connect</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="group hover:scale-105 transition-all duration-300">
              <CardBody className="p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3">Mission</h3>
                <p className="text-default-600">Menyediakan akses informasi JKT48 yang akurat, real-time, dan mudah diakses untuk seluruh komunitas</p>
              </CardBody>
            </Card>
            <Card className="group hover:scale-105 transition-all duration-300">
              <CardBody className="p-6 text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-default-600">Menggunakan teknologi terdepan untuk memberikan experience terbaik bagi para fans JKT48</p>
              </CardBody>
            </Card>
            <Card className="group hover:scale-105 transition-all duration-300">
              <CardBody className="p-6 text-center">
                <div className="text-4xl mb-4">💜</div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-default-600">Membangun ekosistem yang kuat untuk menghubungkan fans JKT48 di seluruh Indonesia</p>
              </CardBody>
            </Card>
          </div>
          
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardBody className="p-8">
              <div className="prose prose-lg max-w-none text-center">
                <p className="text-default-700 leading-relaxed text-lg mb-6">
                  JKT48Connect lahir dari kebutuhan komunitas akan platform terintegrasi yang menyediakan 
                  informasi lengkap tentang JKT48. Dengan berbagai tools dan layanan yang telah dikembangkan, 
                  kami telah melayani ribuan fans JKT48 di seluruh Indonesia.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">1000+</div>
                    <div className="text-sm text-default-500">Active Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-success">24/7</div>
                    <div className="text-sm text-default-500">Live Monitoring</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-warning">5+</div>
                    <div className="text-sm text-default-500">Major Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-danger">100%</div>
                    <div className="text-sm text-default-500">Free Access</div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Projects Section - Enhanced */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Projects</h2>
            <p className="text-lg text-default-600">Berbagai project yang telah dikembangkan untuk komunitas JKT48</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className={`h-full group hover:scale-105 transition-all duration-300 ${
                  project.highlight ? 'ring-2 ring-primary/20 shadow-lg' : ''
                }`}
              >
                <CardBody className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{project.icon}</div>
                      <div>
                        <h3 className="text-lg font-bold">{project.name}</h3>
                        {project.highlight && (
                          <div className="text-xs text-primary font-medium">⭐ Featured</div>
                        )}
                      </div>
                    </div>
                    <Chip 
                      size="sm" 
                      color={getTypeColor(project.type)}
                      variant="flat"
                    >
                      {project.type}
                    </Chip>
                  </div>
                  
                  <p className="text-default-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {project.contact && (
                    <div className="mb-4 p-3 bg-success-50 dark:bg-success-950/20 rounded-lg">
                      <p className="text-sm text-success-700 dark:text-success-300 mb-1">📱 Contact Number:</p>
                      <code className="font-mono text-sm bg-success-100 dark:bg-success-900/30 px-2 py-1 rounded">
                        {project.contact}
                      </code>
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-sm text-default-500 mb-2 font-medium">✨ Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.features.map((feature, idx) => (
                        <Chip key={idx} size="sm" variant="bordered" className="text-xs">
                          {feature}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  {project.link && (
                    <Button
                      as={Link}
                      href={project.link}
                      isExternal
                      color={project.highlight ? "primary" : "default"}
                      variant={project.highlight ? "solid" : "flat"}
                      className="w-full font-medium"
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

        {/* Featured Packages Section - Enhanced */}
        <div className="mb-16">
          <Card className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-950/10 dark:via-orange-950/10 dark:to-red-950/10 border-2 border-warning-200 dark:border-warning-800">
            <CardBody className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">🏆 Developer Packages</h3>
                <p className="text-default-600">Paket unggulan untuk developer yang ingin mengintegrasikan JKT48 API</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-warning-200 dark:border-warning-800">
                  <CardBody className="p-6 text-center">
                    <div className="text-3xl mb-3">📦</div>
                    <h4 className="text-xl font-bold mb-2 text-warning-600">@jkt48/core</h4>
                    <p className="text-sm text-default-600 mb-4">
                      Package dengan fitur JKT48 paling lengkap dan komprehensif. 
                      Pilihan utama untuk developer yang membutuhkan akses full JKT48 API.
                    </p>
                    <div className="flex justify-center gap-2 mb-4">
                      <Chip size="sm" color="warning" variant="flat">Most Complete</Chip>
                      <Chip size="sm" color="success" variant="flat">Production Ready</Chip>
                    </div>
                    <Button
                      as={Link}
                      href="https://npmjs.com/package/@jkt48/core"
                      isExternal
                      color="warning"
                      variant="solid"
                      className="w-full"
                    >
                      View on NPM
                    </Button>
                  </CardBody>
                </Card>
                <Card className="border-2 border-danger-200 dark:border-danger-800">
                  <CardBody className="p-6 text-center">
                    <div className="text-3xl mb-3">⚡</div>
                    <h4 className="text-xl font-bold mb-2 text-danger-600">@jkt48connect-corp/sdk</h4>
                    <p className="text-sm text-default-600 mb-4">
                      SDK format dengan fitur yang sama, memberikan kemudahan 
                      integrasi dalam berbagai project development.
                    </p>
                    <div className="flex justify-center gap-2 mb-4">
                      <Chip size="sm" color="danger" variant="flat">SDK Format</Chip>
                      <Chip size="sm" color="primary" variant="flat">Easy Integration</Chip>
                    </div>
                    <Button
                      as={Link}
                      href="https://npmjs.com/package/@jkt48connect-corp/sdk"
                      isExternal
                      color="danger"
                      variant="solid"
                      className="w-full"
                    >
                      View on NPM
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Contact Section - Enhanced */}
        <div className="text-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-default-600 max-w-2xl mx-auto">
              Punya pertanyaan, saran, atau ingin berkolaborasi? Tim JKT48Connect siap membantu Anda!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <Card className="group hover:scale-105 transition-all duration-300">
              <CardBody className="p-6 text-center">
                <div className="text-3xl mb-3">💬</div>
                <h4 className="font-semibold mb-2">WhatsApp Bot</h4>
                <p className="text-sm text-default-600 mb-3">Chat dengan Zenova Bot</p>
                <Button
                  as={Link}
                  href="https://wa.me/6285189020193"
                  isExternal
                  color="success"
                  variant="flat"
                  size="sm"
                >
                  Chat Zenova
                </Button>
              </CardBody>
            </Card>
            
            <Card className="group hover:scale-105 transition-all duration-300">
              <CardBody className="p-6 text-center">
                <div className="text-3xl mb-3">👨‍💻</div>
                <h4 className="font-semibold mb-2">Contact Creator</h4>
                <p className="text-sm text-default-600 mb-3">Hubungi Valzyy langsung</p>
                <Button
                  as={Link}
                  href="https://wa.me/6285701479245"
                  isExternal
                  color="primary"
                  variant="flat"
                  size="sm"
                >
                  Chat Valzyy
                </Button>
              </CardBody>
            </Card>
            
            <Card className="group hover:scale-105 transition-all duration-300">
              <CardBody className="p-6 text-center">
                <div className="text-3xl mb-3">🤖</div>
                <h4 className="font-semibold mb-2">Discord Bot</h4>
                <p className="text-sm text-default-600 mb-3">Invite JKT48Connect Bot</p>
                <Button
                  as={Link}
                  href="https://top.gg/bot/1305141693477027891?s=0f5136415d254"
                  isExternal
                  color="secondary"
                  variant="flat"
                  size="sm"
                >
                  Invite Bot
                </Button>
              </CardBody>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-primary-200 dark:border-primary-800">
            <CardBody className="p-8">
              <h4 className="text-xl font-bold mb-4">🚀 Join Our Community</h4>
              <p className="text-default-600 mb-6">
                Bergabunglah dengan ribuan fans JKT48 lainnya dan dapatkan update terbaru 
                dari ecosystem JKT48Connect!
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Button color="success" size="lg" startContent="💬" className="font-medium">
                  WhatsApp Community
                </Button>
                <Button color="primary" size="lg" startContent="💬" className="font-medium">
                  Discord Server
                </Button>
                <Button color="secondary" size="lg" startContent="📢" className="font-medium">
                  Telegram Channel
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
