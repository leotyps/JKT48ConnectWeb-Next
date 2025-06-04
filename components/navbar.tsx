
"use client"

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
);

// Icon Components untuk menu items
const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const AboutIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9,12 2,2 4-4"/>
  </svg>
);

const ServicesIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="7" height="9" x="3" y="3" rx="1"/>
    <rect width="7" height="5" x="14" y="3" rx="1"/>
    <rect width="7" height="9" x="14" y="12" rx="1"/>
    <rect width="7" height="5" x="3" y="16" rx="1"/>
  </svg>
);

const ContactIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const BlogIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
);

// Mapping icons dengan menu items
const getMenuIcon = (label: string) => {
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'Home': HomeIcon,
    'About': AboutIcon,
    'Services': ServicesIcon,
    'Contact': ContactIcon,
    'Blog': BlogIcon,
    'Docs': AboutIcon, // fallback
    'Pricing': ServicesIcon, // fallback
  };
  
  return iconMap[label] || HomeIcon;
};

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        base: "max-w-full sm:max-w-[10rem] h-10",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 backdrop-blur-md border border-default-200/50 shadow-sm hover:shadow-md transition-all duration-300",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      radius="lg"
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar 
      maxWidth="xl" 
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-background/70 dark:bg-background/70 backdrop-blur-md backdrop-saturate-150 border-b border-divider"
      height="4.5rem"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2 hover:opacity-80 transition-opacity duration-200" href="/">
            <div className="bg-gradient-to-br from-primary-500 to-secondary-500 w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">J48</span>
            </div>
            <p className="font-bold text-inherit bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              JKT48Connect
            </p>
          </NextLink>
        </NavbarBrand>
        
        <ul className="hidden lg:flex gap-2 justify-start ml-4">
          {siteConfig.navItems.map((item) => {
            const IconComponent = getMenuIcon(item.label);
            return (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                    "text-foreground/80 hover:text-foreground hover:bg-default-100",
                    "transition-all duration-300 ease-out",
                    "data-[active=true]:text-primary data-[active=true]:bg-primary/10",
                    "relative overflow-hidden group"
                  )}
                  href={item.href}
                >
                  <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  <span>{item.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                </NextLink>
              </NavbarItem>
            );
          })}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-1">
          <Link 
            isExternal 
            aria-label="WhatsApp" 
            href={siteConfig.links.twitter}
            className="p-2 rounded-full hover:bg-default-100 hover:scale-110 transition-all duration-300"
          >
            <WhatsAppIcon className="text-default-500 hover:text-success-500 transition-colors duration-300" />
          </Link>
          <Link 
            isExternal 
            aria-label="Discord" 
            href={siteConfig.links.discord}
            className="p-2 rounded-full hover:bg-default-100 hover:scale-110 transition-all duration-300"
          >
            <DiscordIcon className="text-default-500 hover:text-secondary-500 transition-colors duration-300" />
          </Link>
          <Link 
            isExternal 
            aria-label="Github" 
            href={siteConfig.links.github}
            className="p-2 rounded-full hover:bg-default-100 hover:scale-110 transition-all duration-300"
          >
            <GithubIcon className="text-default-500 hover:text-foreground transition-colors duration-300" />
          </Link>
          <div className="mx-1">
            <ThemeSwitch />
          </div>
        </NavbarItem>
        
        <NavbarItem className="hidden lg:flex">
          {searchInput}
        </NavbarItem>
        
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-white animate-pulse" />}
            variant="solid"
            radius="full"
            size="sm"
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link 
          isExternal 
          aria-label="Github" 
          href={siteConfig.links.github}
          className="p-2 rounded-full hover:bg-default-100 transition-all duration-300"
        >
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle className="w-6 h-6" />
      </NavbarContent>

      <NavbarMenu className="bg-background/95 backdrop-blur-xl border-none shadow-2xl">
        <div className="px-6 py-4">
          {searchInput}
        </div>
        
        <div className="border-t border-divider/50"></div>
        
        <div className="px-6 py-4 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => {
            const IconComponent = getMenuIcon(item.label);
            return (
              <NavbarMenuItem key={`${item}-${index}`}>
                <NextLink
                  className={clsx(
                    "w-full px-4 py-3.5 rounded-xl text-foreground/90",
                    "hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10",
                    "hover:text-foreground hover:shadow-md",
                    "transition-all duration-300 ease-out",
                    "font-medium text-base",
                    "flex items-center gap-3 group",
                    "border border-transparent hover:border-primary/20",
                    "relative overflow-hidden"
                  )}
                  href={item.href}
                  onClick={handleMenuItemClick}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-default-100 group-hover:bg-primary/10 transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-default-600 group-hover:text-primary transition-all duration-300" />
                  </div>
                  <span className="flex-1">{item.label}</span>
                  <svg 
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 text-primary transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                </NextLink>
              </NavbarMenuItem>
            );
          })}
        </div>

        <div className="border-t border-divider/50 mx-6"></div>
        
        <div className="px-6 py-6">
          <div className="flex gap-2 justify-center mb-6">
            <Link 
              isExternal 
              aria-label="WhatsApp" 
              href={siteConfig.links.twitter}
              className="p-3 rounded-full bg-default-100 hover:bg-success-100 hover:scale-110 transition-all duration-300 group"
            >
              <WhatsAppIcon className="text-default-600 group-hover:text-success-600 transition-colors duration-300" />
            </Link>
            <Link 
              isExternal 
              aria-label="Discord" 
              href={siteConfig.links.discord}
              className="p-3 rounded-full bg-default-100 hover:bg-secondary-100 hover:scale-110 transition-all duration-300 group"
            >
              <DiscordIcon className="text-default-600 group-hover:text-secondary-600 transition-colors duration-300" />
            </Link>
            <Link 
              isExternal 
              aria-label="Github" 
              href={siteConfig.links.github}
              className="p-3 rounded-full bg-default-100 hover:bg-default-200 hover:scale-110 transition-all duration-300 group"
            >
              <GithubIcon className="text-default-600 group-hover:text-foreground transition-colors duration-300" />
            </Link>
          </div>
          
          <Button
            isExternal
            as={Link}
            className="w-full text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-white animate-pulse" />}
            variant="solid"
            radius="full"
            size="lg"
          >
            Sponsor Our Project
          </Button>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
