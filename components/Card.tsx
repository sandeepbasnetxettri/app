import React from 'react';
import { StyleSheet, View, ViewStyle, Text } from 'react-native';
import Colors from '../constants/Colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  title?: string;
  subtitle?: string;
  elevated?: boolean;
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  title,
  subtitle,
  elevated = false,
  bordered = true,
}) => {
  return (
    <View
      style={[
        styles.card,
        bordered && styles.bordered,
        elevated && styles.elevated,
        style,
      ]}
    >
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
  },
  bordered: {
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  elevated: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.neutral[500],
  },
});

export default Card;