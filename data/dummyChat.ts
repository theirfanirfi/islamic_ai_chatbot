import { IMessage } from "@/interfaces/IChatMessage";

const dummyMessages: IMessage[] = [
  {
    id: '1',
    question: "What are the main differences between Python 2 and Python 3?",
    answer: "Python 3 introduced several major changes, including print as a function, Unicode by default for strings, and the division operator '/' performing float division.",
    user_id: '101',
    reaction: 1, // Liked
    feedback: "Very clear explanation, thanks!",
    flags: [],
    created_at: Date.now()
  },
  {
    id: '2',
    question: "When did the Western Roman Empire fall?",
    answer: "The Western Roman Empire is traditionally said to have fallen in 476 AD when the last emperor, Romulus Augustulus, was deposed.",
    user_id: '102',
    reaction: 0, // No reaction
    feedback: "",
    flags: [],
    created_at: Date.now()
  },
  {
    id: '3',
    question: "Can you explain the process of photosynthesis in simple terms?",
    answer: "Photosynthesis is the process plants use to convert light energy into chemical energy, creating glucose (sugar) for food from carbon dioxide and water.",
    user_id: '101',
    reaction: 1, // Liked
    feedback: "",
    flags: [],
    created_at: Date.now()
  },

  {
    id: '4',
    question: "What is the capital of Australia?",
    answer: "The capital of Australia is Canberra. Many people mistakenly think it's Sydney or Melbourne.",
    user_id: '103',
    reaction: 0, // No reaction
    feedback: "",
    flags: [],
   created_at: Date.now()
  },
  {
    id: '5',
    question: "Does free will truly exist?",
    answer: "The concept of free will is a major debate in philosophy. Determinism argues that all events are causally determined by an unbroken chain of prior occurrences, while libertarianism holds that individuals have agency.",
    user_id: '102',
    reaction: -1, // Disliked
    feedback: "The answer is a bit vague and doesn't take a clear stance.",
    flags: ['philosophical', 'ambiguous'],
    created_at: Date.now()
  },
  {
    id: '6',
    question: "What is the key to making good sourdough bread?",
    answer: "A healthy and active starter is crucial. Proper fermentation time, temperature control, and developing gluten through stretching and folding are also key.",
    user_id: '101',
    reaction: 1, // Liked
    feedback: "Great tips!",
    flags: [],
    created_at: Date.now()
  },
  {
    id: '7',
    question: "Which country has the largest part of the Amazon rainforest?",
    answer: "Brazil holds the largest portion of the Amazon rainforest, accounting for about 60% of the total area.",
    user_id: '104',
    reaction: 0, // No reaction
    feedback: "",
    flags: [],
    created_at: Date.now()
  },
  {
    id: '8',
    question: "Who is the main character in 'To Kill a Mockingbird'?",
    answer: "The protagonist and narrator is Jean Louise 'Scout' Finch. However, her father, Atticus Finch, is also considered a central character.",
    user_id: '102',
    reaction: 0, // No reaction
    feedback: "",
    flags: [],
    created_at: Date.now()
  },
  {
    id: '9',
    question: "Summarize the latest trends in renewable energy for July 2025.",
    answer: "As of mid-2025, major trends include advancements in perovskite solar cells, increased investment in green hydrogen infrastructure, and grid-scale battery storage solutions.",
    user_id: '103',
    reaction: -1, // Disliked
    feedback: "This seems a bit generic. I was hoping for more specific data.",
    flags: ['outdated-check'],
    created_at: Date.now()
  },
  {
    id: '10',
    question: "What is 144 divided by 12?",
    answer: "144 divided by 12 is 12.",
    user_id: '101',
    reaction: 1, // Liked
    feedback: "Quick and accurate.",
    flags: [],
    created_at: Date.now()
  },
];

export default dummyMessages;