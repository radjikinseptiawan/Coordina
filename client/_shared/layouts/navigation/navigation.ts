"use client";
import { Variants } from "framer-motion";
import { Home, LogOut, MenuIcon, Settings, User } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

export const getRoute = (pathName: string) => {
  return [
    {
      ref: "dashboard",
      icon: Home,
      text: "Menu",
    },
    {
      ref: "profile",
      icon: User,
      text: "Profile",
    },
    {
      ref: `${pathName}?logout=true`,
      icon: LogOut,
      text: "Logout",
    },
  ];
};

export const getRouteSystem = (
  slug?: string | string[] | null,
  pathname?: string,
) => {
  return [
    {
      ref: "/dashboard",
      icon: Home,
      text: "Menu",
    },
    {
      ref: "/profile",
      icon: User,
      text: "Profile",
    },
    {
      ref: `${pathname}?logout=true`,
      icon: LogOut,
      text: "Logout",
    },
  ];
};

export const DROPDOWN_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: -15,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};
