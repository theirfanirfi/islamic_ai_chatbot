import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ChatSidebar from '@/components/ChatSideBar';
import FeedbackModal from '@/components/FeedbackModal';
import MessageBubble from '@/components/MessageBubble';
import { useChat } from '@/hooks/useChat';
import { useFeedback } from '@/hooks/useFeedback';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSelector } from 'react-redux';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');





const CloseIcon = () => (
  <Text style={[styles.iconText, { fontSize: 24 }]}>×</Text>
);




const TypingIndicator = () => {
  const [dots] = useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]);

  useEffect(() => {
    const animations = dots.map((dot, index) => 
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 500,
            delay: index * 200,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      )
    );

    animations.forEach(animation => animation.start());

    return () => animations.forEach(animation => animation.stop());
  }, []);

  return (
    <View style={styles.typingContainer}>
      <View style={styles.typingBubble}>
        <View style={styles.typingDots}>
          {dots.map((dot, index) => (
            <Animated.View
              key={index}
              style={[
                styles.typingDot,
                {
                  opacity: dot,
                  transform: [{
                    translateY: dot.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -5]
                    })
                  }]
                }
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};


const FeatureCard = ({ icon, title, description, isLarge = false }) => (
  <View style={[styles.featureCard, isLarge && styles.featureCardLarge]}>
    <View style={styles.featureHeader}>
      <View style={styles.featureIcon}>
        <Text style={styles.featureIconText}>{icon}</Text>
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
    </View>
    <Text style={styles.featureDescription}>{description}</Text>
  </View>
);

const WelcomeScreen = () => {
  const user = useSelector((state) => state.user);
  console.log('WelcomeScreen user:', user);
  
  return (
  <View style={styles.welcomeContainer}>
    <View style={styles.greetingSection}>
      <Text style={styles.greetingText}>
        Assalamu alaikum{'\n'}
        <Text style={styles.greetingName}>{user.user.full_name}!</Text>
      </Text>
      <Text style={styles.greetingSubtext}>
        How can I help you today?
      </Text>
    </View>

    <View style={styles.cardsContainer}>
      <FeatureCard
        icon="🧠"
        title="Ask Ihsan AI"
        description="Get quick answers to your questions about Islam, prayer, Quran, Hadith, daily life, and spirituality. Ask about your practice and get answers verified by scholars."
        isLarge={true}
      />
      
      <View style={styles.rightCards}>
        <FeatureCard
          icon="🤲"
          title="Daily Dua"
          description="Discover a powerful dua each day."
        />
        <FeatureCard
          icon="📖"
          title="Daily Verse"
          description="Read and reflect on a selected verse."
        />
      </View>
    </View>
  </View>
);
}

// Main ChatScreen Component
const IhsanAIChatScreen = ({ toggleSidebar, isVisible, hideSidebar, currentChatId, handleChatSelect, currentChatTitle }) => {

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

  const scrollToBottom = () => {
    if (flatListRef.current && messages.chats.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

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



  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  

  const hasMessages = messages.chats && messages.chats.length > 0;

  const renderMessage = ({ item }) => {
    if (item.answer !== '' || item.type === 'user') {
      return (
        <MessageBubble
          message={item}
          onReaction={updateMessageReaction}
          onFeedback={showFeedback}
        />
      );
    } else {
      return (
        <View style={styles.messageContainer}>
          <View style={[styles.messageBubble, styles.errorMessage]}>
            <Text style={styles.errorMessageText}>
              {messages.limit_message || 'Message limit reached'}
            </Text>
          </View>
        </View>
      );
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      
      {/* Background Effects */}
      <View style={styles.backgroundBlur1} />
      <View style={styles.backgroundBlur2} />

      {/* Header */}
      <ChatHeader onToggleSidebar={toggleSidebar} title={currentChatTitle} />

      {/* Content Area */}
      <View style={styles.contentArea}>
        {!hasMessages ? (
          <ScrollView style={styles.welcomeScrollView}>
            <WelcomeScreen />
          </ScrollView>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages.chats}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            style={styles.messagesList}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={isLoading ? <TypingIndicator /> : null}
            onContentSizeChange={scrollToBottom}
          />
        )}
      </View>

      {/* Input Area */}
      <ChatInput
        value={inputText}
        onChangeText={setInputText}
        onSend={sendMessage}
        disabled={isLoading}
      />

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />

      {/* Modals */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 414,
    height: 896,
    backgroundColor: '#F8F6F1',
    borderRadius: 32,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  backgroundBlur1: {
    position: 'absolute',
    width: 470,
    height: 276,
    left: (414 - 470) / 2,
    top: 78,
    backgroundColor: 'rgba(255, 184, 29, 0.24)',
    borderRadius: 235,
  },
  backgroundBlur2: {
    position: 'absolute',
    width: 470,
    height: 276,
    left: (414 - 470) / 2 + 8,
    top: 710,
    backgroundColor: 'rgba(255, 184, 29, 0.12)',
    borderRadius: 235,
  },
  statusBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 54,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  timeText: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signalBars: {
    flexDirection: 'row',
    gap: 2,
  },
  signalBar: {
    width: 3,
    height: 6,
    backgroundColor: '#000000',
    borderRadius: 1,
  },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 2,
    position: 'relative',
  },
  batteryLevel: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    backgroundColor: '#000000',
    borderRadius: 1,
  },
  batteryCap: {
    position: 'absolute',
    right: -2,
    top: 3,
    width: 1,
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 1,
  },
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
  contentArea: {
    position: 'absolute',
    top: 110,
    bottom: 90,
    left: 0,
    right: 0,
  },
  welcomeScrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  welcomeContainer: {
    flex: 1,
  },
  greetingSection: {
    marginTop: 32,
    marginBottom: 32,
  },
  greetingText: {
    color: '#484848',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    marginBottom: 12,
  },
  greetingName: {
    color: '#6D9F61',
  },
  greetingSubtext: {
    color: '#484848',
    fontSize: 20,
    lineHeight: 24,
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#6D9F61',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
    height: 108,
  },
  featureCardLarge: {
    flex: 1,
    height: 224,
  },
  rightCards: {
    flex: 1,
    gap: 8,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  featureIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(137, 166, 136, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIconText: {
    fontSize: 16,
  },
  featureTitle: {
    color: '#1F1F1F',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  featureDescription: {
    color: '#484848',
    fontSize: 14,
    lineHeight: 18,
    flex: 1,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  botMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 16,
    borderRadius: 20,
  },
  userMessage: {
    backgroundColor: '#6D9F61',
  },
  botMessage: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  errorMessage: {
    backgroundColor: '#FF7F7F',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  botMessageText: {
    color: '#333333',
  },
  errorMessageText: {
    color: '#FFFFFF',
  },
  reactionContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  reactionButton: {
    padding: 4,
    borderRadius: 12,
  },
  typingContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  typingBubble: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  typingDots: {
    flexDirection: 'row',
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    backgroundColor: '#6D9F61',
    borderRadius: 4,
  },
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
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: (414 - 139) / 2,
    width: 139,
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    borderRadius: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 24,
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  feedbackInput: {
    height: 96,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#666666',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#6D9F61',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sidebarOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebarBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidebarContent: {
    width: 320,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  sidebarBody: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyChatText: {
    color: '#666666',
    fontSize: 16,
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

export default IhsanAIChatScreen;