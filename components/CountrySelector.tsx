import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  SafeAreaView
} from 'react-native';
import { Search, X } from 'lucide-react-native';
import { Countries, Country } from '../constants/Countries';
import Colors from '../constants/Colors';

interface CountrySelectorProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (country: Country) => void;
  selectedCountry?: Country;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  isVisible,
  onClose,
  onSelect,
  selectedCountry
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredCountries = React.useMemo(() => {
    return Countries.filter(country => 
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.currencyCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderCountryItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={[
        styles.countryItem,
        selectedCountry?.code === item.code && styles.selectedItem
      ]}
      onPress={() => {
        onSelect(item);
        onClose();
      }}
    >
      <Text style={styles.flag}>{item.flag}</Text>
      <View style={styles.countryInfo}>
        <Text style={styles.countryName}>{item.name}</Text>
        <Text style={styles.currencyInfo}>
          {item.currency} ({item.currencyCode})
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Select Country</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={24} color={Colors.neutral[600]} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.neutral[400]} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search countries or currencies"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color={Colors.neutral[400]} />
            </TouchableOpacity>
          )}
        </View>
        
        <FlatList
          data={filteredCountries}
          renderItem={renderCountryItem}
          keyExtractor={item => item.code}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    fontFamily: 'Inter-SemiBold',
  },
  closeButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    margin: 16,
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: Colors.neutral[800],
    fontFamily: 'Inter-Regular',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  selectedItem: {
    backgroundColor: Colors.primary[50],
    borderColor: Colors.primary[200],
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.neutral[800],
    marginBottom: 2,
    fontFamily: 'Inter-Medium',
  },
  currencyInfo: {
    fontSize: 14,
    color: Colors.neutral[600],
    fontFamily: 'Inter-Regular',
  },
});

export default CountrySelector;