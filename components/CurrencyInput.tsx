import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import Colors from '../constants/Colors';

interface CurrencyInputProps {
  label: string;
  value: string;
  onChangeValue: (value: string) => void;
  currency: string;
  onChangeCurrency?: (currency: string) => void;
  editable?: boolean;
  placeholder?: string;
  showCurrencySelector?: boolean;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  value,
  onChangeValue,
  currency,
  onChangeCurrency,
  editable = true,
  placeholder = '0.00',
  showCurrencySelector = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Format the input value as currency
  const formatInputValue = (text: string) => {
    // Remove all non-numeric characters except decimal point
    text = text.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = text.split('.');
    if (parts.length > 2) {
      text = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to 2 decimal places
    if (parts.length > 1 && parts[1].length > 2) {
      text = parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    return text;
  };
  
  const handleChangeText = (text: string) => {
    const formattedValue = formatInputValue(text);
    onChangeValue(formattedValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedContainer,
          !editable && styles.disabledContainer,
        ]}
      >
        {showCurrencySelector && (
          <TouchableOpacity
            style={styles.currencySelector}
            onPress={() => onChangeCurrency && onChangeCurrency(currency)}
            disabled={!onChangeCurrency}
          >
            <Text style={styles.currencyText}>{currency}</Text>
            {onChangeCurrency && <ChevronDown size={16} color={Colors.neutral[500]} />}
          </TouchableOpacity>
        )}
        
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={handleChangeText}
          keyboardType="numeric"
          placeholder={placeholder}
          placeholderTextColor={Colors.neutral[400]}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral[700],
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  focusedContainer: {
    borderColor: Colors.primary[500],
  },
  disabledContainer: {
    backgroundColor: Colors.neutral[100],
    borderColor: Colors.neutral[200],
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: Colors.neutral[200],
    backgroundColor: Colors.neutral[50],
  },
  currencyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginRight: 4,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.neutral[800],
  },
});

export default CurrencyInput;