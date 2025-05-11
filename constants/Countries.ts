import { Colors } from './Colors';

export interface Country {
  code: string;
  name: string;
  currency: string;
  currencyCode: string;
  currencySymbol: string;
  flag: string;
  exchangeRate: number; // Rate against NPR (Nepalese Rupee)
  transferFee: number; // Fee percentage
  minAmount: number;
  maxAmount: number;
  processingTime: string;
}

export const Countries: Country[] = [
  {
    code: 'US',
    name: 'United States',
    currency: 'US Dollar',
    currencyCode: 'USD',
    currencySymbol: '$',
    flag: '🇺🇸',
    exchangeRate: 0.0075,
    transferFee: 1.5,
    minAmount: 1000,
    maxAmount: 1000000,
    processingTime: '1-2 business days'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    currency: 'British Pound',
    currencyCode: 'GBP',
    currencySymbol: '£',
    flag: '🇬🇧',
    exchangeRate: 0.0058,
    transferFee: 1.5,
    minAmount: 1000,
    maxAmount: 1000000,
    processingTime: '1-2 business days'
  },
  {
    code: 'EU',
    name: 'European Union',
    currency: 'Euro',
    currencyCode: 'EUR',
    currencySymbol: '€',
    flag: '🇪🇺',
    exchangeRate: 0.0068,
    transferFee: 1.5,
    minAmount: 1000,
    maxAmount: 1000000,
    processingTime: '1-2 business days'
  },
  {
    code: 'AU',
    name: 'Australia',
    currency: 'Australian Dollar',
    currencyCode: 'AUD',
    currencySymbol: 'A$',
    flag: '🇦🇺',
    exchangeRate: 0.011,
    transferFee: 1.5,
    minAmount: 1000,
    maxAmount: 1000000,
    processingTime: '1-2 business days'
  },
  {
    code: 'CA',
    name: 'Canada',
    currency: 'Canadian Dollar',
    currencyCode: 'CAD',
    currencySymbol: 'C$',
    flag: '🇨🇦',
    exchangeRate: 0.01,
    transferFee: 1.5,
    minAmount: 1000,
    maxAmount: 1000000,
    processingTime: '1-2 business days'
  },
  {
    code: 'IN',
    name: 'India',
    currency: 'Indian Rupee',
    currencyCode: 'INR',
    currencySymbol: '₹',
    flag: '🇮🇳',
    exchangeRate: 0.62,
    transferFee: 1.0,
    minAmount: 1000,
    maxAmount: 1000000,
    processingTime: 'Same day'
  },
  {
    code: 'SG',
    name: 'Singapore',
    currency: 'Singapore Dollar',
    currencyCode: 'SGD',
    currencySymbol: 'S$',
    flag: '🇸🇬',
    exchangeRate: 0.01,
    transferFee: 1.5,
    minAmount: 1000,
    maxAmount: 1000000,
    processingTime: '1-2 business days'
  },
  {
    code: 'JP',
    name: 'Japan',
    currency: 'Japanese Yen',
    currencyCode: 'JPY',
    currencySymbol: '¥',
    flag: '🇯🇵',
    exchangeRate: 1.09,
    transferFee: 1.5,
    minAmount: 1000,
    maxAmount: 1000000,
    processingTime: '1-2 business days'
  },
  {
    code: 'KR',
    name: 'South Korea',
    currency: 'South Korean Won',
    currencyCode: 'KRW',
    currencySymbol: '₩',
    flag: '🇰🇷',
    exchangeRate: 9.85,
    transferFee: 1.5,
    minAmount: 1000,
    maxAmount: 1000000,
    processingTime: '1-2 business days'
  },
  {
    code: 'MY',
    name: 'Malaysia',
    currency: 'Malaysian Ringgit',
    currencyCode: 'MYR',
    currencySymbol: 'RM',
    flag: '🇲🇾',
    exchangeRate: 0.035,
    transferFee: 1.5,
    minAmount: 1000,
    maxAmount: 1000000,
    processingTime: '1-2 business days'
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    currency: 'UAE Dirham',
    currencyCode: 'AED',
    currencySymbol: 'د.إ',
    flag: '🇦🇪',
    exchangeRate: 0.028,
    transferFee: 1.5,
    minAmount: 1000,
    maxAmount: 1000000,
    processingTime: '1-2 business days'
  },
  {
    code: 'QA',
    name: 'Qatar',
    currency: 'Qatari Riyal',
    currencyCode: 'QAR',
    currencySymbol: 'ر.ق',
    flag: '🇶🇦',
    exchangeRate: 0.027,
    transferFee: 1.5,
    minAmount: 1000,
    maxAmount: 1000000,
    processingTime: '1-2 business days'
  },
  {
    code: 'KW',
    name: 'Kuwait',
    currency: 'Kuwaiti Dinar',
    currencyCode: 'KWD',
    currencySymbol: 'د.ك',
    flag: '🇰🇼',
    exchangeRate: 0.0023,
    transferFee: 1.5,
    minAmount: 1000,
    maxAmount: 1000000,
    processingTime: '1-2 business days'
  },
  {
    code: 'IL',
    name: 'Israel',
    currency: 'Israeli Shekel',
    currencyCode: 'ILS',
    currencySymbol: '₪',
    flag: '🇮🇱',
    exchangeRate: 0.027,
    transferFee: 1.5,
    minAmount: 1000,
    maxAmount: 1000000,
    processingTime: '1-2 business days'
  },
  {
    code: 'HK',
    name: 'Hong Kong',
    currency: 'Hong Kong Dollar',
    currencyCode: 'HKD',
    currencySymbol: 'HK$',
    flag: '🇭🇰',
    exchangeRate: 0.059,
    transferFee: 1.5,
    minAmount: 1000,
    maxAmount: 1000000,
    processingTime: '1-2 business days'
  }
];

export const getCountryByCode = (code: string): Country | undefined => {
  return Countries.find(country => country.code === code);
};

export const getCountryByCurrency = (currencyCode: string): Country | undefined => {
  return Countries.find(country => country.currencyCode === currencyCode);
};

export const formatCurrencyWithSymbol = (amount: number, currencyCode: string): string => {
  const country = getCountryByCurrency(currencyCode);
  if (!country) return `${currencyCode} ${amount.toFixed(2)}`;
  
  return `${country.currencySymbol}${amount.toFixed(2)}`;
};

export const calculateTransferAmount = (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): {
  convertedAmount: number;
  fee: number;
  totalAmount: number;
  exchangeRate: number;
} => {
  const sourceCountry = getCountryByCurrency(fromCurrency);
  const targetCountry = getCountryByCurrency(toCurrency);
  
  if (!sourceCountry || !targetCountry) {
    throw new Error('Invalid currency codes');
  }
  
  const exchangeRate = targetCountry.exchangeRate / sourceCountry.exchangeRate;
  const fee = (amount * targetCountry.transferFee) / 100;
  const convertedAmount = amount * exchangeRate;
  const totalAmount = amount + fee;
  
  return {
    convertedAmount,
    fee,
    totalAmount,
    exchangeRate
  };
};