"use client"

import { Card, CardBody, Image, Breadcrumbs, BreadcrumbItem, Link, Button, Divider, Chip, Avatar, Code } from "@heroui/react";
import { useState } from "react";

export default function AboutJKT48Connect() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      name: "Zenova WhatsApp Bot",
      description: "Bot WhatsApp terpopuler dengan notifikasi live streaming JKT48 dan berbagai fitur canggih lainnya.",
      contact: "6285189020193",
      link: "https://wa.me/6285189020193",
      type: "WhatsApp Bot",
      icon: "💬",
      features: ["Live Notification", "End Live Alert", "Member Database", "Theater Schedule", "API Access"],
      highlight: true,
      color: "success",
      status: "🟢 Active"
    },
    {
      name: "JKT48Connect Discord Bot",
      description: "Bot Discord public dengan sistem notifikasi live dan command lengkap untuk server komunitas.",
      link: "https://top.gg/bot/1305141693477027891?s=0f5136415d254",
      type: "Discord Bot",
      icon: "🤖",
      features: ["Live Alerts", "Member Commands", "Server Integration", "Public Access"],
      color: "primary",
      status: "🟢 Public"
    },
    {
      name: "JKT48Connect Web Portal",
      description: "Platform web komprehensif dengan dashboard, analytics, dan akses ke seluruh fitur ecosystem.",
      type: "Website",
      icon: "🌐",
      features: ["Member Profiles", "Live Tracker", "Analytics", "News Hub"],
      color: "secondary",
      status: "🔄 Development"
    },
    {
      name: "@jkt48/core",
      description: "Package NPM paling komprehensif dengan API lengkap JKT48. Solusi #1 untuk developer.",
      link: "https://npmjs.com/package/@jkt48/core",
      type: "NPM Package",
      icon: "📦",
      features: ["Complete JKT48 API", "Real-time Data", "TypeScript Support", "Authentication"],
      highlight: true,
      color: "warning",
      status: "🔥 Popular",
      requiresKey: true
    },
    {
      name: "@jkt48connect-corp/sdk",
      description: "SDK alternatif dengan struktur yang disederhanakan namun tetap powerful untuk integrasi mudah.",
      link: "https://npmjs.com/package/@jkt48connect-corp/sdk",
      type: "SDK Package",
      icon: "⚡",
      features: ["Simplified API", "Quick Setup", "Lightweight", "Documentation"],
      color: "danger",
      status: "📈 Growing",
      requiresKey: true
    }
  ];

  const apiPlans = [
    {
      name: "Basic",
      price: "5.000",
      period: "30 hari",
      features: ["1,000 requests/day", "Basic endpoints", "Email support"],
      color: "default",
      popular: false
    },
    {
      name: "Pro",
      price: "15.000",
      period: "30 hari", 
      features: ["10,000 requests/day", "All endpoints", "Priority support", "Real-time webhooks"],
      color: "primary",
      popular: true
    },
    {
      name: "Enterprise",
      price: "50.000",
      period: "30 hari",
      features: ["Unlimited requests", "Custom endpoints", "24/7 support", "Custom integrations"],
      color: "success",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-16">
        
        {/* Breadcrumbs */}
        <div className="pt-4">
          <Breadcrumbs size="sm" className="text-gray-600">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem>About</BreadcrumbItem>
          </Breadcrumbs>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="text-center space-y-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-30 scale-110"></div>
              <Image
                src="https://files.catbox.moe/i1qudl.jpg"
                alt="JKT48Connect"
                width={100}
                height={100}
                className="relative rounded-full shadow-2xl border-4 border-white"
              />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                JKT48Connect
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Platform teknologi terdepan untuk ekosistem JKT48 Indonesia
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Chip size="md" color="primary" variant="flat" startContent="🚀" className="font-medium">
                  1000+ Users
                </Chip>
                <Chip size="md" color="success" variant="flat" startContent="⚡" className="font-medium">
                  Real-time
                </Chip>
                <Chip size="md" color="warning" variant="flat" startContent="🔥" className="font-medium">
                  24/7 Active
                </Chip>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Spotlight */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Meet the Visionary</h2>
            <p className="text-gray-600 text-lg">Architect behind JKT48Connect ecosystem</p>
          </div>
          
          <Card className="max-w-4xl mx-auto shadow-xl border-0">
            <CardBody className="p-6 sm:p-8 md:p-12">
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-30 scale-110"></div>
                  <Avatar
                    src="https://files.catbox.moe/ljpa5c.jpg"
                    className="relative w-24 h-24 sm:w-32 sm:h-32 border-4 border-white shadow-xl"
                  />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full border-3 border-white flex items-center justify-center">
                    <span className="text-white font-bold text-sm">V</span>
                  </div>
                </div>
                
                <div className="flex-1 text-center sm:text-left space-y-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3">Valzyy</h3>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                      <Chip color="primary" variant="flat" size="sm">🎯 Founder & CEO</Chip>
                      <Chip color="success" variant="flat" size="sm">⚡ Fullstack Engineer</Chip>
                      <Chip color="warning" variant="flat" size="sm">🚀 Innovation Lead</Chip>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">
                    Pemimpin visioner dan developer utama JKT48Connect. Berpengalaman dalam 
                    teknologi fullstack dan berdedikasi membangun solusi terbaik untuk komunitas JKT48.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-center sm:justify-start gap-3 p-3 rounded-lg bg-gray-100">
                      <span className="text-xl">📱</span>
                      <Code className="font-mono text-sm sm:text-base">6285701479245</Code>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        as={Link}
                        href="https://wa.me/6285701479245"
                        isExternal
                        color="success"
                        size="lg"
                        startContent="💬"
                        className="font-semibold"
                      >
                        Contact Valzyy
                      </Button>
                      <Button
                        as={Link}
                        href="https://github.com/j-forces"
                        isExternal
                        variant="bordered"
                        size="lg"
                        startContent="⭐"
                        className="font-semibold"
                      >
                        GitHub Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </section>

        {/* API Key Information */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">🔐 API Access</h2>
            <p className="text-gray-600 text-lg">Akses penuh ke JKT48Connect API memerlukan API Key</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardBody className="p-6 text-center space-y-4">
                <div className="text-4xl">🔑</div>
                <h3 className="text-xl font-bold text-amber-800">API Key Required</h3>
                <p className="text-amber-700 text-sm leading-relaxed">
                  Package @jkt48/core dan @jkt48connect-corp/sdk memerlukan API Key untuk mengakses 
                  seluruh fitur dan endpoint JKT48Connect API.
                </p>
              </CardBody>
            </Card>

            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardBody className="p-6 text-center space-y-4">
                <div className="text-4xl">🛒</div>
                <h3 className="text-xl font-bold text-green-800">How to Purchase</h3>
                <p className="text-green-700 text-sm leading-relaxed mb-3">
                  Beli API Key melalui Zenova Bot dengan command:
                </p>
                <Code className="block p-3 bg-green-100 text-green-800 font-mono text-xs sm:text-sm rounded-lg break-all">
                  .buyapi &lt;Name&gt; &lt;Email&gt; &lt;Type&gt; &lt;KeyCustom&gt;
                </Code>
              </CardBody>
            </Card>
          </div>

          {/* API Plans */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative border-2 transition-all duration-300 ${
                  plan.popular 
                    ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50 transform scale-105' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Chip color="primary" size="sm" className="font-bold">⭐ Most Popular</Chip>
                  </div>
                )}
                <CardBody className="p-6 text-center space-y-4">
                  <div>
                    <h4 className="text-lg font-bold mb-2">{plan.name}</h4>
                    <div className="mb-4">
                      <span className="text-2xl sm:text-3xl font-black">Rp{plan.price}</span>
                      <span className="text-gray-600 text-sm">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center gap-2 text-sm">
                        <span className="text-green-500 text-xs">✓</span>
                        <span className="text-center">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    as={Link}
                    href="https://wa.me/6285189020193"
                    isExternal
                    color={plan.color as any}
                    variant={plan.popular ? "solid" : "bordered"}
                    size="md"
                    className="w-full font-semibold"
                  >
                    Get {plan.name}
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Projects Showcase */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">🚀 Our Products</h2>
            <p className="text-gray-600 text-lg">Ekosistem lengkap untuk kebutuhan JKT48 Anda</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className={`group h-full transition-all duration-300 hover:shadow-xl border-2 ${
                  project.highlight 
                    ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 hover:scale-[1.02]' 
                    : 'border-gray-200 hover:border-gray-300 hover:scale-[1.01]'
                }`}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <CardBody className="p-5 flex flex-col space-y-4 h-full">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="text-2xl flex-shrink-0">{project.icon}</div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-base leading-tight truncate">{project.name}</h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Chip size="sm" color={project.color as any} variant="flat" className="text-xs">
                            {project.type}
                          </Chip>
                          {project.highlight && (
                            <Chip size="sm" color="warning" variant="solid" className="text-xs">
                              ⭐
                            </Chip>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-medium flex-shrink-0">{project.status}</div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* API Key Notice */}
                  {project.requiresKey && (
                    <div className="p-2 bg-amber-100 border border-amber-200 rounded-lg">
                      <div className="flex items-center gap-2 text-xs text-amber-800">
                        <span>🔐</span>
                        <span className="font-medium">Requires API Key</span>
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  {project.contact && (
                    <div className="p-2 bg-green-100 border border-green-200 rounded-lg">
                      <div className="text-xs text-green-700 mb-1 font-medium">📱 WhatsApp:</div>
                      <Code className="text-xs bg-green-50 break-all">{project.contact}</Code>
                    </div>
                  )}

                  {/* Features */}
                  <div>
                    <div className="text-xs text-gray-500 mb-2 font-medium">✨ Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {project.features.slice(0, 3).map((feature, idx) => (
                        <Chip key={idx} size="sm" variant="bordered" className="text-xs">
                          {feature}
                        </Chip>
                      ))}
                      {project.features.length > 3 && (
                        <Chip size="sm" variant="dot" className="text-xs">
                          +{project.features.length - 3} more
                        </Chip>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  {project.link && (
                    <Button
                      as={Link}
                      href={project.link}
                      isExternal
                      color={project.highlight ? "warning" : project.color as any}
                      variant={project.highlight ? "solid" : "flat"}
                      className="w-full font-semibold mt-auto"
                      size="sm"
                      startContent={
                        project.type === "WhatsApp Bot" ? "💬" :
                        project.type === "Discord Bot" ? "🤖" :
                        project.type.includes("Package") ? "📦" : "🌐"
                      }
                    >
                      {project.type === "WhatsApp Bot" ? "Chat Now" :
                       project.type === "Discord Bot" ? "Invite Bot" :
                       project.type.includes("Package") ? "View Package" : "Visit Site"}
                    </Button>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Development Teams */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">👥 Development Teams</h2>
            <p className="text-gray-600 text-lg">Tim pengembang di balik JKT48Connect</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 hover:scale-105 transition-all duration-300">
              <CardBody className="p-6 text-center space-y-4">
                <div className="text-4xl">👥</div>
                <h3 className="text-xl font-bold text-blue-800">J-Force</h3>
                <p className="text-blue-700 text-sm leading-relaxed">
                  Tim inti pengembangan yang menangani seluruh arsitektur dan infrastruktur JKT48Connect ecosystem.
                </p>
                <Button
                  as={Link}
                  href="https://github.com/j-forces"
                  isExternal
                  color="primary"
                  size="md"
                  startContent="⭐"
                  className="font-semibold w-full"
                >
                  Visit Repository
                </Button>
              </CardBody>
            </Card>

            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 hover:scale-105 transition-all duration-300">
              <CardBody className="p-6 text-center space-y-4">
                <div className="text-4xl">🚀</div>
                <h3 className="text-xl font-bold text-green-800">Zenova</h3>
                <p className="text-green-700 text-sm leading-relaxed">
                  Divisi spesialis untuk pengembangan bot messaging, terutama WhatsApp dan platform komunikasi lainnya.
                </p>
                <Button
                  as={Link}
                  href="https://wa.me/6285189020193"
                  isExternal
                  color="success"
                  size="md"
                  startContent="💬"
                  className="font-semibold w-full"
                >
                  Chat Zenova Bot
                </Button>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Statistics */}
        <section>
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50">
            <CardBody className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">📊 Platform Statistics</h3>
                <p className="text-gray-600">Dipercaya oleh ribuan pengguna di seluruh Indonesia</p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
                {[
                  { value: "1,500+", label: "Active Users", icon: "👥", color: "text-blue-600" },
                  { value: "24/7", label: "Uptime", icon: "⚡", color: "text-green-600" },
                  { value: "5+", label: "Major Products", icon: "🚀", color: "text-purple-600" },
                  { value: "100%", label: "Free Core Access", icon: "🎯", color: "text-orange-600" }
                ].map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-2xl sm:text-3xl">{stat.icon}</div>
                    <div className={`text-xl sm:text-2xl font-black ${stat.color}`}>{stat.value}</div>
                    <div className="text-gray-600 font-medium text-xs sm:text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Contact & Community */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">🤝 Join Our Community</h2>
            <p className="text-gray-600 text-lg">Terhubung dengan ribuan JKT48 fans lainnya</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { 
                icon: "💬", 
                title: "Zenova Bot", 
                desc: "Chat dengan bot official untuk akses fitur dan pembelian API key", 
                link: "https://wa.me/6285189020193", 
                btn: "Chat Zenova", 
                color: "success" 
              },
              { 
                icon: "👨‍💻", 
                title: "Contact Creator", 
                desc: "Hubungi Valzyy untuk partnership, feedback, atau pertanyaan teknis", 
                link: "https://wa.me/6285701479245", 
                btn: "Message Valzyy", 
                color: "primary" 
              },
              { 
                icon: "🤖", 
                title: "Discord Bot", 
                desc: "Invite JKT48Connect bot ke server Discord komunitas Anda", 
                link: "https://top.gg/bot/1305141693477027891?s=0f5136415d254", 
                btn: "Invite Bot", 
                color: "secondary" 
              }
            ].map((contact, index) => (
              <Card key={index} className="group border-2 border-gray-200 hover:border-gray-300 hover:scale-105 transition-all duration-300">
                <CardBody className="p-5 text-center space-y-4">
                  <div className="text-3xl">{contact.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{contact.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{contact.desc}</p>
                  </div>
                  <Button
                    as={Link}
                    href={contact.link}
                    isExternal
                    color={contact.color as any}
                    size="md"
                    className="w-full font-semibold"
                  >
                    {contact.btn}
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Final CTA */}
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardBody className="p-6 sm:p-8 text-center space-y-6">
              <div className="text-4xl">🎉</div>
              <h4 className="text-2xl font-bold">Ready to Get Started?</h4>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
                Bergabunglah dengan ekosistem JKT48Connect dan nikmati akses ke informasi JKT48 
                yang paling lengkap dan up-to-date!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  as={Link}
                  href="https://wa.me/6285189020193"
                  isExternal
                  color="success" 
                  size="lg" 
                  startContent="🚀" 
                  className="font-semibold"
                >
                  Start with Zenova Bot
                </Button>
                <Button 
                  as={Link}
                  href="https://npmjs.com/package/@jkt48/core"
                  isExternal
                  color="warning" 
                  variant="bordered"
                  size="lg" 
                  startContent="📦" 
                  className="font-semibold"
                >
                  Explore API Package
                </Button>
              </div>
            </CardBody>
          </Card>
        </section>
      </div>
    </div>
  );
}
