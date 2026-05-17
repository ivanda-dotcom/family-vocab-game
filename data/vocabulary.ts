export interface VocabItem {
  id: string;
  word: string;
  definition: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  examples: string[];
}

export const VOCAB_DATA: VocabItem[] = [
  {
    id: '1',
    word: 'Resilient',
    definition: 'Able to withstand or recover quickly from difficult conditions.',
    level: 'intermediate',
    examples: ['The family proved resilient after the move.', 'She is resilient despite the challenges.']
  },
  {
    id: '2',
    word: 'Ephemeral',
    definition: 'Lasting for a very short time.',
    level: 'advanced',
    examples: ['The joy of the moment was ephemeral.', 'Fame can be ephemeral.']
  }
];
