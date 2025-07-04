import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ChatHistoryItem = ({ chat, onSelect, isActive }) => {
  return (
    <TouchableOpacity
      style={[styles.chatItem, isActive && styles.chatItemActive]}
      onPress={() => onSelect(chat.id)}
      activeOpacity={0.7}
    >
      <View style={styles.chatItemContent}>
        <Text style={[styles.chatTitle, isActive && styles.chatTitleActive]} numberOfLines={1}>
          {chat.title}
        </Text>
        <Text style={[styles.chatLastMessage, isActive && styles.chatLastMessageActive]} numberOfLines={1}>
          {chat.lastMessage}
        </Text>
        <Text style={[styles.chatTimestamp, isActive && styles.chatTimestampActive]}>
          {chat.timestamp}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.chatOptionsButton}
        onPress={() => {/* Handle chat options */}}
      >
        <Ionicons name="ellipsis-horizontal" size={16} color="#666" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 5,
  },
  chatItemActive: {
    backgroundColor: '#667eea',
  },
  chatItemContent: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  chatTitleActive: {
    color: '#fff',
  },
  chatLastMessage: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  chatLastMessageActive: {
    color: 'rgba(255,255,255,0.8)',
  },
  chatTimestamp: {
    fontSize: 11,
    color: '#999',
  },
  chatTimestampActive: {
    color: 'rgba(255,255,255,0.6)',
  },
  chatOptionsButton: {
    padding: 8,
  },
})

export default ChatHistoryItem;