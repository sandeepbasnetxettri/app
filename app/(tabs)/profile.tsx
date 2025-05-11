import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Settings, Shield, CreditCard, Languages, CircleHelp as HelpCircle, LogOut, ChevronRight, Bell } from 'lucide-react-native';
import Colors from '../../constants/Colors';
import Card from '../../components/Card';

export default function ProfileScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState('Ram Sharma');
  const [userEmail, setUserEmail] = useState('ram.sharma@example.com');
  const [profilePicture, setProfilePicture] = useState('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  
  const handleLogout = () => {
    // In a real app, clear auth tokens, etc.
    router.replace('/auth/login');
  };
  
  const renderSettingsItem = (
    icon: React.ReactNode,
    title: string,
    onPress: () => void,
    rightElement?: React.ReactNode
  ) => {
    return (
      <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
        <View style={styles.settingsIconContainer}>
          {icon}
        </View>
        <Text style={styles.settingsItemText}>{title}</Text>
        <View style={styles.settingsRightElement}>
          {rightElement || <ChevronRight size={20} color={Colors.neutral[400]} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
          </View>
          
          {/* User Profile Card */}
          <Card style={styles.profileCard} elevated>
            <View style={styles.profileContent}>
              <Image 
                source={{ uri: profilePicture }} 
                style={styles.profilePicture} 
              />
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{userName}</Text>
                <Text style={styles.profileEmail}>{userEmail}</Text>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </Card>
          
          {/* Settings Sections */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            
            {renderSettingsItem(
              <User size={22} color={Colors.primary[600]} />,
              'Personal Information',
              () => {}
            )}
            
            {renderSettingsItem(
              <Shield size={22} color={Colors.primary[600]} />,
              'Security',
              () => {}
            )}
            
            {renderSettingsItem(
              <CreditCard size={22} color={Colors.primary[600]} />,
              'Payment Methods',
              () => {}
            )}
          </View>
          
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>App Settings</Text>
            
            {renderSettingsItem(
              <Bell size={22} color={Colors.primary[600]} />,
              'Notifications',
              () => {},
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: Colors.neutral[300], true: Colors.primary[500] }}
                thumbColor={Colors.white}
              />
            )}
            
            {renderSettingsItem(
              <Shield size={22} color={Colors.primary[600]} />,
              'Biometric Authentication',
              () => {},
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: Colors.neutral[300], true: Colors.primary[500] }}
                thumbColor={Colors.white}
              />
            )}
            
            {renderSettingsItem(
              <Languages size={22} color={Colors.primary[600]} />,
              'Language',
              () => {}
            )}
          </View>
          
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Support</Text>
            
            {renderSettingsItem(
              <HelpCircle size={22} color={Colors.primary[600]} />,
              'Help Center',
              () => {}
            )}
            
            {renderSettingsItem(
              <Settings size={22} color={Colors.primary[600]} />,
              'About Us',
              () => {}
            )}
          </View>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <LogOut size={20} color={Colors.error[500]} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          
          <Text style={styles.versionText}>Version 1.0.0</Text>
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
  scrollContent: {
    paddingBottom: 24,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.neutral[800],
    fontFamily: 'Inter-Bold',
  },
  profileCard: {
    padding: 16,
    marginBottom: 24,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.neutral[600],
    fontFamily: 'Inter-Regular',
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: Colors.primary[50],
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary[600],
    fontFamily: 'Inter-Medium',
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.neutral[800],
    marginBottom: 12,
    fontFamily: 'Inter-SemiBold',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  settingsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsItemText: {
    flex: 1,
    fontSize: 16,
    color: Colors.neutral[800],
    fontFamily: 'Inter-Regular',
  },
  settingsRightElement: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.error[50],
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.error[100],
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.error[600],
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
  },
  versionText: {
    fontSize: 12,
    color: Colors.neutral[500],
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});