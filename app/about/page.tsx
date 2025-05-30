
"use client"

import { Card, CardBody, Image, Breadcrumbs, BreadcrumbItem, Link, Button, Divider, Chip } from "@heroui/react";

export default function AboutJKT48Connect() {
  const projects = [
    {
      name: "Zenova WhatsApp Bot",
      description: "WhatsApp bot dengan fitur JKT48 lengkap, terutama live dan endlive notification yang paling diminati users",
      contact: "6285189020193",
      link: "https://wa.me/6285189020193",
      type: "WhatsApp Bot",
      features: ["Live Notification", "End Live Notification", "Member Info", "Theater Schedule"]
    },
    {
      name: "JKT48Connect Discord Bot",
      description: "Discord bot public dengan fitur live notification dan berbagai fitur JKT48 lainnya",
      link: "https://top.gg/bot/1305141693477027891?s=0f5136415d254",
      type: "Discord Bot",
      features: ["Live Notification", "Member Commands", "Theater Info", "Public Access"]
    },
    {
      name: "JKT48Connect Website",
      description: "Website resmi JKT48Connect dengan berbagai fitur dan informasi lengkap tentang JKT48",
      type: "Website",
      features: ["Member Database", "Theater Schedule", "Live Tracking", "News & Updates"]
    },
    {
      name: "@jkt48/core",
      description: "Package module dengan fitur JKT48 paling lengkap dan komprehensif",
      link: "https://npmjs.com/package/@jkt48/core",
      type: "NPM Package",
      features: ["Complete JKT48 API", "Member Data", "Live Tracking", "Theater Info", "Most Comprehensive"]
    },
    {
      name: "@jkt48connect-corp/sdk",
      description: "SDK package dengan fitur JKT48 yang sama namun dalam format SDK",
      link: "https://npmjs.com/package/@jkt48connect-corp/sdk",
      type: "SDK Package",
      features: ["JKT48 API", "Member Data", "Live Tracking", "SDK Format"]
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
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full max-w-6xl">
        {/* Breadcrumbs */}
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem>About</BreadcrumbItem>
        </Breadcrumbs>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/jkt48connect-logo.png"
              alt="JKT48Connect Logo"
              width={120}
              height={120}
              fallbackSrc="https://via.placeholder.com/120x120?text=JKT48Connect"
              className="rounded-2xl"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            JKT48Connect
          </h1>
          <p className="text-lg md:text-xl text-default-600 max-w-3xl mx-auto leading-relaxed">
            Platform terpercaya untuk semua kebutuhan informasi JKT48 Anda. 
            Menyediakan berbagai tools dan layanan untuk para fans JKT48 di seluruh Indonesia.
          </p>
        </div>

        <Divider className="my-8" />

        {/* About Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Tentang JKT48Connect</h2>
          <Card className="p-6">
            <CardBody>
              <div className="prose prose-lg max-w-none">
                <p className="text-default-700 leading-relaxed mb-4">
                  JKT48Connect adalah ecosystem lengkap yang dikembangkan khusus untuk komunitas JKT48 Indonesia. 
                  Kami menyediakan berbagai platform dan tools yang memudahkan fans untuk mengakses informasi 
                  terkini tentang member, jadwal theater, live streaming, dan berbagai konten JKT48 lainnya.
                </p>
                <p className="text-default-700 leading-relaxed mb-4">
                  Dengan berbagai project yang telah dikembangkan, JKT48Connect telah menjadi sumber informasi 
                  terpercaya bagi ribuan fans JKT48 di Indonesia. Dari WhatsApp bot hingga Discord bot, 
                  dari website hingga NPM packages, semua dirancang untuk memberikan experience terbaik 
                  bagi para penggemar JKT48.
                </p>
                <p className="text-default-700 leading-relaxed">
                  Tim JKT48Connect terus berinovasi dan mengembangkan fitur-fitur baru untuk memastikan 
                  bahwa komunitas JKT48 selalu mendapatkan informasi yang akurat dan up-to-date.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Creator Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Tim Pengembang</h2>
          <Card className="p-6">
            <CardBody>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">JKT</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">JKT48Connect Development Team</h3>
                <p className="text-default-600 mb-4">
                  Tim developer yang berdedikasi untuk memberikan layanan terbaik bagi komunitas JKT48
                </p>
                <div className="flex justify-center gap-2">
                  <Chip color="primary" variant="flat">Developer</Chip>
                  <Chip color="success" variant="flat">JKT48 Enthusiast</Chip>
                  <Chip color="warning" variant="flat">Community Builder</Chip>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Project Kami</h2>
          <p className="text-center text-default-600 mb-8 text-lg">
            Berbagai project yang telah dikembangkan oleh JKT48Connect untuk komunitas JKT48
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card key={index} className="h-full">
                <CardBody className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{project.name}</h3>
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
                    <div className="mb-4">
                      <p className="text-sm text-default-500 mb-1">Contact:</p>
                      <p className="font-mono text-sm">{project.contact}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-sm text-default-500 mb-2">Features:</p>
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
                      color="primary"
                      variant="flat"
                      className="w-full"
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

        {/* Featured Packages Section */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardBody className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Package Unggulan</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold mb-2 text-warning-600">@jkt48/core</h4>
                  <p className="text-sm text-default-600">
                    Package dengan fitur JKT48 paling lengkap dan komprehensif. 
                    Pilihan utama untuk developer yang membutuhkan akses full JKT48 API.
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold mb-2 text-danger-600">@jkt48connect-corp/sdk</h4>
                  <p className="text-sm text-default-600">
                    SDK format dengan fitur yang sama, memberikan kemudahan 
                    integrasi dalam berbagai project development.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Hubungi Kami</h2>
          <p className="text-default-600 mb-6">
            Ada pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami!
          </p>
          <div className="flex justify-center gap-4">
            <Button
              as={Link}
              href="https://wa.me/6285189020193"
              isExternal
              color="success"
              startContent={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
                </svg>
              }
            >
              WhatsApp
            </Button>
            <Button
              as={Link}
              href="https://discord.gg/jkt48connect"
              isExternal
              color="primary"
              startContent={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              }
            >
              Discord
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
