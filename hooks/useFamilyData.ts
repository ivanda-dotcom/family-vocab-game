import { useState, useEffect } from 'react';
import { FamilyMember, INITIAL_FAMILY_DATA } from '../data/family';

const STORAGE_KEY = 'family_vocab_data';

export function useFamilyData() {
  const [members, setMembers] = useState<FamilyMember[]>(INITIAL_FAMILY_DATA);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setMembers(JSON.parse(saved));
    }
  }, []);

  const toggleCheckIn = (id: string) => {
    const updated = members.map(m => 
      m.id === id ? { ...m, checkedInToday: !m.checkedInToday, todayScore: m.checkedInToday ? m.todayScore - 10 : m.todayScore + 10 } : m
    );
    setMembers(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { members, toggleCheckIn };
}
