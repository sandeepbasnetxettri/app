import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import Card from './Card';
import Colors from '../constants/Colors';
import { formatCurrency } from '../utils/format';

interface ExchangeRateProps {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  change: number;
  lastUpdated: Date;
}

export const ExchangeRateCard: React.FC<ExchangeRateProps> = ({
  fromCurrency,
  toCurrency,
  rate,
  change,
  lastUpdated,
}) => {
  const isPositiveChange = change >= 0;
  
  // Format the last updated time
  const formattedTime = lastUpdated.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card style={styles.card} elevated>
      <View style={styles.header}>
        <Text style={styles.title}>
          {fromCurrency} to {toCurrency} Exchange Rate
        </Text>
        <Text style={styles.lastUpdated}>
          Last updated: {formattedTime}
        </Text>
      </View>
      
      <View style={styles.rateContainer}>
        <Text style={styles.rate}>
          1 {fromCurrency} = {formatCurrency(rate, toCurrency)}
        </Text>
        
        <View style={styles.changeContainer}>
          {isPositiveChange ? (
            <TrendingUp size={16} color={Colors.success[500]} />
          ) : (
            <TrendingDown size={16} color={Colors.error[500]} />
          )}
          <Text
            style={[
              styles.changeText,
              {
                color: isPositiveChange
                  ? Colors.success[500]
                  : Colors.error[500],
              },
            ]}
          >
            {isPositiveChange ? '+' : ''}
            {change.toFixed(2)}%
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Send money at this rate
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral[600],
  },
  lastUpdated: {
    fontSize: 12,
    color: Colors.neutral[500],
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rate: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.neutral[800],
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.neutral[200],
    paddingTop: 12,
  },
  footerText: {
    fontSize: 14,
    color: Colors.primary[600],
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default ExchangeRateCard;