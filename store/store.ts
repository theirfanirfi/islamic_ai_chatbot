import ChatSlice from "@/slice/ChatSlice";
import UserSlice from "@/slice/UserSlice";
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    chats: ChatSlice,
    user: UserSlice,
  },
});