import { makeChatActive } from "@/slice/ChatSlice";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';

import {
  Animated,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.8;

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
  const userName = state?.user?.full_name // This comes from user context/state
  console.log('sidebar userName', state);
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const router = useRouter();
  const dispatch = useDispatch();


    const recentChats = [
    { id: 1, title: "🌙 Is it allowed to pray in shoes?", time: "18:12" },
    { id: 2, title: "🌙 Is it allowed to pray in shoes?", time: "18:12" },
    { id: 3, title: "🌙 Is it allowed to pray in shoes?", time: "18:12" },
    { id: 4, title: "🌙 Is it allowed to pray in shoes?", time: "18:12" },
    { id: 5, title: "🌙 Is it allowed to pray in shoes?", time: "18:12" },
    { id: 6, title: "🌙 Is it allowed to pray in shoes?", time: "18:12" },
  ];

    const renderChatItem = (chat) => (
      <TouchableOpacity key={chat.id} style={styles.chatCard}>
        <View style={styles.chatTextContainer}>
          <Text style={styles.chatTitle} numberOfLines={2}>
            {chat.title}
          </Text>
        </View>
        <View style={styles.chatMeta}>
          <Text style={styles.chatTime}>{chat.time}</Text>
          <TouchableOpacity style={styles.menuButton}>
            <View style={styles.menuDot} />
            <View style={styles.menuDot} />
            <View style={styles.menuDot} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );

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
    <View style={styles.sidesheet}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DeenCircle</Text>
        <TouchableOpacity style={styles.closeButton} onPress={()=>onClose()}>
          <Text style={styles.closeIcon}>×</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.container}>
          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>✏</Text>
              </View>
              <Text style={styles.actionText}>New Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <View style={styles.actionIcon}>
                <Text style={styles.actionIconText}>🔍</Text>
              </View>
              <Text style={styles.actionText}>Search Chats</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Chats Section */}
          <View style={styles.recentChatsContainer}>
            <Text style={styles.sectionTitle}>Recent Chats</Text>
            <ScrollView 
              style={styles.chatsList} 
              showsVerticalScrollIndicator={false}
            >
              {recentChats.map(renderChatItem)}
            </ScrollView>
          </View>
        </View>

        {/* User Profile Card */}
        <TouchableOpacity style={styles.profileCard} onPress={() => {
          onClose();
          router.push('setting');
        }}>
          <View style={styles.profileContent}>
            <Image 
              source={{ uri: `https://ui-avatars.com/api/?name=${userName}` }}
              style={styles.profileImage}
            />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>{userName}</Text>
              <Text style={styles.profileLocation}>Setting & Privacy</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
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

   sidesheet: {
    width: 310,
    height: '100%',
    backgroundColor: '#F8F6F1',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 270,
    height: 42,
    alignSelf: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 24,
    color: '#1F1F1F',
  },
  closeButton: {
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
  closeIcon: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    gap: 24,
  },
  actionButtonsContainer: {
    gap: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    gap: 8,
  },
  actionIcon: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconText: {
    fontSize: 16,
    color: '#1F1F1F',
  },
  actionText: {
    fontFamily: 'Lora',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    color: '#1F1F1F',
  },
  recentChatsContainer: {
    flex: 1,
    gap: 12,
  },
  sectionTitle: {
    fontFamily: 'Lora',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    color: '#1F1F1F',
  },
  chatsList: {
    flex: 1,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 12,
    height: 76,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#FFB81D',
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  },
  chatTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  chatTitle: {
    fontFamily: 'Lora',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    color: '#1F1F1F',
  },
  chatMeta: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 44,
    width: 28,
    gap: 12,
  },
  chatTime: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'right',
    color: '#484848',
  },
  menuButton: {
    width: 16,
    height: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  menuDot: {
    width: 2,
    height: 2,
    backgroundColor: '#1F1F1F',
    borderRadius: 1,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 12,
    height: 66,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CCCCCC',
  },
  profileText: {
    gap: 4,
  },
  profileName: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    color: '#1F1F1F',
  },
  profileLocation: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: '#484848',
  },
});

export default ChatSidebar;