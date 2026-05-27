import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertDate = (date: Date) => {
    return Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      day: "2-digit",
      month: "short",
    }).format(date);
  };
