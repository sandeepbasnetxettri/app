import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Button from '../../components/Button';
import Input from '../../components/Input';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });

  const validate = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

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
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    setTouched({ email: true, password: true });
    
    if (validate()) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        // Navigate to home screen on successful login
        router.replace('/(tabs)');
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.logo}
            />
          </View>
          
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Login to your account to continue sending money internationally
            </Text>
          </View>
          
          <View style={styles.formContainer}>
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
              placeholder="Your password"
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
            
            <Link href="/auth/forgot-password" asChild>
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </Link>
            
            <Button
              title="Log In"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              style={styles.loginButton}
            />
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Link href="/auth/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.signupText}>Sign Up</Text>
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
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary[100],
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.neutral[900],
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.neutral[600],
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    marginBottom: 24,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: Colors.primary[600],
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    height: 50,
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
  signupText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary[600],
  },
});