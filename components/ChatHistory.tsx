import { ScrollView, StyleSheet, Text, View } from "react-native"
import ChatHistoryItem from "./ChatHistoryItem"

const chatHistory = ({chatHistory: []}) => {
  
return (
<View style={styles.chatHistorySection}>
              <Text style={styles.sectionTitle}>Recent Chats</Text>
              <ScrollView style={styles.chatHistoryList} showsVerticalScrollIndicator={false}>
                {chatHistory.map(chat => (
                  <ChatHistoryItem
                    key={chat.id}
                    chat={chat}
                    onSelect={handleChatSelect}
                    isActive={chat.isActive}
                  />
                ))}
              </ScrollView>
            </View> 
)
}
const styles = StyleSheet.create({
      chatHistorySection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  chatHistoryList: {
    flex: 1,
  },
})
export default chatHistory;
