import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const IhsanChatScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* First Message Bubble Group */}
          <View style={styles.bubbles}>
            {/* User Message */}
            <View style={styles.userBubbleContainer}>
              <View style={styles.userBubble}>
                <Text style={styles.userMessageText}>
                  Discover a powerful dua each day with meaning and context.
                </Text>
              </View>
            </View>

            {/* AI Response */}
            <View style={styles.aiBubbleContainer}>
              <View style={styles.aiIcon}>
                <View style={styles.iconShape} />
              </View>
              <View style={styles.aiBubbleWrapper}>
                <View style={styles.aiBubble}>
                  <Text style={styles.aiMessageText}>
                    Discover a powerful dua each day with meaning and context.
                  </Text>
                </View>
                <View style={styles.dateTag}>
                  <Text style={styles.dateText}>May 13, 2025</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Second Message Bubble Group */}
          <View style={styles.bubbles}>
            {/* User Message */}
            <View style={styles.userBubbleContainer}>
              <View style={styles.userBubble}>
                <Text style={styles.userMessageText}>
                  Discover a powerful dua each day with meaning and context.
                </Text>
              </View>
            </View>

            {/* AI Thinking Response */}
            <View style={styles.aiBubbleContainer}>
              <View style={styles.aiIcon}>
                <View style={styles.iconShape} />
              </View>
              <View style={styles.thinkingBubble}>
                <View style={styles.thinkingIcon} />
                <Text style={styles.thinkingText}>Thinking...</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="What's on your mind?"
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6F0',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 120,
    gap: 28,
  },
  bubbles: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 366,
    gap: 12,
  },
  userBubbleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
    gap: 10,
  },
  userBubble: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: 294,
    backgroundColor: '#BFD8B8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    borderRadius: 20,
    borderBottomRightRadius: 0,
  },
  userMessageText: {
    flex: 1,
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: '#1F1F1F',
  },
  aiBubbleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    gap: 6,
  },
  aiIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconShape: {
    width: 32,
    height: 32,
    backgroundColor: '#89A688',
    borderRadius: 16,
  },
  aiBubbleWrapper: {
    flex: 1,
  },
  aiBubble: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: 249,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
  },
  aiMessageText: {
    flex: 1,
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: '#484848',
  },
  dateTag: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 99,
    height: 32,
    backgroundColor: '#FFF8E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  dateText: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    color: '#CBB26A',
  },
  thinkingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: 294,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    gap: 6,
  },
  thinkingIcon: {
    width: 24,
    height: 20,
    backgroundColor: '#E9A717',
    borderRadius: 4,
  },
  thinkingText: {
    fontFamily: 'Plus Jakarta Sans',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: '#578F4A',
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8F6F0',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    maxHeight: 100,
    paddingVertical: 0,
  },
  sendButton: {
    marginLeft: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#89A688',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});