import { makeChatActive } from "@/slice/ChatSlice";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.8;

import ProfileSection from "@/components/ProfileSection";
import { resetAuthState } from "@/slice/UserSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";




// Settings Section Component
const SettingsSection = ({ onSettingsPress }) => {
  const settingsItems = [
    { id: 'Security', label: 'Security', icon: 'shield-outline' },
    { id: 'logout', label: 'Logout', icon: 'log-out' },
    { id: 'help', label: 'Help & Support', icon: 'help-circle-outline' },
  ];

  return (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>Settings</Text>
      {settingsItems.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.settingsItem}
          onPress={() => onSettingsPress(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name={item.icon} size={20} color="#666" />
          <Text style={styles.settingsItemText}>{item.label}</Text>
          <Ionicons name="chevron-forward" size={16} color="#ccc" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Main Sidebar Component
const ChatSidebar = ({ isVisible, onClose, currentChatId, onChatSelect }) => {
  const state = useSelector((state) => state.user);
  // const chatHistory = state.chats.chats
  // console.log('state',state);
  const userName = state?.user?.name // This would come from user context/state
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? 0 : -SIDEBAR_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const handleChatSelect = (chatId) => {
    dispatch(makeChatActive(chatId))
    // Navigate to chat or update current chat
    onChatSelect(chatId);
    onClose();
  };

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat = {
      id: newChatId,
      title: 'New Chat',
      lastMessage: 'Start a new conversation',
      timestamp: 'Now',
      isActive: true,
    };

    // dispatch(storeChats([
    //   { ...newChat },
    //   ...chatHistory.map(chat => ({ ...chat, isActive: false }))
    // ]));

    onChatSelect(newChatId);
    onClose();
  };

  const handleProfilePress = () => {
    router.push('/profile');
    onClose();
  };

  const handleSettingsPress = async (settingId) => {
    if (settingId == 'logout') {
      await AsyncStorage.removeItem('user')
      // await AsyncStorage.removeItem('walk')
      await dispatch(resetAuthState())
      router.replace("(auth)")

      //todo logout
    }
    // router.push(`/settings/${settingId}`);
    // onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.sidebarOverlay}>
        <TouchableOpacity
          style={styles.sidebarBackdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <Animated.View
          style={[
            styles.sidebarContainer,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <SafeAreaView style={styles.sidebarContent}>
            <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)" />

            {/* Header */}
            <View style={styles.sidebarHeader}>
              <Text style={styles.sidebarTitle}>AI Assistant</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Profile Section */}
            {userName &&
              <ProfileSection userName={userName} onProfilePress={handleProfilePress} />
            }

            {/* New Chat Button */}
            {/* <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
              <Ionicons name="add" size={20} color="#667eea" />
              <Text style={styles.newChatButtonText}>New Chat</Text>
            </TouchableOpacity> */}




            {/* Settings Section */}
            <SettingsSection onSettingsPress={handleSettingsPress} />

            {/* Footer */}
            <View style={styles.sidebarFooter}>
              <Text style={styles.footerText}>Version 1.0.0</Text>
            </View>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};



const styles = StyleSheet.create({
  // Sidebar Overlay and Container
  sidebarOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebarBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebarContainer: {
    width: SIDEBAR_WIDTH,
    backgroundColor: '#fff',
    elevation: 5,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  sidebarContent: {
    flex: 1,
  },

  // Sidebar Header
  sidebarHeader: {
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  closeButton: {
    padding: 5,
  },



  // New Chat Button
  newChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f0f2ff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#667eea',
  },
  newChatButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#667eea',
  },

  // Settings Section
  settingsSection: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 5,
  },
  settingsItemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },

  // Sidebar Footer
  sidebarFooter: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});

export default ChatSidebar;