export type Level = 'beginner' | 'elementary' | 'intermediate' | 'upper-intermediate';

export interface FamilyMember {
  id: string;
  name: string;
  level: Level;
  dailyGoal: number;
  streakDays: number;
  todayScore: number;
  checkedInToday: boolean;
}

export const INITIAL_FAMILY_DATA: FamilyMember[] = [
  { id: '1', name: 'Dad', level: 'upper-intermediate', dailyGoal: 50, streakDays: 5, todayScore: 30, checkedInToday: false },
  { id: '2', name: 'Mom', level: 'intermediate', dailyGoal: 30, streakDays: 12, todayScore: 30, checkedInToday: true },
  { id: '3', name: 'Emma', level: 'elementary', dailyGoal: 20, streakDays: 3, todayScore: 15, checkedInToday: false },
  { id: '4', name: 'Leo', level: 'beginner', dailyGoal: 10, streakDays: 7, todayScore: 10, checkedInToday: true },
];

export const VOCAB_BATTLES = [
  { id: '1', challenger: 'Dad', opponent: 'Mom', status: 'In Progress' },
  { id: '2', challenger: 'Emma', opponent: 'Leo', status: 'Waiting' }
];
export const getReviewQueue = (history: any[]) => {
  const counts: Record<string, number> = {};
  history.forEach(h => {
    h.reviewNeededWords?.forEach((w: string) => {
      counts[w] = (counts[w] || 0) + 1;
    });
  });
  
  // Rank by frequency then recency
  return Object.keys(counts)
    .sort((a, b) => counts[b] - counts[a])
    .slice(0, 5);
};
