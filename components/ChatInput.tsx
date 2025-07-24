import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SendIcon = ({ color = "#484848" }) => (
  <View style={styles.iconPlaceholder}>
    <Text style={[styles.iconText, { color }]}>→</Text>
  </View>
);

const ChatInput = ({ value, onChangeText, onSend, disabled }) => {
  return (
  <View style={styles.inputContainer}>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder="What's on your mind?"
        placeholderTextColor="#262626"
        editable={!disabled}
        multiline
        onSubmitEditing={onSend}
        returnKeyType="send"
      />
    </View>
    
    <TouchableOpacity 
      onPress={onSend}
      disabled={disabled || !value.trim()}
      style={[styles.sendButton, (disabled || !value.trim()) && styles.sendButtonDisabled]}
    >
      <View style={[styles.sendIconContainer, (disabled || !value.trim()) ? styles.sendIconDisabled : styles.sendIconActive]}>
        <SendIcon color={disabled || !value.trim() ? "#484848" : "white"} />
      </View>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
    inputContainer: {
    position: 'absolute',
    bottom: 21,
    left: 24,
    right: 24,
    flexDirection: 'row',
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
   textInput: {
    fontSize: 16,
    color: '#262626',
  },
    sendButton: {
    width: 56,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIconDisabled: {
    backgroundColor: '#F8F8F8',
  },
  sendIconActive: {
    backgroundColor: '#6D9F61',
  },
  iconPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ChatInput;
