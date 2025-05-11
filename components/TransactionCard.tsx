import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ArrowUpRight, Check, Clock, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import Colors from '../constants/Colors';
import Card from './Card';
import { formatCurrency, formatDate } from '../utils/format';

type TransactionStatus = 'completed' | 'pending' | 'failed';

interface TransactionProps {
  id: string;
  amount: number;
  currency: string;
  recipientName: string;
  date: Date;
  status: TransactionStatus;
  onPress: (id: string) => void;
}

export const TransactionCard: React.FC<TransactionProps> = ({
  id,
  amount,
  currency,
  recipientName,
  date,
  status,
  onPress,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return Colors.success[500];
      case 'pending':
        return Colors.warning[500];
      case 'failed':
        return Colors.error[500];
      default:
        return Colors.neutral[500];
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <Check size={16} color={Colors.success[500]} />;
      case 'pending':
        return <Clock size={16} color={Colors.warning[500]} />;
      case 'failed':
        return <AlertTriangle size={16} color={Colors.error[500]} />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Processing';
      case 'failed':
        return 'Failed';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={() => onPress(id)}
    >
      <Card style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.iconContainer}>
            <ArrowUpRight size={20} color={Colors.primary[500]} />
          </View>
          
          <View style={styles.detailsContainer}>
            <Text style={styles.recipient}>To: {recipientName}</Text>
            <Text style={styles.date}>{formatDate(date)}</Text>
          </View>
          
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{formatCurrency(amount, currency)}</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.bottomRow}>
          <View style={styles.statusContainer}>
            {getStatusIcon()}
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
          </View>
          
          <Text style={styles.trackText}>Track Transaction</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  recipient: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.neutral[800],
  },
  date: {
    fontSize: 12,
    color: Colors.neutral[500],
    marginTop: 2,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.neutral[800],
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral[200],
    marginBottom: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  trackText: {
    fontSize: 12,
    color: Colors.primary[600],
    fontWeight: '500',
  },
});

export default TransactionCard;