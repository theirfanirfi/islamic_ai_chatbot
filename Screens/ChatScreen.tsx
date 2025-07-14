import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ChatSidebar from '@/components/ChatSideBar';
import FeedbackModal from '@/components/FeedbackModal';
import MessageBubble from '@/components/MessageBubble';
import TypingIndicator from '@/components/TypingIndicator';
import { useChat } from '@/hooks/useChat';
import { useFeedback } from '@/hooks/useFeedback';
import React from 'react';
import { FlatList, KeyboardAvoidingView, StatusBar, StyleSheet, Text, View } from 'react-native';

const ChatScreen = ({ toggleSidebar, isVisible, hideSidebar, currentChatId, handleChatSelect, currentChatTitle }) => {
  const {
    messages,
    inputText,
    setInputText,
    isLoading,
    flatListRef,
    sendMessage,
    updateMessageReaction,
    handleFeedbackSubmit
  } = useChat(currentChatId);

  const {
    visible: feedbackVisible,
    feedback,
    setFeedback,
    selectedFlags,
    showFeedback,
    hideFeedback,
    toggleFlag,
    submitFeedback
  } = useFeedback(handleFeedbackSubmit);

  return (
    <>
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      <ChatHeader onToggleSidebar={toggleSidebar} title={currentChatTitle} />

      <FlatList
        ref={flatListRef}
        data={messages.chats}
        extraData={messages.chats}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        showsVerticalScrollIndicator={false}

        renderItem={({ item }) => {
          
          if(item.answer != ''){
          return(
          <MessageBubble
            message={item}
            onReaction={updateMessageReaction}
            onFeedback={showFeedback}
          />
        )
      }else {
        return (
        <View style={[
      styles.containerMsg,
      styles.botMessage
    ]}>
      <Text style={[
        styles.text,
        styles.botText
      ]}>
        {messages.limit_message}
      </Text>
      </View>
        )
      }
      
      }
      }
      />

      {isLoading && <TypingIndicator />}

      <ChatInput
        value={inputText}
        onChangeText={setInputText}
        onSend={sendMessage}
        disabled={isLoading}
      />

      <FeedbackModal
        visible={feedbackVisible}
        onClose={hideFeedback}
        feedback={feedback}
        setFeedback={setFeedback}
        selectedFlags={selectedFlags}
        toggleFlag={toggleFlag}
        onSubmit={submitFeedback}
      />

      <ChatSidebar
        isVisible={isVisible}
        onClose={hideSidebar}
        currentChatId={currentChatId}
        onChatSelect={handleChatSelect}
      />
    </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  containerMsg: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 15,
    borderRadius: 20,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF7F7F',
    elevation: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    color: "white"
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
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
  }
});

export default ChatScreen;