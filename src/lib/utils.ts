import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateFormattedNumbers(digit: number, i: number): string {
  return i.toString().padStart(digit, '0');
} 
