import { IChatState } from '@/interfaces/IChatMessage';
import { fetchUserChats, sendMessage as sendingMessageThunk } from '@/slice/ChatSlice';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


export const useChat = (currentChatId) => {
  // const [messages, setMessages] = useState([]);
  var messages: IChatState = useSelector((state) => state.chats)
  // const isLimitReached: boolean = useSelector((state) => state.chats)

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);
  const dispatch = useDispatch();


  useEffect(() => {
    loadChatHistory(currentChatId);
  }, [currentChatId]);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
    console.log('useEffect called');
  }, [messages]);

  //todo: first display question, then look for response and display the response as bot.
  const loadChatHistory = (chatId) => {
    dispatch(fetchUserChats())
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    // const userMessage: IMessage = {
    //   id: Date.now().toString(),
    //   question: inputText.trim(),
    //   answer: '',
    //   created_at: Date.now().toString(),
    //   flags: [],
    //   feedback: "",
    //   user_id: '1',
    //   reaction: 0
    // };
    let result = await dispatch(sendingMessageThunk(inputText));
    if(sendingMessageThunk.fulfilled.match(result)){
      // dispatch(storeChats(result))
    }
    setIsLoading(true);
    try {
      //  setIsLoading(true);
    // setTimeout(()=>{
    //   dispatch(updateChatMessageResponse({
    //     id: userMessage.id,
    //     response: "Islamic AI assistant is thinking....."
    //   }))

    // }, 4000)
    }catch(e){
       setIsLoading(false);
    }finally{
       setIsLoading(false);
    setInputText('');
    }

    // setIsLoading(true);

    try {
      const response = await ChatService.getChatbotResponse(inputText.trim());
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        type: 'bot',
        timestamp: Date.now(),
        reaction: null
      };
      
      // setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble responding right now. Please try again.",
        type: 'bot',
        timestamp: Date.now(),
        reaction: null
      };
      // setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMessageReaction = (messageId:string, reaction: number) => {
    // dispatch(reactToMessage({
    //   id: messageId,
    //   reaction: reaction
    // }))
    // setMessages(prev =>
    //   prev.map(msg =>
    //     msg.id === messageId ? { ...msg, reaction } : msg
    //   )
    // );
  };

  const handleFeedbackSubmit = (feedbackData) => {
    console.log('Feedback submitted:', feedbackData);
    Alert.alert('Thank you!', 'Your feedback has been submitted and will help improve our AI.');
  };

  return {
    messages,
    inputText,
    setInputText,
    isLoading,
    flatListRef,
    sendMessage,
    updateMessageReaction,
    handleFeedbackSubmit
  };
};
