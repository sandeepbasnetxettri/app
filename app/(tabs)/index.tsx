import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Repeat, Bell, CreditCard, ChevronRight, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ExchangeRateCard from '../../components/ExchangeRateCard';
import { formatCurrency } from '../../utils/format';

// Mock data for exchange rates
const exchangeRates = [
  { 
    fromCurrency: 'NPR', 
    toCurrency: 'USD', 
    rate: 0.0075, 
    change: 0.12, 
    lastUpdated: new Date() 
  },
  { 
    fromCurrency: 'NPR', 
    toCurrency: 'GBP', 
    rate: 0.0058, 
    change: -0.23, 
    lastUpdated: new Date() 
  },
  { 
    fromCurrency: 'NPR', 
    toCurrency: 'EUR', 
    rate: 0.0068, 
    change: 0.05, 
    lastUpdated: new Date() 
  },
  { 
    fromCurrency: 'NPR', 
    toCurrency: 'AUD', 
    rate: 0.011, 
    change: 0.31, 
    lastUpdated: new Date() 
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [balance, setBalance] = useState(250000); // Balance in NPR
  const [userName, setUserName] = useState('Ram Sharma');
  
  const handleSendMoney = () => {
    router.push('/send');
  };
  
  const handleViewAllTransactions = () => {
    router.push('/history');
  };
  
  const handleViewAllRecipients = () => {
    router.push('/recipients');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color={Colors.neutral[700]} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
          
          {/* Balance Card */}
          <Card style={styles.balanceCard} elevated>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceTitle}>Available Balance</Text>
              <TouchableOpacity style={styles.addMoneyButton}>
                <CreditCard size={16} color={Colors.white} />
                <Text style={styles.addMoneyText}>Add Money</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.balanceAmount}>
              {formatCurrency(balance, 'NPR')}
            </Text>
            
            <View style={styles.actionButtons}>
              <Button
                title="Send Money"
                onPress={handleSendMoney}
                icon={<ArrowUpRight size={16} color={Colors.white} />}
                style={styles.sendButton}
              />
              <Button
                title="Receive Money"
                onPress={() => {}}
                variant="outline"
                icon={<ArrowDownLeft size={16} color={Colors.primary[600]} />}
                style={styles.receiveButton}
              />
            </View>
          </Card>
          
          {/* Exchange Rates */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Exchange Rates</Text>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ratesContainer}
          >
            {exchangeRates.map((rate, index) => (
              <View key={index} style={styles.rateCardContainer}>
                <ExchangeRateCard
                  fromCurrency={rate.fromCurrency}
                  toCurrency={rate.toCurrency}
                  rate={rate.rate}
                  change={rate.change}
                  lastUpdated={rate.lastUpdated}
                />
              </View>
            ))}
          </ScrollView>
          
          {/* Recent Transactions */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={handleViewAllTransactions}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color={Colors.primary[600]} />
            </TouchableOpacity>
          </View>
          
          {/* Transaction Cards */}
          <View style={styles.transactionsContainer}>
            {/* Sample transaction cards */}
            <TransactionItem
              recipient="John Doe"
              amount={25000}
              currency="NPR"
              date="Today"
              status="completed"
            />
            <TransactionItem
              recipient="Sarah Smith"
              amount={13500}
              currency="NPR"
              date="Yesterday"
              status="pending"
            />
            <TransactionItem
              recipient="Michael Brown"
              amount={42000}
              currency="NPR"
              date="23 Jun 2023"
              status="completed"
            />
          </View>
          
          {/* Quick Send */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Send</Text>
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={handleViewAllRecipients}
            >
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color={Colors.primary[600]} />
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recipientsContainer}
          >
            {/* Quick send recipients */}
            <QuickSendItem name="John" country="USA" onPress={() => router.push('/send')} />
            <QuickSendItem name="Sarah" country="UK" onPress={() => router.push('/send')} />
            <QuickSendItem name="Michael" country="Australia" onPress={() => router.push('/send')} />
            <QuickSendItem name="Emma" country="Canada" onPress={() => router.push('/send')} />
            <QuickSendItem name="Add New" isAdd onPress={() => router.push('/recipients/add')} />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Transaction Item Component
const TransactionItem = ({ recipient, amount, currency, date, status }) => {
  const isCompleted = status === 'completed';
  const isPending = status === 'pending';
  
  return (
    <Card style={styles.transactionCard}>
      <View style={styles.transactionContent}>
        <View style={styles.transactionIcon}>
          <ArrowUpRight size={20} color={Colors.primary[600]} />
        </View>
        
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionRecipient}>{recipient}</Text>
          <Text style={styles.transactionDate}>{date}</Text>
        </View>
        
        <View style={styles.transactionAmount}>
          <Text style={styles.amountText}>
            {formatCurrency(amount, currency)}
          </Text>
          <View style={[
            styles.statusContainer,
            isCompleted ? styles.completedStatus : isPending ? styles.pendingStatus : styles.failedStatus
          ]}>
            <Text style={[
              styles.statusText,
              isCompleted ? styles.completedText : isPending ? styles.pendingText : styles.failedText
            ]}>
              {isCompleted ? 'Completed' : isPending ? 'Pending' : 'Failed'}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

// Quick Send Item Component
const QuickSendItem = ({ name, country, isAdd = false, onPress }) => {
  return (
    <TouchableOpacity style={styles.quickSendItem} onPress={onPress}>
      <View style={[
        styles.recipientAvatar,
        isAdd && styles.addRecipientAvatar
      ]}>
        {isAdd ? (
          <Text style={styles.addIcon}>+</Text>
        ) : (
          <Text style={styles.avatarText}>{name.charAt(0)}</Text>
        )}
      </View>
      <View>
        <Text style={styles.recipientName}>{name}</Text>
        {!isAdd && <Text style={styles.recipientCountry}>{country}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  scrollContent: {
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.neutral[600],
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.neutral[900],
    fontFamily: 'Inter-Bold',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.error[500],
    borderWidth: 1,
    borderColor: Colors.white,
  },
  balanceCard: {
    padding: 20,
    marginBottom: 24,
    backgroundColor: Colors.primary[800],
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceTitle: {
    fontSize: 14,
    color: Colors.neutral[100],
    fontFamily: 'Inter-Medium',
  },
  addMoneyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[700],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  addMoneyText: {
    fontSize: 12,
    color: Colors.white,
    marginLeft: 4,
    fontFamily: 'Inter-Medium',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 16,
    fontFamily: 'Inter-Bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sendButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: Colors.primary[600],
  },
  receiveButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: Colors.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    fontFamily: 'Inter-SemiBold',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary[600],
    fontFamily: 'Inter-Medium',
  },
  ratesContainer: {
    paddingRight: 16,
  },
  rateCardContainer: {
    width: 280,
    marginRight: 16,
  },
  transactionsContainer: {
    marginBottom: 24,
  },
  transactionCard: {
    padding: 16,
    marginBottom: 12,
  },
  transactionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionRecipient: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: Colors.neutral[500],
    fontFamily: 'Inter-Regular',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.neutral[800],
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statusContainer: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  completedStatus: {
    backgroundColor: Colors.success[50],
  },
  pendingStatus: {
    backgroundColor: Colors.warning[50],
  },
  failedStatus: {
    backgroundColor: Colors.error[50],
  },
  statusText: {
    fontSize: 10,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  completedText: {
    color: Colors.success[700],
  },
  pendingText: {
    color: Colors.warning[700],
  },
  failedText: {
    color: Colors.error[700],
  },
  recipientsContainer: {
    paddingRight: 16,
  },
  quickSendItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  recipientAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  addRecipientAvatar: {
    backgroundColor: Colors.neutral[200],
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary[700],
    fontFamily: 'Inter-Bold',
  },
  addIcon: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.neutral[700],
    fontFamily: 'Inter-Bold',
  },
  recipientName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral[800],
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  recipientCountry: {
    fontSize: 12,
    color: Colors.neutral[500],
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});