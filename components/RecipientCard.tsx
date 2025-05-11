import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CreditCard, User, ChevronRight } from 'lucide-react-native';
import Colors from '../constants/Colors';
import Card from './Card';
import { truncateString } from '../utils/format';

interface RecipientProps {
  id: string;
  name: string;
  bankName?: string;
  accountNumber?: string;
  country: string;
  phoneNumber?: string;
  onPress: (id: string) => void;
}

export const RecipientCard: React.FC<RecipientProps> = ({
  id,
  name,
  bankName,
  accountNumber,
  country,
  phoneNumber,
  onPress,
}) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={() => onPress(id)}
    >
      <Card style={styles.card}>
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <User size={24} color={Colors.primary[600]} />
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.country}>{country}</Text>
            
            {(bankName && accountNumber) && (
              <View style={styles.accountContainer}>
                <CreditCard size={14} color={Colors.neutral[500]} />
                <Text style={styles.accountText}>
                  {bankName}: {truncateString(accountNumber, 10)}
                </Text>
              </View>
            )}
            
            {phoneNumber && (
              <Text style={styles.phoneText}>{phoneNumber}</Text>
            )}
          </View>
          
          <View style={styles.arrowContainer}>
            <ChevronRight size={20} color={Colors.neutral[400]} />
          </View>
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
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 2,
  },
  country: {
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 4,
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  accountText: {
    fontSize: 12,
    color: Colors.neutral[500],
    marginLeft: 4,
  },
  phoneText: {
    fontSize: 12,
    color: Colors.neutral[500],
    marginTop: 2,
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecipientCard;