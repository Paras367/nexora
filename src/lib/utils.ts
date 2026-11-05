/**
 * Formats a number as a currency string.
 * Automatically adjusts locale and decimals based on currency.
 * 
 * @param n - The number to format.
 * @param currency - The currency code ('USD' or 'INR'). Defaults to 'USD'.
 * @param decimals - Number of decimal places. Defaults to 2 for USD, 0 for INR.
 * @returns Formatted currency string (e.g., "$18.00" or "₹450").
 */
export const formatPrice = (
  n: number,
  currency: 'USD' | 'INR' = 'USD',
  decimals?: number
): string => {
  // Default to 0 decimals for INR, 2 for USD if not explicitly provided
  const defaultDecimals = decimals ?? (currency === 'INR' ? 0 : 2);
  const locale = currency === 'INR' ? 'en-IN' : 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: defaultDecimals,
    maximumFractionDigits: defaultDecimals,
  }).format(n);
};

/**
 * Formats a number with locale-specific grouping and specific decimal places.
 * @param n - The number to format.
 * @param decimals - Number of decimal places (default: 0).
 * @returns Formatted number string (e.g., "12,400").
 */
export const formatNumber = (n: number, decimals: number = 0): string => {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

/**
 * Generates an array of Font Awesome icon classes for star ratings.
 * Supports full, half, and empty stars.
 * @param rating - The numeric rating (0 to 5).
 * @returns Array of 5 icon class strings.
 */
export const starIcons = (rating: number): string[] => {
  return Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;
    if (starValue <= rating) return 'fa-solid fa-star';
    if (starValue - 0.5 <= rating) return 'fa-solid fa-star-half-stroke';
    return 'fa-regular fa-star';
  });
};

/**
 * Validates if a string is a properly formatted email address.
 * @param email - The email string to validate.
 * @returns True if valid, false otherwise.
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Truncates a string to a specified length and adds an ellipsis.
 * @param str - The string to truncate.
 * @param maxLength - Maximum length before truncation (default: 100).
 * @returns Truncated string.
 */
export const truncateText = (str: string, maxLength: number = 100): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trim() + '...';
};

/**
 * Formats a date string or Date object into a readable format.
 * @param date - The date to format.
 * @param options - Intl.DateTimeFormatOptions (default: { year: 'numeric', month: 'long', day: 'numeric' }).
 * @returns Formatted date string (e.g., "October 24, 2023").
 */
export const formatDate = (
  date: string | Date,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
): string => {
  return new Date(date).toLocaleDateString('en-US', options);
};

/**
 * Copies text to the user's clipboard.
 * @param text - The text to copy.
 * @returns Promise resolving to true if successful, false otherwise.
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

/**
 * Converts a string into a URL-friendly slug.
 * @param str - The string to slugify.
 * @returns Slugified string (e.g., "Ethiopian Yirgacheffe" -> "ethiopian-yirgacheffe").
 */
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Calculates the discount percentage between original and sale price.
 * @param original - Original price.
 * @param sale - Sale price.
 * @returns Discount percentage as a whole number (e.g., 20 for 20% off).
 */
export const calculateDiscount = (original: number, sale: number): number => {
  if (original <= 0 || sale >= original) return 0;
  return Math.round(((original - sale) / original) * 100);
};