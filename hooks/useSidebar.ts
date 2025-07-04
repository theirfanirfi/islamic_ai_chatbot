import { useState } from "react";
import { useSelector } from "react-redux";

export const useSidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentChatId, setCurrentChatId] = useState('1');
  const [currentChatTitle, setCurrentChatTitle] = useState("Islamic AI Assistant");
  const chats = useSelector((state) => state.chats.chats)

  const showSidebar = () => setIsVisible(true);
  const hideSidebar = () => setIsVisible(false);
  const toggleSidebar = () => setIsVisible(!isVisible);

  const handleChatSelect = (chatId) => {
    let chat = chats.find(chat => chat.id == chatId);
    setCurrentChatId(chatId);
    setCurrentChatTitle(chat?.title);
    
  };

  return {
    isVisible,
    currentChatId,
    showSidebar,
    hideSidebar,
    toggleSidebar,
    handleChatSelect,
    currentChatTitle,
  };
};
