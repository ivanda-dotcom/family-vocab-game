export type Level = 'beginner' | 'elementary' | 'intermediate' | 'upper-intermediate';

export type FamilyMember = {
  id: string;
  name: string;
  level: Level;
  dailyGoal: number;
  checkedInToday: boolean;
  streakDays: number;
  todayScore: number;
  weeklyScore: number;
  badges: string[];
};

export const INITIAL_FAMILY_DATA: FamilyMember[] = [
  { id: '1', name: 'Parent A', level: 'upper-intermediate', dailyGoal: 50, checkedInToday: false, streakDays: 5, todayScore: 30, weeklyScore: 210, badges: ['🔥'] },
  { id: '2', name: 'Parent B', level: 'intermediate', dailyGoal: 30, checkedInToday: true, streakDays: 12, todayScore: 30, weeklyScore: 180, badges: ['🏆'] },
  { id: '3', name: 'Child A', level: 'elementary', dailyGoal: 20, checkedInToday: false, streakDays: 3, todayScore: 15, weeklyScore: 90, badges: [] },
  { id: '4', name: 'Child B', level: 'beginner', dailyGoal: 10, checkedInToday: true, streakDays: 7, todayScore: 10, weeklyScore: 60, badges: ['🌟'] },
];

export const VOCAB_BATTLES = [
  { id: '1', challenger: 'Parent A', opponent: 'Parent B', status: 'In Progress' },
  { id: '2', challenger: 'Child A', opponent: 'Child B', status: 'Waiting' }
];
