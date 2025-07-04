import { IMessage } from '@/interfaces/IChatMessage';
import { reactToMessage } from "@/slice/ChatSlice";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    <>
    {message.question != '' && <View style={[
      styles.container,
      styles.userMessage
    ]}>
      <Text style={[
        styles.text,
        styles.userText
      ]}>
        {message.question}
      </Text>
      </View>}

      
      {message.response != '' && (
        <>
        <View style={[
      styles.container,
      styles.botMessage
    ]}>
      <Text style={[
        styles.text,
        styles.botText
      ]}>
        {message.response}
      </Text>
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
        {new Date(message.timestamp).toLocaleTimeString()}
      </Text>
    </>

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
});

export default MessageBubble;
