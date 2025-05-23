
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

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
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
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">JKT48Connect</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
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
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="px-4 py-2">
          {searchInput}
        </div>
        
        <div className="border-t border-divider my-2"></div>
        
        <div className="px-4 flex flex-col gap-1">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextLink
                className={clsx(
                  "w-full px-3 py-2.5 rounded-lg text-foreground",
                  "hover:bg-default-100 hover:text-primary",
                  "transition-all duration-200 ease-in-out",
                  "font-medium text-base",
                  "flex items-center justify-between group"
                )}
                href={item.href}
                onClick={handleMenuItemClick}
              >
                <span>{item.label}</span>
                <svg 
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </NextLink>
            </NavbarMenuItem>
          ))}
        </div>

        <div className="border-t border-divider my-4"></div>
        
        <div className="px-4 pb-4">
          <div className="flex gap-4 justify-center">
            <Link 
              isExternal 
              aria-label="Twitter" 
              href={siteConfig.links.twitter}
              className="p-2 rounded-full hover:bg-default-100 transition-colors duration-200"
            >
              <TwitterIcon className="text-default-500 hover:text-primary transition-colors duration-200" />
            </Link>
            <Link 
              isExternal 
              aria-label="Discord" 
              href={siteConfig.links.discord}
              className="p-2 rounded-full hover:bg-default-100 transition-colors duration-200"
            >
              <DiscordIcon className="text-default-500 hover:text-primary transition-colors duration-200" />
            </Link>
            <Link 
              isExternal 
              aria-label="Github" 
              href={siteConfig.links.github}
              className="p-2 rounded-full hover:bg-default-100 transition-colors duration-200"
            >
              <GithubIcon className="text-default-500 hover:text-primary transition-colors duration-200" />
            </Link>
          </div>
          
          <div className="mt-4">
            <Button
              isExternal
              as={Link}
              className="w-full text-sm font-normal text-default-600 bg-default-100 hover:bg-default-200"
              href={siteConfig.links.sponsor}
              startContent={<HeartFilledIcon className="text-danger" />}
              variant="flat"
            >
              Sponsor
            </Button>
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
