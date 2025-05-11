import React from 'react';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Chrome as Home, Send, Users, History, Settings } from 'lucide-react-native';
import Colors from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary[600],
        tabBarInactiveTintColor: Colors.neutral[500],
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.neutral[200],
          height: Platform.OS === 'ios' ? 90 : 60,
          paddingTop: 10,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Inter-Medium',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="send"
        options={{
          title: 'Send Money',
          tabBarIcon: ({ color, size }) => (
            <Send size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipients"
        options={{
          title: 'Recipients',
          tabBarIcon: ({ color, size }) => (
            <Users size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <History size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}