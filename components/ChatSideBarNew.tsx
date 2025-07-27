import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const DeenCircleSidebar = () => {
  // Sample chat data
  const recentChats = [
    { id: 1, title: "Is it allowed to pray in shoes?", time: "18:12" },
    { id: 2, title: "Is it allowed to pray in shoes?", time: "18:12" },
    { id: 3, title: "Is it allowed to pray in shoes?", time: "18:12" },
    { id: 4, title: "Is it allowed to pray in shoes?", time: "18:12" },
    { id: 5, title: "Is it allowed to pray in shoes?", time: "18:12" },
    { id: 6, title: "Is it allowed to pray in shoes?", time: "18:12" },
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

  return (
    <View style={styles.sidesheet}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DeenCircle</Text>
        <TouchableOpacity style={styles.closeButton}>
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
        <TouchableOpacity style={styles.profileCard}>
          <View style={styles.profileContent}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/40x40/cccccc/ffffff?text=AH' }}
              style={styles.profileImage}
            />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>Ali Haider</Text>
              <Text style={styles.profileLocation}>Marseille</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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