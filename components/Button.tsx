import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import Colors from '../constants/Colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  showArrow?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon,
  showArrow = false,
  fullWidth = false,
  style,
  textStyle,
  ...rest
}) => {
  // Determine button styles based on variant
  const getButtonStyle = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      case 'ghost':
        return styles.ghostButton;
      default:
        return styles.primaryButton;
    }
  };

  // Determine text styles based on variant
  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      case 'ghost':
        return styles.ghostText;
      default:
        return styles.primaryText;
    }
  };

  // Determine size styles
  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'medium':
        return styles.mediumButton;
      case 'large':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  const getTextSizeStyle = (): TextStyle => {
    switch (size) {
      case 'small':
        return styles.smallText;
      case 'medium':
        return styles.mediumText;
      case 'large':
        return styles.largeText;
      default:
        return styles.mediumText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getSizeStyle(),
        fullWidth && styles.fullWidth,
        disabled && styles.disabledButton,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.white : Colors.primary[600]}
          size="small"
        />
      ) : (
        <>
          {icon && icon}
          <Text
            style={[
              styles.text,
              getTextStyle(),
              getTextSizeStyle(),
              disabled && styles.disabledText,
              textStyle,
              icon && styles.textWithIcon,
            ]}
          >
            {title}
          </Text>
          {showArrow && (
            <ArrowRight 
              size={16} 
              color={variant === 'primary' ? Colors.white : Colors.primary[600]} 
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  fullWidth: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: Colors.primary[600],
  },
  secondaryButton: {
    backgroundColor: Colors.secondary[500],
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary[600],
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  mediumButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  largeButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  disabledButton: {
    backgroundColor: Colors.neutral[300],
    borderColor: Colors.neutral[300],
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  textWithIcon: {
    marginLeft: 8,
    marginRight: 8,
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.neutral[800],
  },
  outlineText: {
    color: Colors.primary[600],
  },
  ghostText: {
    color: Colors.primary[600],
  },
  disabledText: {
    color: Colors.neutral[500],
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
});

export default Button;