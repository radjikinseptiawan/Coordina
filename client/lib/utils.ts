import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertDate = (dateInput: any) => {
  if (!dateInput) return "-";

  const date = new Date(dateInput);

  if (isNaN(date.getTime())) {
    console.warn("⚠️ convertDate menerima data tidak valid:", dateInput);
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    day: "2-digit",
    month: "short",
  }).format(date);
};
