import { IMessage } from '@/interfaces/IChatMessage';
import { reactToMessage } from "@/slice/ChatSlice";
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
const MessageBubble = ({ message, onReaction, onFeedback }: {message:IMessage, onReaction: any, onFeedback: any }) => {
const dispatch = useDispatch()
  const handleReaction = (newReaction: number) => {
    const finalReaction = message.reaction === newReaction ? 0 : newReaction;
        dispatch(reactToMessage({
          id: message.id,
          reaction: finalReaction
        }))
    // onReaction(message.id, finalReaction);
  };

  return (
     <View style={styles.bubbles}>
    {message.question != '' &&  <View style={styles.userBubbleContainer}>
                    <View style={styles.userBubble}>
                      <Text style={styles.userMessageText}>
                       { message.question}
                      </Text>
                    </View>
                  </View>
    }

      
      {message.answer != '' && (
        <>
          <View style={styles.aiBubbleContainer}>
              <View style={styles.aiIcon}>
                <Image source={require('../assets/images/icon.png')}  style={styles.iconShape} />
              </View>
              <View style={styles.aiBubbleWrapper}>
                <View style={styles.aiBubble}>
                  <Text style={styles.aiMessageText}>
                   {message.answer}
                  </Text>
                </View>
                <View style={styles.dateTag}>
                  <Text style={styles.dateText}>{message.created_at}</Text>
                </View>
              </View>
            </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, message.reaction === 1 && styles.actionButtonActive]}
            onPress={() => handleReaction(1)}
          >
            <Text style={[
              styles.actionButtonText,
              message.reaction === 1 && styles.actionButtonTextActive
            ]}>👍</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, message.reaction === 2 && styles.actionButtonActive]}
            onPress={() => handleReaction(2)}
          >
            <Text style={[
              styles.actionButtonText,
              message.reaction === 2 && styles.actionButtonTextActive
            ]}>👎</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.feedbackButton}
            onPress={() => onFeedback(message.id)}
          >
            <Text style={styles.feedbackButtonText}>Feedback</Text>
          </TouchableOpacity>
        </View>
        </>
      )
      
      }
      
      <Text style={styles.timestamp}>
        {new Date(message.created_at).toLocaleTimeString()}
      </Text>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 15,
    borderRadius: 20,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#667eea',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  },
  actionButtonActive: {
    backgroundColor: '#667eea',
  },
  actionButtonText: {
    fontSize: 14,
  },
  actionButtonTextActive: {
    color: '#fff',
  },
  feedbackButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#e9ecef',
  },
  feedbackButtonText: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '500',
  },
  timestamp: {
    fontSize: 11,
    color: '#999',
    marginTop: 5,
    alignSelf: 'flex-end',
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
    width: 60,
    height: 60,
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
});

export default MessageBubble;


