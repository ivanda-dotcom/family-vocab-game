export interface VocabItem {
  id: string;
  word: string;
  definition: string;
  zhHint: string;
  level: 'beginner' | 'elementary' | 'intermediate' | 'upper-intermediate';
  category: string;
  familyExample: string;
}

export const VOCAB_DATA: VocabItem[] = [
  {
    id: '1',
    word: 'Resilient',
    definition: 'Able to withstand or recover quickly from difficult conditions.',
    zhHint: '有韌性的、恢復力強的',
    level: 'upper-intermediate',
    category: 'Life Skills',
    familyExample: 'We are resilient when we learn from mistakes together.'
  },
  {
    id: '2',
    word: 'Persistent',
    definition: 'Continuing firmly in a course of action in spite of difficulty.',
    zhHint: '堅持不懈的',
    level: 'intermediate',
    category: 'Life Skills',
    familyExample: 'Be persistent with your homework, Emma!'
  },
  {
    id: '3',
    word: 'Cooperate',
    definition: 'To work together towards the same end.',
    zhHint: '合作',
    level: 'elementary',
    category: 'School',
    familyExample: 'Let\'s cooperate to clean the dinner table.'
  },
  {
    id: '4',
    word: 'Cheerful',
    definition: 'Noticeably happy and optimistic.',
    zhHint: '愉快的、興高采烈的',
    level: 'beginner',
    category: 'Feeling',
    familyExample: 'Leo is so cheerful when he plays with his toys.'
  },
  {
    id: '5',
    word: 'Routine',
    definition: 'A sequence of actions regularly followed.',
    zhHint: '常規、例行公事',
    level: 'elementary',
    category: 'Daily Routine',
    familyExample: 'Our morning routine includes breakfast and reading.'
  },
  {
    id: '6',
    word: 'Navigate',
    definition: 'To plan and direct the route or course.',
    zhHint: '導航、引導',
    level: 'intermediate',
    category: 'Travel',
    familyExample: 'Dad will navigate us to the park.'
  },
  {
    id: '7',
    word: 'Appreciate',
    definition: 'To recognize the full worth of something.',
    zhHint: '欣賞、感激',
    level: 'elementary',
    category: 'Emotion',
    familyExample: 'We appreciate the nice dinner Mom made.'
  },
  {
    id: '8',
    word: 'Curious',
    definition: 'Eager to know or learn something.',
    zhHint: '好奇的',
    level: 'beginner',
    category: 'Personality',
    familyExample: 'Leo is curious about the bugs in the garden.'
  },
  {
    id: '9',
    word: 'Generous',
    definition: 'Showing a readiness to give more of something than is strictly necessary.',
    zhHint: '慷慨的',
    level: 'intermediate',
    category: 'Personality',
    familyExample: 'Sharing toys makes you a generous person.'
  },
  {
    id: '10',
    word: 'Challenge',
    definition: 'A task or situation that tests someone\'s abilities.',
    zhHint: '挑戰',
    level: 'elementary',
    category: 'Life Skills',
    familyExample: 'Learning a new word is a fun challenge!'
  }
];
