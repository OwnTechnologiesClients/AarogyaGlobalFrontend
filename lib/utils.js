import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Safely extract rating value from hospital/doctor rating object
 * Handles both old string format and new object format from API
 */
export function getRatingValue(rating) {
  if (!rating) return 'N/A';
  
  if (typeof rating === 'object') {
    return rating.userScore || rating.googleRating || 'N/A';
  }
  
  return rating;
}

/**
 * Safely extract rating for sorting/comparison
 * Returns a number for sorting purposes
 */
export function getRatingNumber(rating) {
  if (!rating) return 0;
  
  if (typeof rating === 'object') {
    return parseFloat(rating.userScore || rating.googleRating || 0) || 0;
  }
  
  return parseFloat(rating) || 0;
}