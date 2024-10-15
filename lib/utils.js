import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isValidEmail(email) {
  return /.+@.+/.test(email);
}

export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
};
