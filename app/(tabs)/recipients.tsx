import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, Search } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Input from '../../components/Input';
import RecipientCard from '../../components/RecipientCard';
import Button from '../../components/Button';

// Mock data for recipients
const mockRecipients = [
  {
    id: '1',
    name: 'John Doe',
    country: 'United States',
    bankName: 'Bank of America',
    accountNumber: '1234567890',
    phoneNumber: '+1 555-123-4567',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    country: 'United Kingdom',
    bankName: 'Barclays',
    accountNumber: '9876543210',
    phoneNumber: '+44 20 1234 5678',
  },
  {
    id: '3',
    name: 'Michael Brown',
    country: 'Australia',
    bankName: 'Commonwealth Bank',
    accountNumber: '5678901234',
    phoneNumber: '+61 2 1234 5678',
  },
  {
    id: '4',
    name: 'Emma Johnson',
    country: 'Canada',
    bankName: 'Royal Bank of Canada',
    accountNumber: '6789012345',
    phoneNumber: '+1 416-123-4567',
  },
  {
    id: '5',
    name: 'David Lee',
    country: 'India',
    bankName: 'HDFC Bank',
    accountNumber: '7890123456',
    phoneNumber: '+91 98765 43210',
  },
  {
    id: '6',
    name: 'Sophie Chen',
    country: 'Germany',
    bankName: 'Deutsche Bank',
    accountNumber: '8901234567',
    phoneNumber: '+49 30 12345678',
  },
];

export default function RecipientsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [recipients, setRecipients] = useState(mockRecipients);
  
  const filteredRecipients = recipients.filter(recipient => 
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.country.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddRecipient = () => {
    router.push('/recipients/add');
  };
  
  const handleRecipientPress = (id: string) => {
    router.push(`/recipients/${id}`);
  };
  
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Recipients</Text>
        <Text style={styles.subtitle}>
          Manage your saved recipients for quick transfers
        </Text>
        
        <Input
          placeholder="Search by name or country"
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search size={20} color={Colors.neutral[500]} />}
          containerStyle={styles.searchContainer}
        />
        
        <Button
          title="Add New Recipient"
          onPress={handleAddRecipient}
          icon={<Plus size={20} color={Colors.white} />}
          fullWidth
          style={styles.addButton}
        />
      </View>
    );
  };
  
  const renderEmptyList = () => {
    if (searchQuery) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Results Found</Text>
          <Text style={styles.emptyMessage}>
            Try a different search term or add a new recipient
          </Text>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Recipients Yet</Text>
        <Text style={styles.emptyMessage}>
          Add your first recipient to start sending money
        </Text>
        <Button
          title="Add Recipient"
          onPress={handleAddRecipient}
          icon={<Plus size={20} color={Colors.white} />}
          style={styles.emptyAddButton}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredRecipients}
        renderItem={({ item }) => (
          <RecipientCard
            id={item.id}
            name={item.name}
            bankName={item.bankName}
            accountNumber={item.accountNumber}
            country={item.country}
            phoneNumber={item.phoneNumber}
            onPress={handleRecipientPress}
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
  searchContainer: {
    marginBottom: 16,
  },
  addButton: {
    marginBottom: 16,
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
    marginBottom: 24,
    fontFamily: 'Inter-Regular',
  },
  emptyAddButton: {
    marginTop: 8,
  },
});