import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ChatSidebar from '@/components/ChatSideBar';
import FeedbackModal from '@/components/FeedbackModal';
import MessageBubble from '@/components/MessageBubble';
import TypingIndicator from '@/components/TypingIndicator';
import { useChat } from '@/hooks/useChat';
import { useFeedback } from '@/hooks/useFeedback';
import React from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      <ChatHeader onToggleSidebar={toggleSidebar} title={currentChatTitle} />

      <FlatList
        ref={flatListRef}
        data={messages.chats}
        extraData={messages.chats}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        showsVerticalScrollIndicator={false}

        renderItem={({ item }) => (
          <MessageBubble
            message={item}
            onReaction={updateMessageReaction}
            onFeedback={showFeedback}
          />
        )}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
});

export default ChatScreen;