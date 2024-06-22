import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateFormattedNumbers(digit: number, i: number): string {
  return i.toString().padStart(digit, '0');
}

export function generateRandomKey(length: number) {
  let randomKey = '';
  while (randomKey.length < length) {
    const randomDigit = Math.floor(Math.random() * 10);
    randomKey += randomDigit.toString();
  }
  return randomKey;
}

export function getCurrentDateFormatted() {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  return year + month + day;
}

