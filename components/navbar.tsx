
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
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
);

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100 hover:bg-default-200 transition-colors",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block text-xs" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      size="sm"
    />
  );

  return (
    <HeroUINavbar 
      maxWidth="xl" 
      position="sticky"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="backdrop-blur-md bg-background/80 border-b border-divider"
      height="60px"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-2 max-w-fit">
          <NextLink 
            className="flex justify-start items-center gap-2 hover:opacity-80 transition-opacity" 
            href="/"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JKT</span>
            </div>
            <p className="font-bold text-inherit text-lg">JKT48Connect</p>
          </NextLink>
        </NavbarBrand>
        
        <ul className="hidden lg:flex gap-1 justify-start ml-4">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  "hover:bg-default-100 hover:text-primary",
                  "data-[active=true]:text-primary data-[active=true]:bg-primary/10"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
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
            className="p-2 rounded-lg hover:bg-default-100 transition-all duration-200 hover:scale-105"
          >
            <WhatsAppIcon className="text-default-500 hover:text-green-500 transition-colors" />
          </Link>
          <Link 
            isExternal 
            aria-label="Discord" 
            href={siteConfig.links.discord}
            className="p-2 rounded-lg hover:bg-default-100 transition-all duration-200 hover:scale-105"
          >
            <DiscordIcon className="text-default-500 hover:text-indigo-500 transition-colors w-5 h-5" />
          </Link>
          <Link 
            isExternal 
            aria-label="Github" 
            href={siteConfig.links.github}
            className="p-2 rounded-lg hover:bg-default-100 transition-all duration-200 hover:scale-105"
          >
            <GithubIcon className="text-default-500 hover:text-foreground transition-colors w-5 h-5" />
          </Link>
          <div className="ml-2">
            <ThemeSwitch />
          </div>
        </NavbarItem>
        
        <NavbarItem className="hidden lg:flex ml-2">
          {searchInput}
        </NavbarItem>
        
        <NavbarItem className="hidden md:flex ml-2">
          <Button
            isExternal
            as={Link}
            className="text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-white w-4 h-4" />}
            variant="solid"
            size="sm"
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <div className="flex items-center gap-1">
          <Link 
            isExternal 
            aria-label="Github" 
            href={siteConfig.links.github}
            className="p-2 rounded-lg hover:bg-default-100 transition-all duration-200"
          >
            <GithubIcon className="text-default-500 w-5 h-5" />
          </Link>
          <ThemeSwitch />
          <NavbarMenuToggle className="ml-1" />
        </div>
      </NavbarContent>

      <NavbarMenu className="pt-4 max-h-[calc(100vh-60px)] overflow-y-auto">
        {/* Search Section */}
        <div className="px-4 mb-4">
          {searchInput}
        </div>
        
        <div className="border-t border-divider"></div>
        
        {/* Navigation Items */}
        <div className="px-4 py-3">
          <div className="flex flex-col gap-1">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <NextLink
                  className={clsx(
                    "w-full px-4 py-3 rounded-xl text-foreground",
                    "hover:bg-default-100 active:bg-default-200",
                    "transition-all duration-200 ease-out",
                    "font-medium text-base",
                    "flex items-center justify-between group",
                    "transform hover:translate-x-1"
                  )}
                  href={item.href}
                  onClick={handleMenuItemClick}
                >
                  <span>{item.label}</span>
                  <svg 
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </NextLink>
              </NavbarMenuItem>
            ))}
          </div>
        </div>

        <div className="border-t border-divider"></div>
        
        {/* Social Links & Sponsor */}
        <div className="px-4 py-4">
          {/* Social Links */}
          <div className="flex gap-2 justify-center mb-4">
            <Link 
              isExternal 
              aria-label="WhatsApp" 
              href={siteConfig.links.twitter}
              className="p-3 rounded-xl hover:bg-default-100 transition-all duration-200 hover:scale-105"
            >
              <WhatsAppIcon className="text-default-500 hover:text-green-500 transition-colors" />
            </Link>
            <Link 
              isExternal 
              aria-label="Discord" 
              href={siteConfig.links.discord}
              className="p-3 rounded-xl hover:bg-default-100 transition-all duration-200 hover:scale-105"
            >
              <DiscordIcon className="text-default-500 hover:text-indigo-500 transition-colors w-5 h-5" />
            </Link>
            <Link 
              isExternal 
              aria-label="Github" 
              href={siteConfig.links.github}
              className="p-3 rounded-xl hover:bg-default-100 transition-all duration-200 hover:scale-105"
            >
              <GithubIcon className="text-default-500 hover:text-foreground transition-colors w-5 h-5" />
            </Link>
          </div>
          
          {/* Sponsor Button */}
          <Button
            isExternal
            as={Link}
            className="w-full text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-white w-4 h-4" />}
            variant="solid"
            size="md"
          >
            Sponsor
          </Button>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
