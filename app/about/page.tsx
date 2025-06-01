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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="w-full max-w-5xl mx-auto px-6 py-8 space-y-16">
        
        {/* Breadcrumbs */}
        <div className="pt-4">
          <Breadcrumbs size="sm" className="text-slate-500">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem>About</BreadcrumbItem>
          </Breadcrumbs>
        </div>

        {/* Hero Section */}
        <section className="text-center space-y-8 py-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
            <Image
              src="https://files.catbox.moe/i1qudl.jpg"
              alt="JKT48Connect"
              width={100}
              height={100}
              className="relative rounded-3xl shadow-2xl border-4 border-white"
            />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              JKT48Connect
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Platform teknologi terdepan untuk ekosistem JKT48 Indonesia
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Chip size="lg" color="primary" variant="shadow" startContent="🚀" className="text-sm font-medium">
                1000+ Users
              </Chip>
              <Chip size="lg" color="success" variant="shadow" startContent="⚡" className="text-sm font-medium">
                Real-time
              </Chip>
              <Chip size="lg" color="warning" variant="shadow" startContent="🔥" className="text-sm font-medium">
                24/7 Active
              </Chip>
            </div>
          </div>
        </section>

        {/* Creator Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-4">
              Meet the Visionary
            </h2>
            <p className="text-xl text-slate-600">Architect behind JKT48Connect ecosystem</p>
          </div>
          
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardBody className="p-10">
              <div className="flex flex-col items-center text-center space-y-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-xl"></div>
                  <Avatar
                    src="https://files.catbox.moe/ljpa5c.jpg"
                    className="relative w-28 h-28 border-4 border-white shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">V</span>
                  </div>
                </div>
                
                <div className="space-y-6 max-w-lg">
                  <div>
                    <h3 className="text-3xl font-black text-slate-800 mb-4">Valzyy</h3>
                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                      <Chip color="primary" variant="shadow" size="lg" className="text-sm font-medium">🎯 Founder & CEO</Chip>
                      <Chip color="success" variant="shadow" size="lg" className="text-sm font-medium">⚡ Fullstack Engineer</Chip>
                      <Chip color="warning" variant="shadow" size="lg" className="text-sm font-medium">🚀 Innovation Lead</Chip>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Pemimpin visioner dan developer utama JKT48Connect. Berpengalaman dalam 
                    teknologi fullstack dan berdedikasi membangun solusi terbaik untuk komunitas JKT48.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-slate-100">
                      <span className="text-2xl">📱</span>
                      <Code className="text-lg bg-white/70 border border-slate-200 rounded-lg px-3 py-2">6285701479245</Code>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        as={Link}
                        href="https://wa.me/6285701479245"
                        isExternal
                        color="success"
                        size="lg"
                        startContent="💬"
                        className="font-semibold shadow-lg"
                        variant="shadow"
                      >
                        Contact Valzyy
                      </Button>
                      <Button
                        as={Link}
                        href="https://github.com/j-forces"
                        isExternal
                        variant="ghost"
                        size="lg"
                        startContent="⭐"
                        className="font-semibold border-2"
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
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent mb-4">
              🔐 API Access
            </h2>
            <p className="text-xl text-slate-600">Akses penuh ke JKT48Connect API memerlukan API Key</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-100 shadow-xl">
              <CardBody className="p-8 text-center space-y-4">
                <div className="text-4xl">🔑</div>
                <h3 className="text-2xl font-bold text-amber-800">API Key Required</h3>
                <p className="text-amber-700 text-lg leading-relaxed">
                  Package @jkt48/core dan @jkt48connect-corp/sdk memerlukan API Key untuk mengakses 
                  seluruh fitur dan endpoint JKT48Connect API.
                </p>
              </CardBody>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-emerald-50 to-green-100 shadow-xl">
              <CardBody className="p-8 text-center space-y-4">
                <div className="text-4xl">🛒</div>
                <h3 className="text-2xl font-bold text-emerald-800">How to Purchase</h3>
                <p className="text-emerald-700 text-lg mb-3">
                  Beli API Key melalui Zenova Bot dengan command:
                </p>
                <Code className="text-sm bg-emerald-200/50 px-4 py-3 rounded-xl text-emerald-800 border border-emerald-300">
                  .buyapi &lt;Name&gt; &lt;Email&gt; &lt;Type&gt; &lt;KeyCustom&gt;
                </Code>
              </CardBody>
            </Card>
          </div>

          {/* API Plans */}
          <div className="grid md:grid-cols-3 gap-6">
            {apiPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`border-0 shadow-xl transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-100 ring-4 ring-blue-200' 
                    : 'bg-white/90 backdrop-blur-sm hover:shadow-2xl'
                }`}
              >
                {plan.popular && (
                  <div className="text-center pt-4">
                    <Chip color="primary" size="lg" variant="shadow" className="text-sm font-medium">⭐ Most Popular</Chip>
                  </div>
                )}
                <CardBody className="p-8 text-center space-y-6">
                  <div>
                    <h4 className="text-2xl font-bold mb-3">{plan.name}</h4>
                    <div className="mb-4">
                      <span className="text-3xl font-black">Rp{plan.price}</span>
                      <span className="text-slate-600 text-lg">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-base">
                        <span className="text-green-500 text-lg">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    as={Link}
                    href="https://wa.me/6285189020193"
                    isExternal
                    color={plan.color as any}
                    variant={plan.popular ? "shadow" : "bordered"}
                    size="lg"
                    className="w-full font-semibold"
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
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-4">
              🚀 Our Products
            </h2>
            <p className="text-xl text-slate-600">Ekosistem lengkap untuk kebutuhan JKT48 Anda</p>
          </div>
          
          <div className="space-y-6">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className={`border-0 shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                  project.highlight 
                    ? 'bg-gradient-to-r from-yellow-50 via-white to-orange-50 ring-4 ring-yellow-200' 
                    : 'bg-white/90 backdrop-blur-sm hover:shadow-2xl'
                }`}
              >
                <CardBody className="p-8 space-y-6">
                  
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{project.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-black text-xl">{project.name}</h3>
                        <span className="text-sm text-slate-500 flex-shrink-0 font-medium">{project.status}</span>
                      </div>
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <Chip size="lg" color={project.color as any} variant="shadow" className="text-sm font-medium">
                          {project.type}
                        </Chip>
                        {project.highlight && (
                          <Chip size="lg" color="warning" variant="shadow" className="text-sm font-medium">⭐</Chip>
                        )}
                      </div>
                      <p className="text-slate-600 text-lg leading-relaxed mb-4">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* API Key Notice */}
                  {project.requiresKey && (
                    <div className="p-4 bg-gradient-to-r from-slate-100 to-blue-50 border-2 border-slate-200 rounded-xl">
                      <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                        <span className="text-lg">🔐</span>
                        <span>Requires API Key</span>
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  {project.contact && (
                    <div className="p-4 bg-gradient-to-r from-slate-100 to-green-50 border-2 border-slate-200 rounded-xl">
                      <div className="text-sm text-slate-600 mb-2 font-medium">📱 WhatsApp:</div>
                      <Code className="text-base bg-white border border-slate-300 rounded-lg px-3 py-2">{project.contact}</Code>
                    </div>
                  )}

                  {/* Features */}
                  <div>
                    <div className="text-sm text-slate-500 mb-3 font-medium">✨ Features:</div>
                    <div className="flex flex-wrap gap-2">
                      {project.features.slice(0, 4).map((feature, idx) => (
                        <Chip key={idx} size="lg" variant="bordered" className="text-sm">
                          {feature}
                        </Chip>
                      ))}
                      {project.features.length > 4 && (
                        <Chip size="lg" variant="dot" className="text-sm">
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
                      variant={project.highlight ? "shadow" : "flat"}
                      className="w-full font-semibold"
                      size="lg"
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
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent mb-4">
              👥 Development Teams
            </h2>
            <p className="text-xl text-slate-600">Tim pengembang di balik JKT48Connect</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardBody className="p-8 text-center space-y-6">
                <div className="text-4xl">👥</div>
                <h3 className="text-2xl font-bold">J-Force</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Tim inti pengembangan yang menangani seluruh arsitektur dan infrastruktur JKT48Connect ecosystem.
                </p>
                <Button
                  as={Link}
                  href="https://github.com/j-forces"
                  isExternal
                  color="primary"
                  size="lg"
                  startContent="⭐"
                  className="w-full font-semibold"
                  variant="shadow"
                >
                  Visit Repository
                </Button>
              </CardBody>
            </Card>

            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardBody className="p-8 text-center space-y-6">
                <div className="text-4xl">🚀</div>
                <h3 className="text-2xl font-bold">Zenova</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Divisi spesialis untuk pengembangan bot messaging, terutama WhatsApp dan platform komunikasi lainnya.
                </p>
                <Button
                  as={Link}
                  href="https://wa.me/6285189020193"
                  isExternal
                  color="success"
                  size="lg"
                  startContent="💬"
                  className="w-full font-semibold"
                  variant="shadow"
                >
                  Chat Zenova Bot
                </Button>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* Statistics */}
        <section>
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardBody className="p-10">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-4">
                  📊 Platform Statistics
                </h3>
                <p className="text-xl text-slate-600">Dipercaya oleh ribuan pengguna di seluruh Indonesia</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: "1,500+", label: "Active Users", icon: "👥", color: "from-blue-600 to-blue-800" },
                  { value: "24/7", label: "Uptime", icon: "⚡", color: "from-green-600 to-emerald-700" },
                  { value: "5+", label: "Major Products", icon: "🚀", color: "from-purple-600 to-indigo-700" },
                  { value: "100%", label: "Free Core Access", icon: "🎯", color: "from-orange-600 to-red-600" }
                ].map((stat, index) => (
                  <div key={index} className="space-y-3">
                    <div className="text-3xl">{stat.icon}</div>
                    <div className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-slate-600 text-base md:text-lg font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </section>

        {/* Contact & Community */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 to-green-700 bg-clip-text text-transparent mb-4">
              🤝 Join Our Community
            </h2>
            <p className="text-xl text-slate-600">Terhubung dengan ribuan JKT48 fans lainnya</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
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
              <Card key={index} className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <CardBody className="p-8 text-center space-y-6">
                  <div className="text-3xl">{contact.icon}</div>
                  <div>
                    <h4 className="font-bold text-xl mb-3">{contact.title}</h4>
                    <p className="text-slate-600 text-lg leading-relaxed">{contact.desc}</p>
                  </div>
                  <Button
                    as={Link}
                    href={contact.link}
                    isExternal
                    color={contact.color as any}
                    size="lg"
                    className="w-full font-semibold"
                    variant="shadow"
                  >
                    {contact.btn}
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Final CTA */}
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <CardBody className="p-10 text-center space-y-6">
              <div className="text-4xl">🎉</div>
              <h4 className="text-3xl font-black bg-gradient-to-r from-slate-800 to-purple-700 bg-clip-text text-transparent">
                Ready to Get Started?
              </h4>
              <p className="text-slate-600 max-w-2xl mx-auto text-xl leading-relaxed">
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
                  variant="shadow"
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
                  className="font-semibold border-2"
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
