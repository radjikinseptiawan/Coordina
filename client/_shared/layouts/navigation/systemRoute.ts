import { Variants } from "framer-motion";
import { Building, LetterText, Settings } from "lucide-react";

export const systemRoute = [
  {
    name: "Organization",
    icon: Building,
    children: [
      {
        name: "Agenda",
        href: "organizations/agenda",
      },
    ],
  },
  {
    name: "Administration",
    icon: LetterText,
    children: [
      {
        name: "Members",
        href: "administration/members",
      },
      {
        name: "Attendance Recapitulation",
        href: "administration/attendance-recapitulation",
      },
    ],
  },
  {
    name: "Settings",
    icon: Settings,
    children: [
      {
        name: "Role Based Access Control",
        href: "settings/role",
      },
    ],
  },
];

export const SLIDERS_VARIANT: Variants = {
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },

  exit: {
    opacity: 0,
    x: -260, // Efek bergeser keluar sebelum elemen benar-benar hilang dari DOM
    transition: {
      duration: 0.2,
      ease: "easeIn", // Cepat di awal saat menutup
    },
  },

  hidden: {
    opacity: 1,
    scale: 1,
    x: -40,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};
