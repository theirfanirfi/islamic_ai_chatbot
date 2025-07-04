export interface IMessage {
id: string;
user_id: string;
question: string;
response: string;
flags: string[];
feedback: string;
reaction: number;  // 1 for up and 2 for down, default 0
timestamp: any;
}

export interface IChatState  {
  chats: Array<IMessage>;
}