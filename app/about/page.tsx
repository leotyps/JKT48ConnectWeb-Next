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
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-12">
        
        {/* Breadcrumbs */}
        <div className="pt-2">
          <Breadcrumbs size="sm" className="text-gray-500">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem>About</BreadcrumbItem>
          </Breadcrumbs>
        </div>

        {/* Hero Section */}
        <section className="text-center space-y-6 py-8">
          <div className="relative inline-block">
            <Image
              src="https://files.catbox.moe/i1qudl.jpg"
              alt="JKT48Connect"
              width={80}
              height={80}
              className="rounded-2xl shadow-lg border border-gray-100"
            />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">
              JKT48Connect
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
              Platform teknologi terdepan untuk ekosistem JKT48 Indonesia
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Chip size="sm" color="primary" variant="flat" startContent="🚀" className="text-xs">
                1000+ Users
              </Chip>
              <Chip size="sm" color="success" variant="flat" startContent="⚡" className="text-xs">
                Real-time
              </Chip>
              <Chip size="sm" color="warning" variant="flat" startContent="🔥" className="text-xs">
                24/7 Active
              </Chip>
            </div>
          </div>
        </section>

        {/* Creator Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Meet the Visionary</h2>
            <p className="text-gray-600">Architect behind JKT48Connect ecosystem</p>
          </div>
          
          <Card className="shadow-sm border border-gray-100">
            <CardBody className="p-6 sm:p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                  <Avatar
                    src="https://files.catbox.moe/ljpa5c.jpg"
                    className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-gray-100"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white font-bold text-xs">V</span>
                  </div>
                </div>
                
                <div className="space-y-4 max-w-md">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Valzyy</h3>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      <Chip color="primary" variant="flat" size="sm" className="text-xs">🎯 Founder & CEO</Chip>
                      <Chip color="success" variant="flat" size="sm" className="text-xs">⚡ Fullstack Engineer</Chip>
                      <Chip color="warning" variant="flat" size="sm" className="text-xs">🚀 Innovation Lead</Chip>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Pemimpin visioner dan developer utama JKT48Connect. Berpengalaman dalam 
                    teknologi fullstack dan berdedikasi membangun solusi terbaik untuk komunitas JKT48.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100">
                      <span className="text-lg">📱</span>
                      <Code className="text-sm bg-transparent">6285701479245</Code>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        as={Link}
                        href="https://wa.me/6285701479245"
                        isExternal
                        color="success"
                        size="md"
                        startContent="💬"
                        className="min-w-0"
                      >
                        Contact Valzyy
                      </Button>
                      <Button
                        as={Link}
                        href="https://github.com/j-forces"
                        isExternal
                        variant="bordered"
                        size="md"
                        startContent="⭐"
                        className="min-w-0"
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

        {/* API Access Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">🔐 API Access</h2>
            <p className="text-gray-600">Akses penuh ke JKT48Connect API memerlukan API Key</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <Card className="border border-amber-200 bg-amber-50/50">
              <CardBody className="p-4 text-center space-y-3">
                <div className="text-3xl">🔑</div>
                <h3 className="text-lg font-bold text-amber-800">API Key Required</h3>
                <p className="text-amber-700 text-sm">
                  Package @jkt48/core dan @jkt48connect-corp/sdk memerlukan API Key untuk mengakses 
                  seluruh fitur dan endpoint JKT48Connect API.
                </p>
              </CardBody>
            </Card>

            <Card className="border border-green-200 bg-green-50/50">
              <CardBody className="p-4 text-center space-y-3">
                <div className="text-3xl">🛒</div>
                <h3 className="text-lg font-bold text-green-800">How to Purchase</h3>
                <p className="text-green-700 text-sm mb-2">
                  Beli API Key melalui Zenova Bot dengan command:
                </p>
                <Code className="text-xs bg-green-100 p-2 rounded text-green-800 break-all">
                  .buyapi &lt;Name&gt; &lt;Email&gt; &lt;Type&gt; &lt;KeyCustom&gt;
                </Code>
              </CardBody>
            </Card>
          </div>

          {/* API Plans */}
          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4">
            {apiPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`border transition-all duration-200 ${
                  plan.popular 
                    ? 'border-blue-400 ring-1 ring-blue-300' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="text-center pt-3">
                    <Chip color="primary" size="sm" className="text-xs">⭐ Most Popular</Chip>
                  </div>
                )}
                <CardBody className="p-4 text-center space-y-4">
                  <div>
                    <h4 className="text-lg font-bold mb-2">{plan.name}</h4>
                    <div className="mb-3">
                      <span className="text-2xl font-black">Rp{plan.price}</span>
                      <span className="text-gray-600 text-sm">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <span className="text-green-500 text-xs">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    as={Link}
                    href="https://wa.me/6285189020193"
                    isExternal
                    color={plan.color as any}
                    variant={plan.popular ? "solid" : "bordered"}
                    size="sm"
                    className="w-full"
                  >
                    Get {plan.name}
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">🚀 Our Products</h2>
            <p className="text-gray-600">Ekosistem lengkap untuk kebutuhan JKT48 Anda</p>
          </div>
          
          <div className="space-y-4">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className={`border transition-all duration-200 hover:shadow-md ${
                  project.highlight 
                    ? 'border-yellow-400 ring-1 ring-yellow-300' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CardBody className="p-4 space-y-4">
                  
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">{project.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-base leading-tight">{project.name}</h3>
                        <span className="text-xs text-gray-500 flex-shrink-0">{project.status}</span>
                      </div>
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Chip size="sm" color={project.color as any} variant="flat" className="text-xs">
                          {project.type}
                        </Chip>
                        {project.highlight && (
                          <Chip size="sm" color="warning" variant="solid" className="text-xs">⭐</Chip>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* API Key Notice */}
                  {project.requiresKey && (
                    <div className="p-2 bg-gray-100 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 text-xs text-gray-700">
                        <span>🔐</span>
                        <span>Requires API Key</span>
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  {project.contact && (
                    <div className="p-2 bg-gray-100 border border-gray-200 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">📱 WhatsApp:</div>
                      <Code className="text-xs bg-gray-50">{project.contact}</Code>
                    </div>
                  )}

                  {/* Features */}
                  <div>
                    <div className="text-xs text-gray-500 mb-2">✨ Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {project.features.slice(0, 4).map((feature, idx) => (
                        <Chip key={idx} size="sm" variant="bordered" className="text-xs">
                          {feature}
                        </Chip>
                      ))}
                      {project.features.length > 4 && (
                        <Chip size="sm" variant="dot" className="text-xs">
                          +{project.features.length - 4}
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
                      className="w-full"
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
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">👥 Development Teams</h2>
            <p className="text-gray-600">Tim pengembang di balik JKT48Connect</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border border-gray-200 hover:shadow-md transition-all duration-200">
              <CardBody className="p-4 text-center space-y-3">
                <div className="text-3xl">👥</div>
                <h3 className="text-lg font-bold text-gray-900">J-Force</h3>
                <p className="text-gray-600 text-sm">
                  Tim inti pengembangan yang menangani seluruh arsitektur dan infrastruktur JKT48Connect ecosystem.
                </p>
                <Button
                  as={Link}
                  href="https://github.com/j-forces"
                  isExternal
                  color="primary"
                  size="sm"
                  startContent="⭐"
                  className="w-full"
                >
                  Visit Repository
                </Button>
              </CardBody>
            </Card>

            <Card className="border border-gray-200 hover:shadow-md transition-all duration-200">
              <CardBody className="p-4 text-center space-y-3">
                <div className="text-3xl">🚀</div>
                <h3 className="text-lg font-bold text-gray-900">Zenova</h3>
                <p className="text-gray-600 text-sm">
                  Divisi spesialis untuk pengembangan bot messaging, terutama WhatsApp dan platform komunikasi lainnya.
                </p>
                <Button
                  as={Link}
                  href="https://wa.me/6285189020193"
                  isExternal
                  color="success"
                  size="sm"
                  startContent="💬"
                  className="w-full"
                >
                  Chat Zenova Bot
                </Button>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Statistics */}
        <section>
          <Card className="border border-gray-200">
            <CardBody className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">📊 Platform Statistics</h3>
                <p className="text-gray-600 text-sm">Dipercaya oleh ribuan pengguna di seluruh Indonesia</p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                  { value: "1,500+", label: "Active Users", icon: "👥", color: "text-blue-600" },
                  { value: "24/7", label: "Uptime", icon: "⚡", color: "text-green-600" },
                  { value: "5+", label: "Major Products", icon: "🚀", color: "text-purple-600" },
                  { value: "100%", label: "Free Core Access", icon: "🎯", color: "text-orange-600" }
                ].map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="text-2xl">{stat.icon}</div>
                    <div className={`text-lg sm:text-xl font-black ${stat.color}`}>{stat.value}</div>
                    <div className="text-gray-600 text-xs sm:text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Contact & Community */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">🤝 Join Our Community</h2>
            <p className="text-gray-600">Terhubung dengan ribuan JKT48 fans lainnya</p>
          </div>
          
          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 mb-6">
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
              <Card key={index} className="border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200">
                <CardBody className="p-4 text-center space-y-3">
                  <div className="text-2xl">{contact.icon}</div>
                  <div>
                    <h4 className="font-bold text-base mb-2">{contact.title}</h4>
                    <p className="text-gray-600 text-sm">{contact.desc}</p>
                  </div>
                  <Button
                    as={Link}
                    href={contact.link}
                    isExternal
                    color={contact.color as any}
                    size="sm"
                    className="w-full"
                  >
                    {contact.btn}
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Final CTA */}
          <Card className="border border-gray-200">
            <CardBody className="p-6 text-center space-y-4">
              <div className="text-3xl">🎉</div>
              <h4 className="text-xl font-bold text-gray-900">Ready to Get Started?</h4>
              <p className="text-gray-600 max-w-lg mx-auto text-sm">
                Bergabunglah dengan ekosistem JKT48Connect dan nikmati akses ke informasi JKT48 
                yang paling lengkap dan up-to-date!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button 
                  as={Link}
                  href="https://wa.me/6285189020193"
                  isExternal
                  color="success" 
                  size="md" 
                  startContent="🚀"
                >
                  Start with Zenova Bot
                </Button>
                <Button 
                  as={Link}
                  href="https://npmjs.com/package/@jkt48/core"
                  isExternal
                  color="warning" 
                  variant="bordered"
                  size="md" 
                  startContent="📦"
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
