import API_BASE_URL from '@/constants/URLs';
import { IChatState } from '@/interfaces/IChatMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// Helper function to get auth token
const getAuthToken = async () => {
  try {
      const jsonValue = await AsyncStorage.getItem('user');
      if(jsonValue != null){
        let jsonValuee = await JSON.parse(jsonValue)
        return jsonValuee.payload.token
      }
    
      return null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// Async thunk for sending a message
export const sendMessage = createAsyncThunk(
  'chats/sendMessage',
  async (message: string, { rejectWithValue }) => {
    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await fetch(`${API_BASE_URL}/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error('API request failed');
      }

      return data.chat;
    } catch (error) {
      console.error('Send message error:', error);
      return rejectWithValue(error.message || 'Failed to send message');
    }
  }
);

// Async thunk for fetching all user chats
export const fetchUserChats = createAsyncThunk(
  'chats/fetchUserChats',
  async (_, { rejectWithValue }) => {
    try {
      const token = await getAuthToken();
      console.log('inside auth',token);

      if (!token) {
        throw new Error('No auth token found');
      }

      const response = await fetch(`${API_BASE_URL}/chat/user`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': "application/json"
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error('API request failed');
      }

      return data.chats;
    } catch (error) {
      console.error('Fetch chats error:', error);
      return rejectWithValue(error.message || 'Failed to fetch chats');
    }
  }
);

// Extended initial state to include loading and error states
const initialState: IChatState & {
  loading: boolean;
  error: string | null;
  sendingMessage: boolean;
} = {
  chats: [],
  loading: false,
  error: null,
  sendingMessage: false,
};

const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    storeChats: (state, action) => {
      console.log('before', state.chats.length, action);
      state.chats.push(action.payload);
      console.log('after', state.chats.length);
    },
    updateChatMessageResponse: (state, action) => {
      const chat = state.chats.find(chat => chat.id === action.payload.id);
      if (chat) {
        chat.answer = action.payload.response;
      }
      console.log('message updated');
    },
    reactToMessage: (state, action) => {
      const chat = state.chats.find(chat => chat.id === action.payload.id);
      if (chat) {
        chat.reaction = action.payload.reaction;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    clearChats: (state) => {
      state.chats = [];
    },
  },
  extraReducers: (builder) => {
    // Send message cases
    builder
      .addCase(sendMessage.pending, (state) => {
        state.sendingMessage = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.sendingMessage = false;
        state.chats.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.sendingMessage = false;
        state.error = action.payload as string;
      });

    // Fetch user chats cases
    builder
      .addCase(fetchUserChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserChats.fulfilled, (state, action) => {
        state.loading = false;
        state.chats = action.payload;
      })
      .addCase(fetchUserChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  storeChats, 
  reactToMessage, 
  updateChatMessageResponse, 
  clearError, 
  clearChats 
} = chatSlice.actions;

export default chatSlice.reducer;