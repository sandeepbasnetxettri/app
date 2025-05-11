import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, ArrowLeft } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';
import Input from '../../components/Input';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const validate = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = () => {
    setTouched(true);
    
    if (validate()) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setResetSent(true);
      }, 1500);
    }
  };

  const handleReturnToLogin = () => {
    router.replace('/auth/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.neutral[800]} />
        </TouchableOpacity>
        
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            {resetSent 
              ? 'Check your email for a link to reset your password.' 
              : 'Enter your email address and we will send you instructions to reset your password.'}
          </Text>
        </View>
        
        {!resetSent ? (
          <View style={styles.formContainer}>
            <Input
              label="Email"
              placeholder="Your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setTouched(true);
              }}
              error={error}
              touched={touched}
              leftIcon={<Mail size={20} color={Colors.neutral[500]} />}
            />
            
            <Button
              title="Send Reset Link"
              onPress={handleSubmit}
              loading={loading}
              fullWidth
              style={styles.submitButton}
            />
          </View>
        ) : (
          <View style={styles.successContainer}>
            <View style={styles.successIconContainer}>
              <Mail size={40} color={Colors.primary[600]} />
            </View>
            
            <Text style={styles.successMessage}>
              We have sent a password reset link to <Text style={styles.emailHighlight}>{email}</Text>
            </Text>
            
            <Text style={styles.instructionText}>
              Please check your email inbox and follow the instructions to reset your password.
            </Text>
            
            <Button
              title="Return to Login"
              onPress={handleReturnToLogin}
              variant="outline"
              fullWidth
              style={styles.returnButton}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neutral[100],
    marginBottom: 16,
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.neutral[900],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.neutral[600],
    lineHeight: 22,
  },
  formContainer: {
    marginBottom: 24,
  },
  submitButton: {
    height: 50,
    marginTop: 8,
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successMessage: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    textAlign: 'center',
    marginBottom: 12,
  },
  emailHighlight: {
    color: Colors.primary[600],
  },
  instructionText: {
    fontSize: 14,
    color: Colors.neutral[600],
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  returnButton: {
    height: 50,
    marginTop: 16,
  },
});