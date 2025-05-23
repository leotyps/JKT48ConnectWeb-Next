
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
            <footer className="w-full border-t border-divider bg-gradient-to-r from-default-50 to-default-100/50">
              <div className="container mx-auto max-w-7xl px-6 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Brand Section */}
                  <div className="flex flex-col items-center md:items-start gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">JKT</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-foreground font-bold text-lg">JKT48Connect</span>
                        <span className="text-xs text-default-500">Connecting Fans Worldwide</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex items-center gap-4 text-sm">
                      <Link 
                        href="/about" 
                        className="text-default-600 hover:text-primary transition-colors duration-200"
                      >
                        About
                      </Link>
                      <span className="text-default-300">•</span>
                      <Link 
                        href="/privacy" 
                        className="text-default-600 hover:text-primary transition-colors duration-200"
                      >
                        Privacy
                      </Link>
                      <span className="text-default-300">•</span>
                      <Link 
                        href="/contact" 
                        className="text-default-600 hover:text-primary transition-colors duration-200"
                      >
                        Contact
                      </Link>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-3">
                      <Link 
                        isExternal 
                        href="https://github.com/j-forces"
                        className="p-2 rounded-full bg-default-100 hover:bg-default-200 hover:scale-110 transition-all duration-200"
                        aria-label="GitHub"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-default-600">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </Link>
                      <Link 
                        isExternal 
                        href="https://discord.gg/jkt48"
                        className="p-2 rounded-full bg-default-100 hover:bg-default-200 hover:scale-110 transition-all duration-200"
                        aria-label="Discord"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-default-600">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-divider my-6"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-default-500">©</span>
                    <span className="text-primary font-semibold">2025</span>
                    <span className="text-default-500">JKT48Connect. All rights reserved.</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-default-500">
                    <span>Created with</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-danger animate-pulse">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span>by</span>
                    <Link 
                      isExternal 
                      className="text-primary hover:text-primary-600 font-medium hover:underline transition-all duration-200" 
                      href="https://github.com/j-forces"
                    >
                      Valzyy
                    </Link>
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
