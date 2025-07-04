import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    chats: [
        {
    id: '1',
    title: 'React Native Help',
    lastMessage: 'How to implement navigation?',
    timestamp: '2 hours ago',
    isActive: true,
  },
  {
    id: '2',
    title: 'JavaScript Questions',
    lastMessage: 'Explain async/await',
    timestamp: '1 day ago',
    isActive: false,
  },
  {
    id: '3',
    title: 'UI Design Discussion',
    lastMessage: 'Best practices for mobile UI',
    timestamp: '3 days ago',
    isActive: false,
  },
  {
    id: '4',
    title: 'API Integration',
    lastMessage: 'REST vs GraphQL comparison',
    timestamp: '1 week ago',
    isActive: false,
  },
  {
    id: '5',
    title: 'Database Design',
    lastMessage: 'MongoDB vs PostgreSQL',
    timestamp: '2 weeks ago',
    isActive: false,
  }
    ],
  },
  reducers: {
    storeChats: (state, action) => {
      state.chats = action.payload;
    },
    makeChatActive: (state, action) => {
      // console.log('makeChatActive', action)
      // let chat = state.chats.find(chat => chat.id == action.payload)

      state.chats = state.chats.map(chat => ({
          ...chat,
          isActive: chat.id === action.payload,
        }))
    }
  },
});

export const { storeChats, makeChatActive } = chatSlice.actions;
export default chatSlice.reducer;