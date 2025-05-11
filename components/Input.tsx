import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import { Eye, EyeOff, CircleAlert as AlertCircle } from 'lucide-react-native';
import Colors from '../constants/Colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  touched?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  isPassword?: boolean;
  onChangeText: (text: string) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  touched,
  leftIcon,
  rightIcon,
  containerStyle,
  isPassword = false,
  onChangeText,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    if (rest.onBlur) {
      rest.onBlur(undefined as any);
    }
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const showError = error && (touched || isFocused);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          showError && styles.inputContainerError,
        ]}
      >
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || isPassword) && styles.inputWithRightIcon,
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={Colors.neutral[400]}
          {...rest}
        />
        {isPassword ? (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={toggleSecureEntry}
          >
            {secureTextEntry ? (
              <EyeOff size={20} color={Colors.neutral[500]} />
            ) : (
              <Eye size={20} color={Colors.neutral[500]} />
            )}
          </TouchableOpacity>
        ) : (
          rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>
        )}
      </View>
      {showError && (
        <View style={styles.errorContainer}>
          <AlertCircle size={16} color={Colors.error[500]} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: Colors.neutral[700],
    marginBottom: 6,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  inputContainerFocused: {
    borderColor: Colors.primary[500],
  },
  inputContainerError: {
    borderColor: Colors.error[500],
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    color: Colors.neutral[800],
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  leftIconContainer: {
    paddingLeft: 12,
  },
  rightIconContainer: {
    paddingRight: 12,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  errorText: {
    fontSize: 12,
    color: Colors.error[500],
    marginLeft: 4,
  },
});

export default Input;