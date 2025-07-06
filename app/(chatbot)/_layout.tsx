import { useSidebar } from "@/hooks/useSidebar";
import ChatScreen from "@/screens/ChatScreen";
import React from 'react';

const ChatbotApp = () => {
  // const [showWalkthrough, setShowWalkthrough] = useState(true);
  const { isVisible, currentChatId, hideSidebar, toggleSidebar, handleChatSelect, currentChatTitle } = useSidebar();

  // const handleWalkthroughComplete = () => {
  //   setShowWalkthrough(false);
  // };

  // if (showWalkthrough) {
  //   return <WalkthroughScreen onComplete={handleWalkthroughComplete} />;
  // }

  return (
    <ChatScreen 
      toggleSidebar={toggleSidebar}
      isVisible={isVisible}
      hideSidebar={hideSidebar}
      currentChatId={currentChatId}
      handleChatSelect={handleChatSelect}
      currentChatTitle={currentChatTitle}
    />
  );
};

export default ChatbotApp;