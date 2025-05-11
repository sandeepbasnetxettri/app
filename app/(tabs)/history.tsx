import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Filter, Search } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';
import TransactionCard from '../../components/TransactionCard';

// Mock data for transactions
const mockTransactions = [
  {
    id: '1',
    amount: 25000,
    currency: 'NPR',
    recipientName: 'John Doe',
    date: new Date(2023, 5, 15),
    status: 'completed',
  },
  {
    id: '2',
    amount: 13500,
    currency: 'NPR',
    recipientName: 'Sarah Smith',
    date: new Date(2023, 5, 14),
    status: 'pending',
  },
  {
    id: '3',
    amount: 42000,
    currency: 'NPR',
    recipientName: 'Michael Brown',
    date: new Date(2023, 5, 10),
    status: 'completed',
  },
  {
    id: '4',
    amount: 7800,
    currency: 'NPR',
    recipientName: 'Emma Johnson',
    date: new Date(2023, 5, 5),
    status: 'failed',
  },
  {
    id: '5',
    amount: 19500,
    currency: 'NPR',
    recipientName: 'David Lee',
    date: new Date(2023, 4, 28),
    status: 'completed',
  },
  {
    id: '6',
    amount: 32000,
    currency: 'NPR',
    recipientName: 'Sophie Chen',
    date: new Date(2023, 4, 20),
    status: 'completed',
  },
  {
    id: '7',
    amount: 16700,
    currency: 'NPR',
    recipientName: 'Thomas Wilson',
    date: new Date(2023, 4, 15),
    status: 'completed',
  },
  {
    id: '8',
    amount: 29300,
    currency: 'NPR',
    recipientName: 'Olivia Martin',
    date: new Date(2023, 4, 10),
    status: 'completed',
  },
];

export default function TransactionHistoryScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filter, setFilter] = useState('all'); // all, completed, pending, failed
  
  const filteredTransactions = transactions
    .filter(transaction => 
      transaction.recipientName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(transaction => {
      if (filter === 'all') return true;
      return transaction.status === filter;
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date descending
  
  const handleTransactionPress = (id: string) => {
    router.push(`/history/${id}`);
  };
  
  const handleFilterPress = () => {
    // Show filter options (in a real app this would be a modal or popover)
    const nextFilter = filter === 'all' 
      ? 'completed' 
      : filter === 'completed' 
        ? 'pending' 
        : filter === 'pending' 
          ? 'failed' 
          : 'all';
    
    setFilter(nextFilter);
  };
  
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Transaction History</Text>
        <Text style={styles.subtitle}>
          View and track all your money transfers
        </Text>
        
        <View style={styles.filterContainer}>
          <Input
            placeholder="Search by recipient"
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Search size={20} color={Colors.neutral[500]} />}
            containerStyle={styles.searchInput}
          />
          
          <TouchableOpacity 
            style={[
              styles.filterButton,
              filter !== 'all' && styles.activeFilterButton
            ]}
            onPress={handleFilterPress}
          >
            <Filter size={20} color={filter !== 'all' ? Colors.primary[600] : Colors.neutral[600]} />
          </TouchableOpacity>
        </View>
        
        {filter !== 'all' && (
          <View style={styles.activeFilterContainer}>
            <Text style={styles.activeFilterText}>
              Filtered by: <Text style={styles.filterValue}>{filter}</Text>
            </Text>
            <TouchableOpacity onPress={() => setFilter('all')}>
              <Text style={styles.clearFilterText}>Clear</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  
  const renderEmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Transactions Found</Text>
        <Text style={styles.emptyMessage}>
          {searchQuery 
            ? 'Try a different search term or adjust filters'
            : 'You have not made any transactions yet'}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredTransactions}
        renderItem={({ item }) => (
          <TransactionCard
            id={item.id}
            amount={item.amount}
            currency={item.currency}
            recipientName={item.recipientName}
            date={item.date}
            status={item.status}
            onPress={handleTransactionPress}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  headerContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.neutral[800],
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.neutral[600],
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginBottom: 0,
    marginRight: 8,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.neutral[300],
  },
  activeFilterButton: {
    borderColor: Colors.primary[600],
    backgroundColor: Colors.primary[50],
  },
  activeFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.primary[50],
    borderRadius: 8,
    marginBottom: 16,
  },
  activeFilterText: {
    fontSize: 14,
    color: Colors.neutral[700],
    fontFamily: 'Inter-Regular',
  },
  filterValue: {
    fontWeight: '600',
    color: Colors.primary[600],
    textTransform: 'capitalize',
    fontFamily: 'Inter-SemiBold',
  },
  clearFilterText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary[600],
    fontFamily: 'Inter-Medium',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  emptyMessage: {
    fontSize: 14,
    color: Colors.neutral[600],
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});