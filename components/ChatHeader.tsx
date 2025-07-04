import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ChatHeader = ({ onToggleSidebar, title = "AI Assistant" }) => {
  return (
    <View style={styles.chatHeader}>
      <TouchableOpacity onPress={onToggleSidebar} style={styles.menuButton}>
        <Ionicons name="menu" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.chatHeaderTitle}>{title}</Text>
      <View style={styles.chatHeaderRight}>
        <View style={styles.statusIndicator}>
          <View style={styles.onlineIndicator} />
          <Text style={styles.statusText}>Online</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
      chatHeader: {
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuButton: {
    padding: 5,
    marginRight: 10,
  },
  chatHeaderTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  chatHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
  },
})
export default ChatHeader;