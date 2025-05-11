/**
 * Formats a number as currency with the given currency code
 */
export const formatCurrency = (
  amount: number,
  currencyCode: string = 'NPR',
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Formats a date as a string in the specified format
 */
export const formatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  },
  locale: string = 'en-US'
): string => {
  return new Intl.DateTimeFormat(locale, options).format(date);
};

/**
 * Truncates a string to the specified length and adds ellipsis if needed
 */
export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};

/**
 * Formats a phone number to a standard format
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Check if the input is valid
  if (cleaned.length < 10) return phoneNumber;
  
  // Format the number based on country code
  if (cleaned.startsWith('977')) {
    // Nepal format: +977 98XXXXXXXX
    return `+977 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 9)} ${cleaned.slice(9)}`;
  }
  
  // Default international format
  return `+${cleaned.slice(0, cleaned.length - 10)} ${cleaned.slice(-10, -7)} ${cleaned.slice(-7, -4)} ${cleaned.slice(-4)}`;
};

/**
 * Calculates the fee based on the amount and fee percentage
 */
export const calculateFee = (
  amount: number, 
  feePercentage: number = 1.5
): number => {
  return (amount * feePercentage) / 100;
};

/**
 * Formats a large number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};