/**
 * Validates an email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password
 * - At least 8 characters
 * - Contains at least one uppercase letter
 * - Contains at least one lowercase letter
 * - Contains at least one number
 */
export const isValidPassword = (password: string): boolean => {
  if (password.length < 8) return false;
  
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  
  return hasUppercase && hasLowercase && hasNumber;
};

/**
 * Validates a Nepali phone number
 */
export const isValidNepalPhoneNumber = (phone: string): boolean => {
  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid Nepali number
  // Formats: 9XXXXXXXX, +9779XXXXXXXX, 9779XXXXXXXX
  if (cleaned.startsWith('977')) {
    return cleaned.length === 12 && cleaned.slice(3, 4) === '9';
  }
  
  return cleaned.length === 10 && cleaned.startsWith('9');
};

/**
 * Validates a name
 * - At least 2 characters
 * - No special characters or numbers
 */
export const isValidName = (name: string): boolean => {
  if (name.length < 2) return false;
  
  return /^[A-Za-z\s]+$/.test(name);
};

/**
 * Validates a transfer amount
 * - Must be a positive number
 * - Must be within the min and max range
 */
export const isValidAmount = (
  amount: number,
  min: number = 100,
  max: number = 100000
): boolean => {
  if (isNaN(amount) || amount <= 0) return false;
  return amount >= min && amount <= max;
};

/**
 * Validates a bank account number
 * - Must be numeric
 * - Must be between 10-20 digits
 */
export const isValidBankAccount = (accountNumber: string): boolean => {
  const cleaned = accountNumber.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 20;
};