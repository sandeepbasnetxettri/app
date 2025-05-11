import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

// Keep splash screen visible while loading fonts
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium, 
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide splash screen once fonts are loaded
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Simulate checking if user is logged in
  useEffect(() => {
    // Here you would normally check for authentication token
    const checkAuth = async () => {
      // For demo purposes, we'll assume the user is not logged in
      setIsUserLoggedIn(false);
    };
    
    checkAuth();
  }, []);

  // While fonts are loading, don't render anything
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
    </>
  );
}