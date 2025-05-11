import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';
import Input from '../../components/Input';

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const validate = () => {
    const newErrors = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
    let isValid = true;

    // Full Name validation
    if (!fullName) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    } else if (fullName.length < 2) {
      newErrors.fullName = 'Full name is too short';
      isValid = false;
    }

    // Email validation
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
      newErrors.password = 'Password must contain an uppercase letter and a number';
      isValid = false;
    }

    // Confirm Password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = () => {
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    
    if (validate()) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // Navigate to home screen on successful signup
        router.replace('/(tabs)');
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={Colors.neutral[800]} />
          </TouchableOpacity>
          
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Sign up to start sending money internationally with competitive rates
            </Text>
          </View>
          
          <View style={styles.formContainer}>
            <Input
              label="Full Name"
              placeholder="Your full name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                setTouched({ ...touched, fullName: true });
              }}
              error={errors.fullName}
              touched={touched.fullName}
              leftIcon={<User size={20} color={Colors.neutral[500]} />}
            />
            
            <Input
              label="Email"
              placeholder="Your email address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setTouched({ ...touched, email: true });
              }}
              error={errors.email}
              touched={touched.email}
              leftIcon={<Mail size={20} color={Colors.neutral[500]} />}
            />
            
            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setTouched({ ...touched, password: true });
              }}
              error={errors.password}
              touched={touched.password}
              leftIcon={<Lock size={20} color={Colors.neutral[500]} />}
              isPassword
            />
            
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setTouched({ ...touched, confirmPassword: true });
              }}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              leftIcon={<Lock size={20} color={Colors.neutral[500]} />}
              isPassword
            />
            
            <Button
              title="Create Account"
              onPress={handleSignup}
              loading={loading}
              fullWidth
              style={styles.signupButton}
            />
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/auth/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
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
  signupButton: {
    height: 50,
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 14,
    color: Colors.neutral[600],
  },
  loginText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary[600],
  },
});