import dummyMessages from '@/data/dummyChat';
import { IChatState } from '@/interfaces/IChatMessage';
import { createSlice } from '@reduxjs/toolkit';


const initialState: IChatState = {
  chats: dummyMessages
};

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    storeChats: (state, action) => {
      console.log('before', state.chats.length, action)
      // let newMessage: IMessage = action.payload
      // let messages: IMessage = {
      //   ...state.chats,
      //   newMessage,
      // }
      state.chats.push(action.payload);
      // state.chats = messages
      console.log('after', state.chats.length)
    },
    makeChatActive: (state, action) => {
      // console.log('makeChatActive', action)
      // let chat = state.chats.find(chat => chat.id == action.payload)

      state.chats = state.chats.map(chat => ({
        ...chat,
        isActive: chat.id === action.payload,
      }))
    },
    updateChatMessageResponse: (state, action) => {
      // state.chats = state.chats.map(chat => ({
      //     ...chat,
      //     response: chat.id === action.payload.id ? action.payload.response : chat.response
      //   }))
      const chat = state.chats.find(chat => chat.id === action.payload.id);
      if (chat) {
        chat.response = action.payload.response;
      }
      console.log('message updated')
    },
    reactToMessage: (state, action) => {
      // console.log('chats before', state.chats)
      //     state.chats= state.chats.map(chat => ({
      //   ...chat,
      //   reaction: chat.id === action.payload.id && action.payload.reaction,
      // }))

      const chat = state.chats.find(chat => chat.id === action.payload.id);
      if (chat) {
        chat.reaction = action.payload.reaction;
      }
      // console.log('chats after', state.chats)


    }
  },
});

export const { storeChats, makeChatActive, reactToMessage, updateChatMessageResponse } = chatSlice.actions;
export default chatSlice.reducer;