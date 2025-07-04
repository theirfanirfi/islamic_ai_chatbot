import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ProfileSection = ({ userName, onProfilePress }) => {
  return (
    <TouchableOpacity style={styles.profileSection} onPress={onProfilePress} activeOpacity={0.7}>
      <View style={styles.profileAvatar}>
        <Text style={styles.profileAvatarText}>{userName.charAt(0).toUpperCase()}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{userName}</Text>
        <Text style={styles.profileStatus}>Online</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
      profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileAvatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  profileStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
  },
})

export default ProfileSection;