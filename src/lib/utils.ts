import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateId = (data: Array<any>) =>
  data.length > 0 ? Math.max(...data.map((n) => Number(n.id) + 1)) : 0;
