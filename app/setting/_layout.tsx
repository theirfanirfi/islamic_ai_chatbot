import { resetAuthState } from '@/slice/UserSlice';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
const { width, height } = Dimensions.get('window');


// Icon components (you'll need to install react-native-vector-icons or use your preferred icon library)
const UserIcon = () => (
  <View style={styles.iconPlaceholder}>
    <Text style={styles.iconText}>👤</Text>
  </View>
);

const ProtectIcon = () => (
  <View style={styles.iconPlaceholder}>
    <Text style={styles.iconText}>🛡️</Text>
  </View>
);

const SupportIcon = () => (
  <View style={styles.iconPlaceholder}>
    <Text style={styles.iconText}>🎧</Text>
  </View>
);

const LogoutIcon = () => (
  <View style={styles.iconPlaceholder}>
    <Text style={styles.iconText}>🚪</Text>
  </View>
);

const ArrowRightIcon = () => (
  <Text style={styles.arrowIcon}>›</Text>
);

const MenuIcon = () => (
  <Text style={styles.menuIcon}>☰</Text>
);

const SettingItem = ({ title, onPress, showArrow = true }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <Text style={styles.settingItemText}>{title}</Text>
    {showArrow && <ArrowRightIcon />}
  </TouchableOpacity>
);

const SettingsScreen = () => {
    const router = useRouter();
    const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F6F1" />
      
      {/* Background shapes */}
      <BlurView style={styles.backgroundShape1} />
      <BlurView style={styles.backgroundShape2} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.backButton} onPress={() => {
            router.dismiss();
          }}>
            <Ionicons name="arrow-back" size={16} color="#1F1F1F" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DeenCircle</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <UserIcon />
            </View>
            <Text style={styles.cardTitle}>Account</Text>
          </View>
          <View style={styles.cardContent}>
            <SettingItem title="Edit Profile" />
            <SettingItem title="Change Password" />
          </View>
        </View>

        {/* Privacy & Security Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <ProtectIcon />
            </View>
            <Text style={styles.cardTitle}>Privacy & Security</Text>
          </View>
          <View style={styles.cardContent}>
            <SettingItem title="Privacy Policy" onPress={()=>router.push('privacy')} />
            <SettingItem title="Terms & Conditions" />
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <SupportIcon />
            </View>
            <Text style={styles.cardTitle}>Support</Text>
          </View>
          <View style={styles.cardContent}>
            <SettingItem title="Contact Us" />
            <SettingItem title="Send Feedback" onPress={()=>router.push('feedback')} />
          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.logoutCard}>
          <TouchableOpacity style={styles.logoutContent} onPress={ async() => {

                  await AsyncStorage.removeItem('user')
      // await AsyncStorage.removeItem('walk')
      await dispatch(resetAuthState())
      router.replace("(auth)")
          }}>
            <View style={styles.logoutLeft}>
              <View style={styles.logoutIconContainer}>
                <LogoutIcon />
              </View>
              <Text style={styles.logoutText}>Logout</Text>
            </View>
            <ArrowRightIcon />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F1',
  },
  backgroundShape1: {
    position: 'absolute',
    width: width * 0.95,
    height: height * 0.3,
    top: height * 0.1,
    backgroundColor: 'hsla(41, 100%, 56%, 0.04)',
    borderRadius: 50,
    marginHorizontal: width * 0.025,
  },
  backgroundShape2: {
    position: 'absolute',
    width: width * 0.95,
    height: height * 0.3,
    bottom: 12,
    backgroundColor: 'rgba(255, 184, 29, 0.04)',
    borderRadius: 50,
    marginHorizontal: width * 0.025, // 2.5% margin on both sides
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 10,
  },
    profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
    backButton: {
    width: 42,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontFamily: 'Plus Jakarta Sans', // Make sure to add this font to your project
    fontSize: 20,
    fontWeight: '500',
    color: '#121212',
    lineHeight: 24,
  },
  menuButton: {
    width: 42,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  menuIcon: {
    fontSize: 20,
    color: '#121212',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 20,
    shadowColor: 'rgba(87, 143, 74, 0.12)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(137, 166, 136, 0.06)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconPlaceholder: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,
  },
  cardTitle: {
    fontFamily: 'Lora', // Make sure to add this font to your project
    fontSize: 16,
    fontWeight: '500',
    color: '#1F1F1F',
    lineHeight: 20,
  },
  cardContent: {
    gap: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  settingItemText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,
    fontWeight: '400',
    color: '#262626',
    lineHeight: 18,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#1F1F1F',
    fontWeight: 'bold',
  },
  logoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 20,
    shadowColor: 'rgba(87, 143, 74, 0.12)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  logoutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutIconContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(137, 166, 136, 0.06)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutText: {
    fontFamily: 'Plus Jakarta Sans',
    fontSize: 14,
    fontWeight: '400',
    color: '#FF3535',
    lineHeight: 18,
  },
  homeIndicator: {
    width: 139,
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 8,
  },
});

export default SettingsScreen;