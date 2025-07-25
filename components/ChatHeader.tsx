import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const MenuIcon = () => (
  <View style={styles.iconPlaceholder}>
    <Text style={styles.iconText}>☰</Text>
  </View>
);

export const ChatHeader = ({ onToggleSidebar, title = "Ihsan AI" }) => {
  return (
  <View style={styles.header}>
    <TouchableOpacity
      onPress={onToggleSidebar}
      style={styles.headerButton}
    >
      <MenuIcon />
    </TouchableOpacity>
    
    <Text style={styles.headerTitle}>{title || 'Ihsan AI'}</Text>
    
    <View style={styles.headerSpacer} />
  </View>
  );
};
const styles = StyleSheet.create({
     header: {
    position: 'absolute',
    top: 54,
    left: 24,
    right: 24,
    height: 42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    width: 42,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    color: '#1F1F1F',
    fontSize: 20,
    fontWeight: '500',
  },
  headerSpacer: {
    width: 42,
  },
    iconPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
    fontWeight: '600',
  },
})
export default ChatHeader;