// export interface IMessage {
// id: string;
// user_id: string;
// question: string;
// answer: string;
// flags: string[];
// feedback: string;
// reaction: number;  // 1 for up and 2 for down, default 0
// created_at: any;
// }

// export interface IChatState  {
//   chats: Array<IMessage>;
// }

export interface IMessage {
  id: string;
  user_id: string;
  question: string;
  answer: string;
  flags: string[];
  feedback: string;
  reaction: number;  // 1 for up and 2 for down, default 0
  created_at: any;
}

export interface IChatState {
  chats: Array<IMessage>;
  loading?: boolean;
  error?: string | null;
  sendingMessage?: boolean;
  isLimitReached?: boolean;
  limit_message?: string;
}

// API Response interfaces
export interface SendMessageResponse {
  chat: IMessage;
  success: boolean;
}

export interface FetchChatsResponse {
  chats: IMessage[];
  success: boolean;
}