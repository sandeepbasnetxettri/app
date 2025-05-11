import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Users, RefreshCw, Info } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import CurrencyInput from '../../components/CurrencyInput';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { formatCurrency } from '../../utils/format';

// Mock exchange rate data
const exchangeRates = {
  NPR: {
    USD: 0.0075,
    EUR: 0.0068,
    GBP: 0.0058,
    AUD: 0.011,
    CAD: 0.01,
    INR: 0.62,
  },
};

export default function SendMoneyScreen() {
  const router = useRouter();
  const scrollViewRef = useRef(null);
  
  const [fromCurrency] = useState('NPR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [sendAmount, setSendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [fee, setFee] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState('1-2 business days');
  
  // Calculate values when send amount changes
  const handleSendAmountChange = (value) => {
    setSendAmount(value);
    
    if (value === '') {
      setReceiveAmount('');
      setFee(0);
      return;
    }
    
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return;
    
    // Calculate fee (e.g., 1% of send amount)
    const calculatedFee = numericValue * 0.01;
    setFee(calculatedFee);
    
    // Get exchange rate
    const rate = exchangeRates[fromCurrency][toCurrency];
    setExchangeRate(rate);
    
    // Calculate receive amount after fee
    const amountAfterFee = numericValue - calculatedFee;
    const calculatedReceiveAmount = (amountAfterFee * rate).toFixed(2);
    setReceiveAmount(calculatedReceiveAmount);
  };
  
  // Handle changing the 'to' currency
  const handleToCurrencyChange = (currency) => {
    setToCurrency(currency);
    if (sendAmount !== '') {
      // Recalculate with new currency
      handleSendAmountChange(sendAmount);
    }
  };
  
  // Handle "Continue" button
  const handleContinue = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      // Scroll to the top when moving to step 2
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } else {
      // Handle final submit
      router.push('/send/confirmation');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            if (currentStep === 1) {
              router.back();
            } else {
              setCurrentStep(1);
            }
          }}
        >
          <ChevronLeft size={24} color={Colors.neutral[800]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {currentStep === 1 ? 'Send Money' : 'Recipient Details'}
        </Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Step indicators */}
        <View style={styles.stepIndicator}>
          <View style={styles.stepContainer}>
            <View style={[styles.stepCircle, currentStep >= 1 && styles.activeStepCircle]}>
              <Text style={[styles.stepNumber, currentStep >= 1 && styles.activeStepNumber]}>1</Text>
            </View>
            <Text style={[styles.stepText, currentStep >= 1 && styles.activeStepText]}>Amount</Text>
          </View>
          
          <View style={styles.stepLine} />
          
          <View style={styles.stepContainer}>
            <View style={[styles.stepCircle, currentStep >= 2 && styles.activeStepCircle]}>
              <Text style={[styles.stepNumber, currentStep >= 2 && styles.activeStepNumber]}>2</Text>
            </View>
            <Text style={[styles.stepText, currentStep >= 2 && styles.activeStepText]}>Recipient</Text>
          </View>
          
          <View style={styles.stepLine} />
          
          <View style={styles.stepContainer}>
            <View style={[styles.stepCircle, currentStep >= 3 && styles.activeStepCircle]}>
              <Text style={[styles.stepNumber, currentStep >= 3 && styles.activeStepNumber]}>3</Text>
            </View>
            <Text style={[styles.stepText, currentStep >= 3 && styles.activeStepText]}>Review</Text>
          </View>
        </View>
        
        {currentStep === 1 ? (
          // Step 1: Amount entry
          <View style={styles.stepContainer}>
            <Card style={styles.amountCard}>
              <CurrencyInput
                label="You Send"
                value={sendAmount}
                onChangeValue={handleSendAmountChange}
                currency={fromCurrency}
                placeholder="0.00"
              />
              
              <View style={styles.exchangeRateContainer}>
                <View style={styles.exchangeIconContainer}>
                  <RefreshCw size={16} color={Colors.primary[600]} />
                </View>
                <Text style={styles.exchangeRateText}>
                  Exchange Rate: 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                </Text>
              </View>
              
              <CurrencyInput
                label="Recipient Gets"
                value={receiveAmount}
                onChangeValue={() => {}}
                currency={toCurrency}
                onChangeCurrency={handleToCurrencyChange}
                editable={false}
                showCurrencySelector={true}
              />
            </Card>
            
            {sendAmount !== '' && (
              <Card style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Transfer Fee:</Text>
                  <Text style={styles.summaryValue}>
                    {formatCurrency(fee, fromCurrency)}
                  </Text>
                </View>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Exchange Rate:</Text>
                  <Text style={styles.summaryValue}>
                    1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                  </Text>
                </View>
                
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery Time:</Text>
                  <Text style={styles.summaryValue}>{deliveryTime}</Text>
                </View>
                
                <View style={styles.divider} />
                
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total to Pay:</Text>
                  <Text style={styles.totalValue}>
                    {formatCurrency(parseFloat(sendAmount) || 0, fromCurrency)}
                  </Text>
                </View>
              </Card>
            )}
          </View>
        ) : (
          // Step 2: Recipient selection
          <View style={styles.stepContainer}>
            <Card style={styles.recipientCard}>
              <Text style={styles.sectionTitle}>Select Recipient</Text>
              
              <TouchableOpacity 
                style={styles.selectRecipientButton}
                onPress={() => router.push('/recipients')}
              >
                <Users size={20} color={Colors.primary[600]} />
                <Text style={styles.selectRecipientText}>Choose from Saved Recipients</Text>
              </TouchableOpacity>
              
              <Text style={styles.orText}>OR</Text>
              
              <View style={styles.newRecipientSection}>
                <Text style={styles.sectionSubtitle}>Add New Recipient</Text>
                
                {/* New recipient form would go here */}
                <View style={styles.recipientFormPlaceholder}>
                  <Text style={styles.placeholderText}>
                    This is where the new recipient form would be implemented.
                  </Text>
                </View>
              </View>
            </Card>
            
            <Card style={styles.transferSummaryCard}>
              <Text style={styles.summaryTitle}>Transfer Summary</Text>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>You Send:</Text>
                <Text style={styles.summaryValue}>
                  {formatCurrency(parseFloat(sendAmount) || 0, fromCurrency)}
                </Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Recipient Gets:</Text>
                <Text style={styles.summaryValue}>
                  {formatCurrency(parseFloat(receiveAmount) || 0, toCurrency)}
                </Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Fee:</Text>
                <Text style={styles.summaryValue}>
                  {formatCurrency(fee, fromCurrency)}
                </Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Time:</Text>
                <Text style={styles.summaryValue}>{deliveryTime}</Text>
              </View>
            </Card>
          </View>
        )}
        
        <View style={styles.footer}>
          <Button
            title={currentStep === 1 ? "Continue" : "Review Transfer"}
            onPress={handleContinue}
            fullWidth
            disabled={sendAmount === ''}
            style={styles.continueButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[200],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    fontFamily: 'Inter-SemiBold',
  },
  placeholder: {
    width: 40,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeStepCircle: {
    backgroundColor: Colors.primary[600],
    borderColor: Colors.primary[600],
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.neutral[600],
    fontFamily: 'Inter-SemiBold',
  },
  activeStepNumber: {
    color: Colors.white,
  },
  stepText: {
    fontSize: 12,
    color: Colors.neutral[500],
    fontFamily: 'Inter-Regular',
  },
  activeStepText: {
    color: Colors.primary[600],
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  stepLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.neutral[300],
    marginHorizontal: 8,
  },
  amountCard: {
    padding: 16,
    marginBottom: 16,
  },
  exchangeRateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingVertical: 8,
    backgroundColor: Colors.primary[50],
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  exchangeIconContainer: {
    marginRight: 8,
  },
  exchangeRateText: {
    fontSize: 14,
    color: Colors.neutral[700],
    fontFamily: 'Inter-Medium',
  },
  summaryCard: {
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.neutral[600],
    fontFamily: 'Inter-Regular',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral[800],
    fontFamily: 'Inter-Medium',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral[200],
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
    fontFamily: 'Inter-SemiBold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary[600],
    fontFamily: 'Inter-Bold',
  },
  footer: {
    marginTop: 16,
    marginBottom: 32,
  },
  continueButton: {
    height: 48,
  },
  recipientCard: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  selectRecipientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: Colors.primary[50],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary[100],
    marginBottom: 16,
  },
  selectRecipientText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary[600],
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
  },
  orText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: Colors.neutral[500],
    marginVertical: 16,
    fontFamily: 'Inter-Medium',
  },
  newRecipientSection: {
    marginTop: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.neutral[700],
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  recipientFormPlaceholder: {
    padding: 16,
    backgroundColor: Colors.neutral[100],
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  placeholderText: {
    fontSize: 14,
    color: Colors.neutral[500],
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  transferSummaryCard: {
    padding: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
});