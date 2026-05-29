import { Variants } from "framer-motion";
import { Building, LetterText } from "lucide-react";

export const systemRoute = [
  {
    name: "Organization",
    icon: Building,
    children: [
      {
        name: "Agenda",
        href: "organizations/agenda",
      },
      {
        name: "Audit Log",
        href: "organizations/audit-log",
      },
    ],
  },
  {
    name: "Administration",
    icon: LetterText,
    children: [
      {
        name: "Incoming Letters",
        href: "administration/incoming-letters",
      },
      {
        name: "Outgoing Letters",
        href: "administration/outgoing-letters",
      },
      {
        name: "Members",
        href: "administration/members",
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
