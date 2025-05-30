import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full border-t border-divider bg-gradient-to-br from-default-50 via-default-100/30 to-primary-50/20 dark:from-default-100/10 dark:via-default-200/5 dark:to-primary-100/5">
              <div className="container mx-auto max-w-7xl px-6 py-12">
                
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                  
                  {/* Brand Section */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm font-bold">JKT</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-foreground font-bold text-xl">JKT48Connect</span>
                        <span className="text-sm text-default-500 font-medium">Connecting Fans Worldwide</span>
                      </div>
                    </div>
                    <p className="text-default-600 text-sm leading-relaxed max-w-md mb-6">
                      Platform terpercaya untuk fans JKT48 dengan layanan bot WhatsApp, Discord, 
                      notifikasi real-time, dan berbagai fitur eksklusif lainnya.
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-default-500 font-medium">Follow us:</span>
                      <div className="flex gap-2">
                        <Link 
                          isExternal 
                          href="https://github.com/j-forces"
                          className="p-2.5 rounded-xl bg-default-100 hover:bg-default-200 hover:scale-110 transition-all duration-200 shadow-sm"
                          aria-label="GitHub"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-default-700">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </Link>
                        <Link 
                          isExternal 
                          href="https://whatsapp.com/channel/0029Vb3D8q00Qeabko4izt2N"
                          className="p-2.5 rounded-xl bg-default-100 hover:bg-default-200 hover:scale-110 transition-all duration-200 shadow-sm"
                          aria-label="WhatsApp"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-default-700">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                          </svg>
                        </Link>
                        <Link 
                          isExternal 
                          href="https://discord.gg/jkt48"
                          className="p-2.5 rounded-xl bg-default-100 hover:bg-default-200 hover:scale-110 transition-all duration-200 shadow-sm"
                          aria-label="Discord"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-default-700">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div>
                    <h4 className="text-foreground font-semibold text-lg mb-4">Quick Links</h4>
                    <div className="space-y-3">
                      <Link 
                        href="/about" 
                        className="block text-default-600 hover:text-primary transition-colors duration-200 text-sm font-medium"
                      >
                        About Us
                      </Link>
                      <Link 
                        href="/contact" 
                        className="block text-default-600 hover:text-primary transition-colors duration-200 text-sm font-medium"
                      >
                        Contact
                      </Link>
                      <Link 
                        isExternal
                        href="https://wa.me/6285701479245" 
                        className="block text-default-600 hover:text-primary transition-colors duration-200 text-sm font-medium"
                      >
                        WhatsApp Bot
                      </Link>
                      <Link 
                        isExternal
                        href="https://discord.gg/8u4RSqC3RD" 
                        className="block text-default-600 hover:text-primary transition-colors duration-200 text-sm font-medium"
                      >
                        Discord Server
                      </Link>
                    </div>
                  </div>

                  {/* Legal & Support */}
                  <div>
                    <h4 className="text-foreground font-semibold text-lg mb-4">Legal & Support</h4>
                    <div className="space-y-3">
                      <Link 
                        href="/terms" 
                        className="block text-default-600 hover:text-primary transition-colors duration-200 text-sm font-medium"
                      >
                        Terms of Service
                      </Link>
                      <Link 
                        href="/privacy" 
                        className="block text-default-600 hover:text-primary transition-colors duration-200 text-sm font-medium"
                      >
                        Privacy Policy
                      </Link>
                      <Link 
                        isExternal
                        href="mailto:support@jkt48connect.my.id" 
                        className="block text-default-600 hover:text-primary transition-colors duration-200 text-sm font-medium"
                      >
                        Email Support
                      </Link>
                      <Link 
                        isExternal
                        href="https://github.com/j-forces/issues" 
                        className="block text-default-600 hover:text-primary transition-colors duration-200 text-sm font-medium"
                      >
                        Report Issue
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950/30 dark:to-secondary-950/30 rounded-2xl border border-primary-100 dark:border-primary-900/50">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                    <div className="text-xs text-default-500 font-medium">Online Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">1000+</div>
                    <div className="text-xs text-default-500 font-medium">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
                    <div className="text-xs text-default-500 font-medium">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">5★</div>
                    <div className="text-xs text-default-500 font-medium">User Rating</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-divider my-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-default-500">©</span>
                      <span className="text-primary font-bold">2025</span>
                      <span className="text-default-600 font-medium">JKT48Connect.</span>
                      <span className="text-default-500">All rights reserved.</span>
                    </div>
                    <div className="hidden md:block w-px h-4 bg-divider"></div>
                    <div className="text-xs text-default-500">
                      Made with passion for JKT48 fans worldwide 🌏
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-default-500">Crafted with</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-danger animate-pulse">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span className="text-default-500">by</span>
                    <Link 
                      isExternal 
                      className="text-primary hover:text-primary-600 font-bold hover:underline transition-all duration-200 hover:scale-105" 
                      href="https://github.com/j-forces"
                    >
                      Valzyy
                    </Link>
                    <div className="hidden sm:flex items-center gap-2 ml-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-success text-xs font-medium">Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
